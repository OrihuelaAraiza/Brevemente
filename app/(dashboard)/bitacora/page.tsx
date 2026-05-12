"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Send, Printer, Upload, FileText, MoreHorizontal, FilePlus, Check,
} from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generatePdf } from "@/lib/pdf-export";

async function exportBitacora() {
  const root = document.querySelector<HTMLElement>("[data-bitacora]");
  const fields: Array<{ label: string; value: string }> = [];
  if (root) {
    root.querySelectorAll<HTMLElement>("[data-field]").forEach((el) => {
      const label = el.getAttribute("data-field") ?? "";
      const input = el.querySelector<HTMLInputElement | HTMLTextAreaElement>("input, textarea");
      if (label && input) fields.push({ label, value: input.value || "—" });
    });
  }
  await generatePdf({
    title: "Registro de supervisión del caso",
    subtitle: `Bitácora Romi Mente · ${new Date().toLocaleDateString("es-MX")}`,
    sections: [{ title: "Datos del registro", fields }],
    filename: `bitacora-${Date.now()}.pdf`,
  });
}

function BrifiIconSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="bGbit" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="40%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </radialGradient>
      </defs>
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <ellipse key={i} cx="12" cy="12" rx="3" ry="6.5" fill="url(#bGbit)" fillOpacity="0.75"
          transform={`rotate(${deg} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

function Field({
  label,
  textarea = false,
  rows = 2,
  defaultValue = "",
}: {
  label: string;
  textarea?: boolean;
  rows?: number;
  defaultValue?: string;
}) {
  if (textarea) {
    return (
      <div data-field={label}>
        <label className="text-xs font-medium text-gray-500 block mb-1">{label}</label>
        <textarea
          defaultValue={defaultValue}
          rows={rows}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BC8E8] resize-none"
        />
      </div>
    );
  }
  return (
    <div data-field={label}>
      <label className="text-xs font-medium text-gray-500 block mb-1">{label}</label>
      <input
        defaultValue={defaultValue}
        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
      />
    </div>
  );
}

export default function BitacoraPage() {
  const router = useRouter();
  const [creando, setCreando] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Inicio - Bitácora de Supervisión" />

      <div className="bg-white border-b border-gray-100 px-5 py-2.5 flex items-center gap-3">
        <button
          onClick={() => setCreando(true)}
          className="flex items-center gap-2 text-sm font-medium text-[#1E2A3A] hover:text-[#5BC8E8] transition-colors bg-transparent border-0 cursor-pointer p-0"
        >
          <FilePlus size={16} />
          Crear nueva Bitácora
          <span className="w-5 h-5 rounded-full bg-[#5BC8E8] text-white flex items-center justify-center text-xs font-bold">+</span>
        </button>

        <div className="flex-1" />

        {creando && (
          <>
            <button
              onClick={() => toast.success("Bitácora enviada al supervisor.")}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              title="Enviar al supervisor"
            >
              <Send size={16} />
            </button>
            <button
              onClick={() => window.print()}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              title="Imprimir"
            >
              <Printer size={16} />
            </button>
            <button
              onClick={() => toast.success("Bitácora anexada al expediente.")}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              title="Anexar al expediente"
            >
              <Upload size={16} />
            </button>
            <button
              onClick={async () => {
                try {
                  await exportBitacora();
                  toast.success("PDF generado y descargado.");
                } catch (err) {
                  toast.error("No se pudo generar el PDF.");
                  console.error(err);
                }
              }}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              title="Exportar PDF"
            >
              <FileText size={16} />
            </button>
          </>
        )}

        <button
          onClick={() => router.push("/brifi")}
          className="flex items-center gap-1 px-2 py-1 rounded bg-purple-50 hover:bg-purple-100 transition-colors"
          title="Consultar con Brifi"
        >
          <BrifiIconSmall />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="p-1.5 text-gray-400 hover:text-gray-600 bg-transparent border-0 cursor-pointer">
            <MoreHorizontal size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/expedientes")}>→ Expediente nuevo</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/expedientes")}>→ Expediente archivado</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/biblioteca")}>→ Biblioteca digital</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/reportes")}>→ Reportes y Constancias</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 overflow-auto p-5 min-h-0">
        {!creando ? (
          <div className="flex-1 flex flex-col items-center justify-center mt-16 text-white/80">
            <FileText size={56} className="opacity-40 mb-3" />
            <p className="text-lg font-medium">No hay bitácoras registradas aún.</p>
            <button
              onClick={() => setCreando(true)}
              className="mt-3 text-sm text-white underline underline-offset-2"
            >
              Crear primera bitácora →
            </button>
          </div>
        ) : (
          <div data-bitacora className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="font-bold text-[#1E2A3A]">Registro de Supervisión del caso</h2>
              <button
                onClick={() => setCreando(false)}
                className="text-xs text-gray-500 hover:text-[#1E2A3A]"
              >
                Cancelar
              </button>
            </div>

            <section className="grid grid-cols-2 gap-3">
              <Field label="Supervisor" />
              <Field label="Cédula" />
              <Field label="Fecha" />
              <Field label="Sesión número" />
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-[#1E2A3A]">Definición del problema — caso</h3>
              <Field label="Datos del paciente (edad, sexo, etc.)" textarea rows={2} />
              <Field label="Situación actual" textarea rows={2} />
              <Field label="SPR" textarea rows={2} />
              <Field label="TS (tentativa de solución)" textarea rows={2} />
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-[#1E2A3A]">Definición del problema — terapeuta</h3>
              <Field label="RST (reestructuraciones)" textarea rows={2} />
              <Field label="PX (prescripciones)" textarea rows={2} />
              <Field label="EFF (efectos observados)" textarea rows={2} />
              <Field label="Duda" textarea rows={2} />
              <Field label="Bloqueo" textarea rows={2} />
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-[#1E2A3A]">Observaciones y recomendaciones del supervisor</h3>
              <Field label="Observaciones" textarea rows={4} />
            </section>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
              <Button variant="outline" size="sm" onClick={() => setCreando(false)}>Descartar</Button>
              <Button
                size="sm"
                className="bg-[#F5A623] hover:bg-[#E09515] text-white border-0"
                onClick={() => toast.success("Bitácora guardada.")}
              >
                <Check className="mr-1" size={14} /> Guardar bitácora
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
