import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const MAX = {
  business: 120,
  town: 80,
  link: 500,
  idea: 2_000,
  name: 120,
  email: 254,
} as const;

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1_000;
const rateLimits = new Map<string, { count: number; resetAt: number }>();

const header = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const firstForwardedValue = (value: string | undefined) =>
  value?.split(",")[0]?.trim();

const clientAddress = (request: VercelRequest) =>
  firstForwardedValue(header(request.headers["x-forwarded-for"])) ||
  header(request.headers["x-real-ip"]) ||
  request.socket?.remoteAddress ||
  "unknown";

const takeRateLimitSlot = (key: string, now = Date.now()) => {
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

export default async function handler(request: VercelRequest, response: VercelResponse) {
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

  const rateLimit = takeRateLimitSlot(clientAddress(request));
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

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPassword },
  });

  const safeBusiness = fields.business.replace(/[\r\n]+/g, " ").slice(0, 80);
  const message = [
    "New Mourne & Main before-and-after request",
    "",
    `Business or organisation: ${fields.business}`,
    `Town: ${fields.town}`,
    `Current link: ${currentLink || "Not supplied — no current website or public page"}`,
    `Contact: ${fields.name}`,
    `Email: ${fields.email}`,
    "",
    "What should be easier or more impressive?",
    fields.idea,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: { name: "Mourne & Main website", address: gmailUser },
      to: recipient,
      replyTo: { name: fields.name, address: fields.email },
      subject: `Before-and-after request: ${safeBusiness}`,
      text: message,
    });
    return response.status(200).json({ ok: true });
  } catch {
    return response.status(502).json({ error: "The request could not be sent just now. Please try again shortly." });
  }
}
