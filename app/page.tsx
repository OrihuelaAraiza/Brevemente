"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { homeForRole, useAuth } from "@/lib/auth";

export default function RootPage() {
  const router = useRouter();
  const { user, ready } = useAuth();

  useEffect(() => {
    if (!ready) return;
    router.replace(user ? homeForRole(user.role) : "/login");
  }, [ready, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E2A3A] text-white/70 text-sm">
      Cargando…
    </div>
  );
}
