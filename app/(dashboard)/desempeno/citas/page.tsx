"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { DonutChart } from "@/components/desempeno/DonutChart";
import { LineChart } from "@/components/desempeno/LineChart";

const distribucionEstado = [
  { label: "Completadas", value: 91, color: "#27AE60" },
  { label: "Canceladas",  value: 6,  color: "#E74C3C" },
  { label: "Ausentes",    value: 3,  color: "#5BC8E8" },
];

const completadasMes = [
  { label: "Lunes",     value: 35, color: "#5BC8E8" },
  { label: "Martes",    value: 29, color: "#2A9EC0" },
  { label: "Miércoles", value: 11, color: "#F5A623" },
  { label: "Jueves",    value: 10, color: "#27AE60" },
  { label: "Viernes",   value: 8,  color: "#A78BFA" },
  { label: "Sábado",    value: 7,  color: "#E74C3C" },
];

const historial = [
  { label: "Abr", value: 0 },
  { label: "May", value: 78 },
  { label: "Jun", value: 41 },
  { label: "Jul", value: 42 },
  { label: "Ago", value: 60 },
  { label: "Sep", value: 82 },
  { label: "Oct", value: 94 },
  { label: "Nov", value: 92 },
  { label: "Dic", value: 71 },
];

export default function DesempenoCitasPage() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Tu Desempeño - Datos Citas" />

      <div className="flex-1 overflow-auto p-5 min-h-0 space-y-4">
        <div className="flex items-center justify-between">
          <Link
            href="/desempeno"
            className="text-white/80 hover:text-white flex items-center gap-1 text-xs"
          >
            <ArrowLeft size={14} /> Tu desempeño
          </Link>
          <div className="bg-white rounded-full px-4 py-1.5 text-sm font-medium text-[#1E2A3A] shadow-sm">
            No. Total de Pacientes: <span className="text-[#F5A623] font-bold">127</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="inline-block bg-white border border-gray-200 rounded-full px-4 py-1 text-sm font-medium text-[#1E2A3A] mb-4">
              Distribución de citas por estado
            </div>
            <DonutChart data={distribucionEstado} size={180} centerLabel="100%" />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="inline-block bg-white border border-gray-200 rounded-full px-4 py-1 text-sm font-medium text-[#1E2A3A] mb-4">
              No. Citas completadas al mes: <span className="text-[#F5A623] font-bold">110</span>
            </div>
            <DonutChart data={completadasMes} size={180} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="inline-block bg-white border border-gray-200 rounded-full px-4 py-1 text-sm font-medium text-[#1E2A3A] mb-4">
            Historial de citas según periodo
          </div>
          <LineChart data={historial} height={260} />
        </div>
      </div>
    </div>
  );
}
