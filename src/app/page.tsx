"use client";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Truck, BookOpen, Award, DollarSign, Headphones } from "lucide-react";
import MolecularBg from "@/components/molecular-bg";
import ProductCard from "@/components/product-card";
import { featuredProducts } from "@/lib/products";
import { useEffect, useRef } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

const benefits = [
  { icon: Award,      title: "Lab-Focused",         desc: "Designed around the needs of research environments — not consumer supplement markets." },
  { icon: ShieldCheck, title: "Consistency",          desc: "Batches produced and stored with a focus on identity, purity, and reproducibility." },
  { icon: DollarSign,  title: "Transparent Pricing",  desc: "Clear, straightforward pricing on every compound. No hidden costs." },
  { icon: Headphones,  title: "Responsive Support",   desc: "Responsive assistance for availability, documentation, and ordering inquiries." },
];

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-16"
        style={{ background: "linear-gradient(160deg, #f7f5f2 0%, #efeae3 40%, #f3eff8 100%)" }}>
        <MolecularBg />

        {/* Animated ambient orbs */}
        <div className="absolute top-[8%] right-[12%] w-[520px] h-[520px] rounded-full pointer-events-none animate-orb-1"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-[10%] left-[8%] w-[420px] h-[420px] rounded-full pointer-events-none animate-orb-2"
          style={{ background: "radial-gradient(circle, rgba(1,105,111,0.10) 0%, transparent 65%)", filter: "blur(36px)" }} />
        <div className="absolute top-[45%] left-[38%] w-[280px] h-[280px] rounded-full pointer-events-none animate-orb-3"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", filter: "blur(30px)" }} />

        {/* Top-right corner accent line */}
        <div className="absolute top-0 right-0 w-px h-48 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(1,105,111,0.25), transparent)" }} />
        <div className="absolute top-0 right-0 w-48 h-px pointer-events-none"
          style={{ background: "linear-gradient(to left, transparent, rgba(139,92,246,0.25), transparent)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">

          {/* Eyebrow pill — animated pulse ring */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-semibold mb-9 animate-fade-in"
            style={{
              backgroundColor: "rgba(1,105,111,0.07)",
              border: "1px solid rgba(1,105,111,0.22)",
              color: "#01696f",
              boxShadow: "0 0 0 4px rgba(1,105,111,0.05)",
            }}>
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping"
                style={{ backgroundColor: "#01696f" }} />
              <span className="relative inline-flex w-2 h-2 rounded-full" style={{ backgroundColor: "#01696f" }} />
            </span>
            Professional Peptide Research Chemicals
          </div>

          <h1 className="font-black leading-none mb-6 animate-fade-in-up"
            style={{ fontSize: "clamp(3.4rem, 8.5vw, 6.5rem)", letterSpacing: "-0.04em", color: "#1c1917" }}>
            Gills{" "}
            <span className="gradient-text">Bio Lab</span>
          </h1>

          <p className="text-xl sm:text-2xl font-light mb-5 animate-fade-in-up delay-100"
            style={{ color: "#6b6560", letterSpacing: "0.01em" }}>
            Advanced Peptide Research Chemicals
          </p>

          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200"
            style={{ color: "#9c9590" }}>
            High-purity compounds for serious laboratories and qualified professionals.
            Every product supplied strictly for in vitro research.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-fade-in-up delay-300">
            <Link href="/catalog"
              className="btn-shimmer inline-flex items-center gap-2 px-9 py-4 rounded-xl text-sm font-bold transition-all hover:scale-105 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #01696f, #018a92)",
                color: "#ffffff",
                boxShadow: "0 6px 28px rgba(1,105,111,0.35), 0 2px 8px rgba(1,105,111,0.20), inset 0 1px 0 rgba(255,255,255,0.18)",
              }}>
              Browse Research Catalog
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: "rgba(255,255,255,0.80)",
                border: "1px solid rgba(28,25,23,0.14)",
                color: "#3d3833",
                boxShadow: "0 2px 12px rgba(28,25,23,0.06), inset 0 1px 0 rgba(255,255,255,0.90)",
                backdropFilter: "blur(12px)",
              }}>
              Request a Quote
            </Link>
          </div>

          {/* Trust micro-badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fade-in-up delay-400">
            {["≥ 98% Purity", "Lot-Specific CoA", "Discreet Shipping", "RUO Compliant"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold"
                style={{ backgroundColor: "rgba(255,255,255,0.65)", border: "1px solid rgba(28,25,23,0.10)", color: "#6b6560", backdropFilter: "blur(8px)" }}>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#01696f" }} />
                {t}
              </span>
            ))}
          </div>

          <p className="text-xs animate-fade-in-up delay-500" style={{ color: "#9c9590" }}>
            Limited to qualified researchers and institutions.{" "}
            <span style={{ color: "#dc2626" }}>Not for human consumption.</span>
          </p>
        </div>

        {/* Fade-out bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--bg-base))" }} />
      </section>

      {/* ── TICKER STRIP ─────────────────────────────────────────────────── */}
      <section className="overflow-hidden"
        style={{
          backgroundColor: "#01696f",
          borderTop: "1px solid rgba(255,255,255,0.10)",
        }}>
        <div className="flex items-center py-2.5">
          <div className="animate-ticker flex items-center gap-0 whitespace-nowrap">
            {[...Array(2)].map((_, gi) => (
              <div key={gi} className="flex items-center">
                {[
                  "≥ 98% Purity Guaranteed",
                  "Lot-Specific CoA Available",
                  "Discreet Professional Shipping",
                  "Research Use Only",
                  "Qualified Labs & Institutions",
                  "Peptide Research Chemicals",
                  "Fast Order Processing",
                  "Transparent Pricing",
                ].map((t, i) => (
                  <div key={`${gi}-${i}`} className="flex items-center">
                    <span className="px-8 text-[11px] font-semibold tracking-widest uppercase text-white/90">{t}</span>
                    <span className="text-white/30 text-xs">◈</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "var(--bg-base)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#01696f" }}>
              Catalog Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 mb-4"
              style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>
              Featured Compounds
            </h2>
            {/* Silver rule */}
            <div className="w-16 h-px mx-auto mb-4"
              style={{ background: "linear-gradient(90deg, transparent, rgba(1,105,111,0.4), transparent)" }} />
            <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: "#9c9590" }}>
              Popular peptide research chemicals chosen by labs for ongoing studies.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featuredProducts.slice(0, 8).map((product) => (
              <RevealSection key={product.id}>
                <ProductCard product={product} />
              </RevealSection>
            ))}
          </div>

          <RevealSection className="mt-12 text-center">
            <Link href="/catalog"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{
                border: "1px solid rgba(1,105,111,0.25)",
                color: "#01696f",
                backgroundColor: "rgba(1,105,111,0.05)",
              }}>
              View Full Catalog
              <ChevronRight className="w-4 h-4" />
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ── WHY GILLS BIO LAB ────────────────────────────────────────────── */}
      <section className="py-24"
        style={{ background: "linear-gradient(160deg, #f0ede8 0%, #ede9f5 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#8b5cf6" }}>
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 mb-4"
              style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>
              Why Labs Choose Gills Bio Lab
            </h2>
            <div className="w-16 h-px mx-auto"
              style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }} />
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <RevealSection key={b.title}>
                <div className="glass-card rounded-2xl p-6 h-full group cursor-default"
                  style={{ transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(1,105,111,0.14), 0 0 0 1px rgba(1,105,111,0.22)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: i % 2 === 0
                        ? "linear-gradient(135deg, rgba(1,105,111,0.14), rgba(1,105,111,0.06))"
                        : "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.05))",
                      boxShadow: i % 2 === 0
                        ? "0 4px 16px rgba(1,105,111,0.12)"
                        : "0 4px 16px rgba(139,92,246,0.10)",
                    }}>
                    <b.icon className="w-5 h-5" style={{ color: i % 2 === 0 ? "#01696f" : "#7c3aed" }} />
                  </div>
                  <h3 className="font-black text-sm mb-2" style={{ color: "#1c1917" }}>{b.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#9c9590" }}>{b.desc}</p>
                  {/* Subtle bottom accent line */}
                  <div className="mt-4 h-px w-8 rounded-full transition-all group-hover:w-14"
                    style={{ background: i % 2 === 0 ? "rgba(1,105,111,0.35)" : "rgba(139,92,246,0.35)" }} />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY TEASER ───────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "var(--bg-base)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="rounded-3xl overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, rgba(1,105,111,0.06) 0%, rgba(255,255,255,0.80) 40%, rgba(139,92,246,0.05) 100%)",
                border: "1px solid rgba(255,255,255,0.90)",
                boxShadow: "0 4px 40px rgba(28,25,23,0.08), inset 0 1px 0 rgba(255,255,255,0.80)",
                backdropFilter: "blur(20px)",
              }}>
              {/* Layered background orbs */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 65%)", filter: "blur(40px)", transform: "translate(30%, -30%)" }} />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(1,105,111,0.09) 0%, transparent 65%)", filter: "blur(32px)", transform: "translate(-20%, 20%)" }} />
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 p-10 lg:p-16 items-center">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block" style={{ color: "#01696f" }}>
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#01696f" }} />
                    Documentation & Quality
                  </span>
                  <h2 className="text-3xl font-black mb-5" style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>
                    Quality you can{" "}
                    <span style={{
                      background: "linear-gradient(135deg, #01696f, #7c3aed)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>verify.</span>
                  </h2>
                  <p className="text-sm leading-relaxed mb-7" style={{ color: "#6b6560" }}>
                    Research demands more than access to compounds — it requires confidence in what is being used.
                    Gills Bio Lab operates with a focus on consistency, lot traceability, and responsive documentation.
                  </p>
                  <ul className="space-y-3.5 mb-8">
                    {[
                      { icon: ShieldCheck, text: "Lot-focused batches tracked and documented for internal quality standards.", accent: "teal" },
                      { icon: Truck,       text: "Cold-chain aware shipping designed to preserve compound integrity in transit.", accent: "orchid" },
                      { icon: BookOpen,    text: "Lot-specific CoA and documentation available to qualified researchers on request.", accent: "teal" },
                    ].map((item) => (
                      <li key={item.text} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{
                            background: item.accent === "teal"
                              ? "linear-gradient(135deg, rgba(1,105,111,0.12), rgba(1,105,111,0.05))"
                              : "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.05))",
                          }}>
                          <item.icon className="w-3.5 h-3.5" style={{ color: item.accent === "teal" ? "#01696f" : "#7c3aed" }} />
                        </div>
                        <span className="text-sm leading-relaxed" style={{ color: "#3d3833" }}>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/quality"
                    className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(135deg, #01696f, #018a92)",
                      color: "#ffffff",
                      boxShadow: "0 6px 24px rgba(1,105,111,0.30), inset 0 1px 0 rgba(255,255,255,0.15)",
                    }}>
                    View Quality Details
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Decorative ring cluster */}
                <div className="flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    {/* Outer glow */}
                    <div className="absolute inset-0 rounded-full"
                      style={{ background: "radial-gradient(circle, rgba(1,105,111,0.10) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)" }} />
                    {/* Rings */}
                    <div className="absolute inset-4 rounded-full"
                      style={{ border: "1.5px solid rgba(1,105,111,0.08)", borderTopColor: "rgba(1,105,111,0.40)", borderRightColor: "rgba(139,92,246,0.25)", animation: "spin 22s linear infinite" }} />
                    <div className="absolute inset-10 rounded-full"
                      style={{ border: "1.5px solid rgba(139,92,246,0.07)", borderTopColor: "rgba(139,92,246,0.40)", borderLeftColor: "rgba(1,105,111,0.20)", animation: "spin 14s linear infinite reverse" }} />
                    <div className="absolute inset-16 rounded-full"
                      style={{ border: "1px solid rgba(1,105,111,0.06)", borderTopColor: "rgba(1,105,111,0.30)", animation: "spin 8s linear infinite" }} />
                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, rgba(1,105,111,0.12), rgba(139,92,246,0.08))",
                          border: "1px solid rgba(255,255,255,0.80)",
                          boxShadow: "0 8px 32px rgba(1,105,111,0.14), inset 0 1px 0 rgba(255,255,255,0.60)",
                        }}>
                        <svg className="w-9 h-9" style={{ color: "#01696f" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M9 3h6M9 3v6l-4 10a1 1 0 001 1.5h12A1 1 0 0019 19l-4-10V3M9 3H7m8 0h2"/>
                        </svg>
                      </div>
                    </div>
                    {/* Orbiting dot — teal */}
                    <div className="absolute inset-4"
                      style={{ animation: "spin 22s linear infinite" }}>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                        style={{ background: "radial-gradient(circle, #01696f, #018a92)", boxShadow: "0 0 8px rgba(1,105,111,0.6)" }} />
                    </div>
                    {/* Orbiting dot — orchid */}
                    <div className="absolute inset-10"
                      style={{ animation: "spin 14s linear infinite reverse" }}>
                      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full"
                        style={{ background: "radial-gradient(circle, #8b5cf6, #7c3aed)", boxShadow: "0 0 6px rgba(139,92,246,0.6)" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── DISCLAIMER ───────────────────────────────────────────────────── */}
      <section className="py-10"
        style={{ backgroundColor: "rgba(220,38,38,0.03)", borderTop: "1px solid rgba(220,38,38,0.08)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
            style={{ backgroundColor: "rgba(220,38,38,0.07)", color: "#b91c1c", border: "1px solid rgba(220,38,38,0.15)" }}>
            Research Use Only
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>
            All products from Gills Bio Lab are peptide research chemicals.{" "}
            <strong style={{ color: "#1c1917" }}>Not for human or veterinary use.</strong>{" "}
            Not drugs, foods, cosmetics, or therapeutics.
          </p>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #ede9f5 0%, #e8f4f4 100%)" }}>
        {/* Background orbs */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[250px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(1,105,111,0.09) 0%, transparent 65%)", filter: "blur(36px)" }} />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <RevealSection>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block justify-center" style={{ color: "#8b5cf6" }}>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#8b5cf6" }} />
              Research Updates
            </span>
            <h2 className="text-3xl font-black mb-4" style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>
              Stay ahead of{" "}
              <span style={{
                background: "linear-gradient(135deg, #8b5cf6, #01696f)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>new compounds.</span>
            </h2>
            <p className="text-sm mb-8 leading-relaxed max-w-sm mx-auto" style={{ color: "#9c9590" }}>
              Get notified when new research chemicals are added. For qualified labs and institutions only.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Institutional email address"
                className="flex-1 px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: "rgba(255,255,255,0.88)",
                  border: "1px solid rgba(28,25,23,0.12)",
                  color: "#1c1917",
                  boxShadow: "0 2px 12px rgba(28,25,23,0.05), inset 0 1px 0 rgba(255,255,255,0.80)",
                }}
                onFocus={e => (e.target.style.borderColor = "rgba(1,105,111,0.35)")}
                onBlur={e => (e.target.style.borderColor = "rgba(28,25,23,0.12)")}
              />
              <button type="submit"
                className="btn-shimmer px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #01696f, #018a92)",
                  color: "#ffffff",
                  boxShadow: "0 6px 24px rgba(1,105,111,0.30), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}>
                Subscribe
              </button>
            </form>
            <p className="text-[10px]" style={{ color: "#9c9590" }}>
              No spam. Unsubscribe any time. Research institutions only.
            </p>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
