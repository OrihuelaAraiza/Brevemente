"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NuevoPacienteModal } from "./NuevoPacienteModal";
import { mockPacientes } from "@/lib/mock-data";

interface CrearCitaModalProps {
  open: boolean;
  onClose: () => void;
  defaultDate?: Date;
}

export function CrearCitaModal({ open, onClose, defaultDate }: CrearCitaModalProps) {
  const [pacienteInput, setPacienteInput] = useState("");
  const [videoconferencia, setVideoconferencia] = useState(false);
  const [modalidad, setModalidad] = useState("");
  const [estatus, setEstatus] = useState("programada");
  const [notas, setNotas] = useState("");
  const [showNuevoPaciente, setShowNuevoPaciente] = useState(false);
  const [nuevoPacienteNombre, setNuevoPacienteNombre] = useState("");

  const nombresTodos = mockPacientes.map((p) => `${p.nombre} ${p.apellido}`);
  const matcheExistente = pacienteInput.trim().length > 0
    && nombresTodos.some((n) => n.toLowerCase().includes(pacienteInput.toLowerCase()));
  const esNuevo = pacienteInput.trim().length > 2 && !matcheExistente;

  function handleGuardar() {
    toast.success("✅ Cita guardada correctamente.");
    onClose();
  }

  function handleEnviarFormulario() {
    if (esNuevo) {
      setNuevoPacienteNombre(pacienteInput);
      setShowNuevoPaciente(true);
    } else {
      toast.success("📨 Formulario enviado al paciente.");
      onClose();
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-[#1E2A3A]">Crear cita</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 text-sm">
            <div>
              <label className="text-xs text-gray-600 font-medium">Fecha y hora</label>
              <Input
                type="datetime-local"
                defaultValue={defaultDate ? defaultDate.toISOString().slice(0, 16) : undefined}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600 font-medium">Clínica</label>
              <select className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none">
                <option>Clínica Principal</option>
                <option>Consultorio Norte</option>
                <option>Online</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-xs text-gray-600 font-medium">¿Incluir videoconferencia?</label>
              <button
                onClick={() => setVideoconferencia((v) => !v)}
                className={`relative w-10 h-5 rounded-full transition-colors ${videoconferencia ? "bg-[#5BC8E8]" : "bg-gray-300"}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${videoconferencia ? "translate-x-5" : ""}`}
                />
              </button>
            </div>

            <div>
              <label className="text-xs text-gray-600 font-medium">Paciente</label>
              <Input
                value={pacienteInput}
                onChange={(e) => setPacienteInput(e.target.value)}
                placeholder="Buscar paciente..."
                className="mt-1"
              />
              {esNuevo && (
                <button
                  className="mt-1 text-xs text-[#F5A623] font-medium hover:underline"
                  onClick={() => { setNuevoPacienteNombre(pacienteInput); setShowNuevoPaciente(true); }}
                >
                  + Agregar nuevo paciente: "{pacienteInput}"
                </button>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-600 font-medium">Modalidad de cita</label>
              <select
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none"
              >
                <option value="">Seleccionar</option>
                <option value="presencial">Presencial</option>
                <option value="online">Online</option>
                <option value="supervision">Supervisión</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-600 font-medium">Estatus</label>
              <select
                value={estatus}
                onChange={(e) => setEstatus(e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none"
              >
                <option value="programada">Programada</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-600 font-medium">Notas internas</label>
              <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Notas para el terapeuta..."
                rows={2}
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <Button variant="outline" onClick={handleGuardar} className="flex-1 text-xs">
              Guardar
            </Button>
            <Button
              onClick={handleEnviarFormulario}
              className="flex-1 text-xs bg-[#F5A623] hover:bg-[#E09515] text-white border-0"
            >
              Enviar formulario →
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <NuevoPacienteModal
        open={showNuevoPaciente}
        onClose={() => { setShowNuevoPaciente(false); onClose(); }}
        nombreInicial={nuevoPacienteNombre}
      />
    </>
  );
}
