import Link from "next/link";
import { ShieldCheck, Thermometer, BookOpen, ChevronRight, FlaskConical, CheckCircle } from "lucide-react";

export default function QualityPage() {
  return (
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #161b22, #0d1117)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#2dd4bf" }}>
            Quality & Documentation
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2 mb-4">
            Confidence in Every Compound
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8b949e" }}>
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
            },
            {
              icon: Thermometer,
              title: "Storage & Handling",
              desc: "Products are stored and shipped under conditions intended to preserve integrity. Cold chain protocols are observed where required to maintain compound stability.",
            },
            {
              icon: BookOpen,
              title: "Documentation",
              desc: "Lot-specific information and documentation are available to qualified customers upon request. We support your institutional documentation requirements.",
            },
          ].map((p) => (
            <div key={p.title} className="p-6 rounded-xl border border-white/8 hover:border-[#2dd4bf]/30 transition-all"
              style={{ backgroundColor: "#161b22" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "linear-gradient(135deg, #2dd4bf20, #0891b220)" }}>
                <p.icon className="w-6 h-6" style={{ color: "#2dd4bf" }} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#8b949e" }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Standards */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="px-6 py-4 border-b border-white/8" style={{ backgroundColor: "#1c2333" }}>
            <h2 className="text-lg font-bold text-white">Our Quality Standards</h2>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ backgroundColor: "#161b22" }}>
            {[
              "High-purity peptide compounds with documented purity specifications",
              "Lot-specific documentation available to qualified customers",
              "Appropriate storage conditions maintained throughout supply chain",
              "Products sealed and packaged to preserve research-grade integrity",
              "Consistent formulation across batches for reproducible research",
              "All materials must be used per institutional protocols and GLP",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm" style={{ color: "#c9d1d9" }}>
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#2dd4bf" }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Research compliance */}
        <div className="p-8 rounded-2xl" style={{ background: "linear-gradient(135deg, #1c2333, #161b22)", border: "1px solid #2dd4bf20" }}>
          <div className="flex items-start gap-4">
            <FlaskConical className="w-8 h-8 shrink-0" style={{ color: "#2dd4bf" }} />
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Compliance & Research Use</h2>
              <p className="text-base leading-relaxed mb-3" style={{ color: "#8b949e" }}>
                All materials must be used in accordance with institutional protocols, local regulations, and good
                laboratory practices. Gills Bio Lab supplies research chemicals exclusively to qualified researchers
                and institutions.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#8b949e" }}>
                Products are not approved for diagnostic, therapeutic, cosmetic, or veterinary applications.
                Buyers are responsible for ensuring all use complies with applicable laws and institutional guidelines.
              </p>
            </div>
          </div>
        </div>

        {/* Request documentation */}
        <div className="text-center p-8 rounded-2xl" style={{ backgroundColor: "#161b22", border: "1px solid rgba(255,255,255,0.08)" }}>
          <h2 className="text-xl font-bold text-white mb-3">Request Documentation</h2>
          <p className="text-base mb-6 max-w-lg mx-auto" style={{ color: "#8b949e" }}>
            Qualified customers may request lot-specific documentation for their research records. Contact us with your order details.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117" }}
            >
              Contact Us
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#c9d1d9" }}
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
