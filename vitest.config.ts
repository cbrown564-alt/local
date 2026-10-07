import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [cloudflareTest({
    main: "./deploy/cloudflare-worker.ts",
    miniflare: {
      compatibilityDate: "2026-10-07",
      bindings: { DELIVERY_ENABLED: "false" },
      durableObjects: { REQUEST_RATE: { className: "RequestRate", useSQLite: true } },
      serviceBindings: { ASSETS: () => new Response("Not found", { status: 404 }) },
    },
  })],
  test: { include: ["deploy-tests/**/*.test.ts"] },
});
