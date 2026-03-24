"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, ChevronRight, AlertTriangle, FlaskConical, Shield, Thermometer, Package } from "lucide-react";
import { getProductBySlug, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ProductCard from "@/components/product-card";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0d1117" }}>
        <div className="text-center">
          <p className="text-2xl font-bold text-white mb-2">Product not found</p>
          <Link href="/catalog" className="text-sm" style={{ color: "#2dd4bf" }}>Back to Catalog</Link>
        </div>
      </div>
    );
  }

  const selectedPrice = product.prices[selectedPriceIdx];

  function handleAddToCart() {
    addItem(product, selectedPrice.qty, selectedPrice.price, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div className="border-b border-white/8" style={{ backgroundColor: "#161b22" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm" style={{ color: "#8b949e" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/catalog" className="hover:text-white transition-colors">Catalog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Research Only Banner */}
      <div className="px-4 py-3 text-center text-xs font-medium"
        style={{ backgroundColor: "#f8514910", borderBottom: "1px solid #f8514925", color: "#f85149" }}>
        <AlertTriangle className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
        Research Use Only – Not for human or veterinary use. Not a drug, food, cosmetic, or supplement.
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Visual */}
          <div>
            <div className="rounded-2xl flex items-center justify-center h-80 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1c2333, #0d1117)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="absolute inset-0"
                style={{ background: "radial-gradient(circle at 50% 50%, #2dd4bf12, transparent 70%)" }} />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-28 h-28 rounded-full flex items-center justify-center animate-pulse"
                  style={{ background: "radial-gradient(circle, #2dd4bf25, #0891b215)" }}>
                  <FlaskConical className="w-14 h-14" style={{ color: "#2dd4bf" }} />
                </div>
                <div className="text-center">
                  <p className="font-mono text-sm font-bold" style={{ color: "#2dd4bf" }}>{product.code}</p>
                  <p className="text-xs mt-1" style={{ color: "#8b949e" }}>Molecular Research Grade</p>
                </div>
              </div>
              {/* Decorative rings */}
              <div className="absolute inset-6 rounded-full border opacity-20"
                style={{ borderColor: "#2dd4bf", animation: "spin 25s linear infinite" }} />
              <div className="absolute inset-16 rounded-full border opacity-10"
                style={{ borderColor: "#2dd4bf", animation: "spin 15s linear infinite reverse" }} />
            </div>

            {/* Specs table */}
            <div className="mt-6 rounded-xl overflow-hidden border border-white/8" style={{ backgroundColor: "#161b22" }}>
              <div className="px-5 py-3 border-b border-white/8">
                <h3 className="text-sm font-semibold text-white">Technical Specifications</h3>
              </div>
              <div className="divide-y divide-white/5">
                {[
                  { label: "Quantity", value: product.quantity, icon: Package },
                  { label: "Form", value: product.form, icon: FlaskConical },
                  { label: "Purity", value: product.purity, icon: Shield, highlight: true },
                  { label: "Intended Use", value: "Laboratory research only (in vitro)", icon: null },
                  { label: "Recommended Storage", value: product.storage, icon: Thermometer },
                  { label: "Category", value: product.category, icon: null },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-5 py-3">
                    <span className="text-sm" style={{ color: "#8b949e" }}>{row.label}</span>
                    <span className={`text-sm font-medium ${row.highlight ? "" : "text-white"}`}
                      style={row.highlight ? { color: "#2dd4bf" } : {}}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Handling */}
            <div className="mt-4 p-4 rounded-xl text-sm"
              style={{ backgroundColor: "#2dd4bf08", border: "1px solid #2dd4bf20", color: "#8b949e" }}>
              <strong className="text-white">Handling: </strong>
              {product.handling}
            </div>
          </div>

          {/* Right: Purchase panel */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2 py-1 rounded text-xs font-medium"
                style={{ backgroundColor: "#2dd4bf15", color: "#2dd4bf", border: "1px solid #2dd4bf30" }}>
                {product.category}
              </span>
              {product.labFavorite && (
                <span className="px-2 py-1 rounded text-xs font-medium"
                  style={{ backgroundColor: "#e3b34115", color: "#e3b341", border: "1px solid #e3b34130" }}>
                  ★ Lab Favorite
                </span>
              )}
              <span className={`px-2 py-1 rounded text-xs font-medium ${product.inStock
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                {product.inStock ? "In Stock" : "Backorder"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
              {product.name}
            </h1>
            <p className="font-mono text-sm mb-4" style={{ color: "#8b949e" }}>Code: {product.code}</p>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "#8b949e" }}>
              {product.description}
            </p>

            {/* Price selector */}
            <div className="mb-5">
              <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: "#8b949e" }}>
                Select Quantity / Pack
              </label>
              <div className="grid grid-cols-1 gap-2">
                {product.prices.map((p, i) => (
                  <button
                    key={p.qty}
                    onClick={() => setSelectedPriceIdx(i)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all text-left"
                    style={{
                      backgroundColor: selectedPriceIdx === i ? "#2dd4bf15" : "#161b22",
                      border: `1px solid ${selectedPriceIdx === i ? "#2dd4bf50" : "rgba(255,255,255,0.08)"}`,
                      color: selectedPriceIdx === i ? "#2dd4bf" : "#c9d1d9",
                    }}
                  >
                    <span className="font-medium">{p.qty}</span>
                    <span className="font-bold">${p.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Qty input + Add to cart */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center rounded-xl overflow-hidden border border-white/8"
                style={{ backgroundColor: "#161b22" }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="px-4 py-3 text-lg font-bold transition-colors hover:text-white"
                  style={{ color: "#8b949e" }}>
                  −
                </button>
                <span className="px-4 py-3 text-base font-semibold text-white min-w-[40px] text-center">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="px-4 py-3 text-lg font-bold transition-colors hover:text-white"
                  style={{ color: "#8b949e" }}>
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                style={{
                  background: added
                    ? "linear-gradient(135deg, #0d9488, #0e7490)"
                    : product.inStock
                    ? "linear-gradient(135deg, #2dd4bf, #0891b2)"
                    : "#333",
                  color: product.inStock ? "#0d1117" : "#8b949e",
                  boxShadow: product.inStock ? "0 0 15px rgba(45,212,191,0.25)" : "none",
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? "Added to Research Order!" : "Add to Research Order"}
              </button>
            </div>

            {/* Bulk quote link */}
            <Link
              href="/contact"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5 mb-6"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#c9d1d9" }}
            >
              Request Lab Quote for Bulk Orders
            </Link>

            {/* Subtotal */}
            <div className="p-4 rounded-xl mb-6"
              style={{ backgroundColor: "#161b22", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span style={{ color: "#8b949e" }}>Unit price</span>
                <span className="text-white">${selectedPrice.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span style={{ color: "#8b949e" }}>Quantity</span>
                <span className="text-white">{qty}</span>
              </div>
              <div className="border-t border-white/8 mt-2 pt-2 flex items-center justify-between">
                <span className="font-semibold text-white">Subtotal</span>
                <span className="font-bold text-lg" style={{ color: "#2dd4bf" }}>
                  ${(selectedPrice.price * qty).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Closing disclaimer */}
            <div className="p-4 rounded-xl text-xs leading-relaxed"
              style={{ backgroundColor: "#f8514908", border: "1px solid #f8514920", color: "#8b949e" }}>
              By purchasing {product.name}, you confirm that it will be handled exclusively by qualified personnel
              in a suitable research facility.{" "}
              <strong className="text-white">This product is not for human or animal use under any circumstances.</strong>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-white mb-6">Related Research Compounds</h2>
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
