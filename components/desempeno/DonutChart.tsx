"use client";

type Slice = { label: string; value: number; color: string };

export function DonutChart({
  data,
  size = 160,
  thickness = 28,
  centerLabel,
}: {
  data: Slice[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - thickness) / 2;
  const circumference = 2 * Math.PI * r;

  let offset = 0;

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E5E7EB" strokeWidth={thickness} />
        {data.map((d, i) => {
          const len = (d.value / total) * circumference;
          const dasharray = `${len} ${circumference - len}`;
          const dashoffset = -offset;
          offset += len;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth={thickness}
              strokeDasharray={dasharray}
              strokeDashoffset={dashoffset}
            />
          );
        })}
        {centerLabel && (
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="central"
            className="rotate-90"
            transform={`rotate(90 ${cx} ${cy})`}
            style={{ fontSize: size / 8, fontWeight: 700, fill: "#1E2A3A" }}
          >
            {centerLabel}
          </text>
        )}
      </svg>

      <ul className="text-xs text-gray-600 space-y-1.5 min-w-0">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2 min-w-0">
            <span
              className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ backgroundColor: d.color }}
            />
            <span className="truncate">
              <span className="font-medium text-[#1E2A3A]">{Math.round((d.value / total) * 100)}%</span>{" "}
              <span className="text-gray-500">{d.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
