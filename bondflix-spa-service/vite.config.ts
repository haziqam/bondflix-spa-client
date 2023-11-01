import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   host: true,
// })

// https://stackoverflow.com/questions/74229258/vitereactdocker-not-working-in-container
export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 5173,
    },
});
