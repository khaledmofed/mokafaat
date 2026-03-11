import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  const apiBaseUrl = env.VITE_API_BASE_URL || "https://mokafat.ivadso.com";

  return {
    resolve: {
      alias: {
        "@*": path.resolve(__dirname, "./src/*"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@context": path.resolve(__dirname, "./src/context"),
        "@business-registration": path.resolve(
          __dirname,
          "./src/business-registration"
        ),
        "@components": path.resolve(__dirname, "./src/components"),
        "@data": path.resolve(__dirname, "./src/data"),
        "@entities": path.resolve(__dirname, "./src/entities"),
        "@constants": path.resolve(__dirname, "./src/constants"),
        "@enums": path.resolve(__dirname, "./src/enums"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@network": path.resolve(__dirname, "./src/network"),
        "@interfaces": path.resolve(__dirname, "./src/interfaces"),
        "@locale": path.resolve(__dirname, "./src/locale"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@types": path.resolve(__dirname, "./src/types"),
        "@validations": path.resolve(__dirname, "./src/validations"),
        "@stores": path.resolve(__dirname, "./src/stores"),
        "@config": path.resolve(__dirname, "./src/config"),
        "@utils": path.resolve(__dirname, "./src/utils"),
      },
    },
    plugins: [react()],
    server: {
      // Avoid CORS in dev by proxying API calls through Vite (same-origin: localhost)
      proxy: {
        "/api": {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    define: {
      // Define environment variables
      "process.env.VITE_API_BASE_URL": JSON.stringify(
        env.VITE_API_BASE_URL || "https://api.staging.mukafaat.com"
      ),
    },
  };
});
