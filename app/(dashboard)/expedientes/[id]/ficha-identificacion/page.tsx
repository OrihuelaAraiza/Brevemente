"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import {
  SeccionExpedienteShell, Campo, Input, Select, Seccion,
} from "@/components/expedientes/SeccionExpedienteShell";
import { mockPacientes } from "@/lib/mock-data";

export default function FichaIdentificacionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const paciente = mockPacientes.find((p) => p.id === id);
  if (!paciente) notFound();

  const [form, setForm] = useState({
    tipoIdentificacion: "INE",
    numeroIdentificacion: "EIGR850312M1234",
    expedida: "INE / IFE",
    vigencia: "2029-03-12",
    rfc: "EIGR850312A72",
    nss: "12345678901",
    aseguradora: "GNP Seguros",
    poliza: "GNP-1025734",
    tipoSangre: "O+",
    religion: "Católica",
    preferenciaPronombre: "Ella",
  });

  function set<K extends keyof typeof form>(key: K, v: string) {
    setForm((f) => ({ ...f, [key]: v }));
  }

  return (
    <SeccionExpedienteShell pacienteId={id} titulo="Ficha de identificación">
      <Seccion titulo="Documentos oficiales">
        <Campo label="Tipo de identificación">
          <Select value={form.tipoIdentificacion} onChange={(e) => set("tipoIdentificacion", e.target.value)}>
            <option>INE</option>
            <option>Pasaporte</option>
            <option>Cédula profesional</option>
            <option>Licencia de conducir</option>
          </Select>
        </Campo>
        <Campo label="Número">
          <Input value={form.numeroIdentificacion} onChange={(e) => set("numeroIdentificacion", e.target.value)} />
        </Campo>
        <Campo label="Expedida por">
          <Input value={form.expedida} onChange={(e) => set("expedida", e.target.value)} />
        </Campo>
        <Campo label="Vigencia">
          <Input type="date" value={form.vigencia} onChange={(e) => set("vigencia", e.target.value)} />
        </Campo>
        <Campo label="RFC">
          <Input value={form.rfc} onChange={(e) => set("rfc", e.target.value)} />
        </Campo>
        <Campo label="NSS">
          <Input value={form.nss} onChange={(e) => set("nss", e.target.value)} />
        </Campo>
      </Seccion>

      <Seccion titulo="Seguros y plan médico">
        <Campo label="Aseguradora / plan médico">
          <Input value={form.aseguradora} onChange={(e) => set("aseguradora", e.target.value)} />
        </Campo>
        <Campo label="Póliza o número de afiliación" span={2}>
          <Input value={form.poliza} onChange={(e) => set("poliza", e.target.value)} />
        </Campo>
      </Seccion>

      <Seccion titulo="Datos biométricos / culturales">
        <Campo label="Tipo de sangre">
          <Select value={form.tipoSangre} onChange={(e) => set("tipoSangre", e.target.value)}>
            {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((t) => <option key={t}>{t}</option>)}
          </Select>
        </Campo>
        <Campo label="Religión">
          <Input value={form.religion} onChange={(e) => set("religion", e.target.value)} />
        </Campo>
        <Campo label="Pronombre preferido">
          <Input value={form.preferenciaPronombre} onChange={(e) => set("preferenciaPronombre", e.target.value)} />
        </Campo>
      </Seccion>
    </SeccionExpedienteShell>
  );
}
