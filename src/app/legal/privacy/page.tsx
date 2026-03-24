import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Gills Bio Lab",
};

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #161b22, #0d1117)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#2dd4bf" }}>Legal</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3">Privacy Policy</h1>
          <p className="text-sm" style={{ color: "#8b949e" }}>Last updated: March 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        <Section title="1. Information We Collect">
          <p>When you place an order or contact us, we may collect:</p>
          <ul>
            <li>Name, institution or organization name, and professional role</li>
            <li>Email address and phone number</li>
            <li>Shipping address</li>
            <li>Payment information (processed securely; card details are not stored on our servers)</li>
            <li>Order history and checkout acknowledgment records</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use collected information to:</p>
          <ul>
            <li>Process and fulfill your research orders</li>
            <li>Verify buyer qualifications and enforce our Research Use Policy</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Respond to inquiries and documentation requests</li>
            <li>Comply with legal obligations and regulatory requirements</li>
          </ul>
          <p className="mt-3">We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
        </Section>

        <Section title="3. Checkout Acknowledgment Records">
          <p>As part of our compliance obligations, we retain records of the research-use acknowledgments and liability waivers agreed to at checkout. These records may be used to demonstrate compliance with applicable regulations.</p>
        </Section>

        <Section title="4. Data Security">
          <p>All data transmissions on this site are encrypted via HTTPS. We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.</p>
        </Section>

        <Section title="5. Data Retention">
          <p>We retain order records and related personal data for as long as necessary to fulfill our legal, regulatory, and business obligations.</p>
        </Section>

        <Section title="6. Third-Party Services">
          <p>We may use third-party services for payment processing and site operations. These providers have their own privacy policies and are contractually obligated to protect your data.</p>
        </Section>

        <Section title="7. Your Rights">
          <p>Depending on your jurisdiction, you may have the right to access, correct, or request deletion of your personal information. To exercise these rights, contact us via the{" "}
            <Link href="/contact" style={{ color: "#2dd4bf" }} className="underline">Contact page</Link>.
          </p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. Continued use of the site after any update constitutes acceptance of the revised policy.</p>
        </Section>

        <div className="pt-4 border-t border-white/8">
          <p className="text-sm" style={{ color: "#8b949e" }}>
            Questions?{" "}
            <Link href="/contact" style={{ color: "#2dd4bf" }} className="underline">Contact Us</Link>.
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
