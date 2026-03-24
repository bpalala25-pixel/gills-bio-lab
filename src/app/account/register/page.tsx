"use client";
import { useState } from "react";
import Link from "next/link";
import { FlaskConical } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "", institution: "", email: "", password: "", confirm: false,
  });

  return (
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}
      className="flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)" }}>
            <FlaskConical className="w-6 h-6 text-[#0d1117]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-sm mt-1" style={{ color: "#8b949e" }}>Register as a qualified research buyer</p>
        </div>

        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          {[
            { label: "Full Name *", key: "name", type: "text", placeholder: "Dr. Jane Smith" },
            { label: "Institution / Lab *", key: "institution", type: "text", placeholder: "University Research Lab" },
            { label: "Email Address *", key: "email", type: "email", placeholder: "researcher@institution.edu" },
            { label: "Password *", key: "password", type: "password", placeholder: "••••••••" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
                {f.label}
              </label>
              <input
                type={f.type}
                value={form[f.key as keyof typeof form] as string}
                onChange={e => setForm(fm => ({ ...fm, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "#161b22", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }}
              />
            </div>
          ))}

          <div className="flex items-start gap-3 p-4 rounded-xl"
            style={{ backgroundColor: "#f8514908", border: "1px solid #f8514920" }}>
            <input
              type="checkbox"
              id="reg-confirm"
              checked={form.confirm}
              onChange={e => setForm(f => ({ ...f, confirm: e.target.checked }))}
              className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer"
              style={{ accentColor: "#2dd4bf" }}
            />
            <label htmlFor="reg-confirm" className="text-xs leading-relaxed cursor-pointer" style={{ color: "#8b949e" }}>
              I confirm I am a qualified researcher or institutional buyer. All purchases are for laboratory research only —
              <strong className="text-white"> not for human or veterinary use.</strong>
            </label>
          </div>

          <button
            type="submit"
            disabled={!form.name || !form.institution || !form.email || !form.confirm}
            className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117" }}
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "#8b949e" }}>
          Already have an account?{" "}
          <Link href="/account/login" className="font-medium hover:underline" style={{ color: "#2dd4bf" }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
