"use client";
import { useState } from "react";
import Link from "next/link";
import { FlaskConical } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "", institution: "", email: "", password: "", confirm: false,
  });

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}
      className="flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, #01696f, #018a92)" }}>
            <FlaskConical className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black" style={{ color: "#1c1917" }}>Create Account</h1>
          <p className="text-sm mt-1" style={{ color: "#9c9590" }}>Register as a qualified research buyer</p>
        </div>

        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          {[
            { label: "Full Name *",         key: "name",        type: "text",     placeholder: "Dr. Jane Smith" },
            { label: "Institution / Lab *", key: "institution", type: "text",     placeholder: "University Research Lab" },
            { label: "Email Address *",     key: "email",       type: "email",    placeholder: "researcher@institution.edu" },
            { label: "Password *",          key: "password",    type: "password", placeholder: "••••••••" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#9c9590" }}>
                {f.label}
              </label>
              <input
                type={f.type}
                value={form[f.key as keyof typeof form] as string}
                onChange={e => setForm(fm => ({ ...fm, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "rgba(255,255,255,0.85)", border: "1px solid rgba(28,25,23,0.12)", color: "#1c1917" }}
              />
            </div>
          ))}

          <div className="flex items-start gap-3 p-4 rounded-xl"
            style={{ backgroundColor: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.10)" }}>
            <input
              type="checkbox"
              id="reg-confirm"
              checked={form.confirm}
              onChange={e => setForm(f => ({ ...f, confirm: e.target.checked }))}
              className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer"
              style={{ accentColor: "#01696f" }}
            />
            <label htmlFor="reg-confirm" className="text-xs leading-relaxed cursor-pointer" style={{ color: "#6b6560" }}>
              I confirm I am a qualified researcher or institutional buyer. All purchases are for laboratory research only —
              <strong style={{ color: "#1c1917" }}> not for human or veterinary use.</strong>
            </label>
          </div>

          <button
            type="submit"
            disabled={!form.name || !form.institution || !form.email || !form.confirm}
            className="w-full py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff", boxShadow: "0 4px 20px rgba(1,105,111,0.25)" }}
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "#9c9590" }}>
          Already have an account?{" "}
          <Link href="/account/login" className="font-semibold hover:underline" style={{ color: "#01696f" }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
