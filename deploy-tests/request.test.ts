import { env } from "cloudflare:workers";
import { abortAllDurableObjects, createExecutionContext, runInDurableObject, runDurableObjectAlarm } from "cloudflare:test";
import { expect, test } from "vitest";
import worker, { type RequestRate } from "../deploy/cloudflare-worker";

const counter = (key: string) => env.REQUEST_RATE.getByName(key) as DurableObjectStub<RequestRate>;
const request = (body: unknown, extra: HeadersInit = {}, ip = "198.51.100.10") => new Request("https://site.example/api/request", {
  method: "POST", headers: { Origin: "https://site.example", "Content-Type": "application/json", "CF-Connecting-IP": ip, ...extra },
  body: JSON.stringify(body),
});
const invoke = (request: Request) => worker.fetch(request, env, createExecutionContext());

test("five attempts remain limited after instance restart and addresses stay independent", async () => {
  const first = counter("persistence");
  const results = await Promise.all(Array.from({ length: 8 }, () => first.takeSlot()));
  expect(results.filter(result => result.allowed)).toHaveLength(5);
  await runInDurableObject(first, (_instance, state) => {
    expect(state.storage.kv.get("window")).toEqual({ count: 5, resetAt: results[0].resetAt });
  });
  await abortAllDurableObjects();
  expect((await counter("persistence").takeSlot()).allowed).toBe(false);
  expect((await counter("another-address").takeSlot()).remaining).toBe(4);
});

test("expired counters renew and a delayed alarm does not delete a fresh window", async () => {
  const stub = counter("expiration");
  await stub.takeSlot();
  await runInDurableObject(stub, (_instance, state) => {
    state.storage.kv.put("window", { count: 5, resetAt: Date.now() - 1_000 });
  });
  expect((await stub.takeSlot()).remaining).toBe(4);
  expect(await runDurableObjectAlarm(stub)).toBe(true);
  expect((await stub.takeSlot()).remaining).toBe(3);
  await runInDurableObject(stub, (_instance, state) => {
    state.storage.kv.put("window", { count: 5, resetAt: Date.now() - 1_000 });
  });
  await runDurableObjectAlarm(stub);
  await runInDurableObject(stub, (_instance, state) => {
    expect(state.storage.kv.get("window")).toBeUndefined();
  });
});

test("Worker enforces method, actual origin, JSON shape and bounded bodies", async () => {
  expect((await invoke(new Request("https://site.example/api/request"))).status).toBe(405);
  expect((await invoke(request({ business: "Test" }, { Origin: "https://other.example", "x-forwarded-host": "other.example" }))).status).toBe(403);
  expect((await invoke(request({}, { "Content-Type": "text/plain" }))).status).toBe(415);
  expect((await invoke(request("x".repeat(17 * 1024)))).status).toBe(413);
  expect((await invoke(request(null))).status).toBe(400);
  expect((await invoke(request([]))).status).toBe(400);
  expect((await invoke(request({}))).status).toBe(400);
  expect((await invoke(new Request("https://site.example/api/private"))).status).toBe(404);
});

test("preview keeps delivery disabled and forwarding-header spoofing cannot reset its limit", async () => {
  const honeypot = await invoke(request({ mm_check_field: "bot" }, {}, "198.51.100.20"));
  expect(honeypot.status).toBe(200);
  for (let i = 0; i < 5; i++) {
    const response = await invoke(request({ business: "Synthetic verification" }, { "x-forwarded-for": `spoof-${i}` }, "198.51.100.20"));
    expect(response.status).toBe(503);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("RateLimit-Remaining")).toBe(String(4 - i));
  }
  const limited = await invoke(request({ business: "Synthetic verification" }, {}, "198.51.100.20"));
  expect(limited.status).toBe(429);
  expect(Number(limited.headers.get("Retry-After"))).toBeGreaterThan(0);
});


test("native email preserves the enquiry and Reply-To without Gmail credentials", async () => {
  const messages: EmailMessageBuilder[] = [];
  function send(message: EmailMessage): Promise<void>;
  function send(message: EmailMessageBuilder): Promise<EmailSendResult>;
  async function send(message: EmailMessage | EmailMessageBuilder) {
    if (!("subject" in message)) throw new Error("Expected structured email");
    messages.push(message);
    return { messageId: "synthetic-test-id" };
  }
  const production = { ...env, DELIVERY_ENABLED: "true" as const,
    MAIL_FROM: "hello@mournemade.co.uk" as const, REQUEST_TO_EMAIL: "cbrown564@gmail.com" as const,
    EMAIL: { send } };
  const response = await worker.fetch(request({ business: "Synthetic <business>", name: "Visitor", email: "visitor@example.com", idea: "Keep <this> & that", source: "direct" }, {}, "198.51.100.40"), production, createExecutionContext());
  expect(response.status).toBe(200);
  expect(messages).toHaveLength(1);
  expect(messages[0]).toMatchObject({ from: { email: "hello@mournemade.co.uk" }, to: "cbrown564@gmail.com", replyTo: { email: "visitor@example.com", name: "Visitor" } });
  expect(messages[0].text).toContain("Keep <this> & that");
  expect(messages[0].html).toContain("Keep &lt;this&gt; &amp; that");
});

test("native email rejection returns the retry path instead of acknowledging delivery", async () => {
  const production = { ...env, DELIVERY_ENABLED: "true" as const,
    MAIL_FROM: "hello@mournemade.co.uk" as const, REQUEST_TO_EMAIL: "cbrown564@gmail.com" as const,
    EMAIL: { async send() { throw new Error("Synthetic provider failure"); } } };
  const response = await worker.fetch(request({ business: "Synthetic business" }, {}, "198.51.100.41"), production, createExecutionContext());
  expect(response.status).toBe(503);
  expect(await response.json()).toEqual({ error: "The request service is temporarily unavailable. Please email hello@mournemade.co.uk instead." });
});
