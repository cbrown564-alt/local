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
