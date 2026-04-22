"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Printer, Upload, FileText, Plus, MoreHorizontal, FilePlus } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

function BrifiIconSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="bG4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="40%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </radialGradient>
      </defs>
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <ellipse key={i} cx="12" cy="12" rx="3" ry="6.5" fill="url(#bG4)" fillOpacity="0.75"
          transform={`rotate(${deg} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

export default function ReportesPage() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tipo, setTipo]   = useState("constancia");
  const [texto, setTexto] = useState("");

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Inicio - Reportes y Constancias" />

      {/* Action bar */}
      <div className="bg-white border-b border-gray-100 px-5 py-2.5 flex items-center gap-3">
        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetTrigger className="flex items-center gap-2 text-sm font-medium text-[#1E2A3A] hover:text-[#5BC8E8] transition-colors bg-transparent border-0 cursor-pointer p-0">
            <FilePlus size={16} />
            Crear nueva Constancia
            <span className="w-5 h-5 rounded-full bg-[#5BC8E8] text-white flex items-center justify-center text-xs font-bold">+</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-96">
            <SheetHeader>
              <SheetTitle>Nueva Constancia</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Tipo de documento</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                >
                  <option value="constancia">Constancia de tratamiento</option>
                  <option value="reporte">Reporte de progreso</option>
                  <option value="bitacora">Bitácora de supervisión</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Paciente</label>
                <Input placeholder="Buscar paciente..." />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Contenido</label>
                <textarea
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  rows={6}
                  placeholder="Redactar contenido de la constancia..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none"
                />
              </div>
              <Button
                className="w-full bg-[#F5A623] hover:bg-[#E09515] text-white border-0"
                onClick={() => {
                  toast.success("✅ Constancia creada correctamente.");
                  setDrawerOpen(false);
                }}
              >
                Guardar constancia
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1" />

        {/* Action icons */}
        <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors" title="Enviar">
          <Send size={16} />
        </button>
        <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors" title="Imprimir">
          <Printer size={16} />
        </button>
        <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors" title="Exportar">
          <Upload size={16} />
        </button>
        <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors" title="PDF">
          <FileText size={16} />
        </button>

        <button
          onClick={() => router.push("/brifi")}
          className="flex items-center gap-1 px-2 py-1 rounded bg-purple-50 hover:bg-purple-100 transition-colors"
        >
          <BrifiIconSmall />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="p-1.5 text-gray-400 hover:text-gray-600 bg-transparent border-0 cursor-pointer">
            <MoreHorizontal size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/expedientes")}>→ Expediente nuevo</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/expedientes")}>→ Expediente archivado</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/biblioteca")}>→ Biblioteca digital</DropdownMenuItem>
            <DropdownMenuItem>→ Bitácora supervisión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#5BC8E8]">
        <div className="flex flex-col items-center gap-4 text-white/70">
          <FileText size={56} className="opacity-40" />
          <p className="text-lg font-medium text-white/80">No hay constancias creadas aún.</p>
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-sm text-white underline underline-offset-2 hover:text-white transition-colors"
          >
            Crear primera constancia →
          </button>
        </div>
      </div>
    </div>
  );
}
