import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// The opportunities workbench embeds the full scored business dataset, so it
// must never reach the deployed build. It is served on `astro dev` only.
const devOnlyWorkbench = {
  name: "dev-only-workbench",
  hooks: {
    "astro:config:setup": ({ command, injectRoute }) => {
      if (command === "dev") {
        injectRoute({
          pattern: "/opportunities",
          entrypoint: "./src/workbench/opportunities.astro",
        });
      }
    },
  },
};

export default defineConfig({
  site: "https://mourneandmain.co.uk",
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
