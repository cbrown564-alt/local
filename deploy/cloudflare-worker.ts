import { DurableObject } from "cloudflare:workers";
import { createRequestHandler, type RateLimitResult, type RequestOutput } from "../api/request";

const WINDOW_MS = 60 * 60 * 1_000;
const LIMIT = 5;

/** One persistent, short-lived counter per salted address digest. No form data. */
export class RequestRate extends DurableObject<Cloudflare.Env> {
  async takeSlot(): Promise<RateLimitResult> {
    const now = Date.now();
    const storage = this.ctx.storage;
    // Synchronous KV is backed by SQLite and commits before RPC returns.
    const previous = storage.kv.get<{ count: number; resetAt: number }>("window");
    const fresh = !previous || previous.resetAt <= now;
    const window = fresh ? { count: 0, resetAt: now + WINDOW_MS } : previous;
    const allowed = window.count < LIMIT;
    if (allowed) {
      window.count++;
      storage.kv.put("window", window);
    }
    if (fresh) await storage.setAlarm(window.resetAt);
    return { allowed, remaining: Math.max(0, LIMIT - window.count), resetAt: window.resetAt };
  }

  async alarm() {
    // deleteAll removes the counter and empty instance storage after its window.
    const window = this.ctx.storage.kv.get<{ resetAt: number }>("window");
    if (window && window.resetAt > Date.now()) await this.ctx.storage.setAlarm(window.resetAt);
    else await this.ctx.storage.deleteAll();
  }
}

async function readBody(request: Request): Promise<string | null> {
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16 * 1024) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(body);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/request" && url.pathname !== "/api/request/") {
      if (url.pathname.startsWith("/api/")) return new Response("Not found", { status: 404 });
      return env.ASSETS.fetch(request);
    }
    const headers = new Headers({ "Cache-Control": "no-store" });
    if (env.DELIVERY_ENABLED !== "true") headers.set("X-Robots-Tag", "noindex, nofollow");
    const json = (payload: unknown, status: number) => Response.json(payload, { status, headers });
    if (request.method !== "POST") {
      headers.set("Allow", "POST");
      return json({ error: "Method not allowed." }, 405);
    }
    // Use the actual request URL, never client-supplied forwarding headers.
    if (request.headers.get("Origin") !== url.origin) {
      return json({ error: "Request origin was not accepted." }, 403);
    }
    if ((request.headers.get("Content-Type") ?? "").split(";")[0].trim().toLowerCase() !== "application/json") {
      return json({ error: "The submitted request was not valid." }, 415);
    }
    const body = await readBody(request);
    if (body === null) return json({ error: "The submitted request was too large." }, 413);
    let response = json({ error: "The request could not be sent." }, 500);
    let status = 200;
    const output: RequestOutput = {
      setHeader(name, value) { headers.set(name, value); },
      status(code) { status = code; return this; },
      json(payload) { response = json(payload, status); return response; },
    };
    // Preview has no Gmail secrets and never acknowledges a real delivery.
    const mailEnv = env.DELIVERY_ENABLED === "true" ? env : {};
    const handler = createRequestHandler(env.DELIVERY_ENABLED === "true" ? async (mail) => {
      const reply = mail.replyTo;
      const replyTo = reply && typeof reply === "object" && !Array.isArray(reply) && "address" in reply
        ? { email: reply.address, name: reply.name ?? "Mourne Made enquiry" } : undefined;
      const text = String(mail.text ?? "");
      const escaped = text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
      const result = await env.EMAIL.send({
        from: { email: env.MAIL_FROM, name: "Mourne Made website" },
        to: env.REQUEST_TO_EMAIL,
        subject: String(mail.subject ?? ""), text,
        html: `<html><body><pre>${escaped}</pre></body></html>`,
        ...(replyTo ? { replyTo } : {}),
      });
      console.log(JSON.stringify({ event: "request_email_accepted", messageId: result?.messageId }));
      return result;
    } : undefined, {
      env: mailEnv,
      async takeRateLimitSlot(address) {
        const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${env.REQUEST_RATE_SALT ?? "preview-only"}:${address}`));
        const key = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
        try {
          // cf cannot infer RPC methods from a string worker reference.
          const counter = env.REQUEST_RATE.getByName(key) as DurableObjectStub<RequestRate>;
          return await counter.takeSlot();
        }
        catch {
          // Preserve the existing store-outage policy: deliver the lead, log no contents.
          console.error(JSON.stringify({ event: "request_rate_store_unavailable" }));
          return { allowed: true, remaining: 0, resetAt: Date.now() + WINDOW_MS };
        }
      },
    });
    try {
      await handler({
        method: request.method, body,
        headers: { origin: url.origin, host: url.host, "x-forwarded-for": request.headers.get("CF-Connecting-IP") ?? "unknown" },
      }, output);
      return response;
    } catch {
      console.error(JSON.stringify({ event: "request_handler_failed" }));
      return json({ error: "The request service is temporarily unavailable. Please email hello@mournemade.co.uk instead." }, 503);
    }
  },
} satisfies ExportedHandler<Cloudflare.Env>;
