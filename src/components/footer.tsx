import Link from "next/link";
import { Download } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1c1917", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Disclaimer */}
      <div className="py-3.5 px-4 text-center text-xs"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "#6b6560" }}>
        Gills Bio Lab supplies peptide research chemicals exclusively for laboratory use by qualified professionals.
        Products are not intended for human or veterinary consumption, medical use, or any form of therapeutic application.
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #01696f, #018a92)" }}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 3h6M9 3v6l-4 10a1 1 0 001 1.5h12A1 1 0 0019 19l-4-10V3M9 3H7m8 0h2"/>
                </svg>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                Gills<span style={{ color: "#018a92" }}>Bio</span>Lab
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#6b6560" }}>
              Professional, lab-grade peptide research chemicals for serious laboratories.
            </p>
            <a href="/price-list.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{ backgroundColor: "rgba(1,137,146,0.12)", color: "#018a92", border: "1px solid rgba(1,137,146,0.25)" }}>
              <Download className="w-4 h-4" />
              Download Price List
            </a>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#9c9590" }}>Navigate</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/catalog", label: "Catalog" },
                { href: "/about",   label: "About Us" },
                { href: "/quality", label: "Quality & Docs" },
                { href: "/faq",     label: "FAQ" },
                { href: "/contact", label: "Contact / Quote" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: "#6b6560" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#9c9590" }}>Account</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/account",          label: "My Account" },
                { href: "/account/login",    label: "Login"      },
                { href: "/account/register", label: "Register"   },
                { href: "/account/orders",   label: "My Orders"  },
                { href: "/cart",             label: "Cart"       },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: "#6b6560" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#9c9590" }}>Legal</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/legal/terms",        label: "Terms & Conditions"    },
                { href: "/legal/privacy",      label: "Privacy Policy"        },
                { href: "/legal/shipping",     label: "Refund & Shipping"     },
                { href: "/legal/research-use", label: "Research Use Disclaimer" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: "#6b6560" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "#4a4540" }}>
            © {new Date().getFullYear()} Gills Bio Lab. All rights reserved. Research use only.
          </p>
          <p className="text-xs" style={{ color: "#4a4540" }}>
            Not for human or veterinary use under any circumstances.
          </p>
        </div>
      </div>
    </footer>
  );
}
