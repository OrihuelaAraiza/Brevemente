"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { toast } from "sonner";
import {
  SeccionExpedienteShell, Seccion, Campo, Input, Textarea,
} from "@/components/expedientes/SeccionExpedienteShell";
import { mockPacientes } from "@/lib/mock-data";

const consentimientos = [
  { id: "consentimiento_informado", label: "Consentimiento informado", descripcion: "Descripción del proceso terapéutico, alcances y limitaciones." },
  { id: "aviso_privacidad",         label: "Aviso de privacidad",      descripcion: "LFPDPPP (México) / GDPR — manejo de datos personales." },
  { id: "grabacion",                label: "Autorización de grabación", descripcion: "Autoriza el uso de grabación para procesamiento con IA." },
  { id: "menores",                  label: "Consentimiento para menores", descripcion: "Firmado por tutor legal. Aplica sólo si el paciente es menor." },
  { id: "archivo_compartido",       label: "Compartir expediente",      descripcion: "Autoriza compartir información con otros profesionales de salud." },
];

export default function PrivacidadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const paciente = mockPacientes.find((p) => p.id === id);
  if (!paciente) notFound();

  const [aceptados, setAceptados] = useState<Record<string, boolean>>({
    consentimiento_informado: true,
    aviso_privacidad: true,
    grabacion: true,
    menores: false,
    archivo_compartido: false,
  });
  const [fechaFirma, setFechaFirma] = useState("2025-02-01");
  const [notas, setNotas] = useState("Paciente firma todos los consentimientos en primera sesión.");

  return (
    <SeccionExpedienteShell pacienteId={id} titulo="Privacidad y Normatividad">
      <Seccion titulo="Consentimientos y autorizaciones">
        <Campo label="" span={3}>
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg">
            {consentimientos.map((c) => (
              <label key={c.id} className="flex items-start gap-3 p-4 cursor-pointer hover:bg-sky-50/40">
                <input
                  type="checkbox"
                  checked={aceptados[c.id] ?? false}
                  onChange={(e) => setAceptados((a) => ({ ...a, [c.id]: e.target.checked }))}
                  className="mt-1 accent-[#F5A623]"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1E2A3A]">{c.label}</p>
                  <p className="text-xs text-gray-500">{c.descripcion}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); toast.success(`${c.label} descargado (demo)`); }}
                  className="text-gray-400 hover:text-[#1E2A3A] p-1"
                  title="Descargar PDF firmado"
                >
                  <Download size={14} />
                </button>
              </label>
            ))}
          </div>
        </Campo>
      </Seccion>

      <Seccion titulo="Registro de firma">
        <Campo label="Fecha de firma">
          <Input type="date" value={fechaFirma} onChange={(e) => setFechaFirma(e.target.value)} />
        </Campo>
        <Campo label="Notas del expediente" span={2}>
          <Textarea value={notas} onChange={(e) => setNotas(e.target.value)} />
        </Campo>
      </Seccion>

      <Seccion titulo="Normatividad aplicable">
        <Campo label="" span={3}>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>NOM-004-SSA3-2012 — Expediente clínico</li>
            <li>NOM-024-SSA3-2012 — Sistemas de información de registro electrónico</li>
            <li>LFPDPPP — Ley Federal de Protección de Datos Personales</li>
            <li>Código Ético del Psicólogo (Sociedad Mexicana de Psicología)</li>
          </ul>
        </Campo>
      </Seccion>
    </SeccionExpedienteShell>
  );
}
