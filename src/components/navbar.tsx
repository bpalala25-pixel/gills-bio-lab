"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, Menu, X, FlaskConical } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/",        label: "Home"    },
  { href: "/catalog", label: "Catalog" },
  { href: "/quality", label: "Quality" },
  { href: "/faq",     label: "FAQ"     },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname     = usePathname();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(250,249,247,0.90)",
        backdropFilter: "blur(20px) saturate(175%)",
        WebkitBackdropFilter: "blur(20px) saturate(175%)",
        borderBottom: "1px solid rgba(28,25,23,0.07)",
        boxShadow: "0 1px 20px rgba(28,25,23,0.06), 0 0 0 0.5px rgba(28,25,23,0.04)",
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-3"
              style={{
                background: "linear-gradient(135deg, #01696f, #018a92)",
                boxShadow: "0 2px 10px rgba(1,105,111,0.30)",
              }}>
              <FlaskConical className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-base tracking-tight transition-colors" style={{ color: "#1c1917" }}>
              Gills
              <span style={{
                background: "linear-gradient(135deg, #01696f, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Bio</span>
              Lab
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href}
                  className="relative px-4 py-2 rounded-lg text-sm transition-all group/link"
                  style={{
                    color:           active ? "#01696f"              : "#6b6560",
                    backgroundColor: active ? "rgba(1,105,111,0.08)" : "transparent",
                    fontWeight:      active ? 700                    : 500,
                  }}
                  onMouseEnter={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "#1c1917";
                  }}
                  onMouseLeave={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "#6b6560";
                  }}>
                  {label}
                  {/* Active underline */}
                  {active && (
                    <span className="absolute bottom-1 left-4 right-4 h-px rounded-full"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(1,105,111,0.6), transparent)" }} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-1.5">
            <Link href="/account"
              className="hidden md:inline-flex px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:bg-black/5 hover:text-stone-800"
              style={{ color: "#6b6560" }}>
              Account
            </Link>

            {/* Cart */}
            <Link href="/cart"
              className="relative p-2 rounded-lg transition-all hover:scale-105"
              style={{
                backgroundColor: itemCount > 0 ? "rgba(1,105,111,0.07)" : "transparent",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(1,105,111,0.08)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = itemCount > 0 ? "rgba(1,105,111,0.07)" : "transparent"}>
              <ShoppingCart className="w-5 h-5" style={{ color: itemCount > 0 ? "#01696f" : "#3d3833" }} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white animate-pulse-ring"
                  style={{
                    background: "linear-gradient(135deg, #01696f, #018a92)",
                    boxShadow: "0 2px 8px rgba(1,105,111,0.40)",
                  }}>
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
            boxShadow: "0 8px 24px rgba(28,25,23,0.08)",
          }}>
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors"
                style={{
                  color: active ? "#01696f" : "#6b6560",
                  backgroundColor: active ? "rgba(1,105,111,0.06)" : "transparent",
                }}>
                {active && <span className="w-1 h-4 rounded-full" style={{ backgroundColor: "#01696f" }} />}
                {label}
              </Link>
            );
          })}
          <Link href="/account" onClick={() => setOpen(false)}
            className="flex items-center px-6 py-3 text-sm font-medium transition-colors"
            style={{ color: "#6b6560" }}>
            Account
          </Link>
        </div>
      )}
    </nav>
  );
}
