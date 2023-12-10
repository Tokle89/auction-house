/* eslint-disable no-undef */
import { resolve } from "path";
import { defineConfig } from "vite";
export default defineConfig({
  server: {
    port: 8080,
    hot: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "auth/login/index.html"),
        register: resolve(__dirname, "auth/register/index.html"),
        profile: resolve(__dirname, "profile/index.html"),
        listing: resolve(__dirname, "listing/index.html"),
      },
    },
  },
});
