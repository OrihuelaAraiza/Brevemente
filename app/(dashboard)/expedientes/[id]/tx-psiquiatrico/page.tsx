"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import {
  SeccionExpedienteShell, Campo, Input, Textarea, Seccion,
} from "@/components/expedientes/SeccionExpedienteShell";
import { mockPacientes } from "@/lib/mock-data";

type Medicacion = { id: string; farmaco: string; dosis: string; frecuencia: string; inicio: string };

export default function TxPsiquiatricoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const paciente = mockPacientes.find((p) => p.id === id);
  if (!paciente) notFound();

  const [psiquiatra, setPsiquiatra] = useState({
    nombre: "Dr. Jorge Hernández",
    cedula: "9384756",
    contacto: "+52 555 123 4567",
  });
  const [indicaciones, setIndicaciones] = useState("Continuar con el ISRS a dosis baja y valorar respuesta en 4 semanas.");
  const [meds, setMeds] = useState<Medicacion[]>([
    { id: "m1", farmaco: "Sertralina", dosis: "50mg", frecuencia: "1 vez/día",   inicio: "2025-03-01" },
    { id: "m2", farmaco: "Clonazepam", dosis: "0.5mg", frecuencia: "SOS crisis", inicio: "2025-03-01" },
  ]);

  function add() {
    setMeds((m) => [
      ...m,
      { id: `m${Date.now()}`, farmaco: "", dosis: "", frecuencia: "", inicio: "" },
    ]);
  }
  function remove(mid: string) {
    setMeds((m) => m.filter((x) => x.id !== mid));
  }
  function update(mid: string, k: keyof Medicacion, v: string) {
    setMeds((m) => m.map((x) => (x.id === mid ? { ...x, [k]: v } : x)));
  }

  return (
    <SeccionExpedienteShell pacienteId={id} titulo="TX Psiquiátrico">
      <Seccion titulo="Médico tratante">
        <Campo label="Nombre del psiquiatra">
          <Input value={psiquiatra.nombre} onChange={(e) => setPsiquiatra((p) => ({ ...p, nombre: e.target.value }))} />
        </Campo>
        <Campo label="Cédula">
          <Input value={psiquiatra.cedula} onChange={(e) => setPsiquiatra((p) => ({ ...p, cedula: e.target.value }))} />
        </Campo>
        <Campo label="Contacto">
          <Input value={psiquiatra.contacto} onChange={(e) => setPsiquiatra((p) => ({ ...p, contacto: e.target.value }))} />
        </Campo>
      </Seccion>

      <Seccion titulo="Indicaciones">
        <Campo label="Notas e indicaciones psiquiátricas" span={3}>
          <Textarea value={indicaciones} onChange={(e) => setIndicaciones(e.target.value)} />
        </Campo>
      </Seccion>

      <div className="mb-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
          <h3 className="text-sm font-bold text-[#1E2A3A] uppercase tracking-wide">Medicación activa</h3>
          <button
            onClick={add}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#5BC8E8] hover:bg-[#3DAFD0] text-white text-xs font-medium"
          >
            <Plus size={12} /> Agregar fármaco
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                <th className="text-left px-3 py-2">Fármaco</th>
                <th className="text-left px-3 py-2">Dosis</th>
                <th className="text-left px-3 py-2">Frecuencia</th>
                <th className="text-left px-3 py-2">Inicio</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {meds.map((m) => (
                <tr key={m.id} className="border-b border-gray-50">
                  <td className="px-3 py-2">
                    <input className="w-full px-2 py-1 text-sm border border-gray-200 rounded" value={m.farmaco} onChange={(e) => update(m.id, "farmaco", e.target.value)} />
                  </td>
                  <td className="px-3 py-2">
                    <input className="w-full px-2 py-1 text-sm border border-gray-200 rounded" value={m.dosis} onChange={(e) => update(m.id, "dosis", e.target.value)} />
                  </td>
                  <td className="px-3 py-2">
                    <input className="w-full px-2 py-1 text-sm border border-gray-200 rounded" value={m.frecuencia} onChange={(e) => update(m.id, "frecuencia", e.target.value)} />
                  </td>
                  <td className="px-3 py-2">
                    <input type="date" className="w-full px-2 py-1 text-sm border border-gray-200 rounded" value={m.inicio} onChange={(e) => update(m.id, "inicio", e.target.value)} />
                  </td>
                  <td className="px-3 py-2">
                    <button onClick={() => remove(m.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {meds.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-sm text-gray-400">
                    Sin medicación registrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SeccionExpedienteShell>
  );
}
