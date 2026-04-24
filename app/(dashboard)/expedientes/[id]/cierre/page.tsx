"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { AlertTriangle, Archive } from "lucide-react";
import { toast } from "sonner";
import {
  SeccionExpedienteShell, Seccion, Campo, Input, Select, Textarea,
} from "@/components/expedientes/SeccionExpedienteShell";
import { mockPacientes } from "@/lib/mock-data";

// Alineado con los catálogos clínicos oficiales (DISCHARGE_REASONS / CASE_RESULTS)
const motivos = [
  { value: "OBJETIVOS_CUMPLIDOS", label: "Objetivos cumplidos" },
  { value: "ALTA_VOLUNTARIA",     label: "Alta voluntaria" },
  { value: "ABANDONO",            label: "Abandono / Deserción" },
  { value: "REFERENCIA",          label: "Referencia a otro especialista" },
  { value: "OTRO",                label: "Otro" },
];

const resoluciones = [
  { value: "RESUELTO",  label: "Caso resuelto" },
  { value: "MEJORADO",  label: "Caso mejorado" },
  { value: "EMPEORADO", label: "Caso empeorado" },
  { value: "DROP_OUT",  label: "Drop out (Abandono)" },
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
    motivo: motivos[0].value,
    resolucion: resoluciones[0].value,
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
        <Campo label="Motivo del cierre">
          <Select value={form.motivo} onChange={(e) => set("motivo", e.target.value)}>
            {motivos.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </Select>
        </Campo>
        <Campo label="Resolución del caso">
          <Select value={form.resolucion} onChange={(e) => set("resolucion", e.target.value)}>
            {resoluciones.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
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
