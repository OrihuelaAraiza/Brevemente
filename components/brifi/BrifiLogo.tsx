export function BrifiLogo({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="brifiLogoG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="35%" stopColor="#F59E0B" />
          <stop offset="65%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </radialGradient>
        <radialGradient id="brifiCenterG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </radialGradient>
      </defs>

      {/* 8 petals */}
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((deg, i) => (
        <ellipse
          key={i}
          cx="40" cy="40"
          rx="9" ry="22"
          fill="url(#brifiLogoG)"
          fillOpacity={0.6 + (i % 3) * 0.1}
          transform={`rotate(${deg} 40 40)`}
        />
      ))}

      {/* Center circle */}
      <circle cx="40" cy="40" r="13" fill="url(#brifiCenterG)" />
      <circle cx="40" cy="40" r="10" fill="white" fillOpacity="0.85" />

      {/* Subtle neuronal lines */}
      <circle cx="40" cy="40" r="4" fill="url(#brifiLogoG)" fillOpacity="0.6" />
    </svg>
  );
}
