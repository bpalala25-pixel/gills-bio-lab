"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "Are your products for human use?",
    a: "No. All products from Gills Bio Lab are sold strictly for laboratory research use only. They are not for human or veterinary use, ingestion, injection, or any form of therapeutic or cosmetic application. This policy is non-negotiable and applies to every product we supply.",
  },
  {
    q: "Who can order from Gills Bio Lab?",
    a: "We sell exclusively to qualified researchers, institutions, and organizations capable of safely handling laboratory-grade chemicals and complying with all relevant regulations. All buyers must confirm research-only use at checkout.",
  },
  {
    q: "How do I view pricing?",
    a: "You can view pricing directly within the product catalog on each product page. Prices are listed per vial with tiered options displayed on individual product pages.",
  },
  {
    q: "Do you offer bulk or recurring supply?",
    a: "Yes. For larger or recurring research orders, contact us to discuss availability and custom pricing options. We work with institutional labs on volume arrangements.",
  },
  {
    q: "What forms do your peptides come in?",
    a: "Most compounds are supplied as lyophilized powder in sealed vials. Solution formulations may be available for select compounds. Product pages specify the exact form for each compound.",
  },
  {
    q: "How should peptide research chemicals be stored?",
    a: "We recommend storing lyophilized peptide research chemicals at -20°C in a dry, dark location. Always use appropriate personal protective equipment and follow your institutional safety protocols when handling any research chemical.",
  },
  {
    q: "Do you provide documentation with orders?",
    a: "Lot-specific information and documentation are available to qualified customers upon request. Contact us with your order details to request documentation relevant to your research records.",
  },
  {
    q: "How is shipping handled?",
    a: "Orders are packed with care and shipped discreetly to protect product integrity and your research timeline. Shipping options and estimated delivery times are displayed at checkout. Orders may be subject to verification before fulfillment.",
  },
  {
    q: "Can I return or refund products?",
    a: "Please review our Refund & Shipping Policy for details on returns. Due to the nature of research chemicals, we handle each case individually. Contact us with any concerns about your order.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept major payment methods through our secure checkout. All transactions are processed over encrypted HTTPS connections. Payment options are displayed at checkout.",
  },
  {
    q: "Are orders subject to verification?",
    a: "Yes. Orders may be subject to verification to ensure compliance with our research-only policy. First-time buyers or large orders may require additional information before fulfillment.",
  },
  {
    q: "What is your policy on resale?",
    a: "Products supplied by Gills Bio Lab are not for resale for any human use purpose. Resale is restricted per our Terms & Conditions. All downstream use must remain within a qualified laboratory research context.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{
        background: "linear-gradient(160deg, #f0ede8 0%, #ede9f5 60%, #e8f4f4 100%)",
        borderBottom: "1px solid rgba(28,25,23,0.08)",
      }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[20%] w-[300px] h-[200px]"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 65%)", filter: "blur(28px)" }} />
          <div className="absolute bottom-0 left-[10%] w-[250px] h-[150px]"
            style={{ background: "radial-gradient(circle, rgba(1,105,111,0.07) 0%, transparent 65%)", filter: "blur(22px)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 text-center">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#8b5cf6" }}>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#8b5cf6" }} />
            FAQ
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-2 mb-4"
            style={{ color: "#1c1917", letterSpacing: "-0.03em" }}>
            Frequently Asked{" "}
            <span style={{
              background: "linear-gradient(135deg, #8b5cf6, #01696f)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Questions</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#6b6560" }}>
            Answers to common questions about ordering, research use compliance, shipping, and documentation.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl overflow-hidden transition-all"
              style={{
                borderColor: open === i ? "rgba(1,105,111,0.25)" : undefined,
              }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-sm pr-4"
                  style={{ color: open === i ? "#01696f" : "#1c1917" }}>
                  {faq.q}
                </span>
                {open === i
                  ? <ChevronUp className="w-4 h-4 shrink-0" style={{ color: "#01696f" }} />
                  : <ChevronDown className="w-4 h-4 shrink-0" style={{ color: "#9c9590" }} />}
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm leading-relaxed"
                  style={{
                    color: "#6b6560",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(28,25,23,0.06)",
                  }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Compliance note */}
        <div className="mt-12 p-6 rounded-2xl text-sm leading-relaxed"
          style={{ backgroundColor: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.10)", color: "#6b6560" }}>
          <strong style={{ color: "#1c1917" }}>Research Use Policy: </strong>
          Gills Bio Lab supplies peptide research chemicals exclusively for laboratory use by qualified professionals.
          Products are not intended for human or veterinary consumption. By placing an order, you agree to all applicable
          laws, regulations, and institutional guidelines.
        </div>

        {/* More questions */}
        <div className="mt-8 text-center glass-card p-6 rounded-2xl">
          <p className="text-base font-black mb-2" style={{ color: "#1c1917" }}>Have another question?</p>
          <p className="text-sm mb-5 leading-relaxed" style={{ color: "#9c9590" }}>
            Our team is available to assist qualified researchers with ordering, documentation, and availability questions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff", boxShadow: "0 4px 20px rgba(1,105,111,0.25)" }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
