import assert from "node:assert/strict";
import handler, { createRequestHandler } from "../../api/request.ts";

let invocationCount = 0;

const invoke = async (
  overrides: Record<string, unknown> = {},
  requestHandler = handler,
) => {
  invocationCount += 1;
  let statusCode = 200;
  let payload: unknown;
  const headers = new Map<string, string>();
  const request = {
    method: "POST",
    headers: {
      origin: "https://mournemade.co.uk",
      host: "mournemade.co.uk",
      "x-forwarded-for": `203.0.113.${invocationCount}`,
    },
    body: {},
    ...overrides,
  } as never;
  const response = {
    setHeader(name: string, value: string) { headers.set(name, value); },
    status(code: number) { statusCode = code; return this; },
    json(value: unknown) { payload = value; return this; },
  } as never;

  await requestHandler(request, response);
  return { statusCode, payload, headers };
};

assert.equal((await invoke({ method: "GET" })).statusCode, 405);
assert.equal((await invoke({ headers: { origin: "https://example.com", host: "mournemade.co.uk" } })).statusCode, 403);
assert.equal((await invoke({ headers: { host: "mournemade.co.uk" } })).statusCode, 403);
assert.equal((await invoke()).statusCode, 400);
assert.equal((await invoke({ body: { mm_check_field: "bot-filled" } })).statusCode, 200);

const validRequest = {
  business: "Test business",
  town: "Dundrum",
  link: "https://example.com",
  idea: "Make booking clearer",
  name: "Test visitor",
  email: "visitor@example.com",
};
assert.equal((await invoke({ body: validRequest })).statusCode, 503);
assert.equal((await invoke({ body: { ...validRequest, link: "" } })).statusCode, 503);
assert.equal((await invoke({ body: { ...validRequest, link: "facebook.com/mybiz" } })).statusCode, 503);
assert.equal((await invoke({ body: { ...validRequest, link: "javascript:alert(1)" } })).statusCode, 400);

const originalGmailUser = process.env.GMAIL_USER;
const originalGmailPassword = process.env.GMAIL_APP_PASSWORD;
const originalRecipient = process.env.REQUEST_TO_EMAIL;
process.env.GMAIL_USER = "sender@example.com";
process.env.GMAIL_APP_PASSWORD = "test-password";
process.env.REQUEST_TO_EMAIL = "recipient@example.com";

const successfulDelivery = await invoke(
  { body: validRequest },
  createRequestHandler(async () => ({ messageId: "test-message" })),
);
assert.equal(successfulDelivery.statusCode, 200);
assert.deepEqual(successfulDelivery.payload, { ok: true });

// docs/adr/0002: a printed sheet's source has to survive as far as the email,
// because the inbox is where the decision to keep printing it gets made. The
// value arrives from a query string, so it is allow-listed — but an
// unrecognised one is recorded, never allowed to cost the lead.
const deliveredSource = async (source?: string) => {
  let text = "";
  const result = await invoke(
    { body: source === undefined ? validRequest : { ...validRequest, source } },
    createRequestHandler(async (mail) => {
      text = String(mail.text ?? "");
      return { messageId: "test-message" };
    }),
  );
  assert.equal(result.statusCode, 200);
  const line = text.split("\n").find((entry) => entry.startsWith("Came from: "));
  return line?.slice("Came from: ".length);
};

assert.equal(await deliveredSource(), "Direct");
assert.equal(await deliveredSource(""), "Direct");
assert.equal(await deliveredSource("transformation"), "Case study");
assert.equal(await deliveredSource("onesheet-scopers"), "Printed one-sheet (Scopers)");
assert.equal(await deliveredSource("onesheet-hotel-enniskeen"), "Printed one-sheet (Hotel Enniskeen)");
// Not a public transformation, so no sheet can legitimately carry it.
assert.equal(await deliveredSource("onesheet-not-a-business"), "Unrecognised");
assert.equal(await deliveredSource("<script>alert(1)</script>"), "Unrecognised");
assert.equal(await deliveredSource("onesheet-../../etc/passwd"), "Unrecognised");

/* Claim sources already hold the before-and-after, so the note is optional.
   Cold /request/ still needs the idea field. */
const claimWithoutIdea = await invoke(
  {
    body: {
      business: "Scopers",
      town: "Dundrum",
      link: "",
      idea: "",
      name: "Test visitor",
      email: "visitor@example.com",
      source: "onesheet-scopers",
    },
  },
  createRequestHandler(async () => ({ messageId: "test-message" })),
);
assert.equal(claimWithoutIdea.statusCode, 200);

const transformationWithoutIdea = await invoke(
  {
    body: {
      business: "Scopers",
      town: "Dundrum",
      link: "",
      idea: "",
      name: "Test visitor",
      email: "visitor@example.com",
      source: "transformation",
    },
  },
  createRequestHandler(async () => ({ messageId: "test-message" })),
);
assert.equal(transformationWithoutIdea.statusCode, 200);

assert.equal(
  (await invoke({
    body: {
      business: "Scopers",
      town: "Dundrum",
      link: "",
      idea: "",
      name: "Test visitor",
      email: "visitor@example.com",
      source: "direct",
    },
  })).statusCode,
  400,
);

let claimMail: { subject?: string; text?: string } = {};
const claimDelivery = await invoke(
  {
    body: {
      business: "Scopers",
      town: "Dundrum",
      link: "",
      idea: "",
      name: "Jenny",
      email: "jenny@example.com",
      source: "onesheet-scopers",
    },
  },
  createRequestHandler(async (mail) => {
    claimMail = { subject: String(mail.subject ?? ""), text: String(mail.text ?? "") };
    return { messageId: "test-message" };
  }),
);
assert.equal(claimDelivery.statusCode, 200);
assert.equal(claimMail.subject, "Claim: Scopers");
assert.ok(claimMail.text?.startsWith("New Mourne Made concept claim\n"));
assert.ok(claimMail.text?.includes("Contact: Jenny\nEmail: jenny@example.com\n"));
assert.ok(claimMail.text?.includes("Came from: Printed one-sheet (Scopers)"));
assert.ok(claimMail.text?.includes("Note\nNo note"));
assert.ok(!claimMail.text?.includes("Current link:"));

/* Local businesses — email is optional on both Claim and Request. */
const withoutEmail = await invoke(
  {
    body: {
      business: "Scopers",
      town: "Dundrum",
      link: "",
      idea: "Make the supper club easier to find",
      name: "Paul",
      email: "",
      source: "direct",
    },
  },
  createRequestHandler(async (mail) => {
    assert.equal(mail.replyTo, undefined);
    assert.ok(String(mail.text ?? "").includes("Email: Not supplied"));
    return { messageId: "test-message" };
  }),
);
assert.equal(withoutEmail.statusCode, 200);

const claimWithoutEmail = await invoke(
  {
    body: {
      business: "Scopers",
      town: "Dundrum",
      link: "",
      idea: "",
      name: "Jenny",
      email: "",
      source: "onesheet-scopers",
    },
  },
  createRequestHandler(async () => ({ messageId: "test-message" })),
);
assert.equal(claimWithoutEmail.statusCode, 200);

assert.equal(
  (await invoke({
    body: { ...validRequest, email: "not-an-email" },
  })).statusCode,
  400,
);

const failedDelivery = await invoke(
  { body: validRequest },
  createRequestHandler(async () => {
    throw Object.assign(new Error("Authentication failed"), {
      code: "EAUTH",
      command: "AUTH PLAIN",
      responseCode: 535,
    });
  }),
);
assert.equal(failedDelivery.statusCode, 503);
assert.deepEqual(failedDelivery.payload, {
  error: "The request service is temporarily unavailable. Please email cbrown564@gmail.com instead.",
});

/* A failed delivery is a lead that was typed and lost, so it has to reach
   someone. What must never reach the webhook is what the visitor typed. */
const originalAlertFetch = globalThis.fetch;
process.env.REQUEST_ALERT_WEBHOOK = "https://alerts.example.com/hook";
let alerts: Record<string, unknown>[] = [];
globalThis.fetch = (async (_url: string, init: { body: string }) => {
  alerts.push(JSON.parse(init.body));
  return { ok: true, status: 200, json: async () => ({}) };
}) as never;

const alerted = await invoke(
  { body: { ...validRequest, source: "onesheet-scopers" } },
  createRequestHandler(async () => {
    throw Object.assign(new Error("Authentication failed"), {
      code: "EAUTH",
      command: "AUTH PLAIN",
      responseCode: 535,
    });
  }),
);
assert.equal(alerted.statusCode, 503);
assert.equal(alerts.length, 1, "a failed delivery raised no alert");
assert.equal(alerts[0].event, "request_delivery_failed");
assert.equal(alerts[0].code, "EAUTH");
assert.equal(alerts[0].responseCode, 535);
// Which sheet is losing responses is operational, and comes from the printed
// URL rather than from the visitor.
assert.equal(alerts[0].source, "onesheet-scopers");
const alertBody = JSON.stringify(alerts[0]);
for (const secret of [validRequest.name, validRequest.email, validRequest.business, validRequest.idea]) {
  assert.ok(!alertBody.includes(secret), `the alert leaked submitted content: ${secret}`);
}

// A webhook that is itself down must not change what the visitor is told.
alerts = [];
globalThis.fetch = (async () => { throw new Error("webhook unreachable"); }) as never;
const alertFailed = await invoke(
  { body: validRequest },
  createRequestHandler(async () => { throw new Error("send failed"); }),
);
assert.equal(alertFailed.statusCode, 503);

globalThis.fetch = originalAlertFetch;
delete process.env.REQUEST_ALERT_WEBHOOK;

if (originalGmailUser === undefined) delete process.env.GMAIL_USER;
else process.env.GMAIL_USER = originalGmailUser;
if (originalGmailPassword === undefined) delete process.env.GMAIL_APP_PASSWORD;
else process.env.GMAIL_APP_PASSWORD = originalGmailPassword;
if (originalRecipient === undefined) delete process.env.REQUEST_TO_EMAIL;
else process.env.REQUEST_TO_EMAIL = originalRecipient;

const limitedHeaders = {
  origin: "https://mournemade.co.uk",
  host: "mournemade.co.uk",
  "x-forwarded-for": "198.51.100.50",
};
for (let attempt = 0; attempt < 5; attempt += 1) {
  assert.notEqual((await invoke({ headers: limitedHeaders, body: validRequest })).statusCode, 429);
}
const limited = await invoke({ headers: limitedHeaders, body: validRequest });
assert.equal(limited.statusCode, 429);
assert.equal(limited.headers.get("RateLimit-Remaining"), "0");
assert.ok(limited.headers.has("Retry-After"));

/* The limit must hold across serverless instances, not per instance. These
   drive the REST store through a stubbed fetch: what is being pinned is that
   the endpoint counts from the store's reply rather than from module memory,
   that the window is not pushed back by later attempts, and that a store
   outage does not silently drop a real lead. */
const originalFetch = globalThis.fetch;
const originalKvUrl = process.env.KV_REST_API_URL;
const originalKvToken = process.env.KV_REST_API_TOKEN;
process.env.KV_REST_API_URL = "https://kv.example.com";
process.env.KV_REST_API_TOKEN = "test-token";

const RATE_LIMIT_WINDOW_MS_FOR_TEST = 60 * 60 * 1_000;
let storeCalls: { key: string; commands: string[][] }[] = [];
let storeCount = 0;
const stubStore = (behaviour: "ok" | "http-error" | "throw") => {
  globalThis.fetch = (async (url: string, init: { body: string }) => {
    const commands = JSON.parse(init.body) as string[][];
    storeCalls.push({ key: commands[0][1], commands });
    if (behaviour === "throw") throw new Error("connection refused");
    if (behaviour === "http-error") {
      return { ok: false, status: 503, json: async () => ({}) };
    }
    storeCount += 1;
    return {
      ok: true,
      status: 200,
      json: async () => [
        { result: storeCount },
        { result: 1 },
        { result: RATE_LIMIT_WINDOW_MS_FOR_TEST },
      ],
    };
  }) as never;
};

const sharedHeaders = {
  origin: "https://mournemade.co.uk",
  host: "mournemade.co.uk",
  "x-forwarded-for": "198.51.100.77",
};

stubStore("ok");
storeCount = 0;
storeCalls = [];
for (let attempt = 1; attempt <= 5; attempt += 1) {
  const result = await invoke({ headers: sharedHeaders, body: validRequest });
  assert.notEqual(result.statusCode, 429, `attempt ${attempt} was limited too early`);
  assert.equal(result.headers.get("RateLimit-Remaining"), String(5 - attempt));
}
const sharedLimited = await invoke({ headers: sharedHeaders, body: validRequest });
assert.equal(sharedLimited.statusCode, 429);
assert.equal(sharedLimited.headers.get("RateLimit-Remaining"), "0");

// The raw IP must never reach the store, and the window must be set only when
// absent so later attempts cannot roll it forward indefinitely.
const [first] = storeCalls;
assert.ok(first.key.startsWith("mm:request-rate:"), "unexpected rate-limit key shape");
assert.ok(!first.key.includes("198.51.100.77"), "the caller's IP was sent to the store in clear");
assert.deepEqual(first.commands[1].slice(0, 1).concat(first.commands[1].slice(2)), ["EXPIRE", "3600", "NX"]);
assert.equal(first.commands[2][0], "PTTL");

// Every caller counts separately.
storeCalls = [];
await invoke({ headers: { ...sharedHeaders, "x-forwarded-for": "198.51.100.78" }, body: validRequest });
assert.notEqual(storeCalls[0].key, first.key, "two callers shared one rate-limit key");

// A store outage fails open rather than dropping a real lead.
for (const behaviour of ["http-error", "throw"] as const) {
  stubStore(behaviour);
  const result = await invoke({
    headers: { ...sharedHeaders, "x-forwarded-for": `203.0.114.${behaviour === "throw" ? 1 : 2}` },
    body: validRequest,
  });
  assert.notEqual(result.statusCode, 429, `a ${behaviour} store outage rejected a submission`);
}

globalThis.fetch = originalFetch;
if (originalKvUrl === undefined) delete process.env.KV_REST_API_URL;
else process.env.KV_REST_API_URL = originalKvUrl;
if (originalKvToken === undefined) delete process.env.KV_REST_API_TOKEN;
else process.env.KV_REST_API_TOKEN = originalKvToken;

console.log("request function validation passed");
