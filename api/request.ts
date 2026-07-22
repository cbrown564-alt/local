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

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const origin = request.headers.origin;
  const host = request.headers.host;
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return response.status(403).json({ error: "Request origin was not accepted." });
      }
    } catch {
      return response.status(403).json({ error: "Request origin was not accepted." });
    }
  }

  let body: Record<string, unknown> = {};
  try {
    body = typeof request.body === "string" ? JSON.parse(request.body) : (request.body ?? {});
  } catch {
    return response.status(400).json({ error: "The submitted request was not valid." });
  }
  if (clean(body?.company, 200)) {
    return response.status(200).json({ ok: true });
  }

  const fields = {
    business: clean(body?.business, MAX.business),
    town: clean(body?.town, MAX.town),
    link: clean(body?.link, MAX.link),
    idea: clean(body?.idea, MAX.idea),
    name: clean(body?.name, MAX.name),
    email: clean(body?.email, MAX.email),
  };

  if (Object.values(fields).some((value) => !value) || !emailPattern.test(fields.email)) {
    return response.status(400).json({ error: "Please complete each field with valid details." });
  }

  try {
    const link = new URL(fields.link);
    if (!['http:', 'https:'].includes(link.protocol)) throw new Error("Invalid protocol");
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
    `Current link: ${fields.link}`,
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
