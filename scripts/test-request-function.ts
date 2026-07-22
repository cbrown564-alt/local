import assert from "node:assert/strict";
import handler from "../api/request.ts";

const invoke = async (overrides: Record<string, unknown> = {}) => {
  let statusCode = 200;
  let payload: unknown;
  const headers = new Map<string, string>();
  const request = {
    method: "POST",
    headers: { origin: "https://mourneandmain.co.uk", host: "mourneandmain.co.uk" },
    body: {},
    ...overrides,
  } as never;
  const response = {
    setHeader(name: string, value: string) { headers.set(name, value); },
    status(code: number) { statusCode = code; return this; },
    json(value: unknown) { payload = value; return this; },
  } as never;

  await handler(request, response);
  return { statusCode, payload, headers };
};

assert.equal((await invoke({ method: "GET" })).statusCode, 405);
assert.equal((await invoke({ headers: { origin: "https://example.com", host: "mourneandmain.co.uk" } })).statusCode, 403);
assert.equal((await invoke()).statusCode, 400);
assert.equal((await invoke({ body: { company: "bot-filled" } })).statusCode, 200);

const validRequest = {
  business: "Test business",
  town: "Dundrum",
  link: "https://example.com",
  idea: "Make booking clearer",
  name: "Test visitor",
  email: "visitor@example.com",
};
assert.equal((await invoke({ body: validRequest })).statusCode, 503);

console.log("request function validation passed");
