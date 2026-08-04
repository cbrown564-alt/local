import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer, { type SendMailOptions } from "nodemailer";
import { publicTransformationSlugs } from "../src/site/data/transformations.ts";

const MAX = {
  business: 120,
  town: 80,
  link: 500,
  idea: 2_000,
  name: 120,
  email: 254,
  source: 80,
} as const;

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * `source` arrives from a query string a stranger can retype, so it is
 * allow-listed rather than trusted (docs/adr/0002). An unrecognised value is
 * recorded as such instead of rejecting the submission: attribution is worth
 * less than the lead, and a printed sheet cannot be corrected after the run.
 */
const publicSlugs = new Set<string>(publicTransformationSlugs);
const normaliseSource = (value: string) => {
  if (!value) return "direct";
  if (value === "direct" || value === "transformation") return value;
  const onesheet = /^onesheet-([a-z][a-z\d-]*)$/.exec(value);
  if (onesheet && publicSlugs.has(onesheet[1])) return value;
  return "unrecognised";
};
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1_000;
const rateLimits = new Map<string, { count: number; resetAt: number }>();
type SendMail = (options: SendMailOptions) => Promise<unknown>;

/**
 * A failed delivery is a lead that was typed and lost. The visitor is told to
 * email directly, but nobody finds out unless someone happens to read the
 * function logs, so the failure is also pushed somewhere that interrupts.
 *
 * Nothing the visitor typed is included — not the business, the idea, the
 * name or the email. A delivery alert is an operational signal, and routing
 * someone's enquiry through a third-party webhook to say "the email failed"
 * would leak exactly the content the alert exists to protect. `source` is the
 * one non-content field carried: it comes from a printed sheet, not the
 * visitor, and says which sheet is at risk of losing responses.
 */
/** Nodemailer's SMTP fields, narrowed to the three that identify a failure. */
const failureDetail = (deliveryError: unknown) => {
  const failure = deliveryError as {
    code?: unknown;
    command?: unknown;
    responseCode?: unknown;
  };
  return {
    code: typeof failure.code === "string" ? failure.code : "unknown",
    command: typeof failure.command === "string" ? failure.command : "unknown",
    responseCode: typeof failure.responseCode === "number" ? failure.responseCode : undefined,
  };
};

const reportDeliveryFailure = async (detail: {
  code: string;
  command: string;
  responseCode?: number;
  source: string;
}) => {
  console.error("Request email delivery failed", detail);
  const webhook = process.env.REQUEST_ALERT_WEBHOOK;
  if (!webhook) return;
  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "request_delivery_failed",
        at: new Date().toISOString(),
        ...detail,
      }),
      // Serverless kills un-awaited work, but a slow webhook must not hold the
      // visitor's response open either.
      signal: AbortSignal.timeout(2_000),
    });
  } catch (alertError) {
    // The alert failing is itself only worth a log line: the submission has
    // already failed, and nothing here can recover it.
    console.error("Request delivery alert could not be sent", {
      code: alertError instanceof Error ? alertError.message : "unknown",
    });
  }
};

const header = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const firstForwardedValue = (value: string | undefined) =>
  value?.split(",")[0]?.trim();

const clientAddress = (request: VercelRequest) =>
  firstForwardedValue(header(request.headers["x-forwarded-for"])) ||
  header(request.headers["x-real-ip"]) ||
  request.socket?.remoteAddress ||
  "unknown";

const takeLocalRateLimitSlot = (key: string, now = Date.now()) => {
  const current = rateLimits.get(key);
  if (!current || current.resetAt <= now) {
    const next = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    rateLimits.set(key, next);
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt: next.resetAt };
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - current.count,
    resetAt: current.resetAt,
  };
};

/**
 * The limit has to hold across serverless instances, not per instance.
 * `rateLimits` above is a module-level Map, so it lives and dies with one warm
 * function: five attempts per instance is not five attempts, and a caller who
 * lands on a fresh instance each time is never limited at all.
 *
 * Backed by the Upstash-compatible REST API that both Vercel KV and Upstash
 * itself expose, over plain `fetch` — no client dependency in a function whose
 * only other job is sending one email.
 */
const restStore = () => {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
};

/**
 * The caller's address is a live IP, and this sends it to a third-party store.
 * Only a salted digest leaves the function: it counts the same caller just as
 * well, and a leak of the store is not a leak of who submitted a request.
 * Without a configured salt the digest is still per-deployment stable, which
 * is all the counting needs.
 */
const rateLimitKey = async (address: string) => {
  const { createHash } = await import("node:crypto");
  const salt = process.env.REQUEST_RATE_SALT ?? "mourne-made";
  return `mm:request-rate:${createHash("sha256").update(`${salt}:${address}`).digest("hex").slice(0, 32)}`;
};

const takeSharedRateLimitSlot = async (
  store: { url: string; token: string },
  address: string,
) => {
  const key = await rateLimitKey(address);
  const seconds = Math.floor(RATE_LIMIT_WINDOW_MS / 1_000);
  const response = await fetch(`${store.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${store.token}`,
      "Content-Type": "application/json",
    },
    // INCR then EXPIRE NX: the window starts on the first attempt and is not
    // pushed back by later ones, so five attempts in an hour cannot become a
    // rolling hour that never resets.
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, String(seconds), "NX"],
      ["PTTL", key],
    ]),
  });
  if (!response.ok) throw new Error(`rate-limit store returned ${response.status}`);
  const results = (await response.json()) as { result?: unknown; error?: unknown }[];
  const failed = results.find((entry) => entry?.error);
  if (failed) throw new Error(String(failed.error));

  const count = Number(results[0]?.result);
  const ttl = Number(results[2]?.result);
  if (!Number.isFinite(count)) throw new Error("rate-limit store returned no count");
  // A missing or non-expiring TTL still yields a usable window rather than a
  // NaN reset header.
  const resetAt = Date.now() + (Number.isFinite(ttl) && ttl > 0 ? ttl : RATE_LIMIT_WINDOW_MS);
  return {
    allowed: count <= RATE_LIMIT_MAX,
    remaining: Math.max(0, RATE_LIMIT_MAX - count),
    resetAt,
  };
};

const takeRateLimitSlot = async (address: string) => {
  const store = restStore();
  if (!store) return takeLocalRateLimitSlot(address);
  try {
    return await takeSharedRateLimitSlot(store, address);
  } catch (error) {
    /* Fails open, deliberately. This endpoint exists to deliver a handful of
       leads a week from printed sheets; a store outage silently dropping a
       real business's request is a worse outcome than an unlimited hour. The
       failure is recorded so it is visible rather than assumed. */
    console.error("Request rate-limit store unavailable, falling back per-instance", {
      code: error instanceof Error ? error.message : "unknown",
    });
    return takeLocalRateLimitSlot(address);
  }
};

const normaliseLink = (value: string) => {
  if (!value) return "";
  const candidate = /^[a-z][a-z\d+.-]*:\/\//i.test(value)
    ? value
    : `https://${value}`;
  const link = new URL(candidate);
  if (!["http:", "https:"].includes(link.protocol)) {
    throw new Error("Invalid protocol");
  }
  return link.href;
};

export const createRequestHandler = (sendMailOverride?: SendMail) =>
async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const origin = header(request.headers.origin);
  const host = firstForwardedValue(header(request.headers["x-forwarded-host"])) ||
    header(request.headers.host);
  if (!origin || !host) {
    return response.status(403).json({ error: "Request origin was not accepted." });
  }
  try {
    if (new URL(origin).host.toLowerCase() !== host.toLowerCase()) {
      return response.status(403).json({ error: "Request origin was not accepted." });
    }
  } catch {
    return response.status(403).json({ error: "Request origin was not accepted." });
  }

  let body: Record<string, unknown> = {};
  try {
    body = typeof request.body === "string" ? JSON.parse(request.body) : (request.body ?? {});
  } catch {
    return response.status(400).json({ error: "The submitted request was not valid." });
  }
  if (clean(body?.mm_check_field, 200)) {
    return response.status(200).json({ ok: true });
  }

  const rateLimit = await takeRateLimitSlot(clientAddress(request));
  response.setHeader("RateLimit-Limit", String(RATE_LIMIT_MAX));
  response.setHeader("RateLimit-Remaining", String(rateLimit.remaining));
  response.setHeader("RateLimit-Reset", String(Math.ceil(rateLimit.resetAt / 1_000)));
  if (!rateLimit.allowed) {
    response.setHeader("Retry-After", String(Math.ceil((rateLimit.resetAt - Date.now()) / 1_000)));
    return response.status(429).json({
      error: "Too many requests have been sent from this connection. Please try again later.",
    });
  }

  const fields = {
    business: clean(body?.business, MAX.business),
    town: clean(body?.town, MAX.town),
    link: clean(body?.link, MAX.link),
    idea: clean(body?.idea, MAX.idea),
    name: clean(body?.name, MAX.name),
    email: clean(body?.email, MAX.email),
    source: normaliseSource(clean(body?.source, MAX.source)),
  };

  const requiredFields = [fields.business, fields.town, fields.idea, fields.name, fields.email];
  if (requiredFields.some((value) => !value) || !emailPattern.test(fields.email)) {
    return response.status(400).json({ error: "Please complete each required field with valid details." });
  }

  let currentLink = "";
  try {
    currentLink = normaliseLink(fields.link);
  } catch {
    return response.status(400).json({ error: "Please provide a valid website or public listing URL." });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  const recipient = process.env.REQUEST_TO_EMAIL || gmailUser;

  if (!gmailUser || !gmailPassword || !recipient) {
    return response.status(503).json({ error: "The request service is not configured yet. Please try again later." });
  }

  const safeBusiness = fields.business.replace(/[\r\n]+/g, " ").slice(0, 80);
  const message = [
    "New Mourne Made before-and-after request",
    "",
    `Business or organisation: ${fields.business}`,
    `Town: ${fields.town}`,
    `Current link: ${currentLink || "Not supplied — no current website or public page"}`,
    `Contact: ${fields.name}`,
    `Email: ${fields.email}`,
    `Came from: ${fields.source}`,
    "",
    "What should be easier or more impressive?",
    fields.idea,
  ].join("\n");

  const mail: SendMailOptions = {
      from: { name: "Mourne Made website", address: gmailUser },
      to: recipient,
      replyTo: { name: fields.name, address: fields.email },
      subject: `Before-and-after request: ${safeBusiness}`,
      text: message,
  };

  if (sendMailOverride) {
    try {
      await sendMailOverride(mail);
    } catch (deliveryError) {
      // Reported like the real path rather than swallowed: this branch is what
      // the tests exercise, so a silent catch here meant the failure handling
      // was never actually covered.
      await reportDeliveryFailure({ ...failureDetail(deliveryError), source: fields.source });
      return response.status(503).json({
        error: "The request service is temporarily unavailable. Please email cbrown564@gmail.com instead.",
      });
    }
    return response.status(200).json({ ok: true });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPassword },
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 12_000,
  });

  try {
    await transporter.sendMail(mail);
    return response.status(200).json({ ok: true });
  } catch (deliveryError) {
    await reportDeliveryFailure({ ...failureDetail(deliveryError), source: fields.source });
    return response.status(503).json({
      error: "The request service is temporarily unavailable. Please email cbrown564@gmail.com instead.",
    });
  } finally {
    transporter.close();
  }
};

export default createRequestHandler();
