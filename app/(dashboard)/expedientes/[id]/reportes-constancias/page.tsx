"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus, FileText, Send, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  SeccionExpedienteShell, Campo, Seccion,
} from "@/components/expedientes/SeccionExpedienteShell";
import { mockPacientes } from "@/lib/mock-data";

type Doc = { id: string; tipo: string; titulo: string; fecha: string };

export default function ReportesConstanciasPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const paciente = mockPacientes.find((p) => p.id === id);
  if (!paciente) notFound();

  const [docs, setDocs] = useState<Doc[]>([
    { id: "d1", tipo: "Constancia psicoterapéutica", titulo: "Constancia de asistencia Feb 2025", fecha: "2025-02-28" },
  ]);

  function add(tipo: string) {
    setDocs((d) => [
      ...d,
      { id: `d${Date.now()}`, tipo, titulo: `Nueva ${tipo.toLowerCase()}`, fecha: new Date().toISOString().slice(0, 10) },
    ]);
    toast.success(`${tipo} creada (demo)`);
  }

  return (
    <SeccionExpedienteShell pacienteId={id} titulo="Reportes / Constancias">
      <Seccion titulo="Crear nuevo documento">
        <Campo label="Tipo de constancia" span={3}>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => add("Constancia psicoterapéutica")} className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5A623] hover:bg-[#E8941A] text-white text-sm font-semibold rounded-lg">
              <Plus size={14} /> Psicoterapéutica
            </button>
            <button onClick={() => add("Constancia psiquiátrica")} className="inline-flex items-center gap-2 px-4 py-2 bg-[#5BC8E8] hover:bg-[#3DAFD0] text-white text-sm font-semibold rounded-lg">
              <Plus size={14} /> Psiquiátrica
            </button>
            <Link
              href="/reportes"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg"
            >
              Ver módulo completo de constancias
            </Link>
          </div>
        </Campo>
      </Seccion>

      <Seccion titulo="Documentos del expediente">
        <Campo label="" span={3}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                  <th className="text-left px-3 py-2">Título</th>
                  <th className="text-left px-3 py-2">Tipo</th>
                  <th className="text-left px-3 py-2">Fecha</th>
                  <th className="text-right px-3 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((d) => (
                  <tr key={d.id} className="border-b border-gray-50">
                    <td className="px-3 py-2 flex items-center gap-2 text-[#1E2A3A] font-medium">
                      <FileText size={14} className="text-gray-400" />
                      {d.titulo}
                    </td>
                    <td className="px-3 py-2 text-gray-500">{d.tipo}</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{d.fecha}</td>
                    <td className="px-3 py-2 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button onClick={() => toast.success("Enviado al paciente (demo)")} className="text-gray-400 hover:text-[#1E2A3A]" title="Enviar al paciente">
                          <Send size={14} />
                        </button>
                        <button onClick={() => toast.success("Descargado PDF (demo)")} className="text-gray-400 hover:text-[#1E2A3A]" title="Descargar PDF">
                          <Download size={14} />
                        </button>
                        <button onClick={() => setDocs((list) => list.filter((x) => x.id !== d.id))} className="text-gray-400 hover:text-red-500" title="Eliminar">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {docs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-sm text-gray-400">
                      Sin documentos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Campo>
      </Seccion>
    </SeccionExpedienteShell>
  );
}
