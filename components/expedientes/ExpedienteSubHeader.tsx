"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { mockPacientes } from "@/lib/mock-data";

interface ExpedienteSubHeaderProps {
  pacienteId: string;
  controls?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function ExpedienteSubHeader({ pacienteId, controls, breadcrumbs }: ExpedienteSubHeaderProps) {
  const paciente = mockPacientes.find((p) => p.id === pacienteId) ?? mockPacientes[0];

  return (
    <div className="bg-white border-b border-gray-200 px-5 py-3 flex flex-col gap-2">
      <div className="flex items-center gap-4 flex-wrap">
        <Link
          href={`/expedientes/${pacienteId}`}
          className="font-bold text-[#1E2A3A] hover:underline"
        >
          {paciente.nombre} {paciente.apellido}
        </Link>
        <span className="text-xs text-gray-500">Folio {paciente.folio}</span>
        <span className="text-xs text-gray-500">Fecha inicio: {paciente.fechaInicio}</span>
      </div>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 flex-wrap text-xs text-gray-500">
          <Link href="/expedientes" className="hover:underline">Expedientes</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <Link href={`/expedientes/${pacienteId}`} className="hover:underline">
            {paciente.nombre} {paciente.apellido}
          </Link>
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight size={12} className="text-gray-300" />
              {b.href ? (
                <Link href={b.href} className="hover:underline">{b.label}</Link>
              ) : (
                <span className="text-[#1E2A3A] font-medium">{b.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {controls && <div className="flex items-center gap-1 flex-wrap">{controls}</div>}
    </div>
  );
}
