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
            <div className="glass-card rounded-3xl overflow-hidden relative">
              {/* Background texture */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 55% 70% at 85% 50%, rgba(139,92,246,0.06) 0%, transparent 65%)" }} />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 p-10 lg:p-16 items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: "#01696f" }}>
                    Documentation & Quality
                  </span>
                  <h2 className="text-3xl font-black mb-5" style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>
                    Quality & Documentation
                  </h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#6b6560" }}>
                    Research demands more than access to compounds — it requires confidence in what is being used.
                    Gills Bio Lab operates with a focus on consistency and traceability.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      { icon: ShieldCheck, text: "Lot-focused: Batches tracked and documented for internal quality standards." },
                      { icon: Truck,       text: "Storage & handling: Shipped under conditions intended to preserve integrity." },
                      { icon: BookOpen,    text: "Documentation: Lot-specific info available to qualified customers on request." },
                    ].map((item) => (
                      <li key={item.text} className="flex items-start gap-3 text-sm" style={{ color: "#3d3833" }}>
                        <item.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#01696f" }} />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                  <Link href="/quality"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #01696f, #018a92)",
                      color: "#ffffff",
                      boxShadow: "0 4px 20px rgba(1,105,111,0.25)",
                    }}>
                    View Quality Details
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Decorative rings */}
                <div className="flex items-center justify-center">
                  <div className="relative w-56 h-56">
                    <div className="absolute inset-0 rounded-full"
                      style={{ background: "radial-gradient(circle, rgba(1,105,111,0.08), transparent 70%)" }} />
                    <div className="absolute inset-6 rounded-full border-2"
                      style={{ borderColor: "rgba(1,105,111,0.12)", borderTopColor: "rgba(1,105,111,0.45)", animation: "spin 20s linear infinite" }} />
                    <div className="absolute inset-12 rounded-full border"
                      style={{ borderColor: "rgba(139,92,246,0.10)", borderTopColor: "rgba(139,92,246,0.45)", animation: "spin 12s linear infinite reverse" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-14 h-14" style={{ color: "#01696f" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M9 3h6M9 3v6l-4 10a1 1 0 001 1.5h12A1 1 0 0019 19l-4-10V3M9 3H7m8 0h2"/>
                      </svg>
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
      <section className="py-24"
        style={{ background: "linear-gradient(160deg, #ede9f5 0%, #e8f4f4 100%)" }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <RevealSection>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: "#8b5cf6" }}>
              Research Updates
            </span>
            <h2 className="text-2xl font-black mb-3" style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>
              Stay Informed on New Compounds
            </h2>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: "#9c9590" }}>
              Get updates when new research chemicals are added to the catalog. For qualified labs and institutions only.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Institutional email address"
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(28,25,23,0.12)",
                  color: "#1c1917",
                }}
              />
              <button type="submit"
                className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #01696f, #018a92)",
                  color: "#ffffff",
                  boxShadow: "0 4px 20px rgba(1,105,111,0.25)",
                }}>
                Subscribe
              </button>
            </form>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
