"use client";

import dynamic from "next/dynamic";

const PlatformShell = dynamic(() => import("@src/PlatformShell"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      Cargando plataforma…
    </div>
  ),
});

export default function PlatformPage() {
  return <PlatformShell />;
}
