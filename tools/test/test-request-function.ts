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

console.log("request function validation passed");
