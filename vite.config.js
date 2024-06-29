import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import {svelte} from "@sveltejs/vite-plugin-svelte"

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            publicDirectory: 'public',
            buildDirectory: 'build',
            refresh: true,
        }),
        svelte({
            compilerOptions: {
                hydratable: true,
            },
        }),
    ],
    build: {
        manifest: true, // Generar el manifest.json
        outDir: 'public/build',
        rollupOptions: {
            input: 'resources/js/app.js',
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]',
                manualChunks: undefined, // Desactiva el hashing de nombres
            },
        },
    },
    server: {
        hmr: {
            host: 'localhost',
        },
    },
});
