"use client";

import { mockPacientes } from "@/lib/mock-data";

interface ExpedienteSubHeaderProps {
  pacienteId: string;
  controls?: React.ReactNode;
}

export function ExpedienteSubHeader({ pacienteId, controls }: ExpedienteSubHeaderProps) {
  const paciente = mockPacientes.find((p) => p.id === pacienteId) ?? mockPacientes[0];

  return (
    <div className="bg-white border-b border-gray-200 px-5 py-3 flex flex-col gap-2">
      <div className="flex items-center gap-4 flex-wrap">
        <span className="font-bold text-[#1E2A3A]">
          {paciente.nombre} {paciente.apellido}
        </span>
        <span className="text-xs text-gray-500">Folio {paciente.folio}</span>
        <span className="text-xs text-gray-500">Fecha inicio: {paciente.fechaInicio}</span>
      </div>
      {controls && <div className="flex items-center gap-1 flex-wrap">{controls}</div>}
    </div>
  );
}
