"use client";

import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./components/UI/Toast";
import AppErrorBoundary from "./components/AppErrorBoundary";
import { initMsal } from "./services/msal";

import "./styles/theme.css";
import "./styles/global.css";

export default function PlatformShell() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await initMsal();
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[MSAL] init omitido:", err?.message || err);
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "system-ui, sans-serif",
          color: "#1E2A3A",
        }}
      >
        Cargando plataforma…
      </div>
    );
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <AppErrorBoundary>
          <BrowserRouter basename="/platform">
            <AppRoutes />
          </BrowserRouter>
        </AppErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  );
}
