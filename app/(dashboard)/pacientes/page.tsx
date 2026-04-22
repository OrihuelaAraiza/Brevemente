"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { mockPacientes } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function PacientesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState<"todos" | "activo" | "archivado">("todos");

  const filtrados = mockPacientes.filter((p) => {
    const texto = `${p.nombre} ${p.apellido} ${p.folio}`.toLowerCase();
    const coincide = search === "" || texto.includes(search.toLowerCase());
    const estado   = filtro === "todos" || p.estado === filtro;
    return coincide && estado;
  });

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Pacientes" />

      <div className="flex-1 p-5 min-h-0 overflow-auto">
        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre o folio..."
              className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
            />
          </div>
          <div className="flex gap-1">
            {(["todos", "activo", "archivado"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  filtro === f
                    ? "bg-[#1E2A3A] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f === "todos" ? "Todos" : f === "activo" ? "Activos" : "Archivados"}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Paciente</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Folio</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Fecha inicio</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Protocolo</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtrados.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => router.push(`/expedientes/${p.id}`)}
                  className="border-b border-gray-50 hover:bg-blue-50/50 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-[#1E2A3A]">
                    {p.nombre} {p.apellido}
                  </td>
                  <td className="px-5 py-3 text-gray-500 font-mono text-xs">{p.folio}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{p.fechaInicio}</td>
                  <td className="px-5 py-3 text-gray-600 text-xs">{p.protocolo}</td>
                  <td className="px-5 py-3">
                    <Badge
                      className={`text-xs ${
                        p.estado === "activo"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-500 border-gray-200"
                      }`}
                      variant="outline"
                    >
                      {p.estado}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className="text-xs text-[#2563EB] underline underline-offset-2">ver expediente →</span>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-gray-400 text-sm">
                    No se encontraron pacientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
