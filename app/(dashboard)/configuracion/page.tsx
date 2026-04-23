"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { 
  PenTool, Moon, Sun, Bell, Globe, 
  MessageCircle, Mail, Shield, Upload, 
  Trash2, CheckCircle2, ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [hasSignature, setHasSignature] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#7AD7FF]">
      <SectionHeader title="Configuración" titleClassName="text-4xl" />
      <div className="h-2 bg-[#1E2A3A]" />
      
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="max-w-5xl mx-auto space-y-8 pb-10">
          
          {/* Digital Signature Section */}
          <div className="bg-white rounded-[3rem] p-8 shadow-xl border-4 border-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#FFBF00]/20 p-4 rounded-2xl">
                <PenTool className="text-[#1E2A3A]" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1E2A3A]">Firma Digital</h2>
                <p className="text-gray-400 text-sm italic">Tu firma se incluirá automáticamente en recetas y expedientes.</p>
              </div>
            </div>

            {!hasSignature ? (
              <div className="border-4 border-dashed border-gray-100 rounded-[2.5rem] p-12 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="text-[#5BC8E8]" size={32} />
                </div>
                <p className="text-[#1E2A3A] font-bold text-lg mb-1">Cargar Firma Digital</p>
                <p className="text-gray-400 text-sm">Formatos recomendados: PNG o JPG con fondo blanco o transparente.</p>
                <button 
                  onClick={() => setHasSignature(true)}
                  className="mt-6 bg-[#1E2A3A] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2D3E50] transition-colors"
                >
                  Seleccionar Archivo
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-gray-50 rounded-[2.5rem]">
                <div className="w-full md:w-64 h-32 bg-white rounded-2xl border-2 border-gray-100 flex items-center justify-center p-4">
                   <div className="text-gray-300 italic font-serif text-3xl select-none opacity-50">
                     Firma de Ejemplo
                   </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-green-600 font-bold">
                    <CheckCircle2 size={18} />
                    Firma cargada correctamente
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#1E2A3A] hover:bg-gray-100 transition-colors">
                      <Upload size={14} /> Reemplazar
                    </button>
                    <button 
                      onClick={() => setHasSignature(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={14} /> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Appearance Section */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#5BC8E8]/20 p-3 rounded-xl text-[#5BC8E8]">
                  <Sun size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#1E2A3A]">Apariencia</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon size={20} className="text-blue-500" /> : <Sun size={20} className="text-[#FFBF00]" />}
                    <div>
                      <p className="text-[#1E2A3A] font-bold text-sm">Modo Oscuro</p>
                      <p className="text-gray-400 text-xs">Ajusta la interfaz para entornos de poca luz</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      darkMode ? "bg-blue-500" : "bg-gray-200"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                      darkMode ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Globe size={20} className="text-indigo-500" />
                    <div>
                      <p className="text-[#1E2A3A] font-bold text-sm">Idioma</p>
                      <p className="text-gray-400 text-xs">Selecciona tu idioma preferido</p>
                    </div>
                  </div>
                  <select className="bg-transparent text-sm font-bold text-[#1E2A3A] focus:outline-none cursor-pointer">
                    <option>Español (MX)</option>
                    <option>English (US)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#F97316]/20 p-3 rounded-xl text-[#F97316]">
                  <Bell size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#1E2A3A]">Preferencias</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={20} className="text-green-500" />
                    <div>
                      <p className="text-[#1E2A3A] font-bold text-sm">WhatsApp</p>
                      <p className="text-gray-400 text-xs">Notificaciones de citas por mensaje</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      whatsappEnabled ? "bg-green-500" : "bg-gray-200"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                      whatsappEnabled ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-[#5BC8E8]" />
                    <div>
                      <p className="text-[#1E2A3A] font-bold text-sm">Email</p>
                      <p className="text-gray-400 text-xs">Recibe reportes y resúmenes semanales</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setEmailEnabled(!emailEnabled)}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      emailEnabled ? "bg-[#5BC8E8]" : "bg-gray-200"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                      emailEnabled ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
