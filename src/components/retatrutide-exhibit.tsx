"use client";

import Link from "next/link";
import { ChevronRight, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─── CSS for background atmosphere only ─────────────────────────────────── */
const styles = `
@keyframes ret-glow-pulse {
  0%,100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1); }
  50%      { opacity: 0.85; transform: translate(-50%,-50%) scale(1.08); }
}
@keyframes ret-beam {
  0%,100% { opacity: 0.09; }
  50%      { opacity: 0.20; }
}
@keyframes ret-orbit {
  0%   { transform: rotate(0deg)   translateX(var(--r)) rotate(0deg);   }
  100% { transform: rotate(360deg) translateX(var(--r)) rotate(-360deg); }
}
.ret-glow  { animation: ret-glow-pulse 3.5s ease-in-out infinite; }
.ret-beam  { animation: ret-beam       4s   ease-in-out infinite; }
`;

const RECEPTOR_PILLS = [
  { label: "GIP",      color: "#22c55e", r: "155px", dur: "7s",    delay: "0s"    },
  { label: "GLP-1",    color: "#2dd4bf", r: "138px", dur: "9.5s",  delay: "-3.2s" },
  { label: "Glucagon", color: "#a78bfa", r: "165px", dur: "11.5s", delay: "-5.8s" },
];

/* ─── Drag-to-spin vial viewer ─────────────────────────────────────────────── */
function VialViewer() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [rot, setRot]   = useState(0);
  const [zoom, setZoom] = useState(1);
  const [hintVisible, setHintVisible] = useState(true);

  const dragging   = useRef(false);
  const startX     = useRef(0);
  const startRot   = useRef(0);
  const activeMap  = useRef(new Map<number, PointerEvent>());
  const pinchStart = useRef<number | null>(null);
  const pinchZoom0 = useRef(1);
  const rotRef     = useRef(0);
  const zoomRef    = useRef(1);

  // keep refs in sync so event handlers always see latest values
  useEffect(() => { rotRef.current  = rot;  }, [rot]);
  useEffect(() => { zoomRef.current = zoom; }, [zoom]);

  function clampZoom(z: number) { return Math.min(2.4, Math.max(0.7, z)); }

  function dist(a: PointerEvent, b: PointerEvent) {
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  }

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    viewerRef.current?.setPointerCapture(e.pointerId);
    activeMap.current.set(e.pointerId, e.nativeEvent);

    if (activeMap.current.size === 2) {
      const vals = [...activeMap.current.values()];
      pinchStart.current = dist(vals[0], vals[1]);
      pinchZoom0.current = zoomRef.current;
    } else {
      dragging.current = true;
      startX.current   = e.clientX;
      startRot.current = rotRef.current;
    }
    setHintVisible(false);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    activeMap.current.set(e.pointerId, e.nativeEvent);

    if (activeMap.current.size === 2 && pinchStart.current !== null) {
      const vals = [...activeMap.current.values()];
      const d = dist(vals[0], vals[1]);
      setZoom(clampZoom(pinchZoom0.current * (d / pinchStart.current!)));
      return;
    }
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    setRot(startRot.current + dx * 0.45);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    activeMap.current.delete(e.pointerId);
    if (activeMap.current.size < 2) pinchStart.current = null;
    dragging.current = false;
  }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(z => clampZoom(z + (e.deltaY < 0 ? 0.06 : -0.06)));
    setHintVisible(false);
  }, []);

  function reset() { setRot(0); setZoom(1); setHintVisible(true); }

  // Derive CSS transform from rotation
  const sinVal  = Math.sin((rot * Math.PI) / 180);
  const cosVal  = Math.abs(Math.cos((rot * Math.PI) / 180));
  const scaleX  = cosVal * 0.22 + 0.78;
  const tiltZ   = rot * 0.018;
  const translateY = sinVal * 7;

  const imgStyle: React.CSSProperties = {
    transform: `translateY(${translateY}px) scale(${zoom}) rotateZ(${tiltZ}deg) scaleX(${scaleX})`,
    transition: dragging.current ? "none" : "transform 0.08s linear",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain" as const,
    filter: "drop-shadow(0 28px 48px rgba(0,0,0,0.75)) drop-shadow(0 0 30px rgba(168,139,250,0.22))",
    transformOrigin: "center center",
    userSelect: "none" as const,
    WebkitUserSelect: "none" as const,
    pointerEvents: "none" as const,
    display: "block",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      {/* ── stage ── */}
      <div
        ref={viewerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        style={{
          position: "relative",
          width: 260,
          height: 360,
          display: "grid",
          placeItems: "center",
          touchAction: "none",
          cursor: dragging.current ? "grabbing" : "grab",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/retatrutide.png"
          alt="Retatrutide 30 mg"
          draggable={false}
          style={imgStyle}
        />

        {/* Purity badge */}
        <div style={{
          position: "absolute", top: 8, right: 0,
          padding: "4px 10px", borderRadius: 999,
          fontSize: 10, fontWeight: 700,
          backgroundColor: "rgba(34,197,94,0.14)",
          border: "1px solid rgba(34,197,94,0.38)",
          color: "#22c55e",
        }}>
          ≥ 99% Pure
        </div>

        {/* Drag hint */}
        {hintVisible && (
          <div style={{
            position: "absolute", bottom: 10, left: "50%",
            transform: "translateX(-50%)",
            padding: "7px 14px", borderRadius: 999,
            fontSize: 11, color: "#8da8a0",
            backgroundColor: "rgba(10,20,16,0.75)",
            border: "1px solid rgba(34,197,94,0.18)",
            whiteSpace: "nowrap", pointerEvents: "none",
          }}>
            Drag to spin · Scroll to zoom
          </div>
        )}
      </div>

      {/* ── controls ── */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {[
          { label: "◀", action: () => { setRot(r => r - 20); setHintVisible(false); } },
          { label: "▶", action: () => { setRot(r => r + 20); setHintVisible(false); } },
          { label: "−", action: () => setZoom(z => clampZoom(z - 0.1)) },
          { label: "+", action: () => setZoom(z => clampZoom(z + 0.1)) },
        ].map(({ label, action }) => (
          <button key={label} onClick={action}
            style={{
              border: "1px solid rgba(34,197,94,0.22)",
              background: "rgba(34,197,94,0.06)",
              color: "#22c55e",
              padding: "8px 14px",
              borderRadius: 999,
              fontSize: 13,
              cursor: "pointer",
              minWidth: 40,
              fontWeight: 600,
            }}>
            {label}
          </button>
        ))}
        <button onClick={reset}
          style={{
            border: "1px solid rgba(255,255,255,0.10)",
            background: "transparent",
            color: "#8da8a0",
            padding: "8px 12px",
            borderRadius: 999,
            fontSize: 12,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}>
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* stat line */}
      <div style={{ fontSize: 11, color: "#3d5448", letterSpacing: "0.08em" }}>
        Rotation {Math.round(rot)}° · Zoom {zoom.toFixed(2)}×
      </div>
    </div>
  );
}

/* ─── Main exhibit ────────────────────────────────────────────────────────── */
export default function RetatrutideExhibit() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <section className="relative py-28 overflow-hidden"
        style={{ background: "linear-gradient(170deg, #04090f 0%, #051a10 45%, #04090f 100%)" }}>

        {/* Background atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="ret-glow absolute"
            style={{
              width: 680, height: 680, top: "50%", left: "62%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 60%)",
            }} />
          {[
            { left: "45%", rotate: "-32deg", w: 260, delay: "0s"   },
            { left: "60%", rotate: "18deg",  w: 190, delay: "1.8s" },
            { left: "72%", rotate: "-8deg",  w: 150, delay: "0.9s" },
          ].map((b, i) => (
            <div key={i} className="ret-beam absolute"
              style={{
                top: 0, left: b.left, width: b.w, height: "100%",
                background: "linear-gradient(to bottom, rgba(34,197,94,0.13) 0%, transparent 100%)",
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
                    }}>
                    <div className="w-2 h-2 rounded-full mx-auto mb-2.5"
                      style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
                    <div className="font-black text-sm text-white">{label}</div>
                    <div className="text-[10px] mt-0.5 font-medium" style={{ color: `${color}99` }}>{sub}</div>
                  </div>
                ))}
              </div>

              {/* Specs */}
              <div className="flex gap-8 mb-8">
                {[
                  { label: "Purity",   value: "≥ 99%"  },
                  { label: "Quantity", value: "30 mg"   },
                  { label: "Storage",  value: "−20°C"   },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-1"
                      style={{ color: "#3d5448" }}>{label}</div>
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

            {/* ━━━ RIGHT: 3D SPIN VIEWER ━━━ */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="relative" style={{ width: 360, height: 460 }}>

                {/* Glow bloom behind vial */}
                <div className="ret-glow absolute"
                  style={{
                    width: 300, height: 300, top: "42%", left: "50%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 65%)",
                  }} />

                {/* Orbiting receptor pills */}
                {RECEPTOR_PILLS.map(({ label, color, r, dur, delay }) => (
                  <div key={label} className="absolute"
                    style={{
                      top: "44%", left: "50%",
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

                {/* Spin viewer centred in stage */}
                <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -52%)", zIndex: 2 }}>
                  <VialViewer />
                </div>

                {/* Floor line */}
                <div className="absolute bottom-2 left-0 right-0 h-12 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(34,197,94,0.06), transparent)",
                    borderTop: "1px solid rgba(34,197,94,0.07)",
                  }} />

                {/* Bottom badge */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-10">
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
