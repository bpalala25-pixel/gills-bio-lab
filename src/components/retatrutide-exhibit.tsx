"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import VialImage from "@/components/vial-image";

/* ─── tiny inline style block so keyframes are self-contained ─────────────── */
const styles = `
@keyframes ret-float {
  0%,100% { transform: perspective(900px) rotateY(-18deg) rotateX(5deg) translateY(0px); }
  50%      { transform: perspective(900px) rotateY(-18deg) rotateX(5deg) translateY(-18px); }
}
@keyframes ret-float-back {
  0%,100% { transform: perspective(900px) rotateY(-26deg) rotateX(7deg) translateY(-6px) scale(0.84); }
  50%      { transform: perspective(900px) rotateY(-26deg) rotateX(7deg) translateY(-24px) scale(0.84); }
}
@keyframes ret-glow-pulse {
  0%,100% { opacity: 0.55; transform: scale(1); }
  50%      { opacity: 0.85; transform: scale(1.06); }
}
@keyframes ret-scan {
  0%   { transform: translateY(-100%); opacity: 0; }
  20%  { opacity: 0.6; }
  80%  { opacity: 0.6; }
  100% { transform: translateY(400%); opacity: 0; }
}
@keyframes ret-orbit {
  0%   { transform: rotate(0deg)   translateX(var(--r)) rotate(0deg);   }
  100% { transform: rotate(360deg) translateX(var(--r)) rotate(-360deg); }
}
@keyframes ret-beam {
  0%,100% { opacity: 0.12; }
  50%     { opacity: 0.28; }
}
.ret-vial-front { animation: ret-float      5.5s ease-in-out infinite; }
.ret-vial-back  { animation: ret-float-back 5.5s ease-in-out infinite; animation-delay:-2s; }
.ret-glow       { animation: ret-glow-pulse 3.5s ease-in-out infinite; }
.ret-scan       { animation: ret-scan       3.2s ease-in-out infinite; }
.ret-beam       { animation: ret-beam       4s ease-in-out infinite; }
`;

const RECEPTOR_PILLS = [
  { label: "GIP",      color: "#22c55e", r: "150px", dur: "7s",  delay: "0s"    },
  { label: "GLP-1",    color: "#2dd4bf", r: "135px", dur: "9s",  delay: "-3s"   },
  { label: "Glucagon", color: "#a78bfa", r: "162px", dur: "11s", delay: "-5.5s" },
];

export default function RetatrutideExhibit() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <section className="relative py-28 overflow-hidden"
        style={{ background: "linear-gradient(170deg, #04090f 0%, #051a10 45%, #04090f 100%)" }}>

        {/* ── background atmosphere ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large center bloom */}
          <div className="ret-glow absolute"
            style={{
              width: 700, height: 700,
              top: "50%", left: "55%",
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(34,197,94,0.09) 0%, transparent 60%)",
            }} />

          {/* Light beams */}
          {[
            { left: "42%", rotate: "-35deg", w: 280, delay: "0s" },
            { left: "58%", rotate: "20deg",  w: 200, delay: "1.8s" },
            { left: "70%", rotate: "-10deg", w: 160, delay: "0.9s" },
          ].map((b, i) => (
            <div key={i} className="ret-beam absolute"
              style={{
                top: 0, left: b.left,
                width: b.w, height: "100%",
                background: "linear-gradient(to bottom, rgba(34,197,94,0.12) 0%, transparent 100%)",
                transform: `rotate(${b.rotate})`,
                transformOrigin: "top center",
                animationDelay: b.delay,
              }} />
          ))}

          {/* Subtle grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
        </div>

        {/* ── main layout ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ━━━ LEFT: COPY ━━━ */}
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

              {/* Receptor target cards */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label: "GIP",      sub: "Receptor", color: "#22c55e" },
                  { label: "GLP-1",    sub: "Receptor", color: "#2dd4bf" },
                  { label: "Glucagon", sub: "Receptor", color: "#a78bfa" },
                ].map(({ label, sub, color }) => (
                  <div key={label}
                    className="rounded-2xl p-4 text-center transition-transform hover:scale-105 hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(145deg, ${color}0a, ${color}05)`,
                      border: `1px solid ${color}22`,
                      backdropFilter: "blur(8px)",
                    }}>
                    <div className="w-2 h-2 rounded-full mx-auto mb-2.5"
                      style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
                    <div className="font-black text-sm text-white">{label}</div>
                    <div className="text-[10px] mt-0.5 font-medium" style={{ color: `${color}99` }}>{sub}</div>
                  </div>
                ))}
              </div>

              {/* Specs row */}
              <div className="flex gap-8 mb-8">
                {[
                  { label: "Purity",  value: "≥ 99%" },
                  { label: "Form",    value: "Lyophilized" },
                  { label: "Storage", value: "−20°C" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-1"
                      style={{ color: "#3d5448" }}>
                      {label}
                    </div>
                    <div className="text-lg font-black" style={{ color: "#22c55e" }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mb-4">
                <Link href="/catalog/retatrutide-10"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
                    color: "#fff",
                    boxShadow: "0 0 28px rgba(34,197,94,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}>
                  10 mg — $179
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link href="/catalog/retatrutide-20"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(34,197,94,0.06)",
                    border: "1px solid rgba(34,197,94,0.28)",
                    color: "#22c55e",
                  }}>
                  20 mg — $219
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-xs" style={{ color: "#2d4038" }}>
                For laboratory research use only · Not for human or veterinary use
              </p>
            </div>

            {/* ━━━ RIGHT: 3D VIAL STAGE ━━━ */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="relative" style={{ width: 380, height: 420 }}>

                {/* Radial glow under vials */}
                <div className="absolute ret-glow"
                  style={{
                    width: 340, height: 340,
                    top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(34,197,94,0.14) 0%, transparent 65%)",
                  }} />

                {/* Orbiting receptor dots */}
                {RECEPTOR_PILLS.map(({ label, color, r, dur, delay }) => (
                  <div key={label}
                    className="absolute"
                    style={{
                      top: "50%", left: "50%",
                      "--r": r,
                      animation: `ret-orbit ${dur} linear infinite`,
                      animationDelay: delay,
                    } as React.CSSProperties}>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold -translate-x-1/2 -translate-y-1/2"
                      style={{
                        backgroundColor: `${color}18`,
                        border: `1px solid ${color}40`,
                        color,
                        boxShadow: `0 0 10px ${color}30`,
                        whiteSpace: "nowrap",
                      }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                      {label}
                    </div>
                  </div>
                ))}

                {/* ── VIAL: 20 mg (back / bigger) ── */}
                <div className="ret-vial-back absolute"
                  style={{
                    width: 175, height: 290,
                    top: "6%", left: "52%",
                    transformOrigin: "center bottom",
                    filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.7)) drop-shadow(0 0 20px rgba(34,197,94,0.18))",
                  }}>
                  <VialImage name="Retatrutide" quantity="20 mg / vial"
                    capColor="#22c55e" labelColor="#22c55e"
                    className="w-full h-full" />
                  {/* Scan line */}
                  <div className="ret-scan absolute inset-x-0 h-8 pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, transparent, rgba(34,197,94,0.18), transparent)" }} />
                  {/* Price tag */}
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-center">
                    <div className="text-xs font-bold text-white">20 mg</div>
                    <div className="text-[10px]" style={{ color: "#22c55e" }}>$219</div>
                  </div>
                </div>

                {/* ── VIAL: 10 mg (front / hero) ── */}
                <div className="ret-vial-front absolute"
                  style={{
                    width: 195, height: 320,
                    top: "4%", left: "10%",
                    transformOrigin: "center bottom",
                    filter: "drop-shadow(0 32px 60px rgba(0,0,0,0.80)) drop-shadow(0 0 30px rgba(34,197,94,0.22))",
                    zIndex: 2,
                  }}>
                  <VialImage name="Retatrutide" quantity="10 mg / vial"
                    capColor="#22c55e" labelColor="#22c55e"
                    className="w-full h-full" />
                  {/* Scan line */}
                  <div className="ret-scan absolute inset-x-0 h-10 pointer-events-none"
                    style={{
                      background: "linear-gradient(to bottom, transparent, rgba(34,197,94,0.22), transparent)",
                      animationDelay: "-1.2s",
                    }} />
                  {/* Purity badge */}
                  <div className="absolute -top-3 right-0 px-2.5 py-1 rounded-full text-[10px] font-bold"
                    style={{
                      backgroundColor: "#22c55e18",
                      border: "1px solid #22c55e40",
                      color: "#22c55e",
                    }}>
                    ≥ 99% Pure
                  </div>
                  {/* Price tag */}
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-center">
                    <div className="text-xs font-bold text-white">10 mg</div>
                    <div className="text-[10px]" style={{ color: "#22c55e" }}>$179</div>
                  </div>
                </div>

                {/* Floor reflection */}
                <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(34,197,94,0.05), transparent)",
                    borderTop: "1px solid rgba(34,197,94,0.08)",
                  }} />

                {/* Triple agonist badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap"
                    style={{
                      background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(45,212,191,0.1))",
                      border: "1px solid rgba(34,197,94,0.3)",
                      color: "#22c55e",
                      boxShadow: "0 0 16px rgba(34,197,94,0.15)",
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
