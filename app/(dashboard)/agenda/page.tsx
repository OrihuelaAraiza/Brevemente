"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { CrearCitaModal } from "@/components/agenda/CrearCitaModal";

const CalendarioFullCalendar = dynamic(
  () => import("@/components/agenda/CalendarioFullCalendar").then((m) => m.CalendarioFullCalendar),
  { ssr: false, loading: () => <div className="bg-white rounded-xl flex-1 animate-pulse" /> }
);

export default function AgendaPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultDate, setDefaultDate] = useState<Date | undefined>();
  const [search, setSearch] = useState("");

  function handleDateClick(date: Date) {
    setDefaultDate(date);
    setModalOpen(true);
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader
        title="Agenda"
        subtitle="Gestiona expedientes cumpliendo con NOM-004/NOM-024. La búsqueda se actualiza automáticamente."
        right={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar pacientes — Nombre, CURP o email"
                className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
              />
            </div>
          </div>
        }
      />

      <div className="flex-1 flex flex-col p-5 min-h-0">
        {/* Crear cita button */}
        <div className="flex mb-4">
          <Button
            onClick={() => { setDefaultDate(undefined); setModalOpen(true); }}
            className="bg-[#F5A623] hover:bg-[#E09515] text-white text-sm font-semibold px-5 border-0 shadow-md"
          >
            + Crear cita
          </Button>
        </div>

        <CalendarioFullCalendar onDateClick={handleDateClick} />
      </div>

      <CrearCitaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultDate={defaultDate}
      />
    </div>
  );
}
