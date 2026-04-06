"use client";
import Link from "next/link";
import { Download, ChevronRight, FlaskConical, ShieldCheck, Truck, DollarSign, Headphones, Award, BookOpen, Zap, Target, Activity } from "lucide-react";
import MolecularBg from "@/components/molecular-bg";
import ProductCard from "@/components/product-card";
import VialImage from "@/components/vial-image";
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
  "Lab-Grade Quality",
  "Research Use Only",
  "Transparent Pricing",
  "Fast, Discreet Shipping",
];

const benefits = [
  {
    icon: FlaskConical,
    title: "Lab-Focused",
    desc: "Everything we do is designed around the needs of research environments, not consumer supplement markets.",
  },
  {
    icon: Award,
    title: "Consistency",
    desc: "Batches produced and stored with a focus on identity, purity, and stability for reproducible results.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    desc: "Clear, straightforward pricing on every peptide, with options for bulk and recurring orders.",
  },
  {
    icon: Headphones,
    title: "Responsive Support",
    desc: "Responsive assistance for questions about availability, documentation, and ordering.",
  },
];

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#0d1117" }}>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d1117 0%, #0a1520 50%, #0d1117 100%)" }}>
        <MolecularBg />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(45,212,191,0.08) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 animate-fade-in"
            style={{ backgroundColor: "#2dd4bf15", border: "1px solid #2dd4bf30", color: "#2dd4bf" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#2dd4bf" }} />
            Professional Research Chemical Supplier
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up">
            Gills{" "}
            <span style={{ color: "#2dd4bf" }}>Bio Lab</span>
          </h1>

          <p className="text-xl sm:text-2xl font-light mb-4 animate-fade-in-up delay-100"
            style={{ color: "#67e8f9" }}>
            Advanced Peptide Research Chemicals
          </p>

          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200"
            style={{ color: "#8b949e" }}>
            High-purity peptide research chemicals for serious laboratories and qualified research professionals.
            Every compound supplied strictly for laboratory research use only — never for human or veterinary use.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fade-in-up delay-300">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #2dd4bf, #0891b2)",
                color: "#0d1117",
                boxShadow: "0 0 20px rgba(45,212,191,0.3)",
              }}
            >
              Browse Research Catalog
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href="/price-list.pdf"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#e8edf2" }}
            >
              <Download className="w-5 h-5" />
              Download Research Price List
            </a>
          </div>

          <p className="text-xs animate-fade-in-up delay-400" style={{ color: "#8b949e" }}>
            All orders limited to qualified researchers and institutions.{" "}
            <span style={{ color: "#f85149" }}>Not for human consumption.</span>
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0d1117)" }} />
      </section>

      {/* Trust Strip */}
      <section style={{ backgroundColor: "#161b22", borderTop: "1px solid rgba(45,212,191,0.2)", borderBottom: "1px solid rgba(45,212,191,0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustItems.map((item, i) => (
              <div key={item} className="flex items-center gap-3">
                {i > 0 && <span className="hidden sm:block w-1 h-1 rounded-full" style={{ backgroundColor: "#2dd4bf40" }} />}
                <span className="text-sm font-semibold tracking-wide" style={{ color: "#2dd4bf" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Retatrutide Exhibit ─────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #060d18 0%, #0a1f14 40%, #060d18 100%)" }}>
        {/* Background glow orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 65%)" }} />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(45,212,191,0.05) 0%, transparent 65%)" }} />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 65%)" }} />
          {/* Animated particles */}
          {[...Array(12)].map((_, i) => (
            <div key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${3 + (i % 4)}px`,
                height: `${3 + (i % 4)}px`,
                top: `${10 + (i * 7) % 80}%`,
                left: `${5 + (i * 9) % 90}%`,
                backgroundColor: i % 3 === 0 ? "#22c55e" : "#2dd4bf",
                opacity: 0.3 + (i % 4) * 0.1,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2 + (i % 3)}s`,
              }} />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{ backgroundColor: "#22c55e15", border: "1px solid #22c55e30", color: "#22c55e" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#22c55e" }} />
                Featured Compound — Next-Gen GLP-1 Research
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
                Retatrutide
                <span className="block text-2xl sm:text-3xl font-light mt-1" style={{ color: "#22c55e" }}>
                  Triple Receptor Agonist
                </span>
              </h2>

              <p className="text-base leading-relaxed mb-8" style={{ color: "#94a3b8" }}>
                The most advanced incretin research compound in the GLP-1 class. Retatrutide simultaneously
                targets GIP, GLP-1, and glucagon receptors — enabling unprecedented in vitro exploration of
                multi-receptor metabolic signaling, energy homeostasis, and incretin pharmacology.
              </p>

              {/* Receptor targets */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "GIP", sub: "Receptor Agonist", color: "#22c55e", icon: Zap },
                  { label: "GLP-1", sub: "Receptor Agonist", color: "#2dd4bf", icon: Activity },
                  { label: "Glucagon", sub: "Receptor Agonist", color: "#a78bfa", icon: Target },
                ].map(({ label, sub, color, icon: Icon }) => (
                  <div key={label} className="rounded-xl p-4 text-center transition-all hover:scale-105"
                    style={{ backgroundColor: `${color}0d`, border: `1px solid ${color}25` }}>
                    <Icon className="w-5 h-5 mx-auto mb-2" style={{ color }} />
                    <div className="font-bold text-white text-sm">{label}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: "#64748b" }}>{sub}</div>
                  </div>
                ))}
              </div>

              {/* Purity / Specs row */}
              <div className="flex flex-wrap gap-6 mb-8">
                {[
                  { label: "Purity", value: "≥ 99%" },
                  { label: "Form", value: "Lyophilized" },
                  { label: "Storage", value: "−20°C" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "#475569" }}>{label}</div>
                    <div className="text-base font-bold" style={{ color: "#22c55e" }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/catalog/retatrutide-10"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "#ffffff",
                    boxShadow: "0 0 24px rgba(34,197,94,0.3)",
                  }}
                >
                  View 10 mg Vial
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/catalog/retatrutide-20"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:bg-white/8"
                  style={{ border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}
                >
                  View 20 mg Vial
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-xs mt-4" style={{ color: "#475569" }}>
                Research use only · Not for human or veterinary use
              </p>
            </div>

            {/* Right: Vial display */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full animate-pulse"
                  style={{
                    background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 65%)",
                    transform: "scale(1.6)",
                  }} />
                {/* Spinning ring decoration */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "scale(1.45)" }}>
                  <div className="w-72 h-72 rounded-full border-2"
                    style={{
                      borderColor: "rgba(34,197,94,0.08)",
                      borderTopColor: "rgba(34,197,94,0.4)",
                      animation: "spin 16s linear infinite",
                    }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "scale(1.2)" }}>
                  <div className="w-72 h-72 rounded-full border"
                    style={{
                      borderColor: "rgba(45,212,191,0.06)",
                      borderBottomColor: "rgba(45,212,191,0.3)",
                      animation: "spin 10s linear infinite reverse",
                    }} />
                </div>

                {/* Two vials side by side */}
                <div className="relative flex items-end gap-6 px-8 py-6">
                  {/* 10 mg vial */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-28 h-48 drop-shadow-2xl transition-transform duration-700 hover:scale-110 hover:-translate-y-2">
                      <VialImage
                        name="Retatrutide"
                        quantity="10 mg / vial"
                        capColor="#22c55e"
                        labelColor="#22c55e"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-bold text-white">10 mg</div>
                      <div className="text-[10px]" style={{ color: "#475569" }}>$179 / vial</div>
                    </div>
                  </div>

                  {/* 20 mg vial — slightly larger */}
                  <div className="flex flex-col items-center gap-2 -mb-4">
                    <div className="w-32 h-56 drop-shadow-2xl transition-transform duration-700 hover:scale-110 hover:-translate-y-2">
                      <VialImage
                        name="Retatrutide"
                        quantity="20 mg / vial"
                        capColor="#16a34a"
                        labelColor="#22c55e"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-bold text-white">20 mg</div>
                      <div className="text-[10px]" style={{ color: "#475569" }}>$219 / vial</div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-3 -right-2 px-2.5 py-1 rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: "#22c55e20", color: "#22c55e", border: "1px solid #22c55e40" }}>
                  ≥ 99% Purity
                </div>
                <div className="absolute -bottom-1 -left-4 px-2.5 py-1 rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: "#2dd4bf15", color: "#2dd4bf", border: "1px solid #2dd4bf30" }}>
                  Triple Agonist
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#2dd4bf" }}>
              Catalog Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-3">
              Featured Research Compounds
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#8b949e" }}>
              Popular peptide research chemicals chosen by labs for ongoing studies.
              All products governed by strict research-only policy.
            </p>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featuredProducts.slice(0, 8).map((product) => (
            <RevealSection key={product.id}>
              <ProductCard product={product} />
            </RevealSection>
          ))}
        </div>

        <RevealSection className="mt-10 text-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ border: "1px solid #2dd4bf40", color: "#2dd4bf" }}
          >
            View Full Catalog
            <ChevronRight className="w-4 h-4" />
          </Link>
        </RevealSection>
      </section>

      {/* Why Gills Bio Lab */}
      <section className="py-20" style={{ backgroundColor: "#161b22" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#2dd4bf" }}>
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-3">
              Why Labs Choose Gills Bio Lab
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#8b949e" }}>
              We exist for one purpose: making sourcing reliable peptide research chemicals simple, transparent, and professional.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <RevealSection key={b.title}>
                <div className="p-6 rounded-xl border border-white/8 hover:border-[#2dd4bf]/30 transition-all group h-full"
                  style={{ backgroundColor: "#0d1117" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ background: "linear-gradient(135deg, #2dd4bf20, #0891b220)" }}>
                    <b.icon className="w-6 h-6" style={{ color: "#2dd4bf" }} />
                  </div>
                  <h3 className="font-bold text-white mb-2">{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#8b949e" }}>{b.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Teaser */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="rounded-2xl overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #1c2333, #0d1117)", border: "1px solid #2dd4bf20" }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(45,212,191,0.06) 0%, transparent 70%)" }} />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 p-10 lg:p-16 items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#2dd4bf" }}>
                  Documentation & Quality
                </span>
                <h2 className="text-3xl font-bold text-white mb-4">Quality & Documentation</h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: "#8b949e" }}>
                  Research demands more than access to compounds — it requires confidence in what is being used.
                  Gills Bio Lab operates with a focus on consistency and traceability so you can plan experiments with clarity.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    { icon: ShieldCheck, text: "Lot-focused: Batches tracked and documented for internal quality standards." },
                    { icon: Truck, text: "Storage & handling: Shipped under conditions intended to preserve integrity." },
                    { icon: BookOpen, text: "Documentation: Lot-specific info available to qualified customers upon request." },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3 text-sm" style={{ color: "#c9d1d9" }}>
                      <item.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#2dd4bf" }} />
                      {item.text}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/quality"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117" }}
                >
                  View Quality Details
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-56 h-56">
                  <div className="absolute inset-0 rounded-full animate-pulse"
                    style={{ background: "radial-gradient(circle, #2dd4bf15, transparent 70%)" }} />
                  <div className="absolute inset-6 rounded-full border-2"
                    style={{ borderColor: "#2dd4bf20", borderTopColor: "#2dd4bf60", animation: "spin 20s linear infinite" }} />
                  <div className="absolute inset-12 rounded-full border"
                    style={{ borderColor: "#0891b230", borderTopColor: "#0891b2", animation: "spin 12s linear infinite reverse" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FlaskConical className="w-14 h-14" style={{ color: "#2dd4bf" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Research Disclaimer */}
      <section className="py-12" style={{ backgroundColor: "#f8514908", borderTop: "1px solid #f8514920" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ backgroundColor: "#f8514915", color: "#f85149", border: "1px solid #f8514930" }}>
            Research Use Only
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#8b949e" }}>
            All products from Gills Bio Lab are peptide research chemicals.{" "}
            <strong className="text-white">Not for human or veterinary use.</strong>{" "}
            Not drugs, foods, cosmetics, or therapeutics. Must not be used on humans or animals under any circumstances.
          </p>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-20" style={{ backgroundColor: "#161b22" }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <RevealSection>
            <span className="text-xs font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#2dd4bf" }}>
              Research Updates
            </span>
            <h2 className="text-2xl font-bold text-white mb-3">
              Stay Informed on New Research Compounds
            </h2>
            <p className="text-sm mb-8" style={{ color: "#8b949e" }}>
              Get updates when new research chemicals are added to the catalog. For qualified labs and institutions only.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Institutional email address"
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117" }}
              >
                Subscribe
              </button>
            </form>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
