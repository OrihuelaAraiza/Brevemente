"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { cn } from "@/lib/utils";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  Sector
} from "recharts";
import { MoreHorizontal } from "lucide-react";

// Mock data for the charts
const pieData = [
  { name: "Completadas", value: 91, color: "#22C55E" },
  { name: "Canceladas", value: 6, color: "#EF4444" },
  { name: "Ausentes", value: 3, color: "#3B82F6" },
];

const lineData = [
  { name: "Abril", value: 5 },
  { name: "Mayo", value: 80 },
  { name: "Junio", value: 40 },
  { name: "Julio", value: 40 },
  { name: "Agosto", value: 60 },
  { name: "Septiembre", value: 80 },
  { name: "Octubre", value: 95 },
  { name: "Noviembre", value: 95 },
  { name: "Diciembre", value: 70 },
];

const donutMonthlyData = {
  "Enero": [
    { name: "A", value: 40, color: "#3B82F6" },
    { name: "B", value: 20, color: "#22C55E" },
    { name: "C", value: 15, color: "#A855F7" },
    { name: "D", value: 10, color: "#EAB308" },
    { name: "E", value: 10, color: "#F97316" },
    { name: "F", value: 5, color: "#EF4444" },
  ],
  "Febrero": [
    { name: "A", value: 25, color: "#3B82F6" },
    { name: "B", value: 35, color: "#22C55E" },
    { name: "C", value: 10, color: "#A855F7" },
    { name: "D", value: 12, color: "#EAB308" },
    { name: "E", value: 10, color: "#F97316" },
    { name: "F", value: 8, color: "#EF4444" },
  ],
  "Marzo": [
    { name: "A", value: 30, color: "#3B82F6" },
    { name: "B", value: 25, color: "#22C55E" },
    { name: "C", value: 12, color: "#A855F7" },
    { name: "D", value: 15, color: "#EAB308" },
    { name: "E", value: 10, color: "#F97316" },
    { name: "F", value: 8, color: "#EF4444" },
  ],
  "Abril": [
    { name: "A", value: 35, color: "#3B82F6" },
    { name: "B", value: 29, color: "#22C55E" },
    { name: "C", value: 11, color: "#A855F7" },
    { name: "D", value: 10, color: "#EAB308" },
    { name: "E", value: 8, color: "#F97316" },
    { name: "F", value: 7, color: "#EF4444" },
  ]
};

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const dxMonthlyData = {
  "Enero": {
    psiquiatrico: [
      { name: "Ansiedad", value: 35, color: "#00A3FF" }, { name: "Depresión", value: 25, color: "#63D33E" }, { name: "Estrés", value: 20, color: "#9CA3AF" },
      { name: "dummy_1", value: 10, color: "#FFD600" }, { name: "dummy_2", value: 10, color: "#FF4D00" }
    ],
    estrategico: [
      { name: "Fobia", value: 30, color: "#00A3FF" }, { name: "Obsesivo", value: 40, color: "#63D33E" }, { name: "dummy_1", value: 30, color: "#9CA3AF" }
    ],
    spr: [
      { name: "Alto", value: 50, color: "#00A3FF" }, { name: "Medio", value: 30, color: "#63D33E" }, { name: "Bajo", value: 20, color: "#9CA3AF" }
    ],
    resolucion: [
      { name: "Casos resueltos", value: 40, color: "#00A3FF" }, { name: "Casos mejorados", value: 30, color: "#63D33E" }, { name: "Casos invariables", value: 20, color: "#9CA3AF" }, { name: "Casos Drop out", value: 10, color: "#FFD600" }
    ]
  },
  "Febrero": {
    psiquiatrico: [{ name: "X", value: 40, color: "#00A3FF" }, { name: "Y", value: 60, color: "#63D33E" }],
    estrategico: [{ name: "X", value: 50, color: "#00A3FF" }, { name: "Y", value: 50, color: "#63D33E" }],
    spr: [{ name: "X", value: 70, color: "#00A3FF" }, { name: "Y", value: 30, color: "#63D33E" }],
    resolucion: [{ name: "X", value: 80, color: "#00A3FF" }, { name: "Y", value: 20, color: "#63D33E" }]
  },
  "Marzo": {
    psiquiatrico: [{ name: "X", value: 40, color: "#00A3FF" }, { name: "Y", value: 60, color: "#63D33E" }],
    estrategico: [{ name: "X", value: 50, color: "#00A3FF" }, { name: "Y", value: 50, color: "#63D33E" }],
    spr: [{ name: "X", value: 70, color: "#00A3FF" }, { name: "Y", value: 30, color: "#63D33E" }],
    resolucion: [{ name: "X", value: 80, color: "#00A3FF" }, { name: "Y", value: 20, color: "#63D33E" }]
  },
  "Abril": {
    psiquiatrico: [
      { name: "Ansiedad", value: 35, color: "#00A3FF" }, { name: "Depresión", value: 29, color: "#63D33E" }, { name: "Estrés", value: 11, color: "#9CA3AF" },
      { name: "dummy_1", value: 10, color: "#FFD600" }, { name: "dummy_2", value: 8, color: "#FF4D00" }, { name: "dummy_3", value: 7, color: "#EB1484" }
    ],
    estrategico: [
      { name: "Fobia", value: 35, color: "#00A3FF" }, { name: "Obsesivo", value: 29, color: "#63D33E" }, { name: "dummy_1", value: 11, color: "#9CA3AF" },
      { name: "dummy_2", value: 10, color: "#FFD600" }, { name: "dummy_3", value: 8, color: "#FF4D00" }, { name: "dummy_4", value: 7, color: "#EB1484" }
    ],
    spr: [
      { name: "Alto", value: 35, color: "#00A3FF" }, { name: "Medio", value: 29, color: "#63D33E" }, { name: "Bajo", value: 11, color: "#9CA3AF" },
      { name: "dummy_1", value: 10, color: "#FFD600" }, { name: "dummy_2", value: 8, color: "#FF4D00" }, { name: "dummy_3", value: 7, color: "#EB1484" }
    ],
    resolucion: [
      { name: "Casos resueltos", value: 35, color: "#00A3FF" }, { name: "Casos mejorados", value: 29, color: "#63D33E" }, { name: "Casos invariables", value: 11, color: "#9CA3AF" },
      { name: "Casos Drop out", value: 10, color: "#FFD600" }, { name: "dummy_1", value: 8, color: "#FF4D00" }, { name: "dummy_2", value: 7, color: "#EB1484" }
    ]
  }
};

const demoData = {
// ...
  "Enero": {
    edad: [
      { name: "15 - 25", value: 30, color: "#22C55E" },
      { name: "26 - 45", value: 25, color: "#EF4444" },
      { name: "46 - 66", value: 20, color: "#3B82F6" },
      { name: "dummy_1", value: 10, color: "#A855F7" }, { name: "dummy_2", value: 8, color: "#EAB308" }, { name: "dummy_3", value: 7, color: "#EC4899" }
    ],
    sexo: [
      { name: "Femenino", value: 40, color: "#00A3FF" },
      { name: "Masculino", value: 30, color: "#63D33E" },
      { name: "LGTB", value: 10, color: "#9CA3AF" },
      { name: "dummy_1", value: 8, color: "#FFD600" }, { name: "dummy_2", value: 7, color: "#FF4D00" }, { name: "dummy_3", value: 5, color: "#EB1484" }
    ],
    modalidad: [
      { name: "Presencial", value: 45, color: "#22C55E" },
      { name: "Online", value: 35, color: "#EF4444" },
      { name: "dummy_1", value: 10, color: "#3B82F6" }, { name: "dummy_2", value: 10, color: "#A855F7" }
    ],
    tipo: [
      { name: "Individual", value: 50, color: "#22C55E" },
      { name: "Pareja", value: 20, color: "#EF4444" },
      { name: "Familia", value: 15, color: "#3B82F6" },
      { name: "dummy_1", value: 15, color: "#A855F7" }
    ]
  },
  "Febrero": {
    edad: [
      { name: "15 - 25", value: 32, color: "#22C55E" },
      { name: "26 - 45", value: 28, color: "#EF4444" },
      { name: "46 - 66", value: 22, color: "#3B82F6" },
      { name: "dummy_1", value: 18, color: "#A855F7" }
    ],
    sexo: [
      { name: "Femenino", value: 38, color: "#00A3FF" },
      { name: "Masculino", value: 32, color: "#63D33E" },
      { name: "LGTB", value: 15, color: "#9CA3AF" },
      { name: "dummy_1", value: 15, color: "#FFD600" }
    ],
    modalidad: [
      { name: "Presencial", value: 55, color: "#22C55E" },
      { name: "Online", value: 45, color: "#EF4444" }
    ],
    tipo: [
      { name: "Individual", value: 45, color: "#22C55E" },
      { name: "Pareja", value: 35, color: "#EF4444" },
      { name: "Familia", value: 20, color: "#3B82F6" }
    ]
  },
  "Marzo": {
    edad: [
      { name: "15 - 25", value: 25, color: "#22C55E" },
      { name: "26 - 45", value: 35, color: "#EF4444" },
      { name: "46 - 66", value: 30, color: "#3B82F6" },
      { name: "dummy_1", value: 10, color: "#A855F7" }
    ],
    sexo: [
      { name: "Femenino", value: 30, color: "#00A3FF" },
      { name: "Masculino", value: 40, color: "#63D33E" },
      { name: "LGTB", value: 20, color: "#9CA3AF" },
      { name: "dummy_1", value: 10, color: "#FFD600" }
    ],
    modalidad: [
      { name: "Presencial", value: 40, color: "#22C55E" },
      { name: "Online", value: 60, color: "#EF4444" }
    ],
    tipo: [
      { name: "Individual", value: 30, color: "#22C55E" },
      { name: "Pareja", value: 40, color: "#EF4444" },
      { name: "Familia", value: 30, color: "#3B82F6" }
    ]
  },
  "Abril": {
    edad: [
      { name: "15 - 25", value: 35, color: "#22C55E" },
      { name: "26 - 45", value: 29, color: "#EF4444" },
      { name: "46 - 66", value: 36, color: "#3B82F6" },
    ],
    sexo: [
      { name: "Femenino", value: 35, color: "#00A3FF" },
      { name: "Masculino", value: 29, color: "#63D33E" },
      { name: "LGTB", value: 11, color: "#9CA3AF" },
      { name: "dummy_1", value: 10, color: "#FFD600" },
      { name: "dummy_2", value: 8, color: "#FF4D00" },
      { name: "dummy_3", value: 7, color: "#EB1484" },
    ],
    modalidad: [
      { name: "Presencial", value: 60, color: "#22C55E" },
      { name: "Online", value: 40, color: "#EF4444" },
    ],
    tipo: [
      { name: "Individual", value: 40, color: "#22C55E" },
      { name: "Pareja", value: 30, color: "#EF4444" },
      { name: "Familia", value: 30, color: "#3B82F6" },
    ]
  }
};

const sections = [
  { id: "citas", label: "Datos Citas", short: "Datos Citas" },
  { id: "demograficos", label: "Datos demográficos", short: "Datos Demo" },
  { id: "diagnosticos", label: "Datos Diagnósticos", short: "Datos DX" },
];

// Custom label for Donut chart (L-shaped connectors)
const renderCustomLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, value, color, percent } = props;
  if (percent < 0.05) return null; // Don't show labels for small slices

  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.2;
  const sin = Math.sin(-midAngle * RADIAN);
  const cos = Math.cos(-midAngle * RADIAN);
  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="#1E2A3A" fill="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={8} textAnchor={textAnchor} fill="#1E2A3A" className="text-xl font-bold">
        {`${Math.round(percent * 100)}%`}
      </text>
    </g>
  );
};

// Demographic/Diagnostic Card Component
const DemoCard = ({ title, type, dataSource = demoData }: { title: string, type: string, dataSource?: any }) => {
  const [cardMenu, setCardMenu] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Abril");
  const [selectedYear, setSelectedYear] = useState(2026);
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);

  const cardData = (dataSource as any)[selectedMonth][type];

  return (
    <div className="flex flex-col items-center relative">
      <div className="bg-white px-8 py-2 rounded-full mb-8 shadow-sm">
        <h3 className="text-[#1E2A3A] font-medium text-lg">{title}</h3>
      </div>
      
      <div className="absolute right-0 top-12 z-50">
        <button onClick={() => setCardMenu(!cardMenu)} className="p-1 hover:bg-white/20 rounded-full transition-colors relative">
          <MoreHorizontal size={28} className="text-[#1E2A3A]" />
          {cardMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-2xl border-2 border-black p-4 z-[60]">
              <p className="text-center text-gray-400 mb-3 text-sm font-bold">Ir a:</p>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowMonths(!showMonths); setShowYears(false); }}
                    className="w-full text-left px-2 py-1 text-[#F97316] font-bold text-lg flex justify-between items-center"
                  >
                    Mes
                    <span>{showMonths ? "▼" : "▶"}</span>
                  </button>
                  {showMonths && (
                    <div className="absolute right-full mr-2 top-0 w-32 bg-white rounded-xl shadow-2xl border-2 border-black p-2 flex flex-col gap-1 z-[70]">
                      {["Enero", "Febrero", "Marzo", "Abril"].map(m => (
                        <button 
                          key={m}
                          onClick={() => { setSelectedMonth(m); setShowMonths(false); setCardMenu(false); }}
                          className={cn("text-sm py-2 px-3 rounded-lg text-left font-bold transition-colors", selectedMonth === m ? "bg-[#FFBF00] text-white" : "hover:bg-gray-100 text-[#1E2A3A]")}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowYears(!showYears); setShowMonths(false); }}
                    className="w-full text-left px-2 py-1 text-[#F97316] font-bold text-lg flex justify-between items-center"
                  >
                    Año
                    <span>{showYears ? "▼" : "▶"}</span>
                  </button>
                  {showYears && (
                    <div className="absolute right-full mr-2 top-0 w-32 bg-white rounded-xl shadow-2xl border-2 border-black p-2 flex flex-col gap-1 z-[70]">
                      {[2026].map(y => (
                        <button 
                          key={y}
                          onClick={() => { setSelectedYear(y); setShowYears(false); setCardMenu(false); }}
                          className={cn("text-sm py-2 px-3 rounded-lg text-left font-bold transition-colors", selectedYear === y ? "bg-[#FFBF00] text-white" : "hover:bg-gray-100 text-[#1E2A3A]")}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </button>
      </div>

      <div className="w-full h-[240px] flex items-center justify-center">
        <div className="flex flex-col justify-center gap-3 text-sm font-medium text-gray-600 mr-4 min-w-[120px]">
          {cardData.filter((d: any) => !d.name.includes('dummy')).map((item: any) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-8 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="whitespace-nowrap">{item.name}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={cardData}
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                label={renderCustomLabel}
                labelLine={false}
              >
                {cardData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-4 text-lg font-bold text-[#1E2A3A]/80 italic">
        {selectedMonth} {selectedYear}
      </div>
    </div>
  );
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [currentMonthIdx, setCurrentMonthIdx] = useState(3); // Default to Abril (index 3)

  const activeMonthName = months[currentMonthIdx];
  const activeMonthData = (demoData as any)[activeMonthName] || demoData["Abril"];
  const activeDonutData = (donutMonthlyData as any)[activeMonthName] || donutMonthlyData["Abril"];

  const currentSection = sections.find(s => s.id === activeTab);

  if (!activeTab) {
    return (
      <div className="flex flex-col flex-1 min-h-0">
        <SectionHeader title="Tu Desempeño" titleClassName="text-4xl" />
        <div className="h-2 bg-[#1E2A3A]" />
        <div className="flex-1 bg-[#7AD7FF] flex flex-col items-center justify-center gap-8 p-10">
          {sections.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveTab(btn.id)}
              className="w-full max-w-sm py-6 px-10 bg-white text-[#1E2A3A] font-semibold text-xl rounded-[2rem] shadow-md hover:bg-[#FFBF00] hover:text-white transition-all duration-300"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#7AD7FF]">
      <SectionHeader 
        title={`Tu Desempeño - ${currentSection?.label}`} 
        titleClassName="text-4xl" 
      />
      <div className="h-2 bg-[#1E2A3A]" />

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Overlay to close menu when clicking outside */}
        {showMenu && (
          <div 
            className="fixed inset-0 z-[100] cursor-default" 
            onClick={() => setShowMenu(false)}
          />
        )}

        <div className="flex items-center justify-center relative">
          <div className="bg-white px-12 py-2 rounded-full shadow-sm text-[#1E2A3A] text-lg font-medium">
            No. Total de Pacientes: <span className="ml-2">127</span>
          </div>
          <div className="absolute right-4 top-0 z-[110]">
            <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-white/20 rounded-full transition-colors relative">
              <MoreHorizontal size={32} className="text-[#1E2A3A]" />
              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-[2rem] shadow-2xl border-2 border-black p-6 animate-in fade-in zoom-in-95 duration-200">
                  <p className="text-center text-gray-500 mb-4 text-xl font-semibold">Ir a:</p>
                  <div className="flex flex-col gap-4">
                    {sections.map(s => (
                      <button
                        key={s.id}
                        onClick={() => { setActiveTab(s.id); setShowMenu(false); }}
                        className={cn(
                          "w-full py-1 text-2xl font-bold transition-colors text-center", 
                          activeTab === s.id ? "text-[#F97316]" : "text-gray-400 hover:text-gray-600"
                        )}
                      >
                        {s.short}
                      </button>
                    ))}
                    <button 
                      onClick={() => { setActiveTab(null); setShowMenu(false); }} 
                      className="mt-2 text-base text-gray-400 hover:text-red-500 font-bold text-center"
                    >
                      Volver al menú
                    </button>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'citas' ? (
          /* Datos Citas View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-white px-8 py-2 rounded-full mb-6 shadow-sm">
                <h3 className="text-[#1E2A3A] font-medium text-lg">Distribución de citas por estado</h3>
              </div>
              <div className="w-full h-[250px] flex">
                <div className="flex flex-col justify-center gap-4 text-sm font-medium text-gray-600 mr-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-8 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={0}
                      outerRadius={100}
                      paddingAngle={0}
                      dataKey="value"
                      label={renderCustomLabel}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white px-8 py-2 rounded-full mb-6 shadow-sm">
                <h3 className="text-[#1E2A3A] font-medium text-lg">No. Citas completadas al mes: 110</h3>
              </div>
              <div className="w-full h-[250px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={activeDonutData}
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={renderCustomLabel}
                      labelLine={false}
                    >
                      {activeDonutData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-6 mt-4">
                <button 
                  onClick={() => setCurrentMonthIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentMonthIdx === 0}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <span className="text-[#1E2A3A] font-bold">◀</span>
                </button>
                <div className="bg-white px-10 py-2 rounded-full shadow-md">
                  <span className="text-[#1E2A3A] font-bold text-lg">Mes: {months[currentMonthIdx]}</span>
                </div>
                <button 
                  onClick={() => setCurrentMonthIdx(prev => Math.min(months.length - 1, prev + 1))}
                  disabled={currentMonthIdx >= 3} 
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <span className="text-[#1E2A3A] font-bold">▶</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 flex flex-col items-center">
              <div className="bg-white px-8 py-2 rounded-full mb-6 shadow-sm self-start ml-4 lg:ml-12">
                <h3 className="text-[#1E2A3A] font-medium text-lg">Historial de citas según periodo</h3>
              </div>
              <div className="w-full h-[350px] px-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid vertical={false} stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#1E2A3A', fontSize: 14 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#1E2A3A', fontSize: 14 }}
                    />
                    <Line 
                      type="linear" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      strokeWidth={4} 
                      dot={false}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : activeTab === 'demograficos' ? (
          /* Datos Demográficos View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 max-w-6xl mx-auto pb-10">
            <DemoCard title="Distribución por edad" type="edad" />
            <DemoCard title="Distribución por sexo" type="sexo" />
            <DemoCard title="Distribución por modalidad terapia" type="modalidad" />
            <DemoCard title="Distribución por tipo terapia" type="tipo" />
          </div>
        ) : (
          /* Datos Diagnósticos View (DX) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 max-w-6xl mx-auto pb-10">
            <DemoCard title="Distribución por Trastorno Psiquiátrico" type="psiquiatrico" dataSource={dxMonthlyData} />
            <DemoCard title="Distribución por Trastorno Estratégico" type="estrategico" dataSource={dxMonthlyData} />
            <DemoCard title="Distribución por SPR" type="spr" dataSource={dxMonthlyData} />
            <DemoCard title="Distribución por Resolución de casos" type="resolucion" dataSource={dxMonthlyData} />
          </div>
        )}
      </div>
    </div>
  );
}

