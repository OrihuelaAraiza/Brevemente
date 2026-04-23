"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { DonutChart } from "@/components/desempeno/DonutChart";

const porTPsiquiatrico = [
  { label: "Ansiedad",     value: 35, color: "#5BC8E8" },
  { label: "Depresivos",   value: 29, color: "#A78BFA" },
  { label: "TOC",          value: 11, color: "#F5A623" },
  { label: "Alimentarios", value: 10, color: "#EC4899" },
  { label: "Personalidad", value: 8,  color: "#27AE60" },
  { label: "Otros",        value: 7,  color: "#9CA3AF" },
];

const porTEstrategico = [
  { label: "FOB",  value: 35, color: "#5BC8E8" },
  { label: "OF",   value: 29, color: "#2A9EC0" },
  { label: "OBS",  value: 11, color: "#F5A623" },
  { label: "OC",   value: 10, color: "#27AE60" },
  { label: "OP",   value: 8,  color: "#A78BFA" },
  { label: "PAR",  value: 7,  color: "#EC4899" },
];

const porSPR = [
  { label: "Fóbica",    value: 35, color: "#5BC8E8" },
  { label: "Obsesiva",  value: 29, color: "#A78BFA" },
  { label: "Paranoica", value: 11, color: "#E74C3C" },
  { label: "Mixta",     value: 25, color: "#F5A623" },
];

const porResolucion = [
  { label: "Casos resueltos",   value: 35, color: "#27AE60" },
  { label: "Casos mejorados",   value: 29, color: "#5BC8E8" },
  { label: "Casos invariables", value: 18, color: "#9CA3AF" },
  { label: "Casos drop out",    value: 18, color: "#E74C3C" },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="inline-block bg-white border border-gray-200 rounded-full px-4 py-1 text-sm font-medium text-[#1E2A3A] mb-4">
        {title}
      </div>
      {children}
    </div>
  );
}

export default function DesempenoDiagnosticosPage() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Tu Desempeño - Datos Diagnósticos" />

      <div className="flex-1 overflow-auto p-5 min-h-0 space-y-4">
        <div className="flex items-center justify-between">
          <Link href="/desempeno" className="text-white/80 hover:text-white flex items-center gap-1 text-xs">
            <ArrowLeft size={14} /> Tu desempeño
          </Link>
          <div className="bg-white rounded-full px-4 py-1.5 text-sm font-medium text-[#1E2A3A] shadow-sm">
            No. Total de Pacientes: <span className="text-[#F5A623] font-bold">127</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Distribución por Trastorno Psiquiátrico">
            <DonutChart data={porTPsiquiatrico} size={170} />
          </Card>
          <Card title="Distribución por Trastorno Estratégico">
            <DonutChart data={porTEstrategico} size={170} />
          </Card>
          <Card title="Distribución por SPR">
            <DonutChart data={porSPR} size={170} />
          </Card>
          <Card title="Distribución por Resolución de casos">
            <DonutChart data={porResolucion} size={170} />
          </Card>
        </div>
      </div>
    </div>
  );
}
