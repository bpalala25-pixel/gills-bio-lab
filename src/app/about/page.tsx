"use client";
import Link from "next/link";
import { ChevronRight, FlaskConical, Award, Users, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{
        background: "linear-gradient(160deg, #f0ede8 0%, #ede9f5 60%, #e8f4f4 100%)",
        borderBottom: "1px solid rgba(28,25,23,0.08)",
      }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[15%] w-[400px] h-[300px]"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)", filter: "blur(36px)" }} />
          <div className="absolute bottom-0 left-[10%] w-[320px] h-[220px]"
            style={{ background: "radial-gradient(circle, rgba(1,105,111,0.09) 0%, transparent 65%)", filter: "blur(28px)" }} />
          {/* Corner accent lines */}
          <div className="absolute top-0 right-0 w-px h-40"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.25), transparent)" }} />
          <div className="absolute top-0 right-0 w-40 h-px"
            style={{ background: "linear-gradient(to left, transparent, rgba(1,105,111,0.25), transparent)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 text-center">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#01696f" }}>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#01696f" }} />
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-2 mb-5" style={{ color: "#1c1917", letterSpacing: "-0.03em" }}>
            Built for the{" "}
            <span style={{
              background: "linear-gradient(135deg, #01696f 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>lab.</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#6b6560" }}>
            Gills Bio Lab exists for one purpose: to make sourcing reliable peptide research chemicals
            simple, transparent, and professional.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: "#01696f" }}>Our Mission</span>
            <h2 className="text-2xl font-black mb-5" style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>
              Consistent supply.<br />
              <span style={{
                background: "linear-gradient(135deg, #01696f, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Reliable quality.</span>
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "#6b6560" }}>
              We focus on delivering consistent, lab-grade compounds backed by responsive support for research
              organizations of all sizes. Our peptides are prepared for laboratory environments where reproducibility
              and reliability matter.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#6b6560" }}>
              From first-time buyers to high-volume institutional labs, we work to keep your research supplied,
              not stalled.
            </p>
            <div className="p-4 rounded-xl text-sm leading-relaxed"
              style={{ backgroundColor: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.10)", color: "#6b6560" }}>
              All products are sold strictly for laboratory research use only. They are not drugs, foods, cosmetics,
              or therapeutics, and must not be used on humans or animals.
            </div>
          </div>

          {/* Animated visual */}
          <div className="flex items-center justify-center">
            <div className="relative w-56 h-56">
              <div className="absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(1,105,111,0.10) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)" }} />
              <div className="absolute inset-4 rounded-full"
                style={{ border: "1.5px solid rgba(1,105,111,0.10)", borderTopColor: "rgba(1,105,111,0.45)", borderRightColor: "rgba(139,92,246,0.25)", animation: "spin 20s linear infinite" }} />
              <div className="absolute inset-10 rounded-full"
                style={{ border: "1px solid rgba(139,92,246,0.08)", borderTopColor: "rgba(139,92,246,0.40)", animation: "spin 12s linear infinite reverse" }} />
              {/* Orbiting dots */}
              <div className="absolute inset-4" style={{ animation: "spin 20s linear infinite" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                  style={{ background: "radial-gradient(circle, #01696f, #018a92)", boxShadow: "0 0 8px rgba(1,105,111,0.6)" }} />
              </div>
              <div className="absolute inset-10" style={{ animation: "spin 12s linear infinite reverse" }}>
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full"
                  style={{ background: "radial-gradient(circle, #8b5cf6, #7c3aed)", boxShadow: "0 0 6px rgba(139,92,246,0.6)" }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(1,105,111,0.12), rgba(139,92,246,0.08))",
                    border: "1px solid rgba(255,255,255,0.80)",
                    boxShadow: "0 8px 32px rgba(1,105,111,0.14), inset 0 1px 0 rgba(255,255,255,0.60)",
                  }}>
                  <FlaskConical className="w-8 h-8" style={{ color: "#01696f" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#8b5cf6" }}>Why Choose Us</span>
            <h2 className="text-2xl font-black mt-2" style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>Why Labs Choose Us</h2>
            <div className="w-12 h-px mx-auto mt-3"
              style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.40), transparent)" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: FlaskConical, title: "Lab-Focused",   desc: "Everything we do is designed around the needs of research environments, not consumer supplement markets.", accent: "teal" },
              { icon: Award,        title: "Consistency",   desc: "Batches are produced and stored with a focus on identity, purity, and stability across lots.", accent: "orchid" },
              { icon: Shield,       title: "Transparency",  desc: "Clear, straightforward pricing with options for bulk and recurring orders. No hidden fees.", accent: "teal" },
            ].map((v) => (
              <div key={v.title}
                className="glass-card p-6 rounded-2xl text-center group cursor-default"
                style={{ transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = v.accent === "teal"
                    ? "0 16px 48px rgba(1,105,111,0.14), 0 0 0 1px rgba(1,105,111,0.22)"
                    : "0 16px 48px rgba(139,92,246,0.12), 0 0 0 1px rgba(139,92,246,0.20)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: v.accent === "teal"
                      ? "linear-gradient(135deg, rgba(1,105,111,0.14), rgba(1,105,111,0.06))"
                      : "linear-gradient(135deg, rgba(139,92,246,0.14), rgba(139,92,246,0.06))",
                    boxShadow: v.accent === "teal"
                      ? "0 4px 16px rgba(1,105,111,0.14)"
                      : "0 4px 16px rgba(139,92,246,0.12)",
                  }}>
                  <v.icon className="w-6 h-6" style={{ color: v.accent === "teal" ? "#01696f" : "#7c3aed" }} />
                </div>
                <h3 className="font-black mb-2" style={{ color: "#1c1917" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>{v.desc}</p>
                <div className="mt-4 h-px w-8 rounded-full mx-auto transition-all group-hover:w-14"
                  style={{ background: v.accent === "teal" ? "rgba(1,105,111,0.35)" : "rgba(139,92,246,0.35)" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Who buys from us */}
        <div className="rounded-2xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, rgba(1,105,111,0.06), rgba(255,255,255,0.75), rgba(139,92,246,0.04))",
            border: "1px solid rgba(255,255,255,0.85)",
            boxShadow: "0 4px 32px rgba(28,25,23,0.07), inset 0 1px 0 rgba(255,255,255,0.70)",
            backdropFilter: "blur(20px)",
          }}>
          <div className="absolute top-0 right-0 w-[200px] h-[200px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(1,105,111,0.07) 0%, transparent 65%)", filter: "blur(24px)" }} />
          <div className="relative p-8 flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(1,105,111,0.14), rgba(1,105,111,0.06))", boxShadow: "0 4px 16px rgba(1,105,111,0.14)" }}>
              <Users className="w-6 h-6" style={{ color: "#01696f" }} />
            </div>
            <div>
              <h2 className="text-xl font-black mb-3" style={{ color: "#1c1917" }}>Who We Supply</h2>
              <p className="text-base leading-relaxed mb-3" style={{ color: "#6b6560" }}>
                Gills Bio Lab sells exclusively to qualified researchers, institutions, and organizations capable of
                safely handling laboratory-grade chemicals and complying with all relevant regulations.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#6b6560" }}>
                We do not sell to individuals for personal use. All buyers must confirm they are purchasing for
                laboratory research use only and must agree to our Research Use Policy at checkout.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pb-4">
          <Link href="/catalog"
            className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all hover:scale-105 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #01696f, #018a92)",
              color: "#ffffff",
              boxShadow: "0 6px 28px rgba(1,105,111,0.30), inset 0 1px 0 rgba(255,255,255,0.18)",
            }}>
            Browse Research Catalog
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
