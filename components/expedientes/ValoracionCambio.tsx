"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CriterioDropdown } from "./CriterioDropdown";
import { mockProtocolos, type CampoKey } from "@/lib/mock-data";

const vcItems = [
  {
    seccion: "Percepción",
    items: [
      { key: "percepcion_control" as CampoKey, label: "Miedo a perder el control - enloquecer", bullet: "■" },
    ],
  },
  {
    seccion: "Pensamientos",
    items: [
      { key: "pensamiento_catastrofico" as CampoKey, label: "Anticipaciones catastróficas.", bullet: "■" },
    ],
  },
  {
    seccion: "Sensaciones",
    items: [
      { key: "sensacion_miedo" as CampoKey,     label: "Miedo primario",     bullet: "●" },
      { key: "sensacion_vergüenza" as CampoKey, label: "Vergüenza secundaria", bullet: "■" },
    ],
  },
  {
    seccion: "Reacciones",
    subsecciones: [
      {
        label: "● Evitación:",
        items: [
          { key: "reaccion_evitacion" as CampoKey, label: "Evitación progresiva situaciones externas", bullet: "●" },
        ],
      },
      {
        label: "● Combatir:",
        items: [
          { key: "reaccion_precauciones" as CampoKey,    label: "Tomar precauciones",       bullet: "■" },
          { key: "reaccion_prueba" as CampoKey,          label: "Ponerse a prueba",          bullet: "■" },
          { key: "reaccion_hipervigilancia" as CampoKey, label: "Hipervigilancia somática",  bullet: "■" },
          { key: "reaccion_distraerse" as CampoKey,      label: "Distraerse",                bullet: "■" },
          { key: "reaccion_hablar" as CampoKey,          label: "Hablar del problema",       bullet: "■" },
          { key: "reaccion_ayuda" as CampoKey,           label: "Petición de ayuda",         bullet: "■" },
        ],
      },
    ],
  },
];

export function ValoracionCambio() {
  const [campos, setCampos] = useState<Partial<Record<CampoKey, string>>>({});
  const [protocolo, setProtocolo] = useState("1");

  function handleChange(key: CampoKey, criterio: string) {
    setCampos((c) => ({ ...c, [key]: criterio }));
    toast.success("Guardado automáticamente", { duration: 1200 });
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      {/* VC Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
        <span className="font-bold text-[#1E2A3A]">Valoración Cambio: VC</span>
        <select
          value={protocolo}
          onChange={(e) => setProtocolo(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
        >
          {mockProtocolos.slice(0, 12).map((p) => (
            <option key={p.id} value={String(p.id)}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Session info */}
      <div className="text-xs text-gray-400 mb-4">
        Sesión 1 — Fecha: 4 marzo 2026 — Protocolo: Ataque Pánico — DX.OP: SPR OF (OBSESIVO FÓBICO)
      </div>

      {/* Items */}
      {vcItems.map((grupo) => (
        <div key={grupo.seccion} className="mb-4">
          <h3 className="text-sm font-bold text-[#1E2A3A] mb-2">{grupo.seccion}:</h3>

          {"items" in grupo && grupo.items && (
            <div className="space-y-2 pl-3">
              {grupo.items.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm w-3 flex-shrink-0">{item.bullet}</span>
                  <span className="text-sm text-gray-700 flex-1">{item.label}</span>
                  <CriterioDropdown
                    sesionNumero={1}
                    value={campos[item.key]}
                    onChange={(c) => handleChange(item.key, c)}
                  />
                </div>
              ))}
            </div>
          )}

          {"subsecciones" in grupo && grupo.subsecciones && (
            <div className="pl-3 space-y-3">
              {grupo.subsecciones.map((sub) => (
                <div key={sub.label}>
                  <p className="text-sm text-gray-600 mb-1.5 font-medium">{sub.label}</p>
                  <div className="space-y-2 pl-4">
                    {sub.items.map((item) => (
                      <div key={item.key} className="flex items-center gap-3">
                        <span className="text-gray-400 text-sm w-3 flex-shrink-0">{item.bullet}</span>
                        <span className="text-sm text-gray-700 flex-1">{item.label}</span>
                        <CriterioDropdown
                          sesionNumero={1}
                          value={campos[item.key]}
                          onChange={(c) => handleChange(item.key, c)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
