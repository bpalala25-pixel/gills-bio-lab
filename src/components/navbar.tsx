"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, Menu, X, FlaskConical } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/catalog-pdf", label: "PDF Catalog" },
  { href: "/quality", label: "Quality" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 backdrop-blur-md"
      style={{ backgroundColor: "rgba(13, 17, 23, 0.92)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)" }}>
              <FlaskConical className="w-4 h-4 text-[#0d1117]" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Gills<span style={{ color: "#2dd4bf" }}>Bio</span>Lab
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-[#2dd4bf] bg-[#2dd4bf]/10"
                    : "text-[#8b949e] hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/account"
              className="hidden md:inline-flex px-3 py-1.5 text-sm text-[#8b949e] hover:text-white transition-colors"
            >
              Account
            </Link>
            <Link href="/cart" className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
              <ShoppingCart className="w-5 h-5 text-[#c9d1d9]" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-[#0d1117]"
                  style={{ backgroundColor: "#2dd4bf" }}>
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-[#c9d1d9]" />
              ) : (
                <Menu className="w-5 h-5 text-[#c9d1d9]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/8 py-2" style={{ backgroundColor: "rgba(13, 17, 23, 0.98)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-[#2dd4bf] bg-[#2dd4bf]/10"
                  : "text-[#8b949e] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/account"
            onClick={() => setMobileOpen(false)}
            className="block px-6 py-3 text-sm text-[#8b949e] hover:text-white transition-colors"
          >
            Account
          </Link>
        </div>
      )}
    </nav>
  );
}
