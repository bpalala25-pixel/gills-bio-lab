"use client";
import Link from "next/link";
import { Download, ChevronRight, ShieldCheck, Truck, BookOpen, Award, DollarSign, Headphones } from "lucide-react";
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

const trustItems = [
  { label: "≥ 98% Purity", icon: "◈" },
  { label: "Lab-Grade Quality", icon: "◈" },
  { label: "Research Use Only", icon: "◈" },
  { label: "Fast, Discreet Shipping", icon: "◈" },
];

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
        style={{
          background: "linear-gradient(160deg, #f7f5f2 0%, #efeae3 40%, #f3eff8 100%)",
        }}>
        <MolecularBg />

        {/* Orchid bloom top-right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle at 80% 20%, rgba(139,92,246,0.07) 0%, transparent 60%)" }} />
        {/* Teal bloom bottom-left */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(circle at 20% 90%, rgba(1,105,111,0.06) 0%, transparent 60%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">

          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 animate-fade-in"
            style={{
              backgroundColor: "rgba(1,105,111,0.08)",
              border: "1px solid rgba(1,105,111,0.20)",
              color: "#01696f",
            }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#01696f" }} />
            Professional Research Chemical Supplier
          </div>

          <h1 className="font-black leading-none mb-5 animate-fade-in-up"
            style={{
              fontSize: "clamp(3.2rem, 8vw, 6rem)",
              color: "#1c1917",
              letterSpacing: "-0.04em",
            }}>
            Gills{" "}
            <span style={{
              background: "linear-gradient(135deg, #01696f 0%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Bio Lab
            </span>
          </h1>

          <p className="text-xl sm:text-2xl font-light mb-5 animate-fade-in-up delay-100"
            style={{ color: "#6b6560", letterSpacing: "0.01em" }}>
            Advanced Peptide Research Chemicals
          </p>

          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200"
            style={{ color: "#9c9590" }}>
            High-purity peptide research chemicals for serious laboratories and qualified professionals.
            Every compound supplied strictly for in vitro research — never for human or veterinary use.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fade-in-up delay-300">
            <Link href="/catalog"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #01696f, #018a92)",
                color: "#ffffff",
                boxShadow: "0 4px 24px rgba(1,105,111,0.30), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}>
              Browse Research Catalog
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a href="/price-list.pdf"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:bg-black/5"
              style={{ border: "1px solid rgba(28,25,23,0.14)", color: "#3d3833" }}>
              <Download className="w-4 h-4" />
              Download Price List
            </a>
          </div>

          <p className="text-xs animate-fade-in-up delay-400" style={{ color: "#9c9590" }}>
            All orders limited to qualified researchers and institutions.{" "}
            <span style={{ color: "#dc2626" }}>Not for human consumption.</span>
          </p>
        </div>

        {/* Fade-out bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--bg-base))" }} />
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
      <section style={{
        backgroundColor: "var(--bg-elevated)",
        borderTop: "1px solid rgba(28,25,23,0.08)",
        borderBottom: "1px solid rgba(28,25,23,0.08)",
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {trustItems.map((item, i) => (
              <div key={item.label} className="flex items-center gap-2.5">
                {i > 0 && (
                  <span className="hidden sm:block w-px h-4" style={{ backgroundColor: "rgba(28,25,23,0.12)" }} />
                )}
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#01696f" }}>
                  {item.label}
                </span>
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
            {benefits.map((b) => (
              <RevealSection key={b.title}>
                <div className="glass-card rounded-2xl p-6 h-full transition-all group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, rgba(1,105,111,0.10), rgba(139,92,246,0.08))" }}>
                    <b.icon className="w-5 h-5" style={{ color: "#01696f" }} />
                  </div>
                  <h3 className="font-black text-sm mb-2" style={{ color: "#1c1917" }}>{b.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#9c9590" }}>{b.desc}</p>
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
