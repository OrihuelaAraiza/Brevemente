import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExpedienteSubHeader } from "@/components/expedientes/ExpedienteSubHeader";

const vcPoints = [
  { label: "Abril", value: 15, tag: "OF", tagColor: "#E74C3C" },
  { label: "Mayo",  value: 30, tag: "OBS", tagColor: "#F5A623" },
  { label: "Junio", value: 60, tag: "PAR", tagColor: "#F5A623" },
  { label: "Julio", value: 95, tag: "FIN", tagColor: "#27AE60" },
];

const vgPoints = [
  { label: "Abril", value: 55, tag: "Hablar Público", tagColor: "#E74C3C" },
  { label: "Mayo",  value: 48, tag: "Yo / Pensamientos", tagColor: "#F5A623" },
  { label: "Junio", value: 72, tag: "Demás: Amigos", tagColor: "#F5A623" },
  { label: "Julio", value: 60, tag: "FIN", tagColor: "#27AE60" },
];

function Chart() {
  const width = 720;
  const height = 320;
  const padL = 40;
  const padR = 30;
  const padT = 30;
  const padB = 50;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const stepX = chartW / (vcPoints.length - 1);

  function buildPath(points: typeof vcPoints) {
    return points
      .map((p, i) => {
        const x = padL + i * stepX;
        const y = padT + chartH - (p.value / 100) * chartH;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      {[0, 25, 50, 75, 100].map((g) => {
        const y = padT + chartH - (g / 100) * chartH;
        return (
          <g key={g}>
            <line x1={padL} x2={width - padR} y1={y} y2={y} stroke="#E5E7EB" strokeDasharray="2 3" />
            <text x={padL - 6} y={y + 3} textAnchor="end" style={{ fontSize: 11, fill: "#9CA3AF" }}>
              {g}
            </text>
          </g>
        );
      })}

      <path d={buildPath(vcPoints)} fill="none" stroke="#5BC8E8" strokeWidth={3} strokeLinejoin="round" />
      <path d={buildPath(vgPoints)} fill="none" stroke="#27AE60" strokeWidth={3} strokeLinejoin="round" />

      {vcPoints.map((p, i) => {
        const x = padL + i * stepX;
        const y = padT + chartH - (p.value / 100) * chartH;
        return (
          <g key={`vc${i}`}>
            <circle cx={x} cy={y} r={6} fill={p.tagColor} stroke="white" strokeWidth={2} />
            <text x={x} y={y - 14} textAnchor="middle" style={{ fontSize: 10, fill: "#1E2A3A", fontWeight: 600 }}>
              {p.tag}
            </text>
          </g>
        );
      })}

      {vgPoints.map((p, i) => {
        const x = padL + i * stepX;
        const y = padT + chartH - (p.value / 100) * chartH;
        return (
          <g key={`vg${i}`}>
            <circle cx={x} cy={y} r={6} fill={p.tagColor} stroke="white" strokeWidth={2} />
            <text x={x} y={y + 20} textAnchor="middle" style={{ fontSize: 10, fill: "#1E2A3A", fontWeight: 600 }}>
              {p.tag}
            </text>
          </g>
        );
      })}

      {vcPoints.map((p, i) => {
        const x = padL + i * stepX;
        return (
          <text key={i} x={x} y={height - 18} textAnchor="middle" style={{ fontSize: 12, fill: "#6B7280" }}>
            {p.label}
          </text>
        );
      })}
    </svg>
  );
}

export default async function GraficaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Expedientes - TX Psicoterapia TBE - VC - VG" />
      <ExpedienteSubHeader pacienteId={id} />

      <div className="flex-1 overflow-auto p-5">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1E2A3A]">Gráfica de evolución</h2>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#5BC8E8]" /> Valoración Cambio
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#27AE60]" /> Valoración Global
              </span>
            </div>
          </div>
          <Chart />
        </div>
      </div>
    </div>
  );
}
