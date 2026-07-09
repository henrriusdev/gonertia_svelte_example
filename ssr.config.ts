import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import laravel from "laravel-vite-plugin";
import { sveltePreprocess } from "svelte-preprocess";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/js/app.ts", "resources/css/app.css"],
      ssr: "resources/js/ssr.ts", // Enable SSR
      publicDirectory: "public",
      buildDirectory: "bootstrap",
      refresh: true,
    }),
    svelte({preprocess: sveltePreprocess({typescript: true})}),
  ],
  build: {
    ssr: true, // Enable SSR
    outDir: "bootstrap",
    rolldownOptions: {
      input: "resources/js/ssr.ts",
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
