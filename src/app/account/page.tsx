import Link from "next/link";
import { User, Package, LogIn } from "lucide-react";

export default function AccountPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}
      className="flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg, rgba(1,105,111,0.10), rgba(139,92,246,0.08))", border: "1px solid rgba(1,105,111,0.15)" }}>
          <User className="w-8 h-8" style={{ color: "#01696f" }} />
        </div>
        <h1 className="text-2xl font-black mb-2" style={{ color: "#1c1917" }}>My Account</h1>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: "#9c9590" }}>
          Sign in or create an account to manage your research orders and account details.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/account/login"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff", boxShadow: "0 4px 20px rgba(1,105,111,0.25)" }}>
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
          <Link href="/account/register"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all hover:bg-black/5"
            style={{ border: "1px solid rgba(28,25,23,0.12)", color: "#3d3833" }}>
            Create Account
          </Link>
          <Link href="/account/orders"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm transition-all"
            style={{ color: "#9c9590" }}>
            <Package className="w-4 h-4" />
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
