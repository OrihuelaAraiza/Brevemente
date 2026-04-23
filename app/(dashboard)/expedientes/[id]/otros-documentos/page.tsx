"use client";

import { use, useRef, useState } from "react";
import { notFound } from "next/navigation";
import { Upload, File as FileIcon, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  SeccionExpedienteShell, Seccion, Campo,
} from "@/components/expedientes/SeccionExpedienteShell";
import { mockPacientes } from "@/lib/mock-data";

type Doc = { id: string; nombre: string; tamaño: string; subidoEn: string };

export default function OtrosDocumentosPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const paciente = mockPacientes.find((p) => p.id === id);
  if (!paciente) notFound();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [docs, setDocs] = useState<Doc[]>([
    { id: "o1", nombre: "Laboratorios_2025-01.pdf", tamaño: "1.2 MB", subidoEn: "2025-02-01" },
    { id: "o2", nombre: "Receta_Sertralina.pdf",     tamaño: "280 KB", subidoEn: "2025-03-01" },
  ]);

  function onFiles(files: FileList | null) {
    if (!files) return;
    const nuevos: Doc[] = Array.from(files).map((f) => ({
      id: `o${Date.now()}-${f.name}`,
      nombre: f.name,
      tamaño: `${Math.round(f.size / 1024)} KB`,
      subidoEn: new Date().toISOString().slice(0, 10),
    }));
    setDocs((d) => [...nuevos, ...d]);
    toast.success(`${nuevos.length} archivo(s) subido(s) (demo — no se almacenan).`);
  }

  return (
    <SeccionExpedienteShell pacienteId={id} titulo="Otros documentos">
      <Seccion titulo="Cargar archivos">
        <Campo label="" span={3}>
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}
            className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-[#5BC8E8] hover:bg-sky-50/40 transition-colors"
          >
            <Upload size={28} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 font-medium">Haz clic o arrastra archivos aquí</p>
            <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG, DOCX (demo)</p>
            <input
              ref={inputRef}
              type="file"
              multiple
              hidden
              onChange={(e) => onFiles(e.target.files)}
            />
          </div>
        </Campo>
      </Seccion>

      <Seccion titulo="Archivos del expediente">
        <Campo label="" span={3}>
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
            {docs.map((d) => (
              <div key={d.id} className="p-3 flex items-center gap-3">
                <FileIcon size={16} className="text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1E2A3A] truncate">{d.nombre}</p>
                  <p className="text-xs text-gray-500">
                    {d.tamaño} · Subido el {d.subidoEn}
                  </p>
                </div>
                <button onClick={() => toast.success("Descargado (demo)")} className="text-gray-400 hover:text-[#1E2A3A] p-1">
                  <Download size={14} />
                </button>
                <button onClick={() => setDocs((list) => list.filter((x) => x.id !== d.id))} className="text-gray-400 hover:text-red-500 p-1">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {docs.length === 0 && (
              <div className="text-center py-6 text-sm text-gray-400">Sin archivos adjuntos.</div>
            )}
          </div>
        </Campo>
      </Seccion>
    </SeccionExpedienteShell>
  );
}
