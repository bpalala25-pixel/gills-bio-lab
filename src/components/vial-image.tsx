"use client";

/**
 * VialImage – renders a photo-realistic SVG vial with a custom label
 * when no product photo exists.
 */

interface VialImageProps {
  name: string;
  quantity: string;
  capColor?: string;
  labelColor?: string;
  className?: string;
}

// Map categories → accent colours
const CATEGORY_COLORS: Record<string, { cap: string; accent: string }> = {
  "Peptides":             { cap: "#4a9eff", accent: "#4a9eff" },
  "Growth Factors":       { cap: "#a855f7", accent: "#a855f7" },
  "Neuropeptides":        { cap: "#f59e0b", accent: "#f59e0b" },
  "GLP-1 / Metabolic":   { cap: "#22c55e", accent: "#22c55e" },
  "Blends":               { cap: "#2dd4bf", accent: "#2dd4bf" },
  "Hormonal Research":    { cap: "#f97316", accent: "#f97316" },
  "Mitochondrial Research": { cap: "#ec4899", accent: "#ec4899" },
  "Metabolic / NAD":      { cap: "#eab308", accent: "#eab308" },
  "Reconstitution Supplies": { cap: "#94a3b8", accent: "#94a3b8" },
};

export default function VialImage({ name, quantity, capColor = "#4a9eff", labelColor = "#4a9eff", className = "" }: VialImageProps) {
  // Truncate long names for label
  const displayName = name.length > 14 ? name.slice(0, 13) + "…" : name;
  const displayQty  = quantity.length > 16 ? quantity.slice(0, 15) + "…" : quantity;

  return (
    <svg
      className={className}
      viewBox="0 0 140 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.6))" }}
    >
      <defs>
        {/* Glass gradient */}
        <linearGradient id={`glass-${name}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="20%"  stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="50%"  stopColor="#d0e8ff" stopOpacity="0.10" />
          <stop offset="80%"  stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12" />
        </linearGradient>
        {/* Label gradient */}
        <linearGradient id={`label-${name}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e8eef5" />
        </linearGradient>
        {/* Cap gradient */}
        <linearGradient id={`cap-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={capColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={capColor} stopOpacity="0.6" />
        </linearGradient>
        {/* Reflection */}
        <linearGradient id={`refl-${name}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
          <stop offset="30%"  stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`vial-clip-${name}`}>
          <rect x="25" y="38" width="90" height="162" rx="14" />
        </clipPath>
      </defs>

      {/* ── Vial body ── */}
      <rect x="25" y="38" width="90" height="162" rx="14"
        fill="rgba(200,225,255,0.08)" stroke="rgba(200,225,255,0.25)" strokeWidth="1.5" />

      {/* Liquid fill */}
      <rect x="26.5" y="100" width="87" height="99" rx="0"
        fill="rgba(45,212,191,0.06)" clipPath={`url(#vial-clip-${name})`} />

      {/* ── Label area ── */}
      <rect x="30" y="78" width="80" height="96" rx="5"
        fill={`url(#label-${name})`} stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />

      {/* Holographic sheen strip on label */}
      <rect x="30" y="78" width="80" height="8" rx="5"
        fill={labelColor} fillOpacity="0.18" />

      {/* Compound name */}
      <text x="70" y="102"
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="700" fontSize="11" fill="#0d1117" letterSpacing="0.3">
        {displayName}
      </text>

      {/* Quantity */}
      <text x="70" y="117"
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="500" fontSize="9" fill="#334155">
        {displayQty}
      </text>

      {/* Gills BioLab oval */}
      <ellipse cx="70" cy="133" rx="22" ry="10"
        fill="none" stroke={labelColor} strokeWidth="1.2" opacity="0.7" />
      <text x="70" y="131"
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Inter', Arial, sans-serif"
        fontWeight="700" fontSize="5.5" fill={labelColor} opacity="0.85">
        GILLS
      </text>
      <text x="70" y="137"
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Inter', Arial, sans-serif"
        fontWeight="400" fontSize="4.5" fill={labelColor} opacity="0.7">
        BioLab
      </text>

      {/* Divider */}
      <line x1="33" y1="148" x2="107" y2="148" stroke="#cbd5e1" strokeWidth="0.6" />

      {/* Footer text */}
      <text x="70" y="157"
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Inter', Arial, sans-serif"
        fontWeight="400" fontSize="5" fill="#475569">
        Sterile Lyophilized Powder
      </text>
      <text x="70" y="165"
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Inter', Arial, sans-serif"
        fontWeight="400" fontSize="4.5" fill="#64748b">
        • Not for Human Use
      </text>
      <text x="70" y="171"
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Inter', Arial, sans-serif"
        fontWeight="400" fontSize="4.5" fill="#64748b">
        • Store at 2–8°C (36–46°F)
      </text>

      {/* Glass sheen */}
      <rect x="25" y="38" width="90" height="162" rx="14"
        fill={`url(#glass-${name})`} />

      {/* Reflection streak */}
      <rect x="35" y="50" width="12" height="140" rx="6"
        fill={`url(#refl-${name})`} opacity="0.5" />

      {/* ── Cap ── */}
      <rect x="30" y="18" width="80" height="28" rx="6"
        fill={`url(#cap-${name})`} stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
      {/* Cap shine */}
      <rect x="34" y="21" width="72" height="8" rx="4"
        fill="rgba(255,255,255,0.18)" />
      {/* Cap neck stripe */}
      <rect x="27" y="34" width="86" height="7" rx="2"
        fill="rgba(180,200,220,0.2)" stroke="rgba(200,225,255,0.2)" strokeWidth="0.5" />

      {/* Bottom curve of vial */}
      <ellipse cx="70" cy="200" rx="45" ry="4"
        fill="rgba(0,0,0,0.25)" />
    </svg>
  );
}

/**
 * Get cap/accent colour from product category
 */
export function getVialColors(category: string): { cap: string; accent: string } {
  return CATEGORY_COLORS[category] ?? { cap: "#4a9eff", accent: "#4a9eff" };
}
