"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function SalirPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logout();
    router.replace("/login");
  }, [logout, router]);

  return (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-white/80 text-lg font-medium">Cerrando sesión…</p>
    </div>
  );
}
