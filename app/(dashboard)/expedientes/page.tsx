"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { mockPacientes } from "@/lib/mock-data";

type OrdenKey = "nombre" | "fechaElaboracion" | "tipoTerapia" | "dx";

const ordenarOpciones: { key: OrdenKey; label: string }[] = [
  { key: "nombre",            label: "Nombre"             },
  { key: "fechaElaboracion",  label: "Fecha elaboración"  },
  { key: "tipoTerapia",       label: "Tipo de terapia"    },
  { key: "dx",                label: "Diagnóstico"        },
];

const tipoFiltros = ["Todos", "Individual", "Pareja", "Familia", "Infantil"] as const;
type TipoFiltro = (typeof tipoFiltros)[number];

export default function ExpedientesBusquedaPage() {
  const router = useRouter();
  const [query,   setQuery]   = useState("");
  const [orden,   setOrden]   = useState<OrdenKey>("nombre");
  const [tipo,    setTipo]    = useState<TipoFiltro>("Todos");
  const [abiertoOrden, setAbiertoOrden] = useState(false);

  const resultados = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = mockPacientes.filter((p) => {
      const hayQuery =
        q === "" ||
        `${p.nombre} ${p.apellido}`.toLowerCase().includes(q) ||
        p.folio.toLowerCase().includes(q) ||
        p.curp.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q);
      const hayTipo = tipo === "Todos" || p.tipoTerapia === tipo;
      return hayQuery && hayTipo;
    });

    return [...base].sort((a, b) => {
      switch (orden) {
        case "nombre":           return `${a.nombre} ${a.apellido}`.localeCompare(`${b.nombre} ${b.apellido}`);
        case "fechaElaboracion": return b.fechaElaboracion.localeCompare(a.fechaElaboracion);
        case "tipoTerapia":      return a.tipoTerapia.localeCompare(b.tipoTerapia);
        case "dx":               return a.dx.localeCompare(b.dx);
      }
    });
  }, [query, orden, tipo]);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Expedientes" />

      <div className="flex-1 bg-[#5BC8E8] p-5 overflow-auto">
        {/* Toolbar */}
        <div className="bg-white/95 backdrop-blur rounded-xl shadow-sm p-4 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <Search size={16} className="text-gray-400" />
            <span className="text-sm font-semibold text-[#1E2A3A]">Buscar expediente</span>
          </div>

          <div className="relative flex-1 md:max-w-xl">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nombre, folio, CURP o email..."
              className="w-full pl-3 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoFiltro)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
            >
              {tipoFiltros.map((t) => (
                <option key={t} value={t}>Terapia: {t}</option>
              ))}
            </select>

            <div className="relative">
              <button
                onClick={() => setAbiertoOrden((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50"
              >
                <SlidersHorizontal size={14} />
                Ordenar por
              </button>
              {abiertoOrden && (
                <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                  {ordenarOpciones.map((op) => (
                    <button
                      key={op.key}
                      onClick={() => { setOrden(op.key); setAbiertoOrden(false); }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-sky-50 ${
                        orden === op.key ? "bg-sky-50 text-[#1E2A3A] font-semibold" : "text-gray-600"
                      }`}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-white/90 text-xs mt-3 mb-2 font-medium">
          {resultados.length} expediente{resultados.length === 1 ? "" : "s"} encontrado{resultados.length === 1 ? "" : "s"}
        </p>

        {/* Results table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre Paciente</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Folio</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Fecha elaboración</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tipo terapia</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">DX</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {resultados.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => router.push(`/expedientes/${p.id}`)}
                  className="border-b border-gray-50 hover:bg-sky-50/60 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3.5 font-semibold text-[#F5A623]">
                    {p.nombre} {p.apellido}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 font-mono text-xs">{p.folio}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{p.fechaElaboracion}</td>
                  <td className="px-5 py-3.5 text-gray-600 text-xs">Terapia {p.tipoTerapia}</td>
                  <td className="px-5 py-3.5 text-gray-700 text-xs">{p.dx}</td>
                  <td className="px-5 py-3.5 text-right">
                    <ChevronRight size={16} className="text-gray-400 inline" />
                  </td>
                </tr>
              ))}
              {resultados.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center text-gray-400 text-sm">
                    No se encontraron expedientes con esos criterios.
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
