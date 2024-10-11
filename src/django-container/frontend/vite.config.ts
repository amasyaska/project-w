import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@/*": "/src/*",
            "@components": "/src/components",
            "@hooks": "/src/hooks",
            "@pages": "/src/pages",
            "@utils": "/src/utils",
            "@context": "/src/context",
        },
    },
    // https://github.com/laravel/vite-plugin/issues/28
    server: {
        host: "0.0.0.0",
        hmr: {
            host: "localhost",
        },
    },
});
