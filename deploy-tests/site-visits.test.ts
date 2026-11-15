import { env } from "cloudflare:workers";
import { createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
import { expect, test } from "vitest";
import worker from "../deploy/cloudflare-worker";
import { normalisePath, sourceOf, visitDay, visitOf } from "../deploy/site-visits";

const html = new Response("<!doctype html><title>ok</title>", {
  status: 200,
  headers: { "Content-Type": "text/html; charset=utf-8" },
});
const now = Date.parse("2026-11-15T12:00:00Z");

const page = (url: string, headers: HeadersInit = {}) =>
  new Request(url, {
    method: "GET",
    headers: {
      Accept: "text/html",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/120.0.0.0",
      ...headers,
    },
  });

test("normalisePath strips index.html and adds a trailing slash", () => {
  expect(normalisePath("/")).toBe("/");
  expect(normalisePath("/index.html")).toBe("/");
  expect(normalisePath("/for/dacara-a7ki")).toBe("/for/dacara-a7ki/");
  expect(normalisePath("/for/dacara-a7ki/")).toBe("/for/dacara-a7ki/");
  expect(normalisePath("/for/dacara-a7ki/index.html")).toBe("/for/dacara-a7ki/");
});

test("visitDay uses the Europe/London calendar date", () => {
  expect(visitDay(Date.parse("2026-11-15T23:30:00Z"))).toBe("2026-11-15");
  expect(visitDay(Date.parse("2026-07-15T23:30:00Z"))).toBe("2026-07-16");
});

test("source prefers the source query, then utm_source/from, then referrer, then direct", () => {
  expect(sourceOf(page("https://mournemade.co.uk/for/dacara-a7ki/?source=email-dacara"))).toBe("email-dacara");
  expect(sourceOf(page("https://mournemade.co.uk/about/?utm_source=newsletter"))).toBe("newsletter");
  expect(sourceOf(page("https://mournemade.co.uk/about/?from=poster"))).toBe("poster");
  expect(sourceOf(page("https://mournemade.co.uk/about/", { Referer: "https://mail.google.com/mail/" }))).toBe("gmail");
  expect(sourceOf(page("https://mournemade.co.uk/about/"))).toBe("direct");
  expect(sourceOf(page("https://mournemade.co.uk/for/dacara-a7ki/?source=email-dacara", { Referer: "https://mournemade.co.uk/" }))).toBe("email-dacara");
  expect(sourceOf(page("https://mournemade.co.uk/about/", { Referer: "https://mournemade.co.uk/request/" }))).toBe("site");
});

test("visitOf counts a browser HTML GET and skips bots, prefetch, HEAD, API and non-HTML", () => {
  const counted = visitOf(page("https://mournemade.co.uk/for/dacara-a7ki/?source=test-counter"), html, now);
  expect(counted).toEqual({ day: "2026-11-15", path: "/for/dacara-a7ki/", source: "test-counter" });

  expect(visitOf(page("https://mournemade.co.uk/for/dacara-a7ki/?source=test-counter", { "Sec-Fetch-Dest": "document" }), html, now)?.source).toBe("test-counter");
  expect(visitOf(page("https://mournemade.co.uk/about/", { "Sec-Fetch-Dest": "empty" }), html, now)).toBeNull();
  expect(visitOf(page("https://mournemade.co.uk/about/", { Purpose: "prefetch" }), html, now)).toBeNull();
  expect(visitOf(page("https://mournemade.co.uk/about/", { "Sec-Purpose": "prefetch" }), html, now)).toBeNull();
  expect(visitOf(page("https://mournemade.co.uk/about/", { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" }), html, now)).toBeNull();
  expect(visitOf(page("https://mournemade.co.uk/about/", { "User-Agent": "Slackbot-LinkExpanding 1.0" }), html, now)).toBeNull();
  expect(visitOf(page("https://mournemade.co.uk/about/", { "User-Agent": "curl/8.5.0" }), html, now)).toBeNull();
  expect(visitOf(new Request("https://mournemade.co.uk/about/", { method: "HEAD", headers: { Accept: "text/html" } }), html, now)).toBeNull();
  expect(visitOf(page("https://mournemade.co.uk/api/request"), html, now)).toBeNull();
  expect(visitOf(page("https://mournemade.co.uk/about/"), new Response("ok", { status: 200, headers: { "Content-Type": "text/plain" } }), now)).toBeNull();
  expect(visitOf(page("https://mournemade.co.uk/missing/"), new Response("no", { status: 404, headers: { "Content-Type": "text/html" } }), now)).toBeNull();
});

function memoryVisits() {
  const rows = new Map<string, number>();
  return {
    rows,
    prepare() {
      return {
        bind(day: string, path: string, source: string) {
          return {
            async run() {
              const key = `${day}\t${path}\t${source}`;
              rows.set(key, (rows.get(key) ?? 0) + 1);
            },
          };
        },
      };
    },
  };
}

test("the Worker records a /for/ visit without delaying the response, and a store failure still returns 200", async () => {
  const visits = memoryVisits();
  const request = page("https://mournemade.co.uk/for/dacara-a7ki/?source=test-counter", { "Sec-Fetch-Dest": "document" });
  const ctx = createExecutionContext();
  const response = await worker.fetch(request, { ...env, VISITS: visits } as typeof env, ctx);
  expect(response.status).toBe(200);
  await waitOnExecutionContext(ctx);
  const entries = [...visits.rows.entries()];
  expect(entries).toHaveLength(1);
  expect(entries[0][0].endsWith("\t/for/dacara-a7ki/\ttest-counter")).toBe(true);
  expect(entries[0][1]).toBe(1);

  const broken = { prepare() { throw new Error("store down"); } };
  const failedCtx = createExecutionContext();
  const failed = await worker.fetch(request, { ...env, VISITS: broken } as typeof env, failedCtx);
  expect(failed.status).toBe(200);
  await waitOnExecutionContext(failedCtx);
});
