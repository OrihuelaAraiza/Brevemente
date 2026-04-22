"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { criterios, getCriterioColor } from "@/lib/mock-data";

interface CriterioDropdownProps {
  sesionNumero: number;
  value: string | undefined;
  onChange: (id: string) => void;
  size?: "sm" | "md";
}

export function CriterioDropdown({ sesionNumero, value, onChange, size = "md" }: CriterioDropdownProps) {
  const disponibles = sesionNumero === 1
    ? criterios.filter((c) => c.soloSesion1)
    : criterios.filter((c) => !c.soloSesion1);

  const color = value ? getCriterioColor(value) : "#D1D5DB";
  const dim = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <Popover>
      <PopoverTrigger
        className={`${dim} rounded-full border-2 border-white/40 shadow-sm cursor-pointer hover:scale-110 transition-transform flex-shrink-0`}
        style={{ backgroundColor: color }}
        title="Seleccionar criterio"
      />
      <PopoverContent className="w-60 p-2" side="right" align="start">
        <p className="text-[10px] text-gray-400 px-1 pb-1 font-medium uppercase tracking-wide">
          Criterio según cambio:
        </p>
        {disponibles.map((c) => (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            className={`w-full text-left px-2 py-1.5 text-xs rounded hover:bg-gray-50 flex items-center gap-2 transition-colors ${value === c.id ? "bg-gray-100" : ""}`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: c.color }}
            />
            <span style={{ color: c.color }} className="font-medium">{c.label}</span>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
