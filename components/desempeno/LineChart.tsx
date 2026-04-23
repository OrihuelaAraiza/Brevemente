"use client";

type Point = { label: string; value: number };

export function LineChart({
  data,
  height = 220,
  max = 100,
  color = "#5BC8E8",
}: {
  data: Point[];
  height?: number;
  max?: number;
  color?: string;
}) {
  const width = 640;
  const padL = 40;
  const padR = 12;
  const padT = 10;
  const padB = 30;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const stepX = data.length > 1 ? chartW / (data.length - 1) : 0;
  const pts = data.map((d, i) => ({
    x: padL + i * stepX,
    y: padT + chartH - (d.value / max) * chartH,
    ...d,
  }));

  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const gridLines = [0, 25, 50, 75, 100];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      {/* Y grid + labels */}
      {gridLines.map((g) => {
        const y = padT + chartH - (g / 100) * chartH;
        return (
          <g key={g}>
            <line x1={padL} x2={width - padR} y1={y} y2={y} stroke="#E5E7EB" strokeDasharray="2 3" />
            <text x={padL - 6} y={y + 3} textAnchor="end" style={{ fontSize: 10, fill: "#9CA3AF" }}>
              {g}
            </text>
          </g>
        );
      })}

      {/* Line */}
      <path d={path} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

      {/* Points */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="white" stroke={color} strokeWidth={2} />
      ))}

      {/* X labels */}
      {pts.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={height - 10}
          textAnchor="middle"
          style={{ fontSize: 11, fill: "#6B7280" }}
        >
          {p.label}
        </text>
      ))}
    </svg>
  );
}
