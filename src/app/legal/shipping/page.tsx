import Link from "next/link";

export const metadata = {
  title: "Refund & Shipping Policy — Gills Bio Lab",
};

export default function ShippingPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(160deg, #f0ede8 0%, #ede9f5 100%)", borderBottom: "1px solid rgba(28,25,23,0.08)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#01696f" }}>Legal</span>
          <h1 className="text-3xl sm:text-4xl font-black mt-2 mb-3" style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>Refund &amp; Shipping Policy</h1>
          <p className="text-sm" style={{ color: "#9c9590" }}>Last updated: March 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        <div className="p-5 rounded-xl text-sm"
          style={{ backgroundColor: "rgba(1,105,111,0.05)", border: "1px solid rgba(1,105,111,0.14)", color: "#6b6560" }}>
          All orders are subject to our{" "}
          <Link href="/legal/research-use" style={{ color: "#01696f" }} className="underline">Research Use Policy</Link>
          {" "}and{" "}
          <Link href="/legal/terms" style={{ color: "#01696f" }} className="underline">Terms &amp; Conditions</Link>.
        </div>

        <Section title="Shipping">
          <p>Orders are typically processed within 1–2 business days following payment verification. Products are shipped in appropriate packaging designed to maintain compound integrity during transit, including insulated materials and cold packs where applicable.</p>
          <p className="mt-3">Estimated delivery times are provided at checkout and are not guaranteed. Gills Bio Lab is not responsible for delays caused by carriers, customs, or other circumstances outside our control.</p>
          <p className="mt-3">Shipping costs are calculated at checkout based on destination and selected shipping method.</p>
        </Section>

        <Section title="Order Verification">
          <p>Orders may be subject to verification before fulfillment, including confirmation of institutional affiliation or intended research use. We will contact you if additional information is required. Orders that cannot be verified to our satisfaction may be cancelled and refunded.</p>
        </Section>

        <Section title="Refunds &amp; Returns">
          <p>Due to the nature of research chemicals and our regulatory obligations, we handle refund and return requests on a case-by-case basis.</p>
          <p className="mt-3"><strong style={{ color: "#1c1917" }}>Eligible for refund or replacement:</strong></p>
          <ul>
            <li>Vials damaged in transit</li>
            <li>Incorrect product shipped</li>
            <li>Confirmed quality or integrity concerns</li>
          </ul>
          <p className="mt-3"><strong style={{ color: "#1c1917" }}>Not eligible for return:</strong></p>
          <ul>
            <li>Opened or reconstituted product</li>
            <li>Products ordered in error where fulfillment has already occurred</li>
            <li>Orders cancelled after shipment has been dispatched</li>
          </ul>
          <p className="mt-3">To initiate a refund or replacement, contact us within 7 days of delivery with your order number and a description of the issue. Include photos where applicable.</p>
        </Section>

        <Section title="International Orders">
          <p>Buyers outside the United States are solely responsible for ensuring that importing the ordered products complies with all laws and regulations in their jurisdiction. Gills Bio Lab is not responsible for customs delays, seizures, or import duties. We do not provide import permits or customs documentation beyond standard shipping paperwork.</p>
        </Section>

        <Section title="Lost or Undelivered Packages">
          <p>If your package is marked as delivered but not received, contact us within 5 business days. We will work with the carrier to investigate. Gills Bio Lab is not responsible for packages lost due to incorrect shipping addresses provided at checkout.</p>
        </Section>

        <div className="pt-4 border-t border-black/5">
          <p className="text-sm" style={{ color: "#6b6560" }}>
            Questions about your order?{" "}
            <Link href="/contact" style={{ color: "#01696f" }} className="underline">Contact Us</Link>.
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
