import Link from "next/link";
import { ChevronRight, FlaskConical, Award, Users, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(160deg, #f0ede8 0%, #ede9f5 100%)", borderBottom: "1px solid rgba(28,25,23,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#01696f" }}>About Us</span>
          <h1 className="text-4xl sm:text-5xl font-black mt-2 mb-4" style={{ color: "#1c1917", letterSpacing: "-0.03em" }}>
            Who We Are
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#6b6560" }}>
            Gills Bio Lab exists for one purpose: to make sourcing reliable peptide research chemicals simple, transparent, and professional.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#1c1917" }}>Our Mission</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "#6b6560" }}>
              We focus on delivering consistent, lab-grade compounds backed by responsive support for research
              organizations of all sizes. Our peptides are prepared for laboratory environments where reproducibility
              and reliability matter.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#6b6560" }}>
              From first-time buyers to high-volume institutional labs, we work to keep your research supplied,
              not stalled.
            </p>
            <div className="mt-6 p-4 rounded-xl text-sm leading-relaxed"
              style={{ backgroundColor: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.10)", color: "#6b6560" }}>
              All products are sold strictly for laboratory research use only. They are not drugs, foods, cosmetics,
              or therapeutics, and must not be used on humans or animals.
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(1,105,111,0.08), transparent 70%)" }} />
              <div className="absolute inset-4 rounded-full border-2"
                style={{ borderColor: "rgba(1,105,111,0.12)", borderTopColor: "rgba(1,105,111,0.40)", animation: "spin 20s linear infinite" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <FlaskConical className="w-16 h-16" style={{ color: "#01696f" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-2xl font-black mb-8 text-center" style={{ color: "#1c1917" }}>Why Labs Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: FlaskConical, title: "Lab-Focused", desc: "Everything we do is designed around the needs of research environments, not consumer supplement markets." },
              { icon: Award,        title: "Consistency",  desc: "Batches are produced and stored with a focus on identity, purity, and stability." },
              { icon: Shield,       title: "Transparency", desc: "Clear, straightforward pricing with options for bulk and recurring orders." },
            ].map((v) => (
              <div key={v.title} className="glass-card p-6 rounded-2xl text-center transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, rgba(1,105,111,0.10), rgba(139,92,246,0.08))" }}>
                  <v.icon className="w-6 h-6" style={{ color: "#01696f" }} />
                </div>
                <h3 className="font-black mb-2" style={{ color: "#1c1917" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who buys from us */}
        <div className="glass-card p-8 rounded-2xl">
          <div className="flex items-start gap-4">
            <Users className="w-8 h-8 mt-1 shrink-0" style={{ color: "#01696f" }} />
            <div>
              <h2 className="text-xl font-black mb-3" style={{ color: "#1c1917" }}>Who We Supply</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#6b6560" }}>
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
        <div className="text-center">
          <Link href="/catalog"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff", boxShadow: "0 4px 24px rgba(1,105,111,0.30)" }}>
            Browse Research Catalog
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
