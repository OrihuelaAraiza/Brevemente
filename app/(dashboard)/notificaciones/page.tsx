"use client";

import { SectionHeader } from "@/components/layout/SectionHeader";
import { Bell, User, Calendar, Clock, ChevronRight } from "lucide-react";
import { mockPacientes, mockCitasHoy } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    paciente: mockPacientes[0].nombre + " " + mockPacientes[0].apellido,
    detalle: "Nueva cita agendada",
    hora: "hace 5 min",
    tipo: "cita",
    leida: false,
    citaInfo: "9:00 am - Consulta General"
  },
  {
    id: 2,
    paciente: mockPacientes[1].nombre + " " + mockPacientes[1].apellido,
    detalle: "Expediente actualizado",
    hora: "hace 20 min",
    tipo: "expediente",
    leida: false,
    citaInfo: "10:00 am - Seguimiento"
  },
  {
    id: 3,
    paciente: mockPacientes[2].nombre + " " + mockPacientes[2].apellido,
    detalle: "Cita cancelada",
    hora: "hace 1 hora",
    tipo: "cancelacion",
    leida: true,
    citaInfo: "11:00 am - Evaluación Inicial"
  },
  {
    id: 4,
    paciente: mockPacientes[3].nombre + " " + mockPacientes[3].apellido,
    detalle: "Nueva nota en expediente",
    hora: "hace 3 horas",
    tipo: "nota",
    leida: true,
    citaInfo: "12:00 pm - Terapia TBE"
  },
  {
    id: 5,
    paciente: mockPacientes[4].nombre + " " + mockPacientes[4].apellido,
    detalle: "Confirmación de asistencia",
    hora: "hace 5 horas",
    tipo: "confirmacion",
    leida: true,
    citaInfo: "1:00 pm - Sesión 2"
  }
];

export default function Page() {
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#7AD7FF]">
      <SectionHeader title="Notificaciones" titleClassName="text-4xl" />
      <div className="h-2 bg-[#1E2A3A]" />
      
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[#1E2A3A] text-2xl font-bold italic">Actividad reciente</h2>
            <button className="text-sm font-bold text-[#1E2A3A]/60 hover:text-[#1E2A3A] transition-colors">
              Marcar todas como leídas
            </button>
          </div>

          <div className="space-y-4">
            {notifications.map((notif) => (
              <div 
                key={notif.id}
                className={cn(
                  "bg-white rounded-[2rem] p-6 shadow-sm border-2 border-transparent transition-all duration-300 hover:shadow-md hover:border-[#FFBF00] group cursor-pointer flex items-center gap-6",
                  !notif.leida && "border-l-8 border-l-[#FFBF00]"
                )}
              >
                {/* Status Dot */}
                <div className="relative">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center",
                    notif.tipo === 'cita' ? "bg-blue-50 text-blue-500" :
                    notif.tipo === 'expediente' ? "bg-green-50 text-green-500" :
                    notif.tipo === 'cancelacion' ? "bg-red-50 text-red-500" : "bg-purple-50 text-purple-500"
                  )}>
                    {notif.tipo === 'cita' ? <Calendar size={28} /> : 
                     notif.tipo === 'expediente' ? <User size={28} /> : <Bell size={28} />}
                  </div>
                  {!notif.leida && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFBF00] rounded-full border-2 border-white animate-pulse" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#1E2A3A] font-bold text-lg">
                      Paciente {notif.paciente}
                    </span>
                    <span className="text-gray-400 text-sm">• {notif.hora}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500">
                    <span className="flex items-center gap-1.5 text-sm font-medium">
                      <Clock size={14} className="text-[#F97316]" />
                      {notif.citaInfo}
                    </span>
                    <span className="text-sm italic">{notif.detalle}</span>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="text-[#FFBF00]" size={32} />
                </div>
              </div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-20 bg-white/20 rounded-[3rem] border-2 border-dashed border-white/50">
              <Bell className="w-16 h-16 text-white mx-auto mb-4 opacity-50" />
              <p className="text-white font-bold text-xl">No tienes notificaciones nuevas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
