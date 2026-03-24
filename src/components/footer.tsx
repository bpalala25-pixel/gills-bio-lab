import Link from "next/link";
import { FlaskConical, Download } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 mt-auto" style={{ backgroundColor: "#0a0e14" }}>
      {/* Disclaimer banner */}
      <div className="py-4 px-4 text-center text-xs text-[#8b949e] border-b border-white/5">
        Gills Bio Lab supplies peptide research chemicals exclusively for laboratory use by qualified professionals.
        Products are not intended for human or veterinary consumption, medical use, or any form of therapeutic or cosmetic application.
        By accessing this site and placing an order, you agree to use all products in compliance with all applicable laws, regulations, and institutional guidelines.
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)" }}>
                <FlaskConical className="w-4 h-4 text-[#0d1117]" />
              </div>
              <span className="font-bold text-lg text-white">
                Gills<span style={{ color: "#2dd4bf" }}>Bio</span>Lab
              </span>
            </Link>
            <p className="text-sm text-[#8b949e] leading-relaxed mb-4">
              Professional, lab-grade peptide research chemicals for serious laboratories and qualified research professionals.
            </p>
            <a
              href="/price-list.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{ backgroundColor: "#2dd4bf20", color: "#2dd4bf", border: "1px solid #2dd4bf40" }}
            >
              <Download className="w-4 h-4" />
              Download Price List
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-2">
              {[
                { href: "/catalog", label: "Catalog" },
                { href: "/about", label: "About Us" },
                { href: "/quality", label: "Quality & Documentation" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact / Quote" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#8b949e] hover:text-[#2dd4bf] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Account</h4>
            <ul className="space-y-2">
              {[
                { href: "/account", label: "My Account" },
                { href: "/account/login", label: "Login" },
                { href: "/account/register", label: "Register" },
                { href: "/account/orders", label: "My Orders" },
                { href: "/cart", label: "Cart" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#8b949e] hover:text-[#2dd4bf] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              {[
                { href: "/legal/terms", label: "Terms & Conditions" },
                { href: "/legal/privacy", label: "Privacy Policy" },
                { href: "/legal/shipping", label: "Refund & Shipping Policy" },
                { href: "/legal/research-use", label: "Research Use Disclaimer" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#8b949e] hover:text-[#2dd4bf] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8b949e]">
            © {new Date().getFullYear()} Gills Bio Lab. All rights reserved. Research use only.
          </p>
          <p className="text-xs text-[#8b949e]">
            Not for human or veterinary use under any circumstances.
          </p>
        </div>
      </div>
    </footer>
  );
}
