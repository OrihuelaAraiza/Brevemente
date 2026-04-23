"use client";

import Link from "next/link";
import { BarChart3, Users2, Activity } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";

const cards = [
  {
    href: "/desempeno/citas",
    title: "Datos Citas",
    description: "Distribución por estado, citas completadas al mes e historial por periodo.",
    icon: BarChart3,
  },
  {
    href: "/desempeno/demograficos",
    title: "Datos Demográficos",
    description: "Distribución por edad, sexo, modalidad y tipo de terapia.",
    icon: Users2,
  },
  {
    href: "/desempeno/diagnosticos",
    title: "Datos Diagnósticos",
    description: "Distribución por DX psiquiátrico, trastorno estratégico, SPR y resolución de casos.",
    icon: Activity,
  },
];

export default function DesempenoHubPage() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Tu Desempeño" />
      <div className="flex-1 overflow-auto p-5 min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.href}
                href={c.href}
                className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-[#5BC8E8]/15 flex items-center justify-center">
                  <Icon size={24} className="text-[#2A9EC0]" />
                </div>
                <div className="font-semibold text-[#1E2A3A]">{c.title}</div>
                <p className="text-xs text-gray-500 leading-relaxed">{c.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
