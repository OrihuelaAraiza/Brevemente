import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExpedienteSubHeader } from "@/components/expedientes/ExpedienteSubHeader";
import { mockPacientes } from "@/lib/mock-data";

const tbeSecciones = [
  { label: "DX. Estratégico",       href: "dx-estrategico"    },
  { label: "Sesiones",              href: "sesiones"          },
  { label: "Valoración del Cambio", href: "valoracion"        },
  { label: "Valoración Global",     href: "valoracion-global" },
  { label: "Reestructuraciones",    href: "reestructuraciones"},
  { label: "Gráfica VC · VG",       href: "grafica"           },
];

export default async function TxPsicoterapiaHubPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paciente = mockPacientes.find((p) => p.id === id);
  if (!paciente) notFound();

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Expedientes - TX Psicoterapia TBE" />
      <ExpedienteSubHeader pacienteId={id} />

      <div className="flex-1 bg-[#5BC8E8] p-8 overflow-auto">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <Link
            href={`/expedientes/${id}`}
            className="self-start text-white/90 text-sm hover:underline"
          >
            ← Volver al expediente
          </Link>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {tbeSecciones.map((s) => (
              <Link
                key={s.href}
                href={`/expedientes/${id}/${s.href}`}
                className="bg-white/20 hover:bg-white/30 text-white font-semibold text-center py-8 px-6 rounded-xl shadow-sm ring-1 ring-white/40 backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {s.label}
              </Link>
            ))}
          </div>

          <Link
            href={`/expedientes/${id}/sesiones?modo=ia&crear=1`}
            className="bg-[#E74C3C] hover:bg-[#C0392B] text-white font-bold py-4 px-12 rounded-xl text-lg shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Crear nueva sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
