import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [
    tailwindcss(),
    {
      name: "development-only-csp",
      apply: "serve",
      // Vite development injects styles and uses HMR. Keep the restrictive
      // policy in production builds; remove it only from the dev response.
      transformIndexHtml(html) {
        return html.replace(
          /<meta\s+http-equiv="Content-Security-Policy"[^>]*\/>/,
          "",
        );
      },
    },
  ],
  build: { sourcemap: false },
});
