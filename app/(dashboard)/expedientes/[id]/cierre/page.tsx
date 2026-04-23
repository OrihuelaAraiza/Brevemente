"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { AlertTriangle, Archive } from "lucide-react";
import { toast } from "sonner";
import {
  SeccionExpedienteShell, Seccion, Campo, Input, Select, Textarea,
} from "@/components/expedientes/SeccionExpedienteShell";
import { mockPacientes } from "@/lib/mock-data";

const motivos = [
  "Alta terapéutica (objetivos alcanzados)",
  "Abandono del tratamiento",
  "Derivación a otro profesional",
  "Mudanza / cambio de ciudad",
  "Cambio de modalidad",
  "Otro",
];

const resoluciones = [
  { key: "resuelto",   label: "Caso resuelto"    },
  { key: "mejorado",   label: "Caso mejorado"    },
  { key: "invariable", label: "Caso invariable"  },
  { key: "dropout",    label: "Drop out"         },
];

export default function CierrePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const paciente = mockPacientes.find((p) => p.id === id);
  if (!paciente) notFound();

  const [form, setForm] = useState({
    motivo: motivos[0],
    resolucion: "resuelto",
    fechaCierre: new Date().toISOString().slice(0, 10),
    sesionesTotales: "12",
    observacionFinal: "La paciente logra mantener rutinas sin episodios de pánico durante las últimas 6 semanas.",
    recomendaciones: "Seguimiento opcional cada 3 meses durante el primer año.",
  });

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function cerrar() {
    toast.success("Expediente cerrado (demo)", {
      description: "Se enviaría al archivo histórico y se generaría constancia de cierre.",
    });
    setTimeout(() => router.push("/expedientes"), 1200);
  }

  return (
    <SeccionExpedienteShell pacienteId={id} titulo="Cierre del expediente">
      <div className="mb-4 flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <AlertTriangle size={18} className="text-amber-600 mt-0.5" />
        <div className="text-xs text-amber-900">
          Cerrar un expediente lo mueve al archivo histórico. Los datos permanecen consultables pero no editables.
        </div>
      </div>

      <Seccion titulo="Motivo del cierre">
        <Campo label="Motivo">
          <Select value={form.motivo} onChange={(e) => set("motivo", e.target.value)}>
            {motivos.map((m) => <option key={m}>{m}</option>)}
          </Select>
        </Campo>
        <Campo label="Resolución del caso">
          <Select value={form.resolucion} onChange={(e) => set("resolucion", e.target.value)}>
            {resoluciones.map((r) => (
              <option key={r.key} value={r.key}>{r.label}</option>
            ))}
          </Select>
        </Campo>
        <Campo label="Fecha de cierre">
          <Input type="date" value={form.fechaCierre} onChange={(e) => set("fechaCierre", e.target.value)} />
        </Campo>
        <Campo label="Sesiones totales">
          <Input type="number" value={form.sesionesTotales} onChange={(e) => set("sesionesTotales", e.target.value)} />
        </Campo>
      </Seccion>

      <Seccion titulo="Observaciones finales">
        <Campo label="Resumen / observación final" span={3}>
          <Textarea value={form.observacionFinal} onChange={(e) => set("observacionFinal", e.target.value)} />
        </Campo>
        <Campo label="Recomendaciones" span={3}>
          <Textarea value={form.recomendaciones} onChange={(e) => set("recomendaciones", e.target.value)} />
        </Campo>
      </Seccion>

      <div className="flex justify-end pt-2">
        <button
          onClick={cerrar}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E74C3C] hover:bg-[#C0392B] text-white text-sm font-bold rounded-lg shadow"
        >
          <Archive size={16} /> Cerrar expediente
        </button>
      </div>
    </SeccionExpedienteShell>
  );
}
