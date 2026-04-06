"use client";
import Link from "next/link";
import { ShieldCheck, Thermometer, BookOpen, ChevronRight, FlaskConical, CheckCircle } from "lucide-react";

export default function QualityPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{
        background: "linear-gradient(160deg, #f0ede8 0%, #ede9f5 60%, #e8f4f4 100%)",
        borderBottom: "1px solid rgba(28,25,23,0.08)",
      }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[15%] w-[350px] h-[250px]"
            style={{ background: "radial-gradient(circle, rgba(1,105,111,0.09) 0%, transparent 65%)", filter: "blur(32px)" }} />
          <div className="absolute bottom-0 left-[20%] w-[280px] h-[180px]"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)", filter: "blur(24px)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 text-center">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#01696f" }}>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#01696f" }} />
            Quality & Documentation
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-2 mb-4"
            style={{ color: "#1c1917", letterSpacing: "-0.03em" }}>
            Confidence in Every{" "}
            <span style={{
              background: "linear-gradient(135deg, #01696f, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Compound</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#6b6560" }}>
            Research demands more than just access to compounds — it requires confidence in what is being used.
            Gills Bio Lab operates with a focus on consistency and traceability.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: "Lot-Focused Approach",
              desc: "Batches are tracked and documented for internal quality standards. Each lot is assigned unique identifiers enabling traceability from production through delivery.",
              accent: "teal",
            },
            {
              icon: Thermometer,
              title: "Storage & Handling",
              desc: "Products are stored and shipped under conditions intended to preserve integrity. Cold chain protocols are observed where required to maintain compound stability.",
              accent: "orchid",
            },
            {
              icon: BookOpen,
              title: "Documentation",
              desc: "Lot-specific information and documentation are available to qualified customers upon request. We support your institutional documentation requirements.",
              accent: "teal",
            },
          ].map((p) => (
            <div key={p.title}
              className="glass-card p-6 rounded-2xl h-full group"
              style={{ transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLElement).style.boxShadow = p.accent === "teal"
                  ? "0 16px 48px rgba(1,105,111,0.14), 0 0 0 1px rgba(1,105,111,0.22)"
                  : "0 16px 48px rgba(139,92,246,0.12), 0 0 0 1px rgba(139,92,246,0.20)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: p.accent === "teal"
                    ? "linear-gradient(135deg, rgba(1,105,111,0.14), rgba(1,105,111,0.06))"
                    : "linear-gradient(135deg, rgba(139,92,246,0.14), rgba(139,92,246,0.06))",
                  boxShadow: p.accent === "teal"
                    ? "0 4px 16px rgba(1,105,111,0.14)"
                    : "0 4px 16px rgba(139,92,246,0.12)",
                }}>
                <p.icon className="w-6 h-6" style={{ color: p.accent === "teal" ? "#01696f" : "#7c3aed" }} />
              </div>
              <h3 className="text-lg font-black mb-3" style={{ color: "#1c1917" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>{p.desc}</p>
              <div className="mt-4 h-px w-8 rounded-full transition-all group-hover:w-14"
                style={{ background: p.accent === "teal" ? "rgba(1,105,111,0.35)" : "rgba(139,92,246,0.35)" }} />
            </div>
          ))}
        </div>

        {/* Standards */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(28,25,23,0.06)" }}>
            <h2 className="text-lg font-black" style={{ color: "#1c1917" }}>Our Quality Standards</h2>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "High-purity peptide compounds with documented purity specifications",
              "Lot-specific documentation available to qualified customers",
              "Appropriate storage conditions maintained throughout supply chain",
              "Products sealed and packaged to preserve research-grade integrity",
              "Consistent formulation across batches for reproducible research",
              "All materials must be used per institutional protocols and GLP",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm" style={{ color: "#3d3833" }}>
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#01696f" }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Research compliance */}
        <div className="p-8 rounded-2xl"
          style={{ background: "linear-gradient(135deg, rgba(1,105,111,0.06), rgba(139,92,246,0.04))", border: "1px solid rgba(1,105,111,0.14)" }}>
          <div className="flex items-start gap-4">
            <FlaskConical className="w-8 h-8 shrink-0" style={{ color: "#01696f" }} />
            <div>
              <h2 className="text-xl font-black mb-3" style={{ color: "#1c1917" }}>Compliance & Research Use</h2>
              <p className="text-base leading-relaxed mb-3" style={{ color: "#6b6560" }}>
                All materials must be used in accordance with institutional protocols, local regulations, and good
                laboratory practices. Gills Bio Lab supplies research chemicals exclusively to qualified researchers
                and institutions.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#6b6560" }}>
                Products are not approved for diagnostic, therapeutic, cosmetic, or veterinary applications.
                Buyers are responsible for ensuring all use complies with applicable laws and institutional guidelines.
              </p>
            </div>
          </div>
        </div>

        {/* Request documentation */}
        <div className="text-center glass-card p-8 rounded-2xl">
          <h2 className="text-xl font-black mb-3" style={{ color: "#1c1917" }}>Request Documentation</h2>
          <p className="text-base mb-6 max-w-lg mx-auto leading-relaxed" style={{ color: "#6b6560" }}>
            Qualified customers may request lot-specific documentation for their research records. Contact us with your order details.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff", boxShadow: "0 4px 20px rgba(1,105,111,0.25)" }}
            >
              Contact Us
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-black/5"
              style={{ border: "1px solid rgba(28,25,23,0.12)", color: "#3d3833" }}
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
