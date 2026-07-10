import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import {sveltePreprocess} from "svelte-preprocess";
export default defineConfig({
  plugins: [
    laravel({
      input: "resources/js/app.ts",
      publicDirectory: "public",
      buildDirectory: "build",
      refresh: true,
    }),
    svelte({
      preprocess: [sveltePreprocess({typescript: true})],
    }),
  ],
  build: {
    manifest: true, // Generate manifest.json file
    outDir: "public/build",
    emptyOutDir: true,
    rolldownOptions: {
      input: "resources/js/app.ts",
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  server: {
    hmr: {
      host: "localhost",
    },
    host: "localhost",
    port: 3200,
  },
});
