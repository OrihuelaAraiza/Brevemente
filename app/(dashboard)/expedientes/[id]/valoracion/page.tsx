import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExpedienteSubHeader } from "@/components/expedientes/ExpedienteSubHeader";
import { ValoracionCambio } from "@/components/expedientes/ValoracionCambio";

export default async function ValoracionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Expedientes - TX Psicoterapia TBE - VC" />
      <ExpedienteSubHeader pacienteId={id} />
      <div className="flex-1 overflow-auto p-5">
        <ValoracionCambio />
      </div>
    </div>
  );
}
