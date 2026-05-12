"use client";

import { SectionHeader } from "@/components/layout/SectionHeader";
import { Zap, Brain, ShieldCheck, BarChart, Users, Sparkles, Target, Clock, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
  {
    title: "Primer Expediente TBE Digital",
    description: "Romi Mente es el primer sistema en el mundo que digitaliza completamente el expediente médico basado en el modelo de Terapia Breve Estratégica.",
    icon: FolderOpen,
    color: "bg-[#FFBF00]/20 text-[#1E2A3A]",
    gradient: "from-[#FFBF00]/20 to-transparent"
  },
  {
    title: "Especialización en TBE",
    description: "Protocolos optimizados para Terapia Breve Estratégica que guían tu práctica clínica hacia resultados rápidos y duraderos.",
    icon: Target,
    color: "bg-blue-50 text-blue-500",
    gradient: "from-blue-500/10 to-transparent"
  },
  {
    title: "IA ROMI: Tu Copiloto",
    description: "Inteligencia Artificial entrenada en psicoterapia que analiza evoluciones y sugiere intervenciones basadas en evidencia.",
    icon: Brain,
    color: "bg-purple-50 text-purple-500",
    gradient: "from-purple-500/10 to-transparent"
  },
  {
    title: "Seguimiento de Desempeño",
    description: "Visualiza la mejoría de tus pacientes con métricas precisas y gráficas demográficas de última generación.",
    icon: BarChart,
    color: "bg-green-50 text-green-500",
    gradient: "from-green-500/10 to-transparent"
  },
  {
    title: "Automatización Clínica",
    description: "Agenda inteligente, recordatorios vía WhatsApp y expediente digital que te ahorran horas de trabajo administrativo.",
    icon: Clock,
    color: "bg-orange-50 text-orange-500",
    gradient: "from-orange-500/10 to-transparent"
  },
  {
    title: "Privacidad de Grado Médico",
    description: "Encriptación de punto a punto para proteger la información sensible de tus pacientes y cumplir con normativas.",
    icon: ShieldCheck,
    color: "bg-indigo-50 text-indigo-500",
    gradient: "from-indigo-500/10 to-transparent"
  },
  {
    title: "Comunidad y Crecimiento",
    description: "Acceso a recursos exclusivos, supervisión de casos y formación continua en modelos terapéuticos avanzados.",
    icon: Sparkles,
    color: "bg-yellow-50 text-yellow-600",
    gradient: "from-yellow-500/10 to-transparent"
  }
];

export default function Page() {
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#7AD7FF]">
      <SectionHeader title="Beneficios" titleClassName="text-4xl" />
      <div className="h-2 bg-[#1E2A3A]" />
      
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="max-w-6xl mx-auto space-y-12 pb-12">
          
          {/* Featured Hero Section */}
          <div className="relative bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center border-4 border-white">
            <div className="flex-1 p-10 lg:p-16 z-10">
              <span className="inline-block bg-[#FFBF00] text-[#1E2A3A] px-4 py-1.5 rounded-full text-xs font-black mb-6 tracking-widest uppercase">
                Exclusivo para Psicoterapeutas
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#1E2A3A] leading-tight mb-6">
                Eleva tu práctica al siguiente nivel con <span className="text-[#5BC8E8]">TBE</span>
              </h2>
              <p className="text-gray-500 text-lg mb-8 max-w-xl italic">
                "Romi Mente no es solo un software de gestión, es una extensión de tu mente estratégica diseñada para maximizar el cambio en cada sesión."
              </p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                      <Users size={18} className="text-gray-400" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-bold text-[#1E2A3A]">
                  +500 Especialistas ya están transformando vidas
                </p>
              </div>
            </div>
            
            {/* Image Placeholder / Generated Image */}
            <div className="w-full lg:w-[400px] h-[300px] lg:h-full bg-gradient-to-br from-[#5BC8E8]/20 to-[#7AD7FF] relative flex items-center justify-center p-8">
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white">
                 <img 
                   src="/tbe_concept.png" 
                   alt="TBE Concept" 
                   className="w-full h-full object-cover"
                 />
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-[2.5rem] p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#FFBF00] group relative overflow-hidden"
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity", benefit.gradient)} />
                
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10", benefit.color)}>
                  <benefit.icon size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-[#1E2A3A] mb-4 relative z-10">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10 italic">
                  {benefit.description}
                </p>
                
                <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-20 transition-opacity">
                  <Zap size={60} className="text-[#FFBF00]" />
                </div>
              </div>
            ))}
          </div>

          {/* Call to action footer */}
          <div className="text-center bg-[#1E2A3A] rounded-[3rem] p-12 shadow-xl border-4 border-[#FFBF00]/30">
            <h3 className="text-3xl font-bold text-white mb-4">¿Listo para aplicar la estrategia perfecta?</h3>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Empieza a utilizar las herramientas diseñadas específicamente para el modelo de Terapia Breve Estratégica.
            </p>
            <button className="bg-[#FFBF00] text-[#1E2A3A] px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-lg">
              Explorar Protocolos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
