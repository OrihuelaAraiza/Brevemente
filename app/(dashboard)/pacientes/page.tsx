"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { mockPacientes } from "@/lib/mock-data";

function EstadoBadge({ estado }: { estado: string }) {
  const isActivo = estado === "activo";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        isActivo
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-gray-50 text-gray-500 border-gray-200"
      }`}
    >
      {isActivo ? "Activo" : "Archivado"}
    </span>
  );
}

export default function PacientesPage() {
  const router = useRouter();
  const [search, setSearch]   = useState("");
  const [filtro, setFiltro]   = useState<"todos" | "activo" | "archivado">("todos");

  const filtrados = mockPacientes.filter((p) => {
    const texto    = `${p.nombre} ${p.apellido} ${p.folio}`.toLowerCase();
    const coincide = search === "" || texto.includes(search.toLowerCase());
    const estado   = filtro === "todos" || p.estado === filtro;
    return coincide && estado;
  });

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Pacientes" titleClassName="text-4xl" />
      <div className="h-2 bg-[#1E2A3A]" />

      <div className="flex-1 p-5 overflow-auto">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
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
                  className="border-b border-gray-50 hover:bg-sky-50/60 transition-colors"
                >
                  <td className="px-5 py-3.5 font-medium text-[#1E2A3A]">
                    {p.nombre} {p.apellido}
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 font-mono text-xs">{p.folio}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{p.fechaInicio}</td>
                  <td className="px-5 py-3.5 text-gray-600 text-xs max-w-48 truncate">{p.protocolo}</td>
                  <td className="px-5 py-3.5">
                    <EstadoBadge estado={p.estado} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => router.push(`/expedientes/${p.id}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5BC8E8] hover:bg-[#3DAFD0] text-white text-xs font-medium transition-colors shadow-sm"
                    >
                      <ExternalLink size={12} />
                      Ver expediente
                    </button>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-gray-400 text-sm">
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
