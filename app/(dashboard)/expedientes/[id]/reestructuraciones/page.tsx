"use client";

import { use, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExpedienteSubHeader } from "@/components/expedientes/ExpedienteSubHeader";

type ReestructuracionItem = {
  id: string;
  tipo: string;
  descripcion: string;
};

type ReestructuracionSesion = {
  sesion: number;
  fecha: string;
  fase: number;
  items: ReestructuracionItem[];
};

const RST_CATALOGO = [
  "RST la marioneta",
  "RST como si",
  "RST milagro",
  "RST peor fantasía",
  "RST escalera",
  "RST de la ilusión",
  "RST paradójica",
  "RST reencuadre contextual",
  "RST anécdota / metáfora",
  "RST confrontación directa",
];

const SESIONES_INICIALES: ReestructuracionSesion[] = [
  {
    sesion: 1,
    fecha: "2026-03-04",
    fase: 1,
    items: [
      {
        id: "r1",
        tipo: "RST la marioneta",
        descripcion:
          "Se explica al paciente cómo el síntoma funciona como hilos de una marioneta que dirigen su comportamiento; el control real surge al soltar los hilos.",
      },
    ],
  },
  {
    sesion: 2,
    fecha: "2026-03-11",
    fase: 1,
    items: [],
  },
  {
    sesion: 3,
    fecha: "2026-03-18",
    fase: 2,
    items: [],
  },
];

export default function ReestructuracionesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [vista, setVista] = useState<"dia" | "semana" | "sesiones">("sesiones");
  const [sesiones, setSesiones] = useState<ReestructuracionSesion[]>(SESIONES_INICIALES);
  const [sesionActivaIdx, setSesionActivaIdx] = useState(0);

  function addItem(sesionIdx: number) {
    setSesiones((prev) =>
      prev.map((s, i) =>
        i === sesionIdx
          ? {
              ...s,
              items: [
                ...s.items,
                {
                  id: `r-${Date.now()}`,
                  tipo: RST_CATALOGO[0],
                  descripcion: "",
                },
              ],
            }
          : s,
      ),
    );
  }

  function updateItem(
    sesionIdx: number,
    itemId: string,
    patch: Partial<ReestructuracionItem>,
  ) {
    setSesiones((prev) =>
      prev.map((s, i) =>
        i === sesionIdx
          ? {
              ...s,
              items: s.items.map((it) =>
                it.id === itemId ? { ...it, ...patch } : it,
              ),
            }
          : s,
      ),
    );
  }

  function removeItem(sesionIdx: number, itemId: string) {
    setSesiones((prev) =>
      prev.map((s, i) =>
        i === sesionIdx
          ? { ...s, items: s.items.filter((it) => it.id !== itemId) }
          : s,
      ),
    );
  }

  function guardar() {
    toast.success("Reestructuraciones guardadas (demo)", {
      description: "Los datos no persisten entre recargas sin backend.",
    });
  }

  const ControlBtn = ({
    children,
    active = false,
    onClick,
  }: {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
        active
          ? "bg-[#F5A623] text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Expedientes - TX Psicoterapia TBE - Reestructuraciones" />
      <ExpedienteSubHeader
        pacienteId={id}
        breadcrumbs={[
          { label: "TX Psicoterapia TBE", href: `/expedientes/${id}/tx-psicoterapia` },
          { label: "Reestructuraciones" },
        ]}
        controls={
          <>
            <button
              onClick={guardar}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium bg-[#F5A623] hover:bg-[#E8941A] text-white transition-colors shadow"
            >
              <Save size={12} /> Guardar
            </button>
            <ControlBtn active={vista === "dia"} onClick={() => setVista("dia")}>
              Día
            </ControlBtn>
            <ControlBtn active={vista === "semana"} onClick={() => setVista("semana")}>
              Semana
            </ControlBtn>
            <ControlBtn active={vista === "sesiones"} onClick={() => setVista("sesiones")}>
              No. Sesiones
            </ControlBtn>
            <button
              onClick={() => setSesionActivaIdx((i) => Math.max(0, i - 1))}
              disabled={sesionActivaIdx === 0}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() =>
                setSesionActivaIdx((i) => Math.min(sesiones.length - 1, i + 1))
              }
              disabled={sesionActivaIdx >= sesiones.length - 1}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </>
        }
      />

      <div className="flex-1 overflow-auto p-5">
        {vista === "dia" ? (
          <SesionCard
            sesion={sesiones[sesionActivaIdx]}
            onAdd={() => addItem(sesionActivaIdx)}
            onUpdate={(itemId, patch) => updateItem(sesionActivaIdx, itemId, patch)}
            onRemove={(itemId) => removeItem(sesionActivaIdx, itemId)}
            ancho="max-w-2xl mx-auto"
          />
        ) : (
          <div className="flex gap-4 min-w-max">
            {sesiones.map((sesion, idx) => (
              <SesionCard
                key={sesion.sesion}
                sesion={sesion}
                onAdd={() => addItem(idx)}
                onUpdate={(itemId, patch) => updateItem(idx, itemId, patch)}
                onRemove={(itemId) => removeItem(idx, itemId)}
                ancho="w-72 flex-shrink-0"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SesionCard({
  sesion,
  onAdd,
  onUpdate,
  onRemove,
  ancho,
}: {
  sesion: ReestructuracionSesion;
  onAdd: () => void;
  onUpdate: (itemId: string, patch: Partial<ReestructuracionItem>) => void;
  onRemove: (itemId: string) => void;
  ancho: string;
}) {
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${ancho}`}>
      <div className="bg-[#1E2A3A] text-white px-4 py-2.5">
        <p className="font-bold text-sm">Sesión {sesion.sesion}</p>
        <p className="text-[11px] text-white/70">
          Fecha: {sesion.fecha} · Fase: {sesion.fase}
        </p>
      </div>

      <div className="p-4 space-y-3">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
          RST esenciales
        </p>

        {sesion.items.length === 0 ? (
          <p className="text-xs text-gray-400 italic">
            Sin reestructuraciones registradas.
          </p>
        ) : (
          sesion.items.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-3 space-y-2"
            >
              <div className="flex items-center gap-2">
                <select
                  value={item.tipo}
                  onChange={(e) => onUpdate(item.id, { tipo: e.target.value })}
                  className="flex-1 text-xs border border-gray-200 rounded px-2 py-1.5 bg-white"
                >
                  {RST_CATALOGO.map((rst) => (
                    <option key={rst}>{rst}</option>
                  ))}
                </select>
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <textarea
                value={item.descripcion}
                onChange={(e) =>
                  onUpdate(item.id, { descripcion: e.target.value })
                }
                rows={3}
                placeholder="Describe brevemente la reestructuración aplicada..."
                className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 resize-none focus:outline-none focus:ring-1 focus:ring-[#5BC8E8]"
              />
            </div>
          ))
        )}

        <button
          onClick={onAdd}
          className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-[#1E2A3A] border border-dashed border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition-colors"
        >
          <Plus size={12} /> Agregar reestructuración
        </button>
      </div>
    </div>
  );
}
