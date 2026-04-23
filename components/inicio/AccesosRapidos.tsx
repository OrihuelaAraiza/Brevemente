"use client";

import Link from "next/link";
import {
  FilePlus, CheckSquare, XSquare, BookOpen, FileText, ClipboardList,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const cards = [
  {
    icon: FilePlus,
    label: "Expediente nuevo",
    href: "/expedientes",
    tooltip: null,
  },
  {
    icon: CheckSquare,
    label: "Expedientes activos",
    href: "/expedientes",
    tooltip: null,
  },
  {
    icon: XSquare,
    label: "Exp. archivados",
    href: "/expedientes",
    tooltip: null,
  },
  {
    icon: BookOpen,
    label: "Biblioteca digital",
    href: "/biblioteca",
    tooltip: "CIE-11 · DSM-5TR · Manuales TBE · Protocolos TBE",
  },
  {
    icon: FileText,
    label: "Generar Reporte",
    href: "/reportes",
    tooltip: null,
  },
  {
    icon: ClipboardList,
    label: "Generar Bitácora Supervisión",
    href: "/bitacora",
    tooltip: null,
  },
];

export function AccesosRapidos() {
  return (
    <div className="grid grid-cols-2 gap-3 h-full content-start">
      {cards.map((card) => {
        const Icon = card.icon;
        const cardEl = (
          <Link
            href={card.href}
            className="bg-[#3DAFD0] hover:bg-[#2A9EC0] active:scale-[0.97] transition-all duration-150 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-white shadow-sm cursor-pointer select-none"
          >
            <Icon size={26} className="opacity-90" />
            <span className="text-xs font-medium text-center leading-tight">
              {card.label}
            </span>
          </Link>
        );

        if (card.tooltip) {
          return (
            <Tooltip key={card.label}>
              <TooltipTrigger className="block w-full">{cardEl}</TooltipTrigger>
              <TooltipContent>{card.tooltip}</TooltipContent>
            </Tooltip>
          );
        }

        return <div key={card.label}>{cardEl}</div>;
      })}
    </div>
  );
}
