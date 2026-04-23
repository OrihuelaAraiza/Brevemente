"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import {
  SeccionExpedienteShell, Campo, Input, Select, Seccion, Textarea,
} from "@/components/expedientes/SeccionExpedienteShell";
import { mockPacientes } from "@/lib/mock-data";

export default function DatosGeneralesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const paciente = mockPacientes.find((p) => p.id === id);
  if (!paciente) notFound();

  const [form, setForm] = useState({
    nombre: paciente.nombre,
    apellido: paciente.apellido,
    folio: paciente.folio,
    curp: paciente.curp,
    fechaNacimiento: paciente.fechaNacimiento,
    edad: String(paciente.edad),
    sexo: paciente.sexo,
    estadoCivil: "Soltera",
    nacionalidad: "Mexicana",
    escolaridad: "Licenciatura",
    ocupacion: paciente.ocupacion,
    telefono: paciente.telefono,
    email: paciente.email,
    direccion: paciente.direccion,
    contactoEmergenciaNombre: "Laura Espinosa",
    contactoEmergenciaTelefono: "+52 555 111 2222",
    contactoEmergenciaRelacion: "Hermana",
    notas: "",
  });

  function set<K extends keyof typeof form>(key: K, v: string) {
    setForm((f) => ({ ...f, [key]: v }));
  }

  return (
    <SeccionExpedienteShell pacienteId={id} titulo="Datos Generales">
      <Seccion titulo="Información personal">
        <Campo label="Nombre(s)">
          <Input value={form.nombre} onChange={(e) => set("nombre", e.target.value)} />
        </Campo>
        <Campo label="Apellidos" span={2}>
          <Input value={form.apellido} onChange={(e) => set("apellido", e.target.value)} />
        </Campo>
        <Campo label="Folio">
          <Input value={form.folio} onChange={(e) => set("folio", e.target.value)} />
        </Campo>
        <Campo label="CURP">
          <Input value={form.curp} onChange={(e) => set("curp", e.target.value)} />
        </Campo>
        <Campo label="Fecha de nacimiento">
          <Input type="date" value={form.fechaNacimiento} onChange={(e) => set("fechaNacimiento", e.target.value)} />
        </Campo>
        <Campo label="Edad">
          <Input type="number" value={form.edad} onChange={(e) => set("edad", e.target.value)} />
        </Campo>
        <Campo label="Sexo">
          <Select value={form.sexo} onChange={(e) => set("sexo", e.target.value)}>
            <option>Femenino</option>
            <option>Masculino</option>
            <option>Otro</option>
          </Select>
        </Campo>
        <Campo label="Estado civil">
          <Select value={form.estadoCivil} onChange={(e) => set("estadoCivil", e.target.value)}>
            <option>Soltera</option>
            <option>Soltero</option>
            <option>Casada</option>
            <option>Casado</option>
            <option>Divorciada</option>
            <option>Divorciado</option>
            <option>Viuda</option>
            <option>Viudo</option>
            <option>Unión libre</option>
          </Select>
        </Campo>
        <Campo label="Nacionalidad">
          <Input value={form.nacionalidad} onChange={(e) => set("nacionalidad", e.target.value)} />
        </Campo>
        <Campo label="Escolaridad">
          <Input value={form.escolaridad} onChange={(e) => set("escolaridad", e.target.value)} />
        </Campo>
        <Campo label="Ocupación">
          <Input value={form.ocupacion} onChange={(e) => set("ocupacion", e.target.value)} />
        </Campo>
      </Seccion>

      <Seccion titulo="Contacto">
        <Campo label="Teléfono">
          <Input value={form.telefono} onChange={(e) => set("telefono", e.target.value)} />
        </Campo>
        <Campo label="Correo electrónico" span={2}>
          <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </Campo>
        <Campo label="Dirección" span={3}>
          <Input value={form.direccion} onChange={(e) => set("direccion", e.target.value)} />
        </Campo>
      </Seccion>

      <Seccion titulo="Contacto de emergencia">
        <Campo label="Nombre">
          <Input value={form.contactoEmergenciaNombre} onChange={(e) => set("contactoEmergenciaNombre", e.target.value)} />
        </Campo>
        <Campo label="Teléfono">
          <Input value={form.contactoEmergenciaTelefono} onChange={(e) => set("contactoEmergenciaTelefono", e.target.value)} />
        </Campo>
        <Campo label="Relación">
          <Input value={form.contactoEmergenciaRelacion} onChange={(e) => set("contactoEmergenciaRelacion", e.target.value)} />
        </Campo>
      </Seccion>

      <Seccion titulo="Notas">
        <Campo label="Observaciones generales" span={3}>
          <Textarea value={form.notas} onChange={(e) => set("notas", e.target.value)} placeholder="Anotaciones relevantes del caso…" />
        </Campo>
      </Seccion>
    </SeccionExpedienteShell>
  );
}
