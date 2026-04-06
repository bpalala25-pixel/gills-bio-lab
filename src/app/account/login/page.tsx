"use client";
import { useState } from "react";
import Link from "next/link";
import { FlaskConical, Lock } from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}
      className="flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, #01696f, #018a92)" }}>
            <FlaskConical className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black" style={{ color: "#1c1917" }}>Sign In</h1>
          <p className="text-sm mt-1" style={{ color: "#9c9590" }}>Access your Gills Bio Lab account</p>
        </div>

        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#9c9590" }}>
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="researcher@institution.edu"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.85)", border: "1px solid rgba(28,25,23,0.12)", color: "#1c1917" }}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#9c9590" }}>
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.85)", border: "1px solid rgba(28,25,23,0.12)", color: "#1c1917" }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff", boxShadow: "0 4px 20px rgba(1,105,111,0.25)" }}
          >
            <Lock className="w-4 h-4" />
            Sign In
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "#9c9590" }}>
          Don&apos;t have an account?{" "}
          <Link href="/account/register" className="font-semibold hover:underline" style={{ color: "#01696f" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
