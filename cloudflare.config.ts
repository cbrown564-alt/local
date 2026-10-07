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
      // The public domain is attached only after delivery verification.
      domains: production ? ["mournemade.co.uk", "www.mournemade.co.uk"] : [],
      env: {
        ASSETS: bindings.assets(),
        REQUEST_RATE: bindings.durableObject({ worker: name, exportName: "RequestRate" }),
        DELIVERY_ENABLED: bindings.text(production ? "true" : "false"),
        ...(production ? {
          MAIL_FROM: bindings.text("hello@mournemade.co.uk"),
          REQUEST_TO_EMAIL: bindings.text("cbrown564@gmail.com"),
          EMAIL: bindings.sendEmail({
            destinationAddress: "cbrown564@gmail.com",
            allowedSenderAddresses: ["hello@mournemade.co.uk"],
          }),
          REQUEST_RATE_SALT: bindings.secret(),
        } : {}),
      },
      exports: { RequestRate: exports.durableObject({ storage: "sqlite" }) },
      assets: { runWorkerFirst: ["/api/*"], notFoundHandling: "none", htmlHandling: "force-trailing-slash" },
      observability: { enabled: true, traces: { enabled: true, headSamplingRate: 0.01 } },
    },
  };
});
