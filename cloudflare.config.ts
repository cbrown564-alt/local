import { bindings, defineConfig, exports } from "cf/config";

export default defineConfig(({ mode }) => {
  const production = mode === "production";
  const name = production ? "mourne-made" : "mourne-made-migration-preview";
  return {
    accountId: "e1909c4d4aec0a75a0a34fc15ee35482",
    worker: {
      name,
      entrypoint: "./deploy/cloudflare-worker.ts",
      compatibilityDate: "2026-10-07",
      workersDev: true,
      // Domain cutover follows delivery verification; never attach in preview.
      domains: [],
      env: {
        ASSETS: bindings.assets(),
        REQUEST_RATE: bindings.durableObject({ worker: name, exportName: "RequestRate" }),
        DELIVERY_ENABLED: bindings.text(production ? "true" : "false"),
        ...(production ? {
          GMAIL_USER: bindings.secret(),
          GMAIL_APP_PASSWORD: bindings.secret(),
          REQUEST_TO_EMAIL: bindings.secret(),
          REQUEST_RATE_SALT: bindings.secret(),
        } : {}),
      },
      exports: { RequestRate: exports.durableObject({ storage: "sqlite" }) },
      assets: { runWorkerFirst: ["/api/*"], notFoundHandling: "none", htmlHandling: "force-trailing-slash" },
      observability: { enabled: true, traces: { enabled: true, headSamplingRate: 0.01 } },
    },
  };
});
