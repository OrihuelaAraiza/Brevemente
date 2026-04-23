"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { mockCIE11 } from "@/lib/mock-data";

function CIE11() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const [search, setSearch] = useState(initialQuery);

  const q = search.toLowerCase();
  const filtered = mockCIE11.filter(
    (c) => c.nombre.toLowerCase().includes(q) || c.codigo.toLowerCase().includes(q)
  );

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Inicio - Biblioteca digital - CIE-11" />

      <div className="flex-1 overflow-auto p-5 min-h-0">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center gap-3">
          <button
            onClick={() => router.push("/biblioteca")}
            className="text-gray-500 hover:text-[#1E2A3A] flex items-center gap-1 text-xs"
          >
            <ArrowLeft size={14} /> Biblioteca
          </button>
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre o código (ej. 6B01, pánico)"
              className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
            />
          </div>
          <span className="text-xs text-gray-500">{filtered.length} resultados</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-28">Código</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Trastorno</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.codigo} className="border-b border-gray-50 hover:bg-blue-50/40 transition-colors">
                  <td className="px-5 py-3 text-[#2A9EC0] font-mono font-semibold">{c.codigo}</td>
                  <td className="px-5 py-3 text-[#1E2A3A]">{c.nombre}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-5 py-8 text-center text-gray-400 text-sm">
                    Sin coincidencias. Intenta con otro término.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-white/70">
          * Extracto orientativo. El CIE-11 completo está disponible en la fuente oficial de la OMS.
        </p>
      </div>
    </div>
  );
}

export default function CIE11Page() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white/70">Cargando…</div>}>
      <CIE11 />
    </Suspense>
  );
}
