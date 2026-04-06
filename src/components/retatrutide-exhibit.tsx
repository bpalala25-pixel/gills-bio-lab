"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronRight } from "lucide-react";

// Load Three.js component client-side only (no SSR)
const Retatrutide3DVial = dynamic(() => import("@/components/retatrutide-3d-vial"), { ssr: false });

const styles = `
@keyframes ret-glow-pulse {
  0%,100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1); }
  50%      { opacity: 0.9; transform: translate(-50%,-50%) scale(1.08); }
}
@keyframes ret-beam {
  0%,100% { opacity: 0.09; }
  50%      { opacity: 0.22; }
}
@keyframes ret-orbit {
  0%   { transform: rotate(0deg)   translateX(var(--r)) rotate(0deg);   }
  100% { transform: rotate(360deg) translateX(var(--r)) rotate(-360deg); }
}
.ret-glow { animation: ret-glow-pulse 3.5s ease-in-out infinite; }
.ret-beam { animation: ret-beam       4s   ease-in-out infinite; }
`;

const RECEPTOR_PILLS = [
  { label: "GIP",      color: "#22c55e", r: "170px", dur: "7s",   delay: "0s"    },
  { label: "GLP-1",    color: "#2dd4bf", r: "152px", dur: "9.5s", delay: "-3.2s" },
  { label: "Glucagon", color: "#a78bfa", r: "180px", dur: "12s",  delay: "-5.8s" },
];

export default function RetatrutideExhibit() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <section className="relative py-24 overflow-hidden"
        style={{ background: "linear-gradient(170deg, #04090f 0%, #051a10 45%, #04090f 100%)" }}>

        {/* ── atmosphere ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="ret-glow absolute"
            style={{
              width: 700, height: 700, top: "50%", left: "60%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 60%)",
            }} />
          {[
            { left: "44%", rotate: "-32deg", w: 260, delay: "0s"   },
            { left: "60%", rotate: "18deg",  w: 190, delay: "1.8s" },
            { left: "72%", rotate: "-8deg",  w: 150, delay: "0.9s" },
          ].map((b, i) => (
            <div key={i} className="ret-beam absolute"
              style={{
                top: 0, left: b.left, width: b.w, height: "100%",
                background: "linear-gradient(to bottom, rgba(34,197,94,0.14) 0%, transparent 100%)",
                transform: `rotate(${b.rotate})`,
                transformOrigin: "top center",
                animationDelay: b.delay,
              }} />
          ))}
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(34,197,94,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.025) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ━━━ LEFT COPY ━━━ */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{ backgroundColor: "#22c55e12", border: "1px solid #22c55e28", color: "#22c55e" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#22c55e" }} />
                Flagship Compound — Next-Gen Incretin Research
              </div>

              <h2 className="font-black leading-none mb-2"
                style={{ fontSize: "clamp(2.8rem,6vw,4.5rem)", color: "#ffffff", letterSpacing: "-0.03em" }}>
                Retatrutide
              </h2>
              <p className="text-2xl font-light mb-6" style={{ color: "#22c55e", letterSpacing: "0.02em" }}>
                Triple Receptor Agonist
              </p>

              <p className="text-base leading-relaxed mb-8" style={{ color: "#8da8a0", maxWidth: 480 }}>
                The most advanced incretin research compound available. Retatrutide simultaneously
                engages <strong style={{ color: "#e2f0e8" }}>GIP</strong>,{" "}
                <strong style={{ color: "#e2f0e8" }}>GLP-1</strong>, and{" "}
                <strong style={{ color: "#e2f0e8" }}>glucagon</strong> receptors — opening new
                windows into multi-receptor metabolic signaling, energy homeostasis, and incretin
                pharmacology in controlled in vitro settings.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label: "GIP",      sub: "Receptor", color: "#22c55e" },
                  { label: "GLP-1",    sub: "Receptor", color: "#2dd4bf" },
                  { label: "Glucagon", sub: "Receptor", color: "#a78bfa" },
                ].map(({ label, sub, color }) => (
                  <div key={label}
                    className="rounded-2xl p-4 text-center transition-transform hover:scale-105 hover:-translate-y-0.5"
                    style={{ background: `linear-gradient(145deg, ${color}0a, ${color}05)`, border: `1px solid ${color}22` }}>
                    <div className="w-2 h-2 rounded-full mx-auto mb-2.5"
                      style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
                    <div className="font-black text-sm text-white">{label}</div>
                    <div className="text-[10px] mt-0.5 font-medium" style={{ color: `${color}99` }}>{sub}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-8 mb-8">
                {[
                  { label: "Purity",   value: "≥ 99%" },
                  { label: "Quantity", value: "30 mg"  },
                  { label: "Storage",  value: "−20°C"  },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-1" style={{ color: "#3d5448" }}>{label}</div>
                    <div className="text-lg font-black" style={{ color: "#22c55e" }}>{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <Link href="/catalog/retatrutide"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
                    color: "#fff",
                    boxShadow: "0 0 28px rgba(34,197,94,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}>
                  Order — $219
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-xs" style={{ color: "#2d4038" }}>
                For laboratory research use only · Not for human or veterinary use
              </p>
            </div>

            {/* ━━━ RIGHT: THREE.JS VIAL ━━━ */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="relative" style={{ width: 400, height: 480 }}>

                {/* Orbiting receptor pills */}
                {RECEPTOR_PILLS.map(({ label, color, r, dur, delay }) => (
                  <div key={label} className="absolute"
                    style={{
                      top: "48%", left: "50%",
                      "--r": r,
                      animation: `ret-orbit ${dur} linear infinite`,
                      animationDelay: delay,
                      zIndex: 0,
                    } as React.CSSProperties}>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold -translate-x-1/2 -translate-y-1/2"
                      style={{
                        backgroundColor: `${color}18`, border: `1px solid ${color}40`,
                        color, boxShadow: `0 0 10px ${color}30`, whiteSpace: "nowrap",
                      }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                      {label}
                    </div>
                  </div>
                ))}

                {/* Three.js canvas */}
                <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden">
                  <Retatrutide3DVial />
                </div>

                {/* Drag hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <div className="px-3 py-1.5 rounded-full text-[10px] font-medium whitespace-nowrap"
                    style={{
                      backgroundColor: "rgba(4,9,15,0.75)",
                      border: "1px solid rgba(34,197,94,0.20)",
                      color: "#3d6650",
                    }}>
                    Drag to rotate · Scroll to zoom
                  </div>
                </div>

                {/* GIP · GLP-1 · Glucagon badge */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap"
                    style={{
                      background: "linear-gradient(135deg, rgba(34,197,94,0.14), rgba(45,212,191,0.09))",
                      border: "1px solid rgba(34,197,94,0.28)",
                      color: "#22c55e",
                      boxShadow: "0 0 16px rgba(34,197,94,0.12)",
                    }}>
                    GIP · GLP-1 · Glucagon
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
