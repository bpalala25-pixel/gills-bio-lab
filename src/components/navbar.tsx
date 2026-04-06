"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/",          label: "Home"       },
  { href: "/catalog",   label: "Catalog"    },
  { href: "/quality",   label: "Quality"    },
  { href: "/faq",       label: "FAQ"        },
  { href: "/contact",   label: "Contact"    },
];

export default function Navbar() {
  const pathname   = usePathname();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(250,249,247,0.88)",
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        borderBottom: "1px solid rgba(28,25,23,0.08)",
        boxShadow: "0 1px 16px rgba(28,25,23,0.05)",
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #01696f, #018a92)" }}>
              {/* flask icon */}
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 3h6M9 3v6l-4 10a1 1 0 001 1.5h12A1 1 0 0019 19l-4-10V3M9 3H7m8 0h2"/>
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: "#1c1917" }}>
              Gills<span style={{ color: "#01696f" }}>Bio</span>Lab
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    color:           active ? "#01696f"              : "#6b6560",
                    backgroundColor: active ? "rgba(1,105,111,0.08)" : "transparent",
                    fontWeight:      active ? 600                    : 500,
                  }}>
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Link href="/account"
              className="hidden md:inline-flex px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:bg-black/5"
              style={{ color: "#6b6560" }}>
              Account
            </Link>

            {/* Cart */}
            <Link href="/cart"
              className="relative p-2 rounded-lg transition-colors hover:bg-black/5">
              <ShoppingCart className="w-5 h-5" style={{ color: "#3d3833" }} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{ backgroundColor: "#01696f" }}>
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile toggle */}
            <button className="md:hidden p-2 rounded-lg transition-colors hover:bg-black/5"
              onClick={() => setOpen(!open)}>
              {open
                ? <X    className="w-5 h-5" style={{ color: "#3d3833" }} />
                : <Menu className="w-5 h-5" style={{ color: "#3d3833" }} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden py-2"
          style={{
            background: "rgba(250,249,247,0.98)",
            borderTop: "1px solid rgba(28,25,23,0.08)",
          }}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm font-medium transition-colors"
              style={{
                color: pathname === href ? "#01696f" : "#6b6560",
                backgroundColor: pathname === href ? "rgba(1,105,111,0.06)" : "transparent",
              }}>
              {label}
            </Link>
          ))}
          <Link href="/account" onClick={() => setOpen(false)}
            className="block px-6 py-3 text-sm font-medium transition-colors"
            style={{ color: "#6b6560" }}>
            Account
          </Link>
        </div>
      )}
    </nav>
  );
}
