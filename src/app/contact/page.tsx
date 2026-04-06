"use client";
import { useState } from "react";
import { Mail, MessageSquare, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", institution: "", email: "", subject: "general", message: "", confirm: false,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #f0ede8 0%, #ede9f5 100%)",
        borderBottom: "1px solid rgba(28,25,23,0.08)",
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#01696f" }}>
            Contact
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-2 mb-4"
            style={{ color: "#1c1917", letterSpacing: "-0.03em" }}>
            Contact / Request a Quote
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#6b6560" }}>
            Reach us for availability questions, bulk pricing, documentation requests, or general inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Sidebar */}
          <div className="space-y-5">
            {[
              {
                icon: Mail,
                title: "General Inquiries",
                desc: "Questions about catalog, availability, or account setup.",
              },
              {
                icon: MessageSquare,
                title: "Bulk / Lab Quote",
                desc: "Request pricing for high-volume or recurring research orders.",
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-5 rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(1,105,111,0.10), rgba(139,92,246,0.08))" }}>
                    <item.icon className="w-4 h-4" style={{ color: "#01696f" }} />
                  </div>
                  <div>
                    <h3 className="font-black text-sm mb-1" style={{ color: "#1c1917" }}>{item.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#9c9590" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-5 rounded-xl text-xs leading-relaxed"
              style={{ backgroundColor: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.10)", color: "#6b6560" }}>
              We respond to qualified researchers and institutions only. All orders and inquiries are
              subject to verification of research-only purpose.
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "linear-gradient(135deg, rgba(1,105,111,0.12), rgba(139,92,246,0.08))" }}>
                  <CheckCircle className="w-8 h-8" style={{ color: "#01696f" }} />
                </div>
                <h2 className="text-2xl font-black mb-2" style={{ color: "#1c1917" }}>Message Received</h2>
                <p className="text-sm" style={{ color: "#9c9590" }}>
                  Thank you for reaching out. Our team will review your inquiry and respond to qualified researchers promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#9c9590" }}>
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ backgroundColor: "rgba(255,255,255,0.85)", border: "1px solid rgba(28,25,23,0.12)", color: "#1c1917" }}
                      placeholder="Dr. Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#9c9590" }}>
                      Institution / Organization *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.institution}
                      onChange={e => setForm(f => ({ ...f, institution: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ backgroundColor: "rgba(255,255,255,0.85)", border: "1px solid rgba(28,25,23,0.12)", color: "#1c1917" }}
                      placeholder="University Research Lab"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#9c9590" }}>
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ backgroundColor: "rgba(255,255,255,0.85)", border: "1px solid rgba(28,25,23,0.12)", color: "#1c1917" }}
                    placeholder="researcher@institution.edu"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#9c9590" }}>
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ backgroundColor: "rgba(255,255,255,0.85)", border: "1px solid rgba(28,25,23,0.12)", color: "#1c1917" }}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="bulk">Bulk / Lab Quote Request</option>
                    <option value="documentation">Documentation Request</option>
                    <option value="order">Order Question</option>
                    <option value="availability">Availability / Backorder</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#9c9590" }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                    style={{ backgroundColor: "rgba(255,255,255,0.85)", border: "1px solid rgba(28,25,23,0.12)", color: "#1c1917" }}
                    placeholder="Please describe your research needs, the compounds you are interested in, and any specific questions..."
                  />
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.10)" }}>
                  <input
                    type="checkbox"
                    id="contact-confirm"
                    required
                    checked={form.confirm}
                    onChange={e => setForm(f => ({ ...f, confirm: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded shrink-0 cursor-pointer"
                    style={{ accentColor: "#01696f" }}
                  />
                  <label htmlFor="contact-confirm" className="text-xs leading-relaxed cursor-pointer"
                    style={{ color: "#6b6560" }}>
                    I confirm that I am a qualified researcher or acting on behalf of a qualified institution.
                    I understand that all products from Gills Bio Lab are sold strictly for laboratory research use only
                    and will not be used on humans or animals.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-sm font-bold transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff", boxShadow: "0 4px 20px rgba(1,105,111,0.25)" }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
