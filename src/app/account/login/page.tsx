"use client";
import { useState } from "react";
import Link from "next/link";
import { FlaskConical, Lock } from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}
      className="flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)" }}>
            <FlaskConical className="w-6 h-6 text-[#0d1117]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Sign In</h1>
          <p className="text-sm mt-1" style={{ color: "#8b949e" }}>Access your Gills Bio Lab account</p>
        </div>

        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="researcher@institution.edu"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "#161b22", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "#161b22", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117" }}
          >
            <Lock className="w-4 h-4" />
            Sign In
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "#8b949e" }}>
          Don&apos;t have an account?{" "}
          <Link href="/account/register" className="font-medium hover:underline" style={{ color: "#2dd4bf" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
