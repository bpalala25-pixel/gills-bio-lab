"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, ChevronRight, AlertTriangle, FlaskConical, Shield, Thermometer, Package, ChevronLeft } from "lucide-react";
import { getProductBySlug, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ProductCard from "@/components/product-card";
import VialImage, { getVialColors } from "@/components/vial-image";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const router = useRouter();
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg-base)" }}>
        <div className="text-center">
          <p className="text-2xl font-black mb-2" style={{ color: "#1c1917" }}>Product not found</p>
          <Link href="/catalog" className="text-sm font-medium" style={{ color: "#01696f" }}>← Back to Catalog</Link>
        </div>
      </div>
    );
  }

  const selectedPrice = product.prices[selectedPriceIdx];
  const { accent } = getVialColors(product.category);

  function handleAddToCart() {
    addItem(product!, selectedPrice.qty, selectedPrice.price, qty);
    setAdded(true);
    setTimeout(() => { setAdded(false); router.push("/cart"); }, 800);
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: "rgba(255,255,255,0.80)", borderBottom: "1px solid rgba(28,25,23,0.07)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 pt-20">
          <nav className="flex items-center gap-1.5 text-sm" style={{ color: "#9c9590" }}>
            <Link href="/" className="transition-colors hover:text-stone-700" style={{ color: "#9c9590" }}>Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link href="/catalog" className="transition-colors hover:text-stone-700" style={{ color: "#9c9590" }}>Catalog</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span style={{ color: "#1c1917", fontWeight: 600 }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* RUO Banner */}
      <div className="px-4 py-2.5 text-center text-xs font-semibold"
        style={{ backgroundColor: "rgba(220,38,38,0.04)", borderBottom: "1px solid rgba(220,38,38,0.10)", color: "#b91c1c" }}>
        <AlertTriangle className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
        Research Use Only — Not for human or veterinary use. Not a drug, food, cosmetic, or supplement.
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── LEFT: Visual + specs ─────────────────────────────────────── */}
          <div>
            {/* Image panel */}
            <div className="relative rounded-2xl overflow-hidden h-80 flex items-center justify-center"
              style={{
                background: "linear-gradient(160deg, #edf6f6 0%, #ede9f5 50%, #f0ede8 100%)",
                border: "1px solid rgba(255,255,255,0.90)",
                boxShadow: "0 4px 32px rgba(28,25,23,0.08), inset 0 1px 0 rgba(255,255,255,0.70)",
              }}>
              {/* Ambient orbs */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)", filter: "blur(24px)" }} />
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(1,105,111,0.10) 0%, transparent 65%)", filter: "blur(20px)" }} />

              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ filter: "drop-shadow(0 8px 24px rgba(28,25,23,0.12))" }}
                />
              ) : (
                <div className="relative z-10 w-32 h-52" style={{ filter: "drop-shadow(0 8px 24px rgba(28,25,23,0.12))" }}>
                  <VialImage
                    name={product.code}
                    quantity={product.quantity}
                    capColor={accent}
                    labelColor={accent}
                    className="w-full h-full"
                  />
                </div>
              )}

              {/* Spinning rings */}
              <div className="absolute inset-6 rounded-full pointer-events-none"
                style={{ border: "1px solid rgba(1,105,111,0.10)", borderTopColor: "rgba(1,105,111,0.30)", animation: "spin 25s linear infinite" }} />
              <div className="absolute inset-16 rounded-full pointer-events-none"
                style={{ border: "1px solid rgba(139,92,246,0.08)", borderTopColor: "rgba(139,92,246,0.25)", animation: "spin 15s linear infinite reverse" }} />

              {/* Stock badge overlay */}
              <div className="absolute bottom-4 right-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                  style={{
                    backgroundColor: product.inStock ? "rgba(34,197,94,0.10)" : "rgba(220,38,38,0.08)",
                    color: product.inStock ? "#15803d" : "#dc2626",
                    border: `1px solid ${product.inStock ? "rgba(34,197,94,0.22)" : "rgba(220,38,38,0.22)"}`,
                    backdropFilter: "blur(8px)",
                  }}>
                  {product.inStock ? "● In Stock" : "○ Backorder"}
                </span>
              </div>
            </div>

            {/* Specs table */}
            <div className="glass-card mt-5 rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 flex items-center gap-2"
                style={{ borderBottom: "1px solid rgba(28,25,23,0.06)", background: "rgba(28,25,23,0.015)" }}>
                <div className="w-5 h-5 rounded-md flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(1,105,111,0.14), rgba(1,105,111,0.06))" }}>
                  <FlaskConical className="w-3 h-3" style={{ color: "#01696f" }} />
                </div>
                <h3 className="text-sm font-black" style={{ color: "#1c1917" }}>Technical Specifications</h3>
              </div>
              <div>
                {[
                  { label: "Quantity",          value: product.quantity,                        icon: Package,     highlight: false },
                  { label: "Form",              value: product.form,                            icon: FlaskConical, highlight: false },
                  { label: "Purity",            value: product.purity,                          icon: Shield,      highlight: true  },
                  { label: "Intended Use",      value: "Laboratory research only (in vitro)",   icon: null,        highlight: false },
                  { label: "Rec. Storage",      value: product.storage,                         icon: Thermometer, highlight: false },
                  { label: "Category",          value: product.category,                        icon: null,        highlight: false },
                ].map((row, idx, arr) => (
                  <div key={row.label}
                    className="flex items-center justify-between px-5 py-3 group transition-colors hover:bg-black/[0.015]"
                    style={{ borderBottom: idx < arr.length - 1 ? "1px solid rgba(28,25,23,0.05)" : "none" }}>
                    <span className="text-sm flex items-center gap-2" style={{ color: "#9c9590" }}>
                      {row.icon && <row.icon className="w-3.5 h-3.5 shrink-0" style={{ color: row.highlight ? "#01696f" : "#c5c0bb" }} />}
                      {row.label}
                    </span>
                    <span className="text-sm font-semibold text-right"
                      style={{ color: row.highlight ? "#01696f" : "#1c1917" }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Handling note */}
            <div className="mt-4 p-4 rounded-xl text-sm leading-relaxed flex items-start gap-2.5"
              style={{ backgroundColor: "rgba(1,105,111,0.05)", border: "1px solid rgba(1,105,111,0.14)", color: "#6b6560" }}>
              <Shield className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#01696f" }} />
              <span><strong style={{ color: "#1c1917" }}>Handling: </strong>{product.handling}</span>
            </div>
          </div>

          {/* ── RIGHT: Purchase panel ─────────────────────────────────────── */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "rgba(139,92,246,0.08)", color: "#7c3aed", border: "1px solid rgba(139,92,246,0.20)" }}>
                {product.category}
              </span>
              {product.labFavorite && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: "rgba(1,105,111,0.08)", color: "#01696f", border: "1px solid rgba(1,105,111,0.22)" }}>
                  ★ Lab Favorite
                </span>
              )}
              {product.badge && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: "rgba(139,92,246,0.08)", color: "#7c3aed", border: "1px solid rgba(139,92,246,0.18)" }}>
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black mb-1" style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>
              {product.name}
            </h1>
            <p className="font-mono text-sm mb-5" style={{ color: "#9c9590" }}>Product Code: {product.code}</p>

            <p className="text-sm leading-relaxed mb-7" style={{ color: "#6b6560" }}>
              {product.description}
            </p>

            {/* Price selector */}
            <div className="mb-5">
              <label className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: "#9c9590" }}>
                Select Quantity / Pack
              </label>
              <div className="grid grid-cols-1 gap-2">
                {product.prices.map((p, i) => (
                  <button key={p.qty} onClick={() => setSelectedPriceIdx(i)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm transition-all text-left"
                    style={{
                      backgroundColor: selectedPriceIdx === i ? "rgba(1,105,111,0.08)" : "rgba(255,255,255,0.80)",
                      border: `1.5px solid ${selectedPriceIdx === i ? "rgba(1,105,111,0.35)" : "rgba(28,25,23,0.10)"}`,
                      color: selectedPriceIdx === i ? "#01696f" : "#3d3833",
                      boxShadow: selectedPriceIdx === i ? "0 2px 12px rgba(1,105,111,0.10)" : "none",
                    }}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: selectedPriceIdx === i ? "#01696f" : "rgba(28,25,23,0.20)" }}>
                        {selectedPriceIdx === i && (
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#01696f" }} />
                        )}
                      </div>
                      <span className="font-semibold">{p.qty}</span>
                    </div>
                    <span className="font-black text-base" style={{ color: selectedPriceIdx === i ? "#01696f" : "#1c1917" }}>
                      ${p.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Qty stepper + Add to cart */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(28,25,23,0.12)", backgroundColor: "rgba(255,255,255,0.85)" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="px-4 py-3 text-lg font-bold transition-colors hover:bg-black/5"
                  style={{ color: qty <= 1 ? "#c5c0bb" : "#6b6560" }}>−</button>
                <span className="px-4 py-3 text-base font-black min-w-[44px] text-center" style={{ color: "#1c1917" }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="px-4 py-3 text-lg font-bold transition-colors hover:bg-black/5"
                  style={{ color: "#6b6560" }}>+</button>
              </div>

              <button onClick={handleAddToCart} disabled={!product.inStock}
                className="btn-shimmer flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 hover:-translate-y-0.5"
                style={{
                  background: added
                    ? "linear-gradient(135deg, #047857, #065f46)"
                    : product.inStock
                    ? "linear-gradient(135deg, #01696f, #018a92)"
                    : "#d1cdc8",
                  color: product.inStock ? "#ffffff" : "#9c9590",
                  boxShadow: product.inStock && !added
                    ? "0 6px 24px rgba(1,105,111,0.30), inset 0 1px 0 rgba(255,255,255,0.15)"
                    : added
                    ? "0 4px 16px rgba(4,120,87,0.25)"
                    : "none",
                }}>
                <ShoppingCart className="w-4 h-4" />
                {added ? "Added to Research Order!" : "Add to Research Order"}
              </button>
            </div>

            {/* Bulk quote */}
            <Link href="/contact"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-black/5 mb-6"
              style={{ border: "1px solid rgba(28,25,23,0.12)", color: "#3d3833" }}>
              Request Lab Quote for Bulk Orders
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            {/* Subtotal card */}
            <div className="glass-card p-5 rounded-xl mb-6">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#9c9590" }}>Order Summary</p>
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: "#9c9590" }}>Unit price</span>
                  <span style={{ color: "#1c1917", fontWeight: 600 }}>${selectedPrice.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: "#9c9590" }}>Quantity</span>
                  <span style={{ color: "#1c1917", fontWeight: 600 }}>{qty}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3"
                style={{ borderTop: "1px solid rgba(28,25,23,0.08)" }}>
                <span className="font-black text-sm" style={{ color: "#1c1917" }}>Subtotal</span>
                <span className="font-black text-2xl" style={{ color: "#01696f" }}>
                  ${(selectedPrice.price * qty).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-xl text-xs leading-relaxed"
              style={{ backgroundColor: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.10)", color: "#6b6560" }}>
              By purchasing {product.name}, you confirm that it will be handled exclusively by qualified personnel
              in a suitable research facility.{" "}
              <strong style={{ color: "#1c1917" }}>This product is not for human or animal use under any circumstances.</strong>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 pt-10" style={{ borderTop: "1px solid rgba(28,25,23,0.07)" }}>
            <div className="flex items-center justify-between mb-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: "#01696f" }}>
                  {product.category}
                </p>
                <h2 className="text-xl font-black" style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>
                  Related Research Compounds
                </h2>
              </div>
              <Link href="/catalog"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-teal-800"
                style={{ color: "#01696f" }}>
                <ChevronLeft className="w-3.5 h-3.5" />
                All compounds
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
