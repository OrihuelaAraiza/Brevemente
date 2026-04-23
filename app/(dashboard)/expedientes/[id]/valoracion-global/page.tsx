import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExpedienteSubHeader } from "@/components/expedientes/ExpedienteSubHeader";

const areas = {
  yo:    ["Cuerpo", "Estudio", "Trabajo", "Deporte"],
  demas: ["Pareja", "Hijos", "Amigos", "Familia origen", "Familia política"],
  mundo: ["Sociedad", "Situacional"],
};

const sesiones = [
  { numero: 1, fecha: "4 mar 2026", fase: "1" },
  { numero: 2, fecha: "11 mar 2026", fase: "1" },
  { numero: 3, fecha: "18 mar 2026", fase: "2" },
];

function Checkbox({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 text-xs text-[#1E2A3A]">
      <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 accent-[#F5A623]" />
      <span>{label}</span>
    </label>
  );
}

export default async function ValoracionGlobalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Expedientes - TX Psicoterapia TBE - VG" />
      <ExpedienteSubHeader pacienteId={id} />

      <div className="flex-1 overflow-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sesiones.map((s) => (
            <div key={s.numero} className="bg-white rounded-xl shadow-sm p-4 space-y-3">
              <div className="border-b border-gray-100 pb-2">
                <div className="text-sm font-bold text-[#1E2A3A]">Sesión {s.numero}</div>
                <div className="text-xs text-gray-500">Fecha: {s.fecha}</div>
                <div className="text-xs text-gray-500">Fase: {s.fase}</div>
              </div>

              <div>
                <div className="text-xs font-semibold text-[#2A9EC0] mb-1.5">Valoración Global (VG)</div>
                <div className="space-y-2">
                  <div>
                    <div className="text-[11px] font-semibold text-gray-500 uppercase mb-1">YO</div>
                    <div className="grid grid-cols-2 gap-1">
                      {areas.yo.map((a) => <Checkbox key={a} label={a} />)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-gray-500 uppercase mb-1">DEMÁS</div>
                    <div className="grid grid-cols-2 gap-1">
                      {areas.demas.map((a) => <Checkbox key={a} label={a} />)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-gray-500 uppercase mb-1">MUNDO</div>
                    <div className="grid grid-cols-2 gap-1">
                      {areas.mundo.map((a) => <Checkbox key={a} label={a} />)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
