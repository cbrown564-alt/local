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
      }
    },
  },
};

export default defineConfig({
  site: "https://mournemade.co.uk",
  trailingSlash: "always",
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
