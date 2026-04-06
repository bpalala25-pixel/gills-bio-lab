import Link from "next/link";

export const metadata = {
  title: "Research Use Policy — Gills Bio Lab",
};

export default function ResearchUsePage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(160deg, #f0ede8 0%, #ede9f5 100%)", borderBottom: "1px solid rgba(28,25,23,0.08)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#01696f" }}>Legal</span>
          <h1 className="text-3xl sm:text-4xl font-black mt-2 mb-3" style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>Research Use Policy</h1>
          <p className="text-sm" style={{ color: "#9c9590" }}>Last updated: March 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        <div className="p-5 rounded-xl"
          style={{ backgroundColor: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.10)" }}>
          <p className="text-sm font-bold mb-1" style={{ color: "#1c1917" }}>All Products: For Laboratory Research Use Only</p>
          <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>
            Not for human or veterinary use. Not a drug, food, cosmetic, or dietary supplement.
            Not for diagnostic, therapeutic, or clinical use.
          </p>
        </div>

        <Section title="Purpose of This Policy">
          <p>This Research Use Policy governs the purchase and use of all products supplied by Gills Bio Lab.
          It applies to every buyer, regardless of the quantity purchased or the nature of the research being conducted.</p>
        </Section>

        <Section title="What &quot;Research Use Only&quot; Means">
          <p>Research Use Only (RUO) means that products are intended exclusively for:</p>
          <ul>
            <li>In vitro laboratory experiments</li>
            <li>Ex vivo tissue and cell studies</li>
            <li>Pre-clinical research conducted in qualified laboratory settings</li>
            <li>Analytical chemistry and compound characterization</li>
          </ul>
          <p className="mt-3">RUO does <strong style={{ color: "#1c1917" }}>not</strong> include and is expressly prohibited from:</p>
          <ul>
            <li>Human use of any kind, including self-administration, injection, ingestion, or topical application</li>
            <li>Veterinary use or administration to animals</li>
            <li>Compounding for clinical use</li>
            <li>Repackaging or resale for consumer, supplement, cosmetic, or pharmaceutical purposes</li>
          </ul>
        </Section>

        <Section title="Buyer Qualifications">
          <p>By placing an order, you represent that you are one of the following:</p>
          <ul>
            <li>A credentialed researcher (PhD, MD, or equivalent) employed by or affiliated with a research institution</li>
            <li>A purchasing agent for a licensed laboratory, university, hospital research division, or CRO</li>
            <li>A representative of a biotechnology or pharmaceutical company purchasing for legitimate research activities</li>
          </ul>
          <p className="mt-3">We reserve the right to request verification of institutional affiliation and to deny orders that do not meet these criteria.</p>
        </Section>

        <Section title="Prohibited Conduct">
          <p>The following are expressly prohibited and will result in immediate order cancellation:</p>
          <ul>
            <li>Any indication — in order notes, communications, or otherwise — that products are intended for human use</li>
            <li>Requests for dosing guidance, injection instructions, or human protocols</li>
            <li>Orders placed on behalf of individuals for personal use</li>
            <li>Resale to non-research entities or for non-research purposes</li>
          </ul>
        </Section>

        <Section title="Compliance Responsibility">
          <p>You are solely responsible for ensuring that your purchase and use of products complies with all applicable federal, state, and local laws and regulations in your jurisdiction. This includes, but is not limited to, regulations governing the import, storage, handling, and disposal of research chemicals.</p>
          <p className="mt-3">Gills Bio Lab makes no representation regarding the legality of any product in any specific jurisdiction. It is your responsibility to determine whether purchase and possession of any product is lawful where you are located.</p>
        </Section>

        <Section title="Documentation Available to Qualified Researchers">
          <p>Lot-specific documentation, including Certificate of Analysis (CoA) and quality records, are available to qualified customers upon request. To request documentation, contact us with your order number and the specific product(s) for which documentation is needed.</p>
        </Section>

        <Section title="Violations &amp; Enforcement">
          <p>Gills Bio Lab reserves the right to refuse, cancel, or refund any order where we have reason to believe the products will be used in violation of this policy. We maintain records of all checkout acknowledgments and will cooperate with regulatory authorities as required by law.</p>
        </Section>

        <div className="pt-4 border-t border-black/5">
          <p className="text-sm" style={{ color: "#6b6560" }}>
            Questions about this policy?{" "}
            <Link href="/contact" style={{ color: "#01696f" }} className="underline">Contact Us</Link>.
            See also:{" "}
            <Link href="/legal/terms" style={{ color: "#01696f" }} className="underline">Terms &amp; Conditions</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-black mb-3" style={{ color: "#1c1917" }}>{title}</h2>
      <div className="text-sm leading-relaxed space-y-3" style={{ color: "#6b6560" }}>
        {children}
      </div>
    </div>
  );
}
