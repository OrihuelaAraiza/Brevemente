"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus, FileText, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  SeccionExpedienteShell, Campo, Input, Textarea, Seccion,
} from "@/components/expedientes/SeccionExpedienteShell";
import { mockPacientes } from "@/lib/mock-data";

type Bitacora = { id: string; fecha: string; sesion: string; supervisor: string; observaciones: string };

export default function SupervisionesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const paciente = mockPacientes.find((p) => p.id === id);
  if (!paciente) notFound();

  const [bitacoras, setBitacoras] = useState<Bitacora[]>([
    { id: "b1", fecha: "2025-03-04", sesion: "Sesión 1", supervisor: "Dra. Begoña Sámano",   observaciones: "Caso requiere monitoreo de conductas de evitación social." },
    { id: "b2", fecha: "2025-03-11", sesion: "Sesión 2", supervisor: "Dr. Roberto Martínez", observaciones: "Avanzar con prescripción paradójica en la próxima sesión." },
  ]);

  const [nuevo, setNuevo] = useState({ fecha: "", sesion: "", supervisor: "", observaciones: "" });

  function agregar() {
    if (!nuevo.fecha || !nuevo.sesion) {
      toast.error("Completa al menos fecha y sesión");
      return;
    }
    setBitacoras((b) => [
      ...b,
      { id: `b${Date.now()}`, ...nuevo },
    ]);
    setNuevo({ fecha: "", sesion: "", supervisor: "", observaciones: "" });
    toast.success("Bitácora agregada");
  }

  return (
    <SeccionExpedienteShell pacienteId={id} titulo="Supervisiones">
      <Seccion titulo="Nueva bitácora de supervisión">
        <Campo label="Fecha">
          <Input type="date" value={nuevo.fecha} onChange={(e) => setNuevo((n) => ({ ...n, fecha: e.target.value }))} />
        </Campo>
        <Campo label="Sesión">
          <Input placeholder="Ej. Sesión 3" value={nuevo.sesion} onChange={(e) => setNuevo((n) => ({ ...n, sesion: e.target.value }))} />
        </Campo>
        <Campo label="Supervisor">
          <Input value={nuevo.supervisor} onChange={(e) => setNuevo((n) => ({ ...n, supervisor: e.target.value }))} />
        </Campo>
        <Campo label="Observaciones" span={3}>
          <Textarea
            value={nuevo.observaciones}
            onChange={(e) => setNuevo((n) => ({ ...n, observaciones: e.target.value }))}
            placeholder="Datos del caso, SPR, TS, recomendaciones del supervisor…"
          />
        </Campo>
        <Campo label="" span={3}>
          <div className="flex items-center gap-2">
            <button
              onClick={agregar}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#5BC8E8] hover:bg-[#3DAFD0] text-white text-xs font-medium"
            >
              <Plus size={12} /> Guardar bitácora
            </button>
            <Link
              href="/bitacora"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium"
            >
              Ir al módulo de bitácoras
            </Link>
          </div>
        </Campo>
      </Seccion>

      <Seccion titulo="Historial de supervisiones">
        <Campo label="" span={3}>
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
            {bitacoras.map((b) => (
              <div key={b.id} className="p-3 flex items-start gap-3">
                <FileText size={16} className="text-gray-400 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1E2A3A]">
                    {b.sesion} · {b.fecha}
                  </p>
                  <p className="text-xs text-gray-500">Supervisor: {b.supervisor}</p>
                  <p className="text-sm text-gray-700 mt-1">{b.observaciones}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => toast.success("Descargado (demo)")} className="text-gray-400 hover:text-[#1E2A3A] p-1">
                    <Download size={14} />
                  </button>
                  <button onClick={() => setBitacoras((list) => list.filter((x) => x.id !== b.id))} className="text-gray-400 hover:text-red-500 p-1">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            {bitacoras.length === 0 && (
              <div className="text-center py-6 text-sm text-gray-400">Sin supervisiones registradas.</div>
            )}
          </div>
        </Campo>
      </Seccion>
    </SeccionExpedienteShell>
  );
}
