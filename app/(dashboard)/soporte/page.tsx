"use client";

import { SectionHeader } from "@/components/layout/SectionHeader";
import { 
  Mail, MessageSquare, LifeBuoy, 
  Send, Camera, AlertCircle, 
  CheckCircle2, Clock, Headphones
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Page() {
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#7AD7FF]">
      <SectionHeader title="Soporte Técnico" titleClassName="text-4xl" />
      <div className="h-2 bg-[#1E2A3A]" />
      
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="max-w-6xl mx-auto space-y-10 pb-12">
          
          {/* Quick Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-lg flex flex-col items-center text-center group hover:bg-[#1E2A3A] transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-[#5BC8E8]/20 group-hover:text-white transition-colors">
                <Mail size={32} className="text-[#5BC8E8]" />
              </div>
              <h3 className="text-[#1E2A3A] font-bold text-lg group-hover:text-white">Correo Electrónico</h3>
              <p className="text-gray-400 text-sm mb-4 group-hover:text-white/60">Respuesta en menos de 24h</p>
              <a href="mailto:soporte@brevemente.com" className="text-[#5BC8E8] font-bold hover:underline">
                soporte@brevemente.com
              </a>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-lg flex flex-col items-center text-center group hover:bg-[#1E2A3A] transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-500/20 group-hover:text-white transition-colors">
                <MessageSquare size={32} className="text-green-500" />
              </div>
              <h3 className="text-[#1E2A3A] font-bold text-lg group-hover:text-white">Chat en Vivo</h3>
              <p className="text-gray-400 text-sm mb-4 group-hover:text-white/60">Disponible Lun-Vie 9am-6pm</p>
              <button className="bg-green-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-600 transition-colors">
                Iniciar Chat
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-lg flex flex-col items-center text-center group hover:bg-[#1E2A3A] transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-[#FFBF00]/20 group-hover:text-white transition-colors">
                <Headphones size={32} className="text-[#FFBF00]" />
              </div>
              <h3 className="text-[#1E2A3A] font-bold text-lg group-hover:text-white">Línea Prioritaria</h3>
              <p className="text-gray-400 text-sm mb-4 group-hover:text-white/60">Exclusivo para plan Ultra Pro</p>
              <p className="text-[#FFBF00] font-bold italic text-sm">Disponible 24/7</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Issue Report Form */}
            <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 shadow-xl border-4 border-white">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-red-50 p-3 rounded-xl">
                  <AlertCircle className="text-red-500" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1E2A3A]">Informar un Problema</h2>
                  <p className="text-gray-400 text-sm">Describe el error para que nuestro equipo técnico pueda resolverlo.</p>
                </div>
              </div>

              {formSent ? (
                <div className="bg-green-50 rounded-[2rem] p-12 text-center border-2 border-green-100 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">¡Reporte Enviado!</h3>
                  <p className="text-green-600 mb-6">Hemos recibido tu reporte. Un técnico se pondrá en contacto contigo a la brevedad.</p>
                  <button 
                    onClick={() => setFormSent(false)}
                    className="text-green-700 font-bold hover:underline"
                  >
                    Enviar otro reporte
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[#1E2A3A] font-bold text-sm ml-2">¿Qué está pasando?</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Error al guardar expediente, falla en la carga de fotos..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-[#5BC8E8]/20 transition-all font-medium"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#1E2A3A] font-bold text-sm ml-2">Descripción detallada</label>
                    <textarea 
                      placeholder="Por favor, describe los pasos para reproducir el problema..."
                      rows={5}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-[#5BC8E8]/20 transition-all font-medium resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#1E2A3A] font-bold text-sm ml-2">Capturas de pantalla (Opcional)</label>
                    <div className="border-4 border-dashed border-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-100 transition-colors cursor-pointer group">
                      <Camera size={40} className="text-gray-300 group-hover:text-[#5BC8E8] transition-colors mb-2" />
                      <p className="text-gray-400 text-sm font-medium">Haz clic o arrastra tus imágenes aquí</p>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#1E2A3A] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#2D3E50] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    <Send size={20} />
                    Enviar Reporte Técnico
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar / Additional Info */}
            <div className="space-y-8">
              <div className="bg-[#1E2A3A] rounded-[2.5rem] p-8 text-white shadow-xl">
                <LifeBuoy className="text-[#FFBF00] mb-4" size={32} />
                <h3 className="text-xl font-bold mb-4">Centro de Ayuda</h3>
                <p className="text-white/60 text-sm mb-6 italic">
                  Consulta nuestra documentación para resolver dudas comunes de configuración y uso del sistema.
                </p>
                <button className="w-full py-3 bg-white/10 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors border border-white/20">
                  Ver Documentación
                </button>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-100">
                <h3 className="text-[#1E2A3A] font-bold mb-4">Estado del Sistema</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">Servidores IA ROMI</span>
                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">ONLINE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">Base de Datos</span>
                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">ONLINE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">Servicios WhatsApp</span>
                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">ONLINE</span>
                  </div>
                </div>
              </div>

              <div className="text-center p-4">
                <p className="text-white/60 text-xs italic font-medium">
                  Versión del sistema: 2.4.1-stable<br/>
                  © 2026 BreveMente Labs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
