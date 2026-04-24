"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { MessageCircle, X } from "lucide-react";
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

const MOTIVOS = [
  "Primera consulta",
  "Seguimiento",
  "Supervisión",
  "Reevaluación",
  "Urgencia",
  "Cierre de tratamiento",
];

const ETIQUETAS_DISPONIBLES = [
  "Primera vez",
  "Control",
  "Emergencia",
  "Pareja",
  "Familia",
  "Adolescente",
  "Adulto mayor",
];

export function CrearCitaModal({ open, onClose, defaultDate }: CrearCitaModalProps) {
  const [pacienteInput, setPacienteInput] = useState("");
  const [videoconferencia, setVideoconferencia] = useState(false);
  const [modalidad, setModalidad] = useState("");
  const [estatus, setEstatus] = useState("programada");
  const [notas, setNotas] = useState("");
  const [seguro, setSeguro] = useState("");
  const [poliza, setPoliza] = useState("");
  const [motivo, setMotivo] = useState<string>(MOTIVOS[1]);
  const [etiquetas, setEtiquetas] = useState<string[]>([]);
  const [showNuevoPaciente, setShowNuevoPaciente] = useState(false);
  const [nuevoPacienteNombre, setNuevoPacienteNombre] = useState("");

  const pacienteEncontrado = useMemo(() => {
    const q = pacienteInput.trim().toLowerCase();
    if (q.length < 2) return null;
    return (
      mockPacientes.find((p) =>
        `${p.nombre} ${p.apellido}`.toLowerCase().includes(q),
      ) ?? null
    );
  }, [pacienteInput]);

  const esNuevo = pacienteInput.trim().length > 2 && !pacienteEncontrado;

  function toggleEtiqueta(etq: string) {
    setEtiquetas((prev) =>
      prev.includes(etq) ? prev.filter((e) => e !== etq) : [...prev, etq],
    );
  }

  function handleGuardar() {
    toast.success("Cita guardada (demo).");
    onClose();
  }

  function handleEnviarFormulario() {
    if (esNuevo) {
      setNuevoPacienteNombre(pacienteInput);
      setShowNuevoPaciente(true);
      return;
    }
    if (!pacienteEncontrado) {
      toast.error("Selecciona un paciente existente o crea uno nuevo.");
      return;
    }

    // Arma mensaje de WhatsApp con link al formulario de Historia Clínica
    const origin =
      typeof window !== "undefined" ? window.location.origin : "https://brevemente.mx";
    const link = `${origin}/formulario-hc?paz=${encodeURIComponent(
      pacienteEncontrado.id,
    )}`;
    const texto = encodeURIComponent(
      `Hola ${pacienteEncontrado.nombre}, tu cita fue agendada en BreveMente. ` +
        `Completa tu historia clínica aquí antes de la sesión: ${link}`,
    );
    const telefono = (pacienteEncontrado.telefono || "").replace(/\D/g, "");
    const waUrl = telefono
      ? `https://wa.me/${telefono}?text=${texto}`
      : `https://wa.me/?text=${texto}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
    toast.success("Abriendo WhatsApp para enviar el formulario…");
    onClose();
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-sm max-h-[85vh] overflow-y-auto">
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
              {pacienteEncontrado && (
                <p className="mt-1 text-xs text-emerald-700">
                  ✓ {pacienteEncontrado.nombre} {pacienteEncontrado.apellido} ·{" "}
                  {pacienteEncontrado.telefono || "sin teléfono"}
                </p>
              )}
              {esNuevo && (
                <button
                  className="mt-1 text-xs text-[#F5A623] font-medium hover:underline"
                  onClick={() => {
                    setNuevoPacienteNombre(pacienteInput);
                    setShowNuevoPaciente(true);
                  }}
                >
                  + Agregar nuevo paciente: &quot;{pacienteInput}&quot;
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

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-600 font-medium">Seguro / plan médico</label>
                <select
                  value={seguro}
                  onChange={(e) => setSeguro(e.target.value)}
                  className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none"
                >
                  <option value="">Particular</option>
                  <option>AXA Keralty</option>
                  <option>GNP</option>
                  <option>MetLife</option>
                  <option>Mapfre</option>
                  <option>Allianz</option>
                  <option>IMSS Bienestar</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">Póliza / afiliación</label>
                <Input
                  value={poliza}
                  onChange={(e) => setPoliza(e.target.value)}
                  placeholder="No. de póliza"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-600 font-medium">Motivo de cita</label>
              <select
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none"
              >
                {MOTIVOS.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-600 font-medium">Etiquetas</label>
              <div className="mt-1 flex flex-wrap gap-1">
                {ETIQUETAS_DISPONIBLES.map((etq) => {
                  const on = etiquetas.includes(etq);
                  return (
                    <button
                      key={etq}
                      onClick={() => toggleEtiqueta(etq)}
                      className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors ${
                        on
                          ? "bg-[#5BC8E8] text-white border-[#5BC8E8]"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {etq}
                      {on && <X size={10} className="inline ml-1" />}
                    </button>
                  );
                })}
              </div>
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
              className="flex-1 text-xs bg-[#25D366] hover:bg-[#1DA851] text-white border-0 inline-flex items-center gap-1.5"
              title="Enviar historia clínica por WhatsApp"
            >
              <MessageCircle size={14} /> Enviar por WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <NuevoPacienteModal
        open={showNuevoPaciente}
        onClose={() => {
          setShowNuevoPaciente(false);
          onClose();
        }}
        nombreInicial={nuevoPacienteNombre}
      />
    </>
  );
}
