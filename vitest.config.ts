import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [cloudflareTest({
    main: "./deploy/cloudflare-worker.ts",
    miniflare: {
      compatibilityDate: "2026-10-07",
      bindings: { DELIVERY_ENABLED: "false" },
      durableObjects: { REQUEST_RATE: { className: "RequestRate", useSQLite: true } },
      serviceBindings: {
        ASSETS: (request) => {
          const path = new URL(request.url).pathname;
          if (path.startsWith("/api/")) return new Response("Not found", { status: 404 });
          return new Response("<!doctype html><title>ok</title>", { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
        },
      },
    },
  })],
  test: { include: ["deploy-tests/**/*.test.ts"] },
});
