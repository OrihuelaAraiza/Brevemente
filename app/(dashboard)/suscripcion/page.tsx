"use client";

import { SectionHeader } from "@/components/layout/SectionHeader";
import { Check, Zap, Shield, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Start Medical",
    icon: <Zap className="w-8 h-8 text-blue-500" />,
    price: "$299",
    period: "/mes",
    description: "Ideal para consultorios pequeños que inician su digitalización.",
    features: [
      "Expediente Clínico Digital",
      "Agenda de Citas Básica",
      "Notificaciones vía Email",
      "Soporte Estándar",
      "Hasta 50 pacientes",
      "Seguridad de datos básica"
    ],
    color: "blue",
    buttonText: "Comenzar ahora"
  },
  {
    name: "Semi Pro",
    icon: <Shield className="w-8 h-8 text-amber-500" />,
    price: "$599",
    period: "/mes",
    description: "Para profesionales con flujo constante de pacientes.",
    features: [
      "Todo lo de Start Medical",
      "Notificaciones WhatsApp",
      "Firma Digital",
      "Reportes de Desempeño",
      "Pacientes ilimitados",
      "Soporte Prioritario"
    ],
    color: "amber",
    buttonText: "Subir a Semi Pro",
    recommended: true
  },
  {
    name: "Ultra Pro",
    icon: <Crown className="w-8 h-8 text-purple-500" />,
    price: "$999",
    period: "/mes",
    description: "La solución definitiva para clínicas y centros médicos.",
    features: [
      "Todo lo de Semi Pro",
      "Multiconsultorio",
      "API de Integración",
      "Inteligencia Artificial ROMI",
      "Personalización de Marca Blanca",
      "Gerente de Cuenta Dedicado"
    ],
    color: "purple",
    buttonText: "Ir a Ultra Pro"
  }
];

export default function Page() {
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#7AD7FF]">
      <SectionHeader 
        title="Suscripción" 
        titleClassName="text-4xl" 
        right={
          <div className="flex items-center gap-2 bg-gray-50 px-6 py-2 rounded-full border border-gray-200 shadow-sm">
            <span className="text-[#1E2A3A] font-medium">Tu tipo:</span>
            <span className="text-[#F97316] font-bold">Start Medical</span>
          </div>
        }
      />
      <div className="h-2 bg-[#1E2A3A]" />
      
      <div className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-[#1E2A3A] text-3xl font-bold mb-4">Elige el plan ideal para tu práctica</h2>
            <p className="text-[#1E2A3A]/70 text-lg max-w-2xl">
              Nuestras suscripciones están diseñadas para crecer contigo. Desde consultorios independientes hasta grandes centros médicos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full pb-12">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={cn(
                  "relative bg-white rounded-[2.5rem] p-8 shadow-xl flex flex-col transition-all duration-300 hover:scale-[1.02]",
                  plan.recommended ? "border-4 border-[#FFBF00] shadow-2xl scale-[1.05] z-10" : "border-2 border-transparent"
                )}
              >
                {plan.recommended && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#FFBF00] text-[#1E2A3A] px-6 py-1 rounded-full text-sm font-bold shadow-md">
                    RECOMENDADO
                  </div>
                )}

                <div className="mb-6 flex items-center justify-between">
                  <div className="p-3 bg-gray-50 rounded-2xl">
                    {plan.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-bold text-[#1E2A3A]">{plan.price}</span>
                    <span className="text-gray-400 font-medium">{plan.period}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#1E2A3A] mb-2">{plan.name}</h3>
                <p className="text-gray-500 mb-8 text-sm leading-relaxed">{plan.description}</p>

                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 bg-green-100 p-0.5 rounded-full">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  className={cn(
                    "w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg",
                    plan.color === 'amber' || plan.recommended
                      ? "bg-[#FFBF00] text-[#1E2A3A] hover:bg-[#FFD700]"
                      : "bg-[#1E2A3A] text-white hover:bg-[#2D3E50]"
                  )}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
