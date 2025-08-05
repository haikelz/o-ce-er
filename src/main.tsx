import { Provider } from "jotai";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Layout } from "./components/layout.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <Toaster richColors theme="light" />
      <Layout>
        <App />
      </Layout>
    </Provider>
  </StrictMode>
);
