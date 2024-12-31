import { createInertiaApp } from '@inertiajs/svelte'
import createServer from '@inertiajs/svelte/server'

createServer(page =>
    createInertiaApp({
        page,
        resolve: name => {
          // @ts-expect-error
          const pages = import.meta.glob("./Pages/**/*.svelte", {
            eager: true,
          });
            return pages[`./Pages/${name}.svelte`];
        },
    }),
)