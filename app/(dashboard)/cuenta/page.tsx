"use client";

import { SectionHeader } from "@/components/layout/SectionHeader";
import { User, Mail, Phone, MapPin, Award, Shield, Key, Edit3, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#7AD7FF]">
      <SectionHeader title="Mi Cuenta" titleClassName="text-4xl" />
      <div className="h-2 bg-[#1E2A3A]" />
      
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Profile Header Card */}
          <div className="bg-white rounded-[3rem] p-8 shadow-xl flex flex-col md:flex-row items-center gap-10">
            <div className="relative group">
              <div className="w-40 h-40 rounded-[2.5rem] bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-[#FFBF00] shadow-lg">
                <User size={80} className="text-gray-300" />
                {/* Simulated photo overlay */}
                <div className="absolute inset-0 bg-[#1E2A3A]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white" size={32} />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#FFBF00] p-3 rounded-2xl shadow-md cursor-pointer hover:bg-[#FFD700] transition-colors">
                <Edit3 size={20} className="text-[#1E2A3A]" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-[#1E2A3A]">Dr. Roberto Gómez Sánchez</h2>
                <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold self-center md:self-auto">
                  CUENTA VERIFICADA
                </span>
              </div>
              <p className="text-[#F97316] font-bold text-xl mb-4 italic">Médico Psicoterapeuta • Especialista en TBE</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={18} className="text-[#5BC8E8]" />
                  <span className="text-sm font-medium">roberto.gomez@romimente.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={18} className="text-[#5BC8E8]" />
                  <span className="text-sm font-medium">+52 55 1234 5678</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin size={18} className="text-[#5BC8E8]" />
                  <span className="text-sm font-medium">Ciudad de México, CP 01000</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Award size={18} className="text-[#5BC8E8]" />
                  <span className="text-sm font-medium">Cédula Prof: 7482910</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
            {/* Professional Details Section */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-[#1E2A3A] flex items-center gap-3">
                  <Shield className="text-[#FFBF00]" />
                  Información Profesional
                </h3>
                <button className="text-[#5BC8E8] font-bold text-sm hover:underline">Editar</button>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-xs font-bold uppercase">Universidad de Egreso</label>
                  <p className="text-[#1E2A3A] font-medium">UNAM - Facultad de Medicina</p>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-xs font-bold uppercase">Especialidades</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold">Psicoterapia Breve</span>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold">TBE</span>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold">Psicología Clínica</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-xs font-bold uppercase">Ubicación Consultorio</label>
                  <p className="text-[#1E2A3A] font-medium">Torre Médica, Consultorio 402, Condesa.</p>
                </div>
              </div>
            </div>

            {/* Security & Settings Section */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-[#1E2A3A] flex items-center gap-3">
                  <Key className="text-[#FFBF00]" />
                  Seguridad y Acceso
                </h3>
              </div>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-xl shadow-sm">
                      <Key size={18} className="text-[#1E2A3A]" />
                    </div>
                    <div className="text-left">
                      <p className="text-[#1E2A3A] font-bold">Cambiar Contraseña</p>
                      <p className="text-gray-400 text-xs">Actualiza tu clave de acceso periódicamente</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-300 group-hover:text-[#FFBF00]" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-xl shadow-sm">
                      <Shield size={18} className="text-[#1E2A3A]" />
                    </div>
                    <div className="text-left">
                      <p className="text-[#1E2A3A] font-bold">Autenticación en dos pasos</p>
                      <p className="text-gray-400 text-xs">Añade una capa extra de seguridad</p>
                    </div>
                  </div>
                  <div className="bg-gray-200 w-12 h-6 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </button>

                <div className="pt-4">
                  <p className="text-xs text-gray-400 text-center italic">
                    Último inicio de sesión: Hoy a las 09:45 am desde CDMX, MX.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ className, size = 20 }: { className?: string, size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
