import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExpedienteSubHeader } from "@/components/expedientes/ExpedienteSubHeader";

export default async function ReestructuracionesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Expedientes - TX Psicoterapia TBE - Reestructuraciones" />
      <ExpedienteSubHeader
        pacienteId={id}
        breadcrumbs={[
          { label: "TX Psicoterapia TBE", href: `/expedientes/${id}/tx-psicoterapia` },
          { label: "Reestructuraciones" },
        ]}
      />
      <div className="flex-1 overflow-auto p-5">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-[#1E2A3A] mb-4">Reestructuraciones cognitivas</h2>
          <p className="text-sm text-gray-400 italic">No hay reestructuraciones registradas aún.</p>
        </div>
      </div>
    </div>
  );
}
