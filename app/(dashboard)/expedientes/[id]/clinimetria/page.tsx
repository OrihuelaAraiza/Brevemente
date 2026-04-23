"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  SeccionExpedienteShell, Campo, Seccion,
} from "@/components/expedientes/SeccionExpedienteShell";
import { mockPacientes } from "@/lib/mock-data";

type Aplicacion = { id: string; escala: string; fecha: string; puntaje: string; interpretacion: string };

const escalasDisponibles = [
  "PHQ-9 (Depresión)",
  "GAD-7 (Ansiedad)",
  "Beck BDI-II",
  "Beck BAI",
  "Hamilton (HAM-A)",
  "SCID-5",
  "STAI Estado-Rasgo",
];

export default function ClinimetriaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const paciente = mockPacientes.find((p) => p.id === id);
  if (!paciente) notFound();

  const [apps, setApps] = useState<Aplicacion[]>([
    { id: "a1", escala: "PHQ-9 (Depresión)", fecha: "2025-02-01", puntaje: "14", interpretacion: "Depresión moderada" },
    { id: "a2", escala: "GAD-7 (Ansiedad)",  fecha: "2025-02-01", puntaje: "16", interpretacion: "Ansiedad severa"     },
  ]);

  function add() {
    setApps((a) => [
      ...a,
      { id: `a${Date.now()}`, escala: escalasDisponibles[0], fecha: new Date().toISOString().slice(0, 10), puntaje: "", interpretacion: "" },
    ]);
    toast.success("Aplicación agregada");
  }
  function remove(aid: string) {
    setApps((a) => a.filter((x) => x.id !== aid));
  }
  function update(aid: string, k: keyof Aplicacion, v: string) {
    setApps((a) => a.map((x) => (x.id === aid ? { ...x, [k]: v } : x)));
  }

  return (
    <SeccionExpedienteShell pacienteId={id} titulo="Clinimetría">
      <Seccion titulo="Evaluaciones aplicadas">
        <Campo label="" span={3}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                  <th className="text-left px-3 py-2">Escala</th>
                  <th className="text-left px-3 py-2">Fecha</th>
                  <th className="text-left px-3 py-2">Puntaje</th>
                  <th className="text-left px-3 py-2">Interpretación</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {apps.map((a) => (
                  <tr key={a.id} className="border-b border-gray-50">
                    <td className="px-3 py-2">
                      <select className="w-full px-2 py-1 text-sm border border-gray-200 rounded" value={a.escala} onChange={(e) => update(a.id, "escala", e.target.value)}>
                        {escalasDisponibles.map((n) => <option key={n}>{n}</option>)}
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <input type="date" className="w-full px-2 py-1 text-sm border border-gray-200 rounded" value={a.fecha} onChange={(e) => update(a.id, "fecha", e.target.value)} />
                    </td>
                    <td className="px-3 py-2">
                      <input className="w-full px-2 py-1 text-sm border border-gray-200 rounded" value={a.puntaje} onChange={(e) => update(a.id, "puntaje", e.target.value)} />
                    </td>
                    <td className="px-3 py-2">
                      <input className="w-full px-2 py-1 text-sm border border-gray-200 rounded" value={a.interpretacion} onChange={(e) => update(a.id, "interpretacion", e.target.value)} />
                    </td>
                    <td className="px-3 py-2">
                      <button onClick={() => remove(a.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {apps.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-sm text-gray-400">
                      Sin aplicaciones registradas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <button
            onClick={add}
            className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#5BC8E8] hover:bg-[#3DAFD0] text-white text-xs font-medium"
          >
            <Plus size={12} /> Agregar aplicación
          </button>
        </Campo>
      </Seccion>
    </SeccionExpedienteShell>
  );
}
