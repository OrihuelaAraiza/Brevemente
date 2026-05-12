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

async function exportConstancia(tipo: "psiquiatrico" | "psicoterapeutico") {
  // Recoge valores del form activo a partir de los inputs/textareas del documento.
  const root = document.querySelector<HTMLElement>("[data-constancia]");
  const fields: Array<{ label: string; value: string }> = [];
  if (root) {
    root.querySelectorAll<HTMLElement>("[data-field]").forEach((el) => {
      const label = el.getAttribute("data-field") ?? "";
      const input = el.querySelector<HTMLInputElement | HTMLTextAreaElement>("input, textarea");
      if (label && input) {
        fields.push({ label, value: input.value || "—" });
      }
    });
  }

  await generatePdf({
    title:
      tipo === "psicoterapeutico"
        ? "Constancia de asistencia a terapia psicológica"
        : "Constancia psiquiátrica",
    subtitle: `Emitida por Romi Mente · ${new Date().toLocaleDateString("es-MX")}`,
    sections: [
      {
        title: "Datos de la constancia",
        fields,
      },
      {
        title: "Aviso legal",
        body:
          "Este documento tiene validez únicamente para certificar la asistencia a las sesiones. " +
          "Toda información relacionada con el diagnóstico, tratamiento o evolución del paciente está sujeta al secreto profesional según el Código Ético del Psicólogo de la Sociedad Mexicana de Psicología y la Ley General de Salud.",
      },
    ],
    filename: `constancia-${tipo}-${Date.now()}.pdf`,
  });
}

function BrifiIconSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="bG4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="40%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </radialGradient>
      </defs>
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <ellipse key={i} cx="12" cy="12" rx="3" ry="6.5" fill="url(#bG4)" fillOpacity="0.75"
          transform={`rotate(${deg} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

type Tipo = null | "psiquiatrico" | "psicoterapeutico";

export default function ReportesPage() {
  const router = useRouter();
  const [tipo, setTipo] = useState<Tipo>(null);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader
        title={
          "Inicio - Reportes y Constancias" +
          (tipo === "psiquiatrico"
            ? " - Psiquiátrico"
            : tipo === "psicoterapeutico"
              ? " - Psicoterapéutico"
              : "")
        }
      />

      <div className="bg-white border-b border-gray-100 px-5 py-2.5 flex items-center gap-3">
        <button
          onClick={() => toast.info("Selecciona primero el tipo de constancia.")}
          className="flex items-center gap-2 text-sm font-medium text-[#1E2A3A] hover:text-[#5BC8E8] transition-colors bg-transparent border-0 cursor-pointer p-0"
        >
          <FilePlus size={16} />
          Crear nueva Constancia
          <span className="w-5 h-5 rounded-full bg-[#5BC8E8] text-white flex items-center justify-center text-xs font-bold">+</span>
        </button>

        <div className="flex-1" />

        {tipo && (
          <>
            <button
              onClick={() => toast.success("Constancia enviada al paciente.")}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              title="Enviar al paciente"
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
              onClick={() => toast.success("Constancia anexada al expediente.")}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              title="Anexar al expediente"
            >
              <Upload size={16} />
            </button>
            <button
              onClick={async () => {
                try {
                  await exportConstancia(tipo as "psiquiatrico" | "psicoterapeutico");
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
            <DropdownMenuItem onClick={() => router.push("/bitacora")}>→ Bitácora supervisión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 overflow-auto p-5 min-h-0">
        {!tipo ? (
          <div className="max-w-xl mx-auto mt-12 space-y-4">
            <button
              onClick={() => setTipo("psiquiatrico")}
              className="w-full bg-white rounded-xl py-5 text-[#1E2A3A] font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              Psiquiátrico
            </button>
            <button
              onClick={() => setTipo("psicoterapeutico")}
              className="w-full bg-[#F5A623] rounded-xl py-5 text-white font-medium shadow-sm hover:bg-[#E09515] transition-all"
            >
              Psicoterapéutico
            </button>
          </div>
        ) : tipo === "psicoterapeutico" ? (
          <ConstanciaPsicoterapeutica onBack={() => setTipo(null)} />
        ) : (
          <ConstanciaPsiquiatrica onBack={() => setTipo(null)} />
        )}
      </div>
    </div>
  );
}

function Field({ label, defaultValue = "", textarea = false, rows = 2 }: { label: string; defaultValue?: string; textarea?: boolean; rows?: number }) {
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

function ConstanciaPsicoterapeutica({ onBack }: { onBack: () => void }) {
  return (
    <div data-constancia className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="font-bold text-[#1E2A3A]">Constancia - Reporte de asistencia a terapia psicológica</h2>
        <button onClick={onBack} className="text-xs text-gray-500 hover:text-[#1E2A3A]">Cambiar tipo</button>
      </div>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-[#1E2A3A]">Datos del profesional</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nombre del profesional" />
          <Field label="Cédula licenciatura" />
          <Field label="Cédula especialidad" />
          <Field label="Cédula maestría" />
          <Field label="Cédula doctorado" />
          <Field label="Teléfono de citas" />
          <Field label="Email" />
          <Field label="Dirección del consultorio" />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-[#1E2A3A]">Datos del paciente</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nombre completo del paciente" />
          <Field label="Fecha de nacimiento (DD/MM/AAAA)" />
          <Field label="Fecha de inicio del tratamiento" />
          <Field label="Fecha de finalización (o actual)" />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-[#1E2A3A]">Detalles de la asistencia</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Número total de sesiones" />
          <Field label="Frecuencia (Semanal/Quincenal/Mensual)" />
          <Field label="Modalidad (Presencial/Online/Mixta)" />
          <Field label="Tipo de intervención (Individual/Familiar/Grupal)" />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-[#1E2A3A]">Observaciones</h3>
        <Field label="Motivo de consulta" textarea rows={2} />
        <Field label="Síntomas" textarea rows={2} />
        <Field label="Origen" textarea rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Evolución" defaultValue="favorable / estable / limitada / fluctuante" />
          <Field label="Soporte farmacológico al terapéutico" />
        </div>
        <Field label="Observación global" textarea rows={2} defaultValue="En términos generales, el proceso se considera: productivo / incipiente / en curso / sin cambios significativos." />
        <Field label="Recomendaciones" textarea rows={2} defaultValue="Continuidad, modificación, cierre gradual... según la evolución." />
      </section>

      <section className="grid grid-cols-2 gap-3">
        <Field label="Lugar y fecha" defaultValue="Ciudad de México, DD de mes de AAAA" />
        <Field label="Firma" />
      </section>

      <p className="text-[11px] text-gray-400 italic leading-relaxed">
        Esta constancia tiene validez únicamente para certificar la asistencia a las sesiones de terapia psicológica.
        Toda información relacionada con el diagnóstico, tratamiento o evolución del paciente está sujeta al secreto profesional
        según el Código Ético del Psicólogo de la Sociedad Mexicana de Psicología y la Ley General de Salud.
      </p>

      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
        <Button variant="outline" size="sm" onClick={onBack}>Descartar</Button>
        <Button
          size="sm"
          className="bg-[#F5A623] hover:bg-[#E09515] text-white border-0"
          onClick={() => toast.success("Constancia psicoterapéutica guardada.")}
        >
          <Check className="mr-1" size={14} /> Guardar constancia
        </Button>
      </div>
    </div>
  );
}

function ConstanciaPsiquiatrica({ onBack }: { onBack: () => void }) {
  return (
    <div data-constancia className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="font-bold text-[#1E2A3A]">Constancia - Reporte psiquiátrico</h2>
        <button onClick={onBack} className="text-xs text-gray-500 hover:text-[#1E2A3A]">Cambiar tipo</button>
      </div>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-[#1E2A3A]">Datos del profesional</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nombre del psiquiatra" />
          <Field label="Cédula profesional" />
          <Field label="Cédula de especialidad" />
          <Field label="Registro sanitario" />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-[#1E2A3A]">Datos del paciente</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nombre completo del paciente" />
          <Field label="Fecha de nacimiento" />
          <Field label="Diagnóstico (CIE-11 / DSM-5TR)" />
          <Field label="Fecha de inicio de tratamiento" />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-[#1E2A3A]">Tratamiento</h3>
        <Field label="Medicación prescrita" textarea rows={3} />
        <Field label="Evolución clínica" textarea rows={2} />
        <Field label="Recomendaciones" textarea rows={2} />
      </section>

      <section className="grid grid-cols-2 gap-3">
        <Field label="Lugar y fecha" defaultValue="Ciudad de México, DD de mes de AAAA" />
        <Field label="Firma" />
      </section>

      <p className="text-[11px] text-gray-400 italic leading-relaxed">
        Esta constancia psiquiátrica está sujeta al secreto profesional. Utilizar únicamente con consentimiento informado del paciente.
      </p>

      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
        <Button variant="outline" size="sm" onClick={onBack}>Descartar</Button>
        <Button
          size="sm"
          className="bg-[#F5A623] hover:bg-[#E09515] text-white border-0"
          onClick={() => toast.success("Constancia psiquiátrica guardada.")}
        >
          <Check className="mr-1" size={14} /> Guardar constancia
        </Button>
      </div>
    </div>
  );
}
