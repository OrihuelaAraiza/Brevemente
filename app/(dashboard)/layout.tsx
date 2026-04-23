"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { homeForRole, useAuth } from "@/lib/auth";
import { canAccess } from "@/lib/nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, ready } = useAuth();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      const isLogout = pathname === "/salir";
      const next = encodeURIComponent(pathname);
      router.replace(isLogout ? "/login" : `/login?next=${next}`);
      return;
    }
    if (!canAccess(user.role, pathname)) {
      router.replace(homeForRole(user.role));
    }
  }, [ready, user, pathname, router]);

  if (!ready || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1E2A3A] text-white/70 text-sm">
        Cargando…
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Topbar />
        <main className="flex-1 bg-[#5BC8E8] overflow-auto flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
