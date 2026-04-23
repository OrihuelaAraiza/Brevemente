"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExpedienteSubHeader } from "@/components/expedientes/ExpedienteSubHeader";

export function SeccionExpedienteShell({
  pacienteId,
  titulo,
  onGuardar,
  children,
}: {
  pacienteId: string;
  titulo: string;
  onGuardar?: () => void;
  children: React.ReactNode;
}) {
  function handleGuardar() {
    onGuardar?.();
    toast.success("Cambios guardados (demo)", {
      description: "Este es un prototipo — los datos no persisten entre recargas.",
      duration: 2000,
    });
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title={`Expedientes - ${titulo}`} />
      <ExpedienteSubHeader pacienteId={pacienteId} />

      <div className="flex-1 bg-[#5BC8E8] p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link
              href={`/expedientes/${pacienteId}`}
              className="inline-flex items-center gap-2 text-white/90 text-sm hover:underline"
            >
              <ArrowLeft size={14} /> Volver al expediente
            </Link>
            <button
              onClick={handleGuardar}
              className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#E8941A] text-white text-sm font-bold py-2 px-4 rounded-lg shadow transition-colors"
            >
              <Save size={14} /> Guardar
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Campo({
  label,
  children,
  span = 1,
}: {
  label: string;
  children: React.ReactNode;
  span?: 1 | 2 | 3;
}) {
  const colSpan = span === 3 ? "md:col-span-3" : span === 2 ? "md:col-span-2" : "";
  return (
    <div className={`flex flex-col gap-1.5 ${colSpan}`}>
      <label className="text-xs font-semibold text-[#1E2A3A]">{label}</label>
      {children}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5BC8E8] disabled:bg-gray-50"
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5BC8E8] resize-none min-h-[80px]"
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
    />
  );
}

export function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="text-sm font-bold text-[#1E2A3A] uppercase tracking-wide border-b border-gray-100 pb-2 mb-3">
        {titulo}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
    </div>
  );
}
