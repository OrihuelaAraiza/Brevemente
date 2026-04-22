import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExpedienteSubHeader } from "@/components/expedientes/ExpedienteSubHeader";
import { ValoracionCambio } from "@/components/expedientes/ValoracionCambio";

export default function ValoracionPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Expedientes - TX Psicoterapia TBE - VC" />
      <ExpedienteSubHeader pacienteId={params.id} />
      <div className="flex-1 overflow-auto p-5">
        <ValoracionCambio />
      </div>
    </div>
  );
}
