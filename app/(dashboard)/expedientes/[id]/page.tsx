import Link from "next/link";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExpedienteSubHeader } from "@/components/expedientes/ExpedienteSubHeader";
import { mockPacientes } from "@/lib/mock-data";

const secciones = [
  { label: "DX. Estratégico",       href: "dx-estrategico" },
  { label: "Sesiones",              href: "sesiones"        },
  { label: "Valoración del Cambio", href: "valoracion"      },
  { label: "Reestructuraciones",    href: "reestructuraciones" },
];

export default function ExpedienteSeleccionPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Expedientes - TX Psicoterapia TBE" />
      <ExpedienteSubHeader pacienteId={params.id} />

      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
        {/* 2x2 grid of section buttons */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
          {secciones.map((s) => (
            <Link
              key={s.href}
              href={`/expedientes/${params.id}/${s.href}`}
              className="bg-[#5BC8E8] hover:bg-[#3DAFD0] text-white font-semibold text-center py-8 px-6 rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {s.label}
            </Link>
          ))}
        </div>

        {/* Crear nueva sesión button */}
        <Link
          href={`/expedientes/${params.id}/sesiones`}
          className="bg-[#E74C3C] hover:bg-[#C0392B] text-white font-bold py-4 px-12 rounded-xl text-lg shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Crear nueva sesión
        </Link>
      </div>
    </div>
  );
}
