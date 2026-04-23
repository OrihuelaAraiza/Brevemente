"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, FolderSearch, MoreHorizontal, Search, Shield } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function BrifiIconSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="bG3hub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="40%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </radialGradient>
      </defs>
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <ellipse key={i} cx="12" cy="12" rx="3" ry="6.5" fill="url(#bG3hub)" fillOpacity="0.75"
          transform={`rotate(${deg} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

const secciones = [
  { href: "/biblioteca/cie11",      titulo: "CIE-11",         descripcion: "Clasificación internacional de enfermedades",  icon: Shield      },
  { href: "/biblioteca/dsm5tr",     titulo: "DSM-5TR",        descripcion: "Manual diagnóstico de trastornos mentales",    icon: BookOpen    },
  { href: "/biblioteca/manuales",   titulo: "Manuales TBE",   descripcion: "Fundamentos y conceptos esenciales",           icon: FolderSearch },
  { href: "/biblioteca/protocolos", titulo: "Protocolos TBE", descripcion: "32 protocolos clínicos del modelo",            icon: Search      },
];

export default function BibliotecaHubPage() {
  const router = useRouter();
  const [queries, setQueries] = useState<Record<string, string>>({});

  function handleSearch(e: React.FormEvent<HTMLFormElement>, href: string) {
    e.preventDefault();
    router.push(`${href}?q=${encodeURIComponent(queries[href] ?? "")}`);
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Inicio - Biblioteca digital" />

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-100 px-5 py-2.5 flex items-center gap-3">
        <div className="flex-1" />
        <button
          onClick={() => router.push("/brifi")}
          className="flex items-center gap-1 px-2 py-1 rounded bg-purple-50 hover:bg-purple-100 transition-colors"
          title="Consultar con Brifi"
        >
          <BrifiIconSmall />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger className="p-1.5 text-gray-400 hover:text-gray-600 bg-transparent border-0 cursor-pointer">
            <MoreHorizontal size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/expedientes")}>→ Expediente nuevo</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/expedientes")}>→ Expediente archivado</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/reportes")}>→ Reportes y Constancias</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/bitacora")}>→ Bitácora supervisión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 overflow-auto p-5 min-h-0 space-y-4">
        {secciones.map((s) => {
          const Icon = s.icon;
          const q = queries[s.href] ?? "";
          return (
            <div key={s.href} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
              <Link
                href={s.href}
                className="flex items-center gap-3 min-w-0 flex-shrink-0 w-64 text-[#1E2A3A] hover:text-[#2A9EC0] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#5BC8E8]/15 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-[#2A9EC0]" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">{s.titulo}</div>
                  <div className="text-xs text-gray-500 truncate">{s.descripcion}</div>
                </div>
              </Link>

              <form
                className="flex-1 relative"
                onSubmit={(e) => handleSearch(e, s.href)}
              >
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={q}
                  onChange={(e) => setQueries((prev) => ({ ...prev, [s.href]: e.target.value }))}
                  placeholder={`Buscar en ${s.titulo}`}
                  className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
                />
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
