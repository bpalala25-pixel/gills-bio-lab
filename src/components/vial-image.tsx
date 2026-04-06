"use client";

/**
 * VialImage – photorealistic SVG vial matching the Gills BioLab submitted photos.
 * Clear glass body · silver crimped aluminum cap · white holographic label.
 */

interface VialImageProps {
  name: string;
  quantity: string;
  capColor?: string;
  /** accent used only for the holographic sheen strip – keep subtle */
  labelColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const CATEGORY_COLORS: Record<string, { cap: string; accent: string }> = {
  "Peptides":               { cap: "#7a8fa8", accent: "#4a9eff" },
  "Growth Factors":         { cap: "#7a8fa8", accent: "#a855f7" },
  "Neuropeptides":          { cap: "#7a8fa8", accent: "#f59e0b" },
  "GLP-1 / Metabolic":     { cap: "#7a8fa8", accent: "#22c55e" },
  "Blends":                 { cap: "#7a8fa8", accent: "#2dd4bf" },
  "Hormonal Research":      { cap: "#7a8fa8", accent: "#f97316" },
  "Mitochondrial Research": { cap: "#7a8fa8", accent: "#ec4899" },
  "Metabolic / NAD":        { cap: "#4a78c0", accent: "#eab308" },
  "Reconstitution Supplies":{ cap: "#7a8fa8", accent: "#94a3b8" },
};

export default function VialImage({
  name,
  quantity,
  labelColor = "#2dd4bf",
  className = "",
  style,
}: VialImageProps) {
  const uid = name.replace(/[^a-z0-9]/gi, "_");

  // Split long names: first word(s) on line 1, rest on line 2
  const parts = name.split(" ");
  const mid = Math.ceil(parts.length / 2);
  const line1 = parts.slice(0, mid).join(" ");
  const line2 = parts.slice(mid).join(" ");
  const hasLine2 = line2.length > 0;

  // NAD+ gets amber cap / rest get gray
  const isNad = name.toLowerCase().includes("nad");
  const capTop   = isNad ? "#4a78c0" : "#8a9ab0";
  const capMid   = isNad ? "#2a58a0" : "#636e7e";
  const capShad  = isNad ? "#1a4890" : "#3e4754";

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 160 270"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* ── Glass body ── */}
        <linearGradient id={`gb-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#a8bfd0" stopOpacity="0.55" />
          <stop offset="10%"  stopColor="#d8eaf5" stopOpacity="0.30" />
          <stop offset="28%"  stopColor="#eef6fc" stopOpacity="0.15" />
          <stop offset="55%"  stopColor="#f0f8ff" stopOpacity="0.08" />
          <stop offset="82%"  stopColor="#cce0f0" stopOpacity="0.18" />
          <stop offset="91%"  stopColor="#eef6fc" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#c8dcea" stopOpacity="0.70" />
        </linearGradient>

        {/* ── Label background ── */}
        <linearGradient id={`lb-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#f9fbfc" />
          <stop offset="40%"  stopColor="#f4f8fb" />
          <stop offset="100%" stopColor="#e8f0f6" />
        </linearGradient>

        {/* ── Holographic strip – animated ── */}
        <linearGradient id={`holo-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#e879f9" stopOpacity="0.6" />
          <stop offset="20%"  stopColor="#60a5fa" stopOpacity="0.7" />
          <stop offset="40%"  stopColor="#34d399" stopOpacity="0.7" />
          <stop offset="60%"  stopColor="#fbbf24" stopOpacity="0.6" />
          <stop offset="80%"  stopColor="#f87171" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
        </linearGradient>

        {/* ── Cap ── */}
        <linearGradient id={`cap-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor={capTop} />
          <stop offset="55%"  stopColor={capMid} />
          <stop offset="100%" stopColor={capShad} />
        </linearGradient>
        <linearGradient id={`capSide-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.35)" />
          <stop offset="15%"  stopColor="rgba(0,0,0,0.10)" />
          <stop offset="50%"  stopColor="rgba(255,255,255,0.12)" />
          <stop offset="85%"  stopColor="rgba(0,0,0,0.05)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.30)" />
        </linearGradient>

        {/* ── Neck / crimp band ── */}
        <linearGradient id={`neck-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#4a5360" />
          <stop offset="20%"  stopColor="#8a96a6" />
          <stop offset="50%"  stopColor="#b8c4d0" />
          <stop offset="80%"  stopColor="#7a8698" />
          <stop offset="100%" stopColor="#3e4a58" />
        </linearGradient>

        {/* ── Caustic reflection ── */}
        <linearGradient id={`caus-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
          <stop offset="15%"  stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.30" />
          <stop offset="85%"  stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* ── Right edge highlight ── */}
        <linearGradient id={`rh-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.60" />
        </linearGradient>

        {/* ── Bottom glass ── */}
        <linearGradient id={`bot-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#d0e4f0" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#a0bcd0" stopOpacity="0.35" />
        </linearGradient>

        {/* ── Floor shadow / reflection ── */}
        <radialGradient id={`shad-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.45)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        <clipPath id={`vc-${uid}`}>
          <rect x="28" y="54" width="104" height="198" rx="14" />
        </clipPath>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="80" cy="258" rx="48" ry="7" fill={`url(#shad-${uid})`} />

      {/* ══ VIAL BODY ══ */}
      {/* Base shape – slight fill to read as glass */}
      <rect x="28" y="54" width="104" height="198" rx="14"
        fill="rgba(215,232,245,0.12)"
        stroke="rgba(180,208,228,0.40)"
        strokeWidth="1.2" />

      {/* Glass gradient overlay – gives cylindrical appearance */}
      <rect x="28" y="54" width="104" height="198" rx="14"
        fill={`url(#gb-${uid})`} clipPath={`url(#vc-${uid})`} />

      {/* ══ LABEL ══ */}
      <rect x="28" y="84" width="104" height="122" fill={`url(#lb-${uid})`}
        clipPath={`url(#vc-${uid})`} />

      {/* Holographic rainbow strip at top of label */}
      <rect x="28" y="84" width="104" height="5.5" fill={`url(#holo-${uid})`}
        clipPath={`url(#vc-${uid})`} opacity="0.8" />

      {/* Compound name – big bold, left-aligned like the photos */}
      <text
        x="38" y={hasLine2 ? 106 : 112}
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="800" fontSize={line1.length > 9 ? "13" : "15"}
        fill="#0d1020" letterSpacing="-0.2">
        {line1}
      </text>
      {hasLine2 && (
        <text
          x="38" y="123"
          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          fontWeight="800" fontSize="13"
          fill="#0d1020" letterSpacing="-0.2">
          {line2}
        </text>
      )}

      {/* Quantity */}
      <text
        x="38" y={hasLine2 ? 136 : 128}
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="500" fontSize="9.5"
        fill="#1e293b">
        {quantity}
      </text>

      {/* GILLS BioLab oval – top-right corner of label, matching photos */}
      <ellipse cx="122" cy={hasLine2 ? 111 : 109} rx="20" ry="15"
        fill="rgba(255,255,255,0.6)"
        stroke="#1e293b" strokeWidth="1.0" />
      <text
        x="122" y={hasLine2 ? 107 : 105}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="800" fontSize="5.2" fill="#0d1020" letterSpacing="0.4">
        GILLS
      </text>
      <text
        x="122" y={hasLine2 ? 114 : 112}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="400" fontSize="4.2" fill="#334155">
        BioLab
      </text>

      {/* Separator line */}
      <line x1="33" y1={hasLine2 ? 144 : 137} x2="128" y2={hasLine2 ? 144 : 137}
        stroke="#c8d8e8" strokeWidth="0.6" />

      {/* Fine print */}
      <text x="35" y={hasLine2 ? 154 : 148}
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="400" fontSize="5.5" fill="#334155">
        Sterile Lyophilized Powder
      </text>
      <text x="35" y={hasLine2 ? 165 : 159}
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="400" fontSize="5.0" fill="#475569">
        • Not for Human Use
      </text>
      <text x="35" y={hasLine2 ? 174 : 168}
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="400" fontSize="5.0" fill="#475569">
        • Store at 2-8°C (36-46°F)
      </text>

      {/* Bottom glass – below label */}
      <rect x="28" y="206" width="104" height="46" rx="0"
        fill={`url(#bot-${uid})`} clipPath={`url(#vc-${uid})`} />

      {/* ══ GLASS EFFECTS ══ */}
      {/* Left edge caustic */}
      <rect x="36" y="58" width="9" height="190" rx="4.5"
        fill={`url(#caus-${uid})`} clipPath={`url(#vc-${uid})`} opacity="0.55" />

      {/* Right edge specular highlight */}
      <rect x="118" y="58" width="13" height="190" rx="6"
        fill={`url(#rh-${uid})`} clipPath={`url(#vc-${uid})`} />

      {/* Left body shadow */}
      <rect x="28" y="54" width="12" height="198" rx="6"
        fill="rgba(20,40,60,0.20)" clipPath={`url(#vc-${uid})`} />

      {/* Outer stroke – glass edge */}
      <rect x="28" y="54" width="104" height="198" rx="14"
        fill="none"
        stroke="rgba(160,190,215,0.45)"
        strokeWidth="1.0" />

      {/* ══ CRIMPED NECK BAND ══ */}
      <rect x="26" y="50" width="108" height="10" rx="3"
        fill={`url(#neck-${uid})`} />
      {/* Neck top glint */}
      <rect x="30" y="50" width="100" height="2.5" rx="1.5"
        fill="rgba(255,255,255,0.30)" />
      {/* Neck bottom shadow */}
      <rect x="26" y="56" width="108" height="3" rx="0"
        fill="rgba(0,0,0,0.18)" />

      {/* ══ CAP ══ */}
      {/* Cap body */}
      <rect x="30" y="10" width="100" height="43" rx="7"
        fill={`url(#cap-${uid})`} />
      {/* Cap side light simulation */}
      <rect x="30" y="10" width="100" height="43" rx="7"
        fill={`url(#capSide-${uid})`} />
      {/* Cap top glint */}
      <rect x="36" y="12" width="88" height="11" rx="5"
        fill="rgba(255,255,255,0.22)" />
      {/* Cap lower shadow band */}
      <rect x="30" y="43" width="100" height="10" rx="0"
        fill="rgba(0,0,0,0.22)" />
      {/* Cap outline */}
      <rect x="30" y="10" width="100" height="43" rx="7"
        fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" />
    </svg>
  );
}

export function getVialColors(category: string): { cap: string; accent: string } {
  return CATEGORY_COLORS[category] ?? { cap: "#7a8fa8", accent: "#4a9eff" };
}
