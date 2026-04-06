import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";

export default function OrdersPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black" style={{ color: "#1c1917" }}>My Orders</h1>
          <Link href="/account" className="text-sm font-medium" style={{ color: "#01696f" }}>← Account</Link>
        </div>

        <div className="glass-card flex flex-col items-center justify-center py-16 text-center rounded-2xl">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
            style={{ backgroundColor: "rgba(1,105,111,0.08)", border: "1px solid rgba(1,105,111,0.15)" }}>
            <Package className="w-8 h-8" style={{ color: "#01696f" }} />
          </div>
          <p className="text-lg font-black mb-2" style={{ color: "#1c1917" }}>No orders yet</p>
          <p className="text-sm mb-8" style={{ color: "#9c9590" }}>
            Sign in to view your research order history.
          </p>
          <div className="flex gap-3">
            <Link href="/account/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff", boxShadow: "0 4px 16px rgba(1,105,111,0.25)" }}>
              Sign In
            </Link>
            <Link href="/catalog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-black/5"
              style={{ border: "1px solid rgba(28,25,23,0.12)", color: "#3d3833" }}>
              Browse Catalog
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
