import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18next from "./i18n.ts";
import { WebsiteProvider } from "@hooks/useWebsiteProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@context/language.context.tsx";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <QueryClientProvider client={client}>
        <WebsiteProvider>
          <HelmetProvider>
            <LanguageProvider>
              <App />
            </LanguageProvider>
          </HelmetProvider>
        </WebsiteProvider>
      </QueryClientProvider>
    </I18nextProvider>
  </React.StrictMode>
);
