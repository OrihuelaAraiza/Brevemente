"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import {
  SeccionExpedienteShell, Campo, Input, Select, Seccion, Textarea,
} from "@/components/expedientes/SeccionExpedienteShell";
import { mockPacientes } from "@/lib/mock-data";

export default function HistoriaClinicaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const paciente = mockPacientes.find((p) => p.id === id);
  if (!paciente) notFound();

  const [form, setForm] = useState({
    motivoConsulta: "La paciente reporta episodios recurrentes de ansiedad con sensación de falta de aire.",
    padecimientoActual: "Primer episodio hace 6 meses, se incrementa en situaciones sociales y en transporte público.",
    primeraAparicion: "Hace 6 meses",
    factoresPrecipitantes: "Cambio de trabajo y pérdida familiar reciente.",
    evolucionTemporal: "Progresivo",
    antecedentesPersonales: "Niega enfermedades crónicas. Apendicectomía a los 19 años.",
    antecedentesFamiliares: "Madre con diagnóstico de trastorno de ansiedad generalizada.",
    antecedentesPsiquiatricos: "No ha recibido atención psicológica previa.",
    medicacionActual: "Ninguna",
    alergias: "Penicilina",
    habitosTabaco: "No",
    habitosAlcohol: "Ocasional",
    habitosSustancias: "No",
    actividadFisica: "Caminata 3 veces por semana",
    sueno: "Dificultad para conciliar el sueño",
    alimentacion: "Regular, 3 comidas al día",
    redDeApoyo: "Familia cercana y 2 amistades cercanas",
    modalidadRegistro: "Con grabación: IA",
    consentimientoInformado: true,
    avisoPrivacidad: true,
  });

  function set<K extends keyof typeof form>(key: K, v: string | boolean) {
    setForm((f) => ({ ...f, [key]: v }));
  }

  return (
    <SeccionExpedienteShell pacienteId={id} titulo="Historia Clínica">
      <Seccion titulo="Motivo de consulta">
        <Campo label="Motivo de consulta" span={3}>
          <Textarea value={form.motivoConsulta} onChange={(e) => set("motivoConsulta", e.target.value)} />
        </Campo>
        <Campo label="Padecimiento actual" span={3}>
          <Textarea value={form.padecimientoActual} onChange={(e) => set("padecimientoActual", e.target.value)} />
        </Campo>
      </Seccion>

      <Seccion titulo="Trastorno estratégico">
        <Campo label="Primera aparición">
          <Input value={form.primeraAparicion} onChange={(e) => set("primeraAparicion", e.target.value)} />
        </Campo>
        <Campo label="Factores precipitantes" span={2}>
          <Input value={form.factoresPrecipitantes} onChange={(e) => set("factoresPrecipitantes", e.target.value)} />
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

      <Seccion titulo="Antecedentes">
        <Campo label="Antecedentes personales patológicos" span={3}>
          <Textarea value={form.antecedentesPersonales} onChange={(e) => set("antecedentesPersonales", e.target.value)} />
        </Campo>
        <Campo label="Antecedentes familiares" span={3}>
          <Textarea value={form.antecedentesFamiliares} onChange={(e) => set("antecedentesFamiliares", e.target.value)} />
        </Campo>
        <Campo label="Antecedentes psiquiátricos / psicológicos" span={3}>
          <Textarea value={form.antecedentesPsiquiatricos} onChange={(e) => set("antecedentesPsiquiatricos", e.target.value)} />
        </Campo>
      </Seccion>

      <Seccion titulo="Estado actual">
        <Campo label="Medicación actual">
          <Input value={form.medicacionActual} onChange={(e) => set("medicacionActual", e.target.value)} />
        </Campo>
        <Campo label="Alergias">
          <Input value={form.alergias} onChange={(e) => set("alergias", e.target.value)} />
        </Campo>
        <Campo label="Actividad física">
          <Input value={form.actividadFisica} onChange={(e) => set("actividadFisica", e.target.value)} />
        </Campo>
        <Campo label="Sueño">
          <Input value={form.sueno} onChange={(e) => set("sueno", e.target.value)} />
        </Campo>
        <Campo label="Alimentación">
          <Input value={form.alimentacion} onChange={(e) => set("alimentacion", e.target.value)} />
        </Campo>
        <Campo label="Red de apoyo">
          <Input value={form.redDeApoyo} onChange={(e) => set("redDeApoyo", e.target.value)} />
        </Campo>
        <Campo label="Tabaco">
          <Select value={form.habitosTabaco} onChange={(e) => set("habitosTabaco", e.target.value)}>
            <option>No</option>
            <option>Ocasional</option>
            <option>Diario</option>
          </Select>
        </Campo>
        <Campo label="Alcohol">
          <Select value={form.habitosAlcohol} onChange={(e) => set("habitosAlcohol", e.target.value)}>
            <option>No</option>
            <option>Ocasional</option>
            <option>Frecuente</option>
          </Select>
        </Campo>
        <Campo label="Otras sustancias">
          <Select value={form.habitosSustancias} onChange={(e) => set("habitosSustancias", e.target.value)}>
            <option>No</option>
            <option>Ocasional</option>
            <option>Frecuente</option>
          </Select>
        </Campo>
      </Seccion>

      <Seccion titulo="Modalidad de registro">
        <Campo label="Forma de registro del expediente" span={2}>
          <Select value={form.modalidadRegistro} onChange={(e) => set("modalidadRegistro", e.target.value)}>
            <option>Con grabación: IA</option>
            <option>Sin grabación: Manual</option>
          </Select>
        </Campo>
        <Campo label="Consentimientos">
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.consentimientoInformado}
                onChange={(e) => set("consentimientoInformado", e.target.checked)}
                className="accent-[#F5A623]"
              />
              Consentimiento informado firmado
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.avisoPrivacidad}
                onChange={(e) => set("avisoPrivacidad", e.target.checked)}
                className="accent-[#F5A623]"
              />
              Aviso de privacidad aceptado
            </label>
          </div>
        </Campo>
      </Seccion>
    </SeccionExpedienteShell>
  );
}
