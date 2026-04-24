"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Catálogos por PDF (pag 61-65)
const PROTOCOLOS = [
  "Protocolo Ataque de Pánico",
  "Protocolo Fobia específica",
  "Protocolo Miedo a hablar en público",
  "Protocolo Miedo al conflicto",
  "Protocolo Paranoia",
  "Protocolo Paranoia hacia uno mismo",
  "Protocolo Paranoia hacia los demás",
  "Protocolo Trastorno Obsesivo",
  "Protocolo Trastorno por Angustia",
  "Protocolo Trastorno Depresivo",
];

const SPR_OPCIONES = [
  "SPR Fóbico (FOB)",
  "SPR Fóbico Obsesivo (FO)",
  "SPR Obsesivo Fóbico (OF)",
  "SPR Obsesivo (OBS)",
  "SPR Obsesivo Compulsivo (OC)",
  "SPR Obsesivo Paranoico (OP)",
  "SPR Paranoico (PAR)",
];

const PX_CATALOGO = [
  "Diario de abordo",
  "Como Empeorar",
  "WF 30 min",
  "WF 5 veces x 5 min",
  "WF preventivo - necesidad",
  "CP (Confesión Privilegiada)",
  "RST la marioneta",
  "Otro",
];

type PXItem = {
  id: string;
  tipo: string;
  f1: string;
  f2: string;
  oss: boolean;
  add: boolean;
  rss: boolean;
  eff: boolean;
  notas: string;
};

type SesionManualState = {
  protocolo: string;
  dxOp: string;
  prescripciones: PXItem[];
  observacionesProxima: string;
  situacionActual: string;
};

function emptyPX(): PXItem {
  return {
    id: `px-${Math.random().toString(36).slice(2, 8)}`,
    tipo: "Seleccionar PX",
    f1: "",
    f2: "",
    oss: false,
    add: false,
    rss: false,
    eff: false,
    notas: "",
  };
}

export function SesionEditorManual({
  open,
  onClose,
  sesionNumero,
  fecha,
  fase,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  sesionNumero: number;
  fecha: string;
  fase: number;
  initial?: Partial<SesionManualState>;
}) {
  const [state, setState] = useState<SesionManualState>({
    protocolo: initial?.protocolo ?? "Protocolo Ataque de Pánico",
    dxOp: initial?.dxOp ?? "SPR Fóbico (FOB)",
    prescripciones: initial?.prescripciones ?? [
      {
        ...emptyPX(),
        tipo: "Diario de abordo",
        f1: "bloquear TS monitoreo obsesivo sensaciones",
      },
    ],
    observacionesProxima: initial?.observacionesProxima ?? "",
    situacionActual: initial?.situacionActual ?? "",
  });

  function updatePX(pxId: string, patch: Partial<PXItem>) {
    setState((s) => ({
      ...s,
      prescripciones: s.prescripciones.map((px) =>
        px.id === pxId ? { ...px, ...patch } : px,
      ),
    }));
  }

  function addPX() {
    setState((s) => ({ ...s, prescripciones: [...s.prescripciones, emptyPX()] }));
  }

  function removePX(pxId: string) {
    setState((s) => ({
      ...s,
      prescripciones: s.prescripciones.filter((px) => px.id !== pxId),
    }));
  }

  function guardar() {
    toast.success(`Sesión ${sesionNumero} guardada (demo)`, {
      description: `${state.prescripciones.length} PX registradas. Sin backend, no persiste.`,
    });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1E2A3A]">
            Sesión {sesionNumero} — Modo manual
          </DialogTitle>
        </DialogHeader>

        {/* Header */}
        <div className="rounded-lg bg-[#5BC8E8]/10 border border-[#5BC8E8]/30 p-3 grid grid-cols-4 gap-3 text-xs">
          <div>
            <p className="text-gray-500 font-semibold">Fecha</p>
            <p className="text-[#1E2A3A]">{fecha}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Fase</p>
            <p className="text-[#1E2A3A]">{fase}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold mb-1">Protocolo</p>
            <select
              value={state.protocolo}
              onChange={(e) => setState((s) => ({ ...s, protocolo: e.target.value }))}
              className="w-full border border-gray-200 rounded px-2 py-1 text-xs bg-white"
            >
              {PROTOCOLOS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-gray-500 font-semibold mb-1">DX.OP</p>
            <select
              value={state.dxOp}
              onChange={(e) => setState((s) => ({ ...s, dxOp: e.target.value }))}
              className="w-full border border-gray-200 rounded px-2 py-1 text-xs bg-white"
            >
              {SPR_OPCIONES.map((spr) => (
                <option key={spr}>{spr}</option>
              ))}
            </select>
          </div>
        </div>

        {/* PX list */}
        <div className="space-y-3">
          {state.prescripciones.map((px, idx) => (
            <div
              key={px.id}
              className="border border-gray-200 rounded-lg p-3 space-y-2 bg-white"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1E2A3A]">PX {idx + 1}:</span>
                <select
                  value={px.tipo}
                  onChange={(e) => updatePX(px.id, { tipo: e.target.value })}
                  className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs bg-white"
                >
                  <option disabled>Seleccionar PX</option>
                  {PX_CATALOGO.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
                <button
                  onClick={() => removePX(px.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                  title="Eliminar"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-gray-500 font-semibold">F1</label>
                  <input
                    value={px.f1}
                    onChange={(e) => updatePX(px.id, { f1: e.target.value })}
                    placeholder="Función 1..."
                    className="w-full border border-gray-200 rounded px-2 py-1 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-semibold">F2</label>
                  <input
                    value={px.f2}
                    onChange={(e) => updatePX(px.id, { f2: e.target.value })}
                    placeholder="Función 2..."
                    className="w-full border border-gray-200 rounded px-2 py-1 text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-4 flex-wrap text-xs">
                {(["oss", "add", "rss", "eff"] as const).map((c) => (
                  <label key={c} className="inline-flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={px[c]}
                      onChange={(e) => updatePX(px.id, { [c]: e.target.checked })}
                      className="accent-[#F5A623]"
                    />
                    <span className="font-semibold uppercase">{c}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="text-[10px] text-gray-500 font-semibold">Notas</label>
                <textarea
                  value={px.notas}
                  onChange={(e) => updatePX(px.id, { notas: e.target.value })}
                  rows={2}
                  placeholder="Observaciones sobre la prescripción..."
                  className="w-full border border-gray-200 rounded px-2 py-1 text-xs resize-none"
                />
              </div>
            </div>
          ))}

          <button
            onClick={addPX}
            className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-[#1E2A3A] border border-dashed border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition-colors"
          >
            <Plus size={12} /> Agregar nueva PX
          </button>
        </div>

        <div>
          <label className="text-xs text-gray-600 font-semibold">
            Observaciones próxima sesión
          </label>
          <textarea
            value={state.observacionesProxima}
            onChange={(e) =>
              setState((s) => ({ ...s, observacionesProxima: e.target.value }))
            }
            rows={2}
            placeholder="- Averiguar dinámica familiar · - Indagar un spr par o oss.par..."
            className="mt-1 w-full border border-gray-200 rounded px-2 py-1.5 text-xs resize-none"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 font-semibold">
            Situación actual general paciente
          </label>
          <textarea
            value={state.situacionActual}
            onChange={(e) =>
              setState((s) => ({ ...s, situacionActual: e.target.value }))
            }
            rows={3}
            placeholder="El paciente ha desenvuelto su vida con más facilidad..."
            className="mt-1 w-full border border-gray-200 rounded px-2 py-1.5 text-xs resize-none"
          />
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <Button variant="outline" onClick={onClose} className="text-xs">
            Cancelar
          </Button>
          <Button
            onClick={guardar}
            className="bg-[#F5A623] hover:bg-[#E8941A] text-white text-xs inline-flex items-center gap-1"
          >
            <Save size={12} /> Guardar sesión
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
