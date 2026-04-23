"use client";

import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Sun, UserCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLE_LABEL, useAuth } from "@/lib/auth";

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "?";
}

export function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <header className="h-14 bg-[#1E2A3A] flex items-center justify-between px-6 flex-shrink-0 border-b border-white/10">
      <span className="text-white/80 text-sm">
        Hola,{" "}
        <span className="text-white font-medium">
          {user?.name ?? user?.email ?? "invitado"}
        </span>
        {user && (
          <span className="ml-2 text-xs rounded-full bg-white/10 text-white/70 px-2 py-0.5">
            {ROLE_LABEL[user.role]}
          </span>
        )}
      </span>
      <div className="flex items-center gap-4">
        <Sun size={18} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 text-white hover:bg-white/10 rounded-full px-2 py-1 transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center font-bold text-white text-sm select-none">
              {user ? initialsOf(user.name) : "?"}
            </div>
            <ChevronDown size={14} className="text-white/60" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {user && (
              <>
                <div className="px-2 py-1.5 flex flex-col">
                  <span className="text-sm font-medium text-popover-foreground">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem onClick={() => router.push("/cuenta")}>
              <UserCircle2 className="mr-2" size={16} /> Mi cuenta
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2" size={16} /> Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
