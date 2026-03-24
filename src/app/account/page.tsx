import Link from "next/link";
import { User, Package, LogIn } from "lucide-react";

export default function AccountPage() {
  return (
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}>
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg, #2dd4bf20, #0891b220)" }}>
          <User className="w-8 h-8" style={{ color: "#2dd4bf" }} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">My Account</h1>
        <p className="text-sm mb-8" style={{ color: "#8b949e" }}>
          Sign in or create an account to manage your research orders and account details.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/account/login"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117" }}
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
          <Link
            href="/account/register"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#c9d1d9" }}
          >
            Create Account
          </Link>
          <Link
            href="/account/orders"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm transition-all"
            style={{ color: "#8b949e" }}
          >
            <Package className="w-4 h-4" />
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
