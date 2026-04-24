"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import {
  SeccionExpedienteShell,
  Seccion,
  Campo,
  Input,
  Select,
  Textarea,
} from "@/components/expedientes/SeccionExpedienteShell";
import { mockPacientes, mockProtocolos } from "@/lib/mock-data";

const SPR_CATALOGO = [
  "SPR Fóbico (FOB)",
  "SPR Fóbico Obsesivo (FO)",
  "SPR Obsesivo Fóbico (OF)",
  "SPR Obsesivo (OBS)",
  "SPR Obsesivo Compulsivo (OC)",
  "SPR Obsesivo Paranoico (OP)",
  "SPR Paranoico (PAR)",
];

const VC_AREAS = ["Percepción", "Pensamientos", "Sensaciones", "Reacciones", "Síntomas", "Crisis"];

const VG_YO = ["Cuerpo", "Estudio", "Trabajo", "Deporte"];
const VG_DEMAS = ["Pareja", "Hijos", "Amigos", "Familia origen", "Familia política"];
const VG_MUNDO = ["Sociedad", "Situacional"];

export default function DxEstrategicoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const paciente = mockPacientes.find((p) => p.id === id);
  if (!paciente) notFound();

  const [form, setForm] = useState({
    motivoConsulta:
      "La paciente describe episodios súbitos de ansiedad con sensación de pérdida de control y miedo a morir, que le impiden trasladarse sola en transporte público.",
    protocolo: paciente.protocolo,
    primeraAparicion: "Hace 6 meses",
    factoresPrecipitantes: "Cambio de trabajo + pérdida familiar",
    evolucionTemporal: "Progresivo",
    dxOpInicial: paciente.spr,
    // VC inicial: cada área con descripción inicial
    vc: VC_AREAS.reduce<Record<string, string>>((acc, k) => {
      acc[k] = "";
      return acc;
    }, {}),
    // VG inicial: cada área marcada o no
    vg: [...VG_YO, ...VG_DEMAS, ...VG_MUNDO].reduce<Record<string, boolean>>((acc, k) => {
      acc[k] = false;
      return acc;
    }, {}),
    objetivoPaciente:
      "Poder salir de casa sin compañía y retomar actividades cotidianas sin anticipación ansiosa.",
    objetivoTerapeuta:
      "Romper el ciclo percepción → reacción de evitación; desmontar las tentativas de solución disfuncionales (hipervigilancia y búsqueda de reaseguramiento).",
  });

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function setVC(area: string, v: string) {
    setForm((f) => ({ ...f, vc: { ...f.vc, [area]: v } }));
  }

  function toggleVG(area: string) {
    setForm((f) => ({ ...f, vg: { ...f.vg, [area]: !f.vg[area] } }));
  }

  return (
    <SeccionExpedienteShell pacienteId={id} titulo="TX Psicoterapia TBE - DX Estratégico">
      <Seccion titulo="Motivo de consulta">
        <Campo label="Descripción textual del paciente" span={3}>
          <Textarea
            value={form.motivoConsulta}
            onChange={(e) => set("motivoConsulta", e.target.value)}
            rows={4}
          />
        </Campo>
      </Seccion>

      <Seccion titulo="Trastorno estratégico">
        <Campo label="Protocolo" span={3}>
          <Select value={form.protocolo} onChange={(e) => set("protocolo", e.target.value)}>
            {mockProtocolos.map((p) => (
              <option key={p.id}>{p.nombre}</option>
            ))}
          </Select>
        </Campo>
        <Campo label="Primera aparición">
          <Input
            value={form.primeraAparicion}
            onChange={(e) => set("primeraAparicion", e.target.value)}
            placeholder="Hace X meses, fecha, etc."
          />
        </Campo>
        <Campo label="Factores precipitantes" span={2}>
          <Input
            value={form.factoresPrecipitantes}
            onChange={(e) => set("factoresPrecipitantes", e.target.value)}
          />
        </Campo>
        <Campo label="Evolución temporal">
          <Select value={form.evolucionTemporal} onChange={(e) => set("evolucionTemporal", e.target.value)}>
            <option>Progresivo</option>
            <option>Agudo</option>
            <option>Crónico</option>
            <option>Episódico</option>
          </Select>
        </Campo>
      </Seccion>

      <Seccion titulo="DX.OP inicial">
        <Campo label="SPR inicial" span={3}>
          <Select value={form.dxOpInicial} onChange={(e) => set("dxOpInicial", e.target.value)}>
            {SPR_CATALOGO.map((spr) => (
              <option key={spr}>{spr}</option>
            ))}
          </Select>
        </Campo>
      </Seccion>

      <Seccion titulo="Valoración Cambio inicial (VC)">
        {VC_AREAS.map((area) => (
          <Campo key={area} label={area} span={3}>
            <Textarea
              value={form.vc[area] ?? ""}
              onChange={(e) => setVC(area, e.target.value)}
              rows={2}
              placeholder={`Descripción inicial: ${area.toLowerCase()}...`}
            />
          </Campo>
        ))}
      </Seccion>

      <Seccion titulo="Valoración Global inicial (VG)">
        <Campo label="YO" span={3}>
          <VGGroup areas={VG_YO} vg={form.vg} onToggle={toggleVG} />
        </Campo>
        <Campo label="DEMÁS" span={3}>
          <VGGroup areas={VG_DEMAS} vg={form.vg} onToggle={toggleVG} />
        </Campo>
        <Campo label="MUNDO" span={3}>
          <VGGroup areas={VG_MUNDO} vg={form.vg} onToggle={toggleVG} />
        </Campo>
      </Seccion>

      <Seccion titulo="Objetivo Terapéutico">
        <Campo label="Paciente" span={3}>
          <Textarea
            value={form.objetivoPaciente}
            onChange={(e) => set("objetivoPaciente", e.target.value)}
            rows={2}
            placeholder="Expresado en palabras del paciente..."
          />
        </Campo>
        <Campo label="Terapeuta" span={3}>
          <Textarea
            value={form.objetivoTerapeuta}
            onChange={(e) => set("objetivoTerapeuta", e.target.value)}
            rows={2}
            placeholder="Objetivo clínico-estratégico..."
          />
        </Campo>
      </Seccion>
    </SeccionExpedienteShell>
  );
}

function VGGroup({
  areas,
  vg,
  onToggle,
}: {
  areas: string[];
  vg: Record<string, boolean>;
  onToggle: (area: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {areas.map((area) => {
        const on = vg[area];
        return (
          <label
            key={area}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border cursor-pointer text-xs transition-colors ${
              on
                ? "bg-[#F5A623] text-white border-[#F5A623]"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <input
              type="checkbox"
              checked={on}
              onChange={() => onToggle(area)}
              className="hidden"
            />
            {area}
          </label>
        );
      })}
    </div>
  );
}
