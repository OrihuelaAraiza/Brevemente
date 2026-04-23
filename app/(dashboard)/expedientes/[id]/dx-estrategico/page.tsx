import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExpedienteSubHeader } from "@/components/expedientes/ExpedienteSubHeader";

export default async function DxEstrategicoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Expedientes - TX Psicoterapia TBE - DX Estratégico" />
      <ExpedienteSubHeader pacienteId={id} />
      <div className="flex-1 overflow-auto p-5">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-[#1E2A3A] mb-4">Diagnóstico Estratégico</h2>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <label className="font-medium text-gray-700 block mb-1">Diagnóstico operacional (DX.OP)</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
                defaultValue="SPR OF - Síndrome Paranoico Reactivo Obsesivo Fóbico" />
            </div>
            <div>
              <label className="font-medium text-gray-700 block mb-1">Protocolo asignado</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
                defaultValue="Protocolo Ataque de Pánico" />
            </div>
            <div>
              <label className="font-medium text-gray-700 block mb-1">Fase del tratamiento</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
                type="number" defaultValue={1} min={1} max={5} />
            </div>
            <div>
              <label className="font-medium text-gray-700 block mb-1">Notas diagnósticas</label>
              <textarea rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5BC8E8] resize-none"
                defaultValue="Paciente presenta patrón de respuesta de evitación progresiva con marcada hipervigilancia somática..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
