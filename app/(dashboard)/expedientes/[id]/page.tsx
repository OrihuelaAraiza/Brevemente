import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExpedienteSubHeader } from "@/components/expedientes/ExpedienteSubHeader";
import { mockPacientes } from "@/lib/mock-data";

const secciones = [
  { label: "Datos Generales",           href: "datos-generales",        tone: "blue"   as const },
  { label: "Historia Clínica",          href: "historia-clinica",       tone: "blue"   as const },
  { label: "Ficha de identificación",   href: "ficha-identificacion",   tone: "blue"   as const },
  { label: "TX Psiquiátrico",           href: "tx-psiquiatrico",        tone: "blue"   as const },
  { label: "TX Psicoterapia TBE",       href: "tx-psicoterapia",        tone: "yellow" as const },
  { label: "Clinimetría",               href: "clinimetria",            tone: "blue"   as const },
  { label: "Reportes / Constancias",    href: "reportes-constancias",   tone: "blue"   as const },
  { label: "Supervisiones",             href: "supervisiones",          tone: "blue"   as const },
  { label: "Otros documentos",          href: "otros-documentos",       tone: "blue"   as const },
  { label: "Privacidad y Normatividad", href: "privacidad",             tone: "blue"   as const },
  { label: "Cierre del expediente",     href: "cierre",                 tone: "blue"   as const },
];

export default async function ExpedientePacientePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paciente = mockPacientes.find((p) => p.id === id);
  if (!paciente) notFound();

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Expedientes" />
      <ExpedienteSubHeader pacienteId={id} />

      <div className="flex-1 bg-[#5BC8E8] p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {secciones.map((s) => (
              <Link
                key={s.href}
                href={`/expedientes/${id}/${s.href}`}
                className={`text-center py-8 px-6 rounded-xl shadow-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  s.tone === "yellow"
                    ? "bg-[#F5A623] hover:bg-[#E8941A] text-white"
                    : "bg-white/20 hover:bg-white/30 text-white ring-1 ring-white/40 backdrop-blur-sm"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
