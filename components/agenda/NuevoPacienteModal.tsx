"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NuevoPacienteModalProps {
  open: boolean;
  onClose: () => void;
  nombreInicial?: string;
}

export function NuevoPacienteModal({ open, onClose, nombreInicial = "" }: NuevoPacienteModalProps) {
  const [nombre, setNombre]       = useState(nombreInicial);
  const [apellido, setApellido]   = useState("");
  const [identificacion, setId]   = useState("");
  const [genero, setGenero]       = useState("");
  const [telefono, setTelefono]   = useState("");
  const [email, setEmail]         = useState("");
  const [seguro, setSeguro]       = useState("");

  function handleGuardar() {
    if (!nombre.trim()) return;
    toast.success("✅ Paciente creado. Formulario enviado por WhatsApp.");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#1E2A3A]">Nuevo paciente</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="personal">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="personal" className="flex-1 text-xs">Información personal</TabsTrigger>
            <TabsTrigger value="contacto" className="flex-1 text-xs">Datos de contacto</TabsTrigger>
            <TabsTrigger value="seguros"  className="flex-1 text-xs">Seguros y planes</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-3">
            <div>
              <label className="text-xs text-gray-600 font-medium">Nombre *</label>
              <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Rosa María" className="mt-1" />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-medium">Apellido *</label>
              <Input value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Espinosa García" className="mt-1" />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-medium">Identificación *</label>
              <Input value={identificacion} onChange={(e) => setId(e.target.value)} placeholder="CURP / INE" className="mt-1" />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-medium">Género</label>
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
              >
                <option value="">Seleccionar</option>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </TabsContent>

          <TabsContent value="contacto" className="space-y-3">
            <div>
              <label className="text-xs text-gray-600 font-medium">Teléfono</label>
              <div className="flex gap-2 mt-1">
                <span className="flex items-center px-3 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-500">+52</span>
                <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="55 1234 5678" className="flex-1" />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-600 font-medium">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="paciente@email.com" type="email" className="mt-1" />
            </div>
            <button className="text-xs text-[#5BC8E8] hover:underline">+ Agregar otro teléfono</button>
          </TabsContent>

          <TabsContent value="seguros" className="space-y-3">
            <div>
              <label className="text-xs text-gray-600 font-medium">Seguro médico</label>
              <Input value={seguro} onChange={(e) => setSeguro(e.target.value)} placeholder="IMSS, ISSSTE, GNP..." className="mt-1" />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-medium">Número de afiliado</label>
              <Input placeholder="000-000-000" className="mt-1" />
            </div>
            <button className="text-xs text-[#5BC8E8] hover:underline">+ Contactar otra persona</button>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancelar</Button>
          <Button
            onClick={handleGuardar}
            className="flex-1 bg-[#F5A623] hover:bg-[#E09515] text-white border-0"
          >
            Guardar →
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
