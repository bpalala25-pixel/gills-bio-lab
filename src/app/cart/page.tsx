"use client";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, FlaskConical, AlertTriangle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQty, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}
        className="flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "rgba(1,105,111,0.08)", border: "1px solid rgba(1,105,111,0.15)" }}>
            <ShoppingCart className="w-10 h-10" style={{ color: "#01696f" }} />
          </div>
          <h1 className="text-2xl font-black mb-2" style={{ color: "#1c1917" }}>Your research order is empty</h1>
          <p className="text-sm mb-8" style={{ color: "#9c9590" }}>
            Browse the catalog to add peptide research chemicals to your order.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff", boxShadow: "0 4px 20px rgba(1,105,111,0.25)" }}
          >
            Browse Research Catalog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-28">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black" style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>
            Research Order Cart
            <span className="ml-3 text-base font-normal" style={{ color: "#9c9590" }}>
              ({itemCount} item{itemCount !== 1 ? "s" : ""})
            </span>
          </h1>
          <Link href="/catalog" className="text-sm font-medium transition-colors" style={{ color: "#01696f" }}>
            ← Continue Shopping
          </Link>
        </div>

        {/* Research only reminder */}
        <div className="flex items-start gap-3 p-4 rounded-xl mb-6 text-xs"
          style={{ backgroundColor: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.10)", color: "#6b6560" }}>
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
          All products are for laboratory research use only. Not for human or veterinary use.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.selectedQty}`}
                className="glass-card flex items-center gap-4 p-5 rounded-2xl">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(1,105,111,0.10), rgba(139,92,246,0.08))", border: "1px solid rgba(1,105,111,0.15)" }}>
                  <FlaskConical className="w-7 h-7" style={{ color: "#01696f" }} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate" style={{ color: "#1c1917" }}>{item.product.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: "#9c9590" }}>{item.selectedQty}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#9c9590" }}>
                    ${item.unitPrice.toFixed(2)} each
                  </p>
                </div>

                {/* Qty controls */}
                <div className="flex items-center rounded-xl overflow-hidden shrink-0"
                  style={{ border: "1px solid rgba(28,25,23,0.12)" }}>
                  <button
                    onClick={() => updateQty(item.product.id, item.selectedQty, item.quantity - 1)}
                    className="px-3 py-2 text-sm hover:bg-black/5 transition-colors"
                    style={{ color: "#9c9590" }}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 py-2 text-sm font-black min-w-[32px] text-center" style={{ color: "#1c1917" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.product.id, item.selectedQty, item.quantity + 1)}
                    className="px-3 py-2 text-sm hover:bg-black/5 transition-colors"
                    style={{ color: "#9c9590" }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal + remove */}
                <div className="text-right shrink-0">
                  <p className="font-black" style={{ color: "#1c1917" }}>
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.product.id, item.selectedQty)}
                    className="mt-1 p-1 rounded hover:bg-red-500/10 transition-colors"
                    style={{ color: "#9c9590" }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div>
            <div className="glass-card rounded-2xl p-5 sticky top-24">
              <h2 className="font-black text-sm mb-4" style={{ color: "#1c1917" }}>Order Summary</h2>

              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedQty}`}
                    className="flex items-center justify-between text-xs" style={{ color: "#9c9590" }}>
                    <span className="truncate mr-2">{item.product.name} × {item.quantity}</span>
                    <span className="shrink-0">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 mb-4" style={{ borderTop: "1px solid rgba(28,25,23,0.08)" }}>
                <div className="flex items-center justify-between text-xs mb-2" style={{ color: "#9c9590" }}>
                  <span>Subtotal</span>
                  <span className="font-semibold" style={{ color: "#1c1917" }}>${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs" style={{ color: "#9c9590" }}>
                  <span>Shipping</span>
                  <Link href="/checkout" className="hover:underline" style={{ color: "#01696f" }}>Calculate at checkout</Link>
                </div>
              </div>

              <div className="pt-4 mb-5" style={{ borderTop: "1px solid rgba(28,25,23,0.08)" }}>
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm" style={{ color: "#1c1917" }}>Total</span>
                  <span className="font-black text-xl" style={{ color: "#01696f" }}>${total.toFixed(2)}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: "#9c9590" }}>+ shipping (calculated at checkout)</p>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff", boxShadow: "0 4px 20px rgba(1,105,111,0.25)" }}
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-[10px] text-center mt-3 leading-relaxed" style={{ color: "#9c9590" }}>
                All products for laboratory research use only. Not for human or veterinary use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
