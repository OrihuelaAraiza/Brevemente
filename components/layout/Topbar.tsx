"use client";

import { Sun, ChevronDown } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-14 bg-[#1E2A3A] flex items-center justify-between px-6 flex-shrink-0 border-b border-white/10">
      <span className="text-white/80 text-sm">
        Hola, <span className="text-white font-medium">prueba@correo.com</span>
      </span>
      <div className="flex items-center gap-4">
        <Sun size={18} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
        <button className="flex items-center gap-2 text-white hover:bg-white/10 rounded-full px-2 py-1 transition-colors">
          <div className="w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center font-bold text-white text-sm select-none">
            P
          </div>
          <ChevronDown size={14} className="text-white/60" />
        </button>
      </div>
    </header>
  );
}
