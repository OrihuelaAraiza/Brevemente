"use client";

import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Plus, MoreHorizontal } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExpedienteSubHeader } from "@/components/expedientes/ExpedienteSubHeader";
import { CriterioDropdown } from "@/components/expedientes/CriterioDropdown";
import { GrabacionOverlay } from "@/components/expedientes/GrabacionOverlay";
import {
  mockSesiones, expedienteSecciones, allCampoKeys, getCriterioColor,
  type CampoKey, type Sesion,
} from "@/lib/mock-data";

// Small BrifiIcon for the toolbar
function BrifiIconSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="bG2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="40%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </radialGradient>
      </defs>
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <ellipse key={i} cx="12" cy="12" rx="3" ry="6.5" fill="url(#bG2)" fillOpacity="0.75"
          transform={`rotate(${deg} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

export default function SesionesPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const modo = searchParams.get("modo") ?? "ia";
  const esManual = modo === "manual";

  const [sesiones, setSesiones]       = useState<Sesion[]>(mockSesiones);
  const [grabando, setGrabando]       = useState(false);
  const [mostrarBrifi, setMostrarBrifi] = useState(false);
  const [llenandoIA, setLlenandoIA]   = useState(false);
  const [activeSesion, setActiveSesion] = useState<number>(3);  // current session being recorded

  function handleCriterioChange(sesionId: string, campo: CampoKey, criterio: string) {
    setSesiones((prev) =>
      prev.map((s) =>
        s.id === sesionId ? { ...s, campos: { ...s.campos, [campo]: criterio } } : s
      )
    );
    toast.success("Guardado automáticamente", { duration: 1500 });
  }

  function handleStop() {
    setGrabando(false);
    setMostrarBrifi(true);
  }

  function handleBrifiRellena() {
    setMostrarBrifi(false);
    setLlenandoIA(true);
    const targetSesion = sesiones.find((s) => s.numero === activeSesion);
    if (!targetSesion) return;

    allCampoKeys.forEach((key, i) => {
      setTimeout(() => {
        setSesiones((prev) =>
          prev.map((s) =>
            s.id === targetSesion.id
              ? { ...s, campos: { ...s.campos, [key]: "mejoria_leve" } }
              : s
          )
        );
        if (i === allCampoKeys.length - 1) {
          setLlenandoIA(false);
          toast.success("✅ Brifi rellenó el expediente automáticamente.");
        }
      }, i * 300);
    });
  }

  const ControlBtn = ({ children, active = false, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) => (
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
      <SectionHeader title="Expedientes - TX Psicoterapia TBE - sesiones" />

      <ExpedienteSubHeader
        pacienteId={params.id}
        controls={
          <>
            {/* Play/Stop button */}
            {!esManual && (
              <button
                onClick={() => { setActiveSesion(3); setGrabando(true); }}
                className="w-7 h-7 rounded-full bg-[#27AE60] hover:bg-[#1E8449] flex items-center justify-center shadow transition-colors"
                title="Iniciar grabación"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
              </button>
            )}
            {esManual && (
              <button className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center" title="Sin grabación">
                <span className="text-gray-500 text-xs font-bold">✕</span>
              </button>
            )}

            <button className="w-7 h-7 rounded-full bg-[#5BC8E8] hover:bg-[#3DAFD0] flex items-center justify-center shadow">
              <Plus size={14} className="text-white" />
            </button>

            <ControlBtn active>Día</ControlBtn>
            <ControlBtn>Semana</ControlBtn>
            <ControlBtn>No. Sesiones</ControlBtn>

            <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600">
              <ChevronLeft size={16} />
            </button>
            <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600">
              <ChevronRight size={16} />
            </button>

            <button className="flex items-center gap-1 px-2 py-1 rounded bg-purple-100 hover:bg-purple-200 transition-colors">
              <BrifiIconSmall />
              <span className="text-xs text-purple-700 font-medium">Brifi</span>
            </button>

            <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={16} />
            </button>
          </>
        }
      />

      {/* Sesiones grid */}
      <div className="flex-1 overflow-auto p-5">
        <div className="flex gap-4 min-w-max">
          {sesiones.map((sesion) => (
            <div key={sesion.id} className="bg-white rounded-xl shadow-sm w-56 flex-shrink-0 overflow-hidden">
              {/* Session header */}
              <div className="bg-[#1E2A3A] text-white px-4 py-2">
                <p className="font-bold text-sm">Sesión {sesion.numero}</p>
                <p className="text-xs text-white/70">{sesion.fecha}</p>
                <p className="text-xs text-white/70">Fase: {sesion.fase}</p>
              </div>

              {/* Fields */}
              <div className="px-3 py-3 space-y-3">
                {expedienteSecciones.map((seccion) => (
                  <div key={seccion.id}>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                      {seccion.label}
                    </p>
                    <div className="space-y-1.5">
                      {seccion.items.map((item) => {
                        const val = sesion.campos[item.key];
                        return (
                          <div key={item.key} className="flex items-center gap-2">
                            <CriterioDropdown
                              sesionNumero={sesion.numero}
                              value={val}
                              onChange={(criterio) => handleCriterioChange(sesion.id, item.key, criterio)}
                              size="sm"
                            />
                            <span className="text-[10px] text-gray-600 truncate leading-tight">
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {llenandoIA && sesion.numero === activeSesion && (
                <div className="px-3 pb-3">
                  <div className="text-[10px] text-[#5BC8E8] font-medium animate-pulse text-center">
                    🤖 Brifi rellenando...
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grabación overlay */}
      {grabando && (
        <GrabacionOverlay sesionNumero={activeSesion} onComplete={handleStop} />
      )}

      {/* Brifi rellena button */}
      {mostrarBrifi && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4">
            <div className="text-4xl">🤖</div>
            <h3 className="font-bold text-[#1E2A3A] text-lg text-center">
              Grabación completada
            </h3>
            <p className="text-sm text-gray-500 text-center">
              Brifi analizó la transcripción y puede rellenar el expediente automáticamente.
            </p>
            <button
              onClick={handleBrifiRellena}
              className="bg-[#5BC8E8] hover:bg-[#3DAFD0] text-white font-bold py-3 px-8 rounded-xl transition-colors shadow"
            >
              Brifi rellena expediente
            </button>
            <button
              onClick={() => setMostrarBrifi(false)}
              className="text-xs text-gray-400 hover:underline"
            >
              Revisar manualmente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
