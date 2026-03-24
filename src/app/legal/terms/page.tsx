import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions — Gills Bio Lab",
};

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #161b22, #0d1117)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#2dd4bf" }}>Legal</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3">Terms &amp; Conditions</h1>
          <p className="text-sm" style={{ color: "#8b949e" }}>Last updated: March 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* RUO Notice */}
        <div className="p-5 rounded-xl text-sm leading-relaxed"
          style={{ backgroundColor: "#f8514908", border: "1px solid #f8514930", color: "#c9d1d9" }}>
          <strong className="text-white block mb-1">Research Use Only — Important Notice</strong>
          All products sold by Gills Bio Lab are peptide research chemicals intended exclusively for laboratory
          and in vitro research use by qualified professionals. They are <strong className="text-white">not for
          human or veterinary use</strong>, and are not drugs, foods, cosmetics, or dietary supplements.
        </div>

        <Section title="1. Acceptance of Terms">
          <p>By accessing this website or placing an order, you agree to be bound by these Terms &amp; Conditions
          in their entirety. If you do not agree, do not use this site or purchase any products.</p>
        </Section>

        <Section title="2. Research Use Only — Restriction on Use">
          <p>All products supplied by Gills Bio Lab are sold strictly for laboratory research purposes, including
          in vitro, ex vivo, and pre-clinical research. You represent and warrant that:</p>
          <ul>
            <li>You are a qualified researcher, scientist, or purchasing agent acting on behalf of a qualified laboratory, institution, or business.</li>
            <li>Products will be used exclusively for laboratory research, and will not be administered to, ingested by, or used on any human being or animal under any circumstances.</li>
            <li>Products will not be repackaged, relabeled, or resold for human use, compounding, clinical use, or any consumer application.</li>
            <li>You have the facilities, expertise, and authorizations required to safely handle, store, and dispose of these research chemicals in accordance with applicable laws and regulations.</li>
          </ul>
        </Section>

        <Section title="3. Eligible Purchasers">
          <p>Orders are accepted only from qualified researchers, laboratories, academic institutions, biotechnology companies, contract research organizations, and other professional research entities. We reserve the right to cancel and refund any order where we have reason to believe the buyer does not meet these criteria or intends non-research use.</p>
        </Section>

        <Section title="4. No Medical, Therapeutic, or Consumer Claims">
          <p>Gills Bio Lab makes no claim that any product is safe or effective for use in humans or animals. Nothing on this website constitutes medical advice, clinical guidance, or a recommendation for any therapeutic application. Do not rely on any content on this site for health or medical decisions.</p>
        </Section>

        <Section title="5. Prohibited Uses">
          <p>You are expressly prohibited from:</p>
          <ul>
            <li>Using any product for human consumption, self-experimentation, or administration to any person or animal.</li>
            <li>Reselling or distributing products for human use, compounding, or any non-research purpose.</li>
            <li>Importing products in violation of applicable local or federal regulations.</li>
            <li>Misrepresenting your identity or qualifications to obtain products.</li>
          </ul>
        </Section>

        <Section title="6. Buyer Responsibility &amp; Compliance">
          <p>You are solely responsible for ensuring that your purchase, importation, possession, handling, and use of products comply with all applicable local, state, federal, and international laws and regulations. Gills Bio Lab makes no representation regarding the legality of purchasing or possessing any product in any specific jurisdiction.</p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>To the fullest extent permitted by applicable law, Gills Bio Lab, its owners, officers, employees, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to the purchase, possession, storage, handling, or use of any product — including damages arising from personal injury, death, property damage, or loss of data — even if we have been advised of the possibility of such damages.</p>
          <p className="mt-3">Our total aggregate liability to you for any claim arising from or related to your purchase shall not exceed the amount you paid for the specific product giving rise to the claim.</p>
        </Section>

        <Section title="8. Indemnification">
          <p>You agree to indemnify, defend, and hold harmless Gills Bio Lab, its owners, officers, employees, and affiliates from and against any claims, damages, losses, costs, and expenses (including reasonable attorneys&apos; fees) arising out of or related to: (a) your purchase, possession, use, or misuse of any product; (b) your breach of these Terms; or (c) your violation of any applicable law or regulation.</p>
        </Section>

        <Section title="9. No Warranties">
          <p>All products are provided &quot;as is&quot; for research use only. Gills Bio Lab disclaims all express and implied warranties, including any warranty of merchantability, fitness for a particular purpose, accuracy, or non-infringement. We do not warrant that products will meet your research requirements or produce any specific result.</p>
        </Section>

        <Section title="10. Order Verification">
          <p>We reserve the right to require additional information from any buyer before fulfilling an order, and to cancel and refund orders at our discretion, including where we suspect non-research use or misrepresentation.</p>
        </Section>

        <Section title="11. Changes to Terms">
          <p>We reserve the right to update these Terms at any time. Continued use of the site following any update constitutes acceptance of the revised Terms.</p>
        </Section>

        <Section title="12. Governing Law">
          <p>These Terms are governed by applicable law. Any disputes shall be resolved in the applicable jurisdiction where Gills Bio Lab operates.</p>
        </Section>

        <div className="pt-4 border-t border-white/8">
          <p className="text-sm" style={{ color: "#8b949e" }}>
            For questions about these Terms, contact us via the{" "}
            <Link href="/contact" style={{ color: "#2dd4bf" }} className="underline">Contact page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-3">{title}</h2>
      <div className="text-sm leading-relaxed space-y-3" style={{ color: "#8b949e" }}>
        {children}
      </div>
    </div>
  );
}
