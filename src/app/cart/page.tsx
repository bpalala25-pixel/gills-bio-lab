"use client";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, FlaskConical, AlertTriangle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQty, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}
        className="flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "#161b22" }}>
            <ShoppingCart className="w-10 h-10" style={{ color: "#8b949e" }} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Your research order is empty</h1>
          <p className="text-sm mb-8" style={{ color: "#8b949e" }}>
            Browse the catalog to add peptide research chemicals to your order.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117" }}
          >
            Browse Research Catalog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">
            Research Order Cart
            <span className="ml-3 text-base font-normal" style={{ color: "#8b949e" }}>
              ({itemCount} item{itemCount !== 1 ? "s" : ""})
            </span>
          </h1>
          <Link href="/catalog" className="text-sm transition-colors hover:text-white" style={{ color: "#2dd4bf" }}>
            ← Continue Shopping
          </Link>
        </div>

        {/* Research only reminder */}
        <div className="flex items-start gap-3 p-4 rounded-xl mb-6 text-xs"
          style={{ backgroundColor: "#f8514908", border: "1px solid #f8514920", color: "#8b949e" }}>
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#f85149" }} />
          All products are for laboratory research use only. Not for human or veterinary use.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.selectedQty}`}
                className="flex items-center gap-4 p-5 rounded-xl border border-white/8"
                style={{ backgroundColor: "#161b22" }}>
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #1c2333, #0d1117)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <FlaskConical className="w-7 h-7" style={{ color: "#2dd4bf" }} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm truncate">{item.product.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: "#8b949e" }}>{item.selectedQty}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#8b949e" }}>
                    ${item.unitPrice.toFixed(2)} each
                  </p>
                </div>

                {/* Qty controls */}
                <div className="flex items-center rounded-lg overflow-hidden border border-white/8 shrink-0">
                  <button
                    onClick={() => updateQty(item.product.id, item.selectedQty, item.quantity - 1)}
                    className="px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                    style={{ color: "#8b949e" }}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 py-2 text-sm font-medium text-white min-w-[32px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.product.id, item.selectedQty, item.quantity + 1)}
                    className="px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                    style={{ color: "#8b949e" }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal + remove */}
                <div className="text-right shrink-0">
                  <p className="font-bold text-white">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.product.id, item.selectedQty)}
                    className="mt-1 p-1 rounded hover:bg-red-500/10 transition-colors"
                    style={{ color: "#8b949e" }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div>
            <div className="rounded-xl border border-white/8 p-5 sticky top-24"
              style={{ backgroundColor: "#161b22" }}>
              <h2 className="font-bold text-white mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedQty}`}
                    className="flex items-center justify-between text-xs" style={{ color: "#8b949e" }}>
                    <span className="truncate mr-2">{item.product.name} × {item.quantity}</span>
                    <span className="shrink-0">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/8 pt-4 mb-4">
                <div className="flex items-center justify-between text-xs mb-2" style={{ color: "#8b949e" }}>
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs" style={{ color: "#8b949e" }}>
                  <span>Shipping</span>
                  <Link href="/checkout" className="text-[#2dd4bf] hover:underline">Calculate at checkout</Link>
                </div>
              </div>

              <div className="border-t border-white/8 pt-4 mb-5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Total</span>
                  <span className="font-bold text-lg" style={{ color: "#2dd4bf" }}>${total.toFixed(2)}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: "#8b949e" }}>+ shipping (calculated at checkout)</p>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117", boxShadow: "0 0 15px rgba(45,212,191,0.2)" }}
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-[10px] text-center mt-3 leading-relaxed" style={{ color: "#8b949e" }}>
                All products for laboratory research use only. Not for human or veterinary use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
