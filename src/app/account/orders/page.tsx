import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";

export default function OrdersPage() {
  return (
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">My Orders</h1>
          <Link href="/account" className="text-sm" style={{ color: "#2dd4bf" }}>← Account</Link>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
            style={{ backgroundColor: "#161b22" }}>
            <Package className="w-8 h-8" style={{ color: "#8b949e" }} />
          </div>
          <p className="text-lg font-medium text-white mb-2">No orders yet</p>
          <p className="text-sm mb-8" style={{ color: "#8b949e" }}>
            Sign in to view your research order history.
          </p>
          <div className="flex gap-3">
            <Link href="/account/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117" }}>
              Sign In
            </Link>
            <Link href="/catalog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#c9d1d9" }}>
              Browse Catalog
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
