import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Workbench routes contain internal data or print tooling, so they must never
// reach the deployed build. They are served on `astro dev` only.
const devOnlyWorkbench = {
  name: "dev-only-workbench",
  hooks: {
    "astro:config:setup": ({ command, injectRoute }) => {
      if (command === "dev") {
        injectRoute({
          pattern: "/opportunities",
          entrypoint: "./src/workbench/opportunities.astro",
        });
        injectRoute({
          pattern: "/workbench/print/enniskeen-onesheet",
          entrypoint: "./src/workbench/print/enniskeen-onesheet.astro",
        });
        injectRoute({
          pattern: "/workbench/print/bucks-head-onesheet",
          entrypoint: "./src/workbench/print/bucks-head-onesheet.astro",
        });
        injectRoute({
          pattern: "/workbench/print/scopers-onesheet",
          entrypoint: "./src/workbench/print/scopers-onesheet.astro",
        });
        injectRoute({
          pattern: "/workbench/print/cupla-onesheet",
          entrypoint: "./src/workbench/print/cupla-onesheet.astro",
        });
        injectRoute({
          pattern: "/workbench/og/studio",
          entrypoint: "./src/workbench/og/studio.astro",
        });
        injectRoute({
          pattern: "/workbench/og/home",
          entrypoint: "./src/workbench/og/home.astro",
        });
        injectRoute({
          pattern: "/workbench/og/request",
          entrypoint: "./src/workbench/og/request.astro",
        });
        injectRoute({
          pattern: "/workbench/og/transformations",
          entrypoint: "./src/workbench/og/transformations.astro",
        });
        injectRoute({
          pattern: "/workbench/og/[slug]",
          entrypoint: "./src/workbench/og/[slug].astro",
        });
      }
    },
  },
};

export default defineConfig({
  site: "https://mournemade.co.uk",
  trailingSlash: "always",
  redirects: {
    "/prototypes/what-we-look-for/": "/where-it-fails/",
    "/what-we-look-for/": "/where-it-fails/",
    "/how-a-site-goes-together/": "/how-its-made/",
    "/five-shapes/": "/why-its-yours/",
  },
  integrations: [
    devOnlyWorkbench,
    sitemap({
      filter: (page) =>
        !page.includes("/concepts/") &&
        !page.includes("/prototypes/") &&
        !page.includes("/opportunities/"),
    }),
  ],
});
