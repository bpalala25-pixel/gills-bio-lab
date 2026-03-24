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
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #161b22, #0d1117)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#2dd4bf" }}>
            Contact
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2 mb-4">
            Contact / Request a Quote
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8b949e" }}>
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
              <div key={item.title} className="p-5 rounded-xl border border-white/8"
                style={{ backgroundColor: "#161b22" }}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #2dd4bf20, #0891b220)" }}>
                    <item.icon className="w-4 h-4" style={{ color: "#2dd4bf" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#8b949e" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-5 rounded-xl text-xs leading-relaxed"
              style={{ backgroundColor: "#f8514908", border: "1px solid #f8514920", color: "#8b949e" }}>
              We respond to qualified researchers and institutions only. All orders and inquiries are
              subject to verification of research-only purpose.
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "linear-gradient(135deg, #2dd4bf20, #0891b220)" }}>
                  <CheckCircle className="w-8 h-8" style={{ color: "#2dd4bf" }} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Message Received</h2>
                <p className="text-sm" style={{ color: "#8b949e" }}>
                  Thank you for reaching out. Our team will review your inquiry and respond to qualified researchers promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ backgroundColor: "#161b22", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }}
                      placeholder="Dr. Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
                      Institution / Organization *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.institution}
                      onChange={e => setForm(f => ({ ...f, institution: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ backgroundColor: "#161b22", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }}
                      placeholder="University Research Lab"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ backgroundColor: "#161b22", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }}
                    placeholder="researcher@institution.edu"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ backgroundColor: "#161b22", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }}
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
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                    style={{ backgroundColor: "#161b22", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }}
                    placeholder="Please describe your research needs, the compounds you are interested in, and any specific questions..."
                  />
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: "#f8514908", border: "1px solid #f8514920" }}>
                  <input
                    type="checkbox"
                    id="contact-confirm"
                    required
                    checked={form.confirm}
                    onChange={e => setForm(f => ({ ...f, confirm: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded shrink-0 cursor-pointer"
                    style={{ accentColor: "#2dd4bf" }}
                  />
                  <label htmlFor="contact-confirm" className="text-xs leading-relaxed cursor-pointer"
                    style={{ color: "#8b949e" }}>
                    I confirm that I am a qualified researcher or acting on behalf of a qualified institution.
                    I understand that all products from Gills Bio Lab are sold strictly for laboratory research use only
                    and will not be used on humans or animals.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117", boxShadow: "0 0 15px rgba(45,212,191,0.2)" }}
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
