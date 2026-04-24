"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search, ExternalLink, GitMerge, Plus, Phone, Mail, Calendar, Trash2, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NuevoPacienteModal } from "@/components/agenda/NuevoPacienteModal";
import { mockPacientes, mockCalendarEvents, type Paciente } from "@/lib/mock-data";

function EstadoBadge({ estado }: { estado: string }) {
  const isActivo = estado === "activo";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        isActivo
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-gray-50 text-gray-500 border-gray-200"
      }`}
    >
      {isActivo ? "Activo" : "Archivado"}
    </span>
  );
}

// Deriva próxima cita desde mockCalendarEvents (match por nombre)
function proximaCitaFor(paciente: Paciente) {
  const full = `${paciente.nombre} ${paciente.apellido}`.toLowerCase();
  const now = Date.now();
  const futura = mockCalendarEvents
    .filter((e) => {
      const t = new Date(e.start).getTime();
      return (
        t >= now &&
        e.title.toLowerCase().split(" ").some((w) => full.includes(w) && w.length > 3)
      );
    })
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())[0];
  return futura ? new Date(futura.start) : null;
}

function formatDate(d: Date | null) {
  if (!d) return null;
  return d.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Detecta posibles duplicados por email o teléfono normalizado.
function findDuplicateGroups(pacientes: Paciente[]) {
  const groups: Record<string, Paciente[]> = {};
  pacientes.forEach((p) => {
    const emailKey = (p.email || "").trim().toLowerCase();
    const telKey = (p.telefono || "").replace(/\D/g, "").slice(-10);
    [emailKey, telKey].filter(Boolean).forEach((k) => {
      if (!groups[k]) groups[k] = [];
      if (!groups[k].includes(p)) groups[k].push(p);
    });
  });
  return Object.values(groups).filter((g) => g.length > 1);
}

export default function PacientesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState<"todos" | "activo" | "archivado">("todos");
  const [showCrear, setShowCrear] = useState(false);
  const [showUnir, setShowUnir] = useState(false);
  const [pacientes, setPacientes] = useState<Paciente[]>(mockPacientes);

  const filtrados = useMemo(
    () =>
      pacientes.filter((p) => {
        const texto = `${p.nombre} ${p.apellido} ${p.folio} ${p.email} ${p.telefono}`.toLowerCase();
        const coincide = search === "" || texto.includes(search.toLowerCase());
        const estado = filtro === "todos" || p.estado === filtro;
        return coincide && estado;
      }),
    [pacientes, search, filtro],
  );

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Pacientes" titleClassName="text-4xl" />
      <div className="h-2 bg-[#1E2A3A]" />

      <div className="flex-1 p-5 overflow-auto">
        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-64 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, folio, email o teléfono..."
              className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
            />
          </div>

          <div className="flex gap-1">
            {(["todos", "activo", "archivado"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filtro === f
                    ? "bg-[#1E2A3A] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f === "todos" ? "Todos" : f === "activo" ? "Activos" : "Archivados"}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          <button
            onClick={() => setShowUnir(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
          >
            <GitMerge size={14} /> Unir pacientes
          </button>

          <button
            onClick={() => setShowCrear(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F5A623] hover:bg-[#E8941A] text-white shadow"
          >
            <Plus size={14} /> Crear paciente
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Paciente</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Folio</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Contacto</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Próxima cita</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Protocolo</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtrados.map((p) => {
                const prox = proximaCitaFor(p);
                return (
                  <tr
                    key={p.id}
                    className="border-b border-gray-50 hover:bg-sky-50/60 transition-colors"
                  >
                    <td className="px-5 py-3.5 font-medium text-[#1E2A3A]">
                      {p.nombre} {p.apellido}
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 font-mono text-xs">{p.folio}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Phone size={11} className="text-gray-400" />
                        {p.telefono}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                        <Mail size={11} />
                        {p.email}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs">
                      {prox ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700">
                          <Calendar size={11} /> {formatDate(prox)}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">no hay citas próximas</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 text-xs max-w-48 truncate">{p.protocolo}</td>
                    <td className="px-5 py-3.5">
                      <EstadoBadge estado={p.estado} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => router.push(`/expedientes/${p.id}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5BC8E8] hover:bg-[#3DAFD0] text-white text-xs font-medium transition-colors shadow-sm"
                      >
                        <ExternalLink size={12} />
                        Ver expediente
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-400 text-sm">
                    No se encontraron pacientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NuevoPacienteModal open={showCrear} onClose={() => setShowCrear(false)} />

      <UnirPacientesModal
        open={showUnir}
        onClose={() => setShowUnir(false)}
        pacientes={pacientes}
        onMerge={(keepId, removeIds) => {
          setPacientes((prev) => prev.filter((p) => !removeIds.includes(p.id)));
          toast.success(
            `Pacientes unidos: ${removeIds.length} registro${
              removeIds.length === 1 ? "" : "s"
            } fusionado${removeIds.length === 1 ? "" : "s"} al expediente principal.`,
          );
        }}
      />
    </div>
  );
}

function UnirPacientesModal({
  open,
  onClose,
  pacientes,
  onMerge,
}: {
  open: boolean;
  onClose: () => void;
  pacientes: Paciente[];
  onMerge: (keepId: string, removeIds: string[]) => void;
}) {
  const grupos = useMemo(() => findDuplicateGroups(pacientes), [pacientes]);
  const [grupoIdx, setGrupoIdx] = useState(0);
  const grupo = grupos[grupoIdx];
  const [keepId, setKeepId] = useState<string | null>(null);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#1E2A3A] flex items-center gap-2">
            <GitMerge size={18} /> Unir pacientes duplicados
          </DialogTitle>
        </DialogHeader>

        {grupos.length === 0 ? (
          <div className="py-8 text-center">
            <CheckCircle2 size={36} className="mx-auto text-emerald-500 mb-2" />
            <p className="text-sm text-gray-600">
              No se detectaron duplicados por email o teléfono.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              El sistema compara email normalizado y los últimos 10 dígitos del teléfono.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span>
                Grupo {grupoIdx + 1} de {grupos.length}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setGrupoIdx((i) => Math.max(0, i - 1));
                    setKeepId(null);
                  }}
                  disabled={grupoIdx === 0}
                  className="px-2 py-1 rounded border border-gray-200 disabled:opacity-30"
                >
                  ←
                </button>
                <button
                  onClick={() => {
                    setGrupoIdx((i) => Math.min(grupos.length - 1, i + 1));
                    setKeepId(null);
                  }}
                  disabled={grupoIdx >= grupos.length - 1}
                  className="px-2 py-1 rounded border border-gray-200 disabled:opacity-30"
                >
                  →
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-2">
              Selecciona el registro <strong>principal</strong>. Los demás se
              fusionarán en él.
            </p>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {grupo?.map((p) => (
                <label
                  key={p.id}
                  className={`flex items-start gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                    keepId === p.id
                      ? "border-[#5BC8E8] bg-sky-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="keep"
                    checked={keepId === p.id}
                    onChange={() => setKeepId(p.id)}
                    className="mt-1 accent-[#5BC8E8]"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-[#1E2A3A]">
                      {p.nombre} {p.apellido}
                    </p>
                    <p className="text-gray-500">Folio {p.folio}</p>
                    <p className="text-gray-500">{p.email}</p>
                    <p className="text-gray-500">{p.telefono}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={onClose} className="text-xs">
                Cancelar
              </Button>
              <Button
                disabled={!keepId}
                onClick={() => {
                  if (!keepId || !grupo) return;
                  const removeIds = grupo.filter((p) => p.id !== keepId).map((p) => p.id);
                  onMerge(keepId, removeIds);
                  onClose();
                }}
                className="bg-[#E74C3C] hover:bg-[#C0392B] text-white border-0 text-xs"
              >
                <Trash2 size={12} className="mr-1" /> Fusionar y eliminar duplicados
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
