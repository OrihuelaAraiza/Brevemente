"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { DonutChart } from "@/components/desempeno/DonutChart";

const porEdad = [
  { label: "15 - 25", value: 29, color: "#27AE60" },
  { label: "26 - 45", value: 48, color: "#5BC8E8" },
  { label: "46 - 66", value: 23, color: "#F5A623" },
];

const porSexo = [
  { label: "Femenino",  value: 63, color: "#EC4899" },
  { label: "Masculino", value: 29, color: "#5BC8E8" },
  { label: "LGTB",      value: 8,  color: "#A78BFA" },
];

const porModalidad = [
  { label: "Presencial", value: 58, color: "#27AE60" },
  { label: "Online",     value: 42, color: "#5BC8E8" },
];

const porTipoTerapia = [
  { label: "Individual", value: 68, color: "#5BC8E8" },
  { label: "Pareja",     value: 21, color: "#F5A623" },
  { label: "Familia",    value: 11, color: "#A78BFA" },
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

export default function DesempenoDemograficosPage() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Tu Desempeño - Datos Demográficos" />

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
          <Card title="Distribución por edad">
            <DonutChart data={porEdad} size={170} />
          </Card>
          <Card title="Distribución por sexo">
            <DonutChart data={porSexo} size={170} />
          </Card>
          <Card title="Distribución por modalidad terapia">
            <DonutChart data={porModalidad} size={170} />
          </Card>
          <Card title="Distribución por tipo terapia">
            <DonutChart data={porTipoTerapia} size={170} />
          </Card>
        </div>
      </div>
    </div>
  );
}
