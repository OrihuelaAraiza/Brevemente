"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { mockCitasHoy } from "@/lib/mock-data";

export function PacientesHoy() {
  return (
    <div className="bg-white rounded-xl shadow-sm flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
        <Users size={18} className="text-[#1E2A3A]" />
        <h2 className="font-bold text-[#1E2A3A] text-sm">
          Pacientes para Hoy:{" "}
          <span className="text-[#5BC8E8]">{mockCitasHoy.length}</span>
        </h2>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 py-2">
        {mockCitasHoy.map((cita) => (
          <div
            key={cita.id}
            className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs text-gray-400 font-mono w-16 flex-shrink-0">
                {cita.hora}
              </span>
              <span className="text-sm text-[#1E2A3A] font-medium truncate">
                {cita.nombre}
              </span>
            </div>
            <Link
              href={`/expedientes/${cita.pacienteId}/sesiones`}
              className="text-xs text-[#2563EB] underline underline-offset-2 hover:text-[#1D4ED8] flex-shrink-0 ml-2 whitespace-nowrap"
            >
              ver expediente →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
