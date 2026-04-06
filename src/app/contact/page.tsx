"use client";
import { useState } from "react";
import { Mail, MessageSquare, CheckCircle, Phone, Clock } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", institution: "", email: "", subject: "general", message: "", confirm: false,
  });

  const inputStyle = {
    backgroundColor: "rgba(255,255,255,0.85)",
    border: "1px solid rgba(28,25,23,0.12)",
    color: "#1c1917",
  };

  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.target.style.borderColor = "rgba(1,105,111,0.40)";
    e.target.style.boxShadow = "0 0 0 3px rgba(1,105,111,0.06)";
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.target.style.borderColor = "rgba(28,25,23,0.12)";
    e.target.style.boxShadow = "none";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          institution: form.institution,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Send failed");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly at gillsbiolab@outlook.com.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>

      {/* Header */}
      <div className="relative overflow-hidden" style={{
        background: "linear-gradient(160deg, #f0ede8 0%, #ede9f5 60%, #e8f4f4 100%)",
        borderBottom: "1px solid rgba(28,25,23,0.08)",
      }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[20%] w-[360px] h-[260px]"
            style={{ background: "radial-gradient(circle, rgba(1,105,111,0.09) 0%, transparent 65%)", filter: "blur(32px)" }} />
          <div className="absolute bottom-0 left-[10%] w-[280px] h-[200px]"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)", filter: "blur(26px)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 text-center">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#01696f" }}>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#01696f" }} />
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-2 mb-4" style={{ color: "#1c1917", letterSpacing: "-0.03em" }}>
            Contact /{" "}
            <span style={{
              background: "linear-gradient(135deg, #01696f, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Request a Quote</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#6b6560" }}>
            Reach us for availability questions, bulk pricing, documentation requests, or general inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Sidebar */}
          <div className="space-y-4">
            {[
              {
                icon: Mail,
                title: "General Inquiries",
                desc: "Catalog, availability, account setup, or any general questions.",
                accent: "teal",
              },
              {
                icon: MessageSquare,
                title: "Bulk / Lab Quote",
                desc: "Request pricing for high-volume or recurring institutional orders.",
                accent: "orchid",
              },
              {
                icon: Clock,
                title: "Response Time",
                desc: "We typically respond within a few hours on business days.",
                accent: "teal",
              },
            ].map((item) => (
              <div key={item.title}
                className="glass-card p-5 rounded-2xl group cursor-default"
                style={{ transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = item.accent === "teal"
                    ? "0 12px 36px rgba(1,105,111,0.12), 0 0 0 1px rgba(1,105,111,0.18)"
                    : "0 12px 36px rgba(139,92,246,0.10), 0 0 0 1px rgba(139,92,246,0.18)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                    style={{
                      background: item.accent === "teal"
                        ? "linear-gradient(135deg, rgba(1,105,111,0.14), rgba(1,105,111,0.06))"
                        : "linear-gradient(135deg, rgba(139,92,246,0.14), rgba(139,92,246,0.06))",
                      boxShadow: item.accent === "teal"
                        ? "0 3px 12px rgba(1,105,111,0.12)"
                        : "0 3px 12px rgba(139,92,246,0.10)",
                    }}>
                    <item.icon className="w-4 h-4" style={{ color: item.accent === "teal" ? "#01696f" : "#7c3aed" }} />
                  </div>
                  <div>
                    <h3 className="font-black text-sm mb-1" style={{ color: "#1c1917" }}>{item.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#9c9590" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Direct email card */}
            <a href="mailto:gillsbiolab@outlook.com"
              className="block glass-card p-5 rounded-2xl group transition-all"
              style={{ transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(1,105,111,0.14), 0 0 0 1px rgba(1,105,111,0.22)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, #01696f, #018a92)", boxShadow: "0 3px 12px rgba(1,105,111,0.25)" }}>
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-sm mb-0.5" style={{ color: "#1c1917" }}>Email Direct</h3>
                  <p className="text-xs font-medium transition-colors group-hover:text-teal-700"
                    style={{ color: "#01696f" }}>gillsbiolab@outlook.com</p>
                </div>
              </div>
            </a>

            <div className="p-4 rounded-xl text-xs leading-relaxed"
              style={{ backgroundColor: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.10)", color: "#6b6560" }}>
              We respond to qualified researchers and institutions only. All inquiries are subject to
              verification of research-only purpose.
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 animate-pulse-ring"
                  style={{ background: "linear-gradient(135deg, rgba(1,105,111,0.12), rgba(139,92,246,0.08))", boxShadow: "0 4px 24px rgba(1,105,111,0.18)" }}>
                  <CheckCircle className="w-10 h-10" style={{ color: "#01696f" }} />
                </div>
                <h2 className="text-2xl font-black mb-3" style={{ color: "#1c1917" }}>Message Received</h2>
                <p className="text-sm max-w-xs" style={{ color: "#9c9590" }}>
                  Thank you for reaching out. Our team will review your inquiry and respond to qualified researchers promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#9c9590" }}>Full Name *</label>
                    <input required type="text" value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={inputStyle} placeholder="Dr. Jane Smith"
                      onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#9c9590" }}>Institution / Organization *</label>
                    <input required type="text" value={form.institution}
                      onChange={e => setForm(f => ({ ...f, institution: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={inputStyle} placeholder="University Research Lab"
                      onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#9c9590" }}>Email Address *</label>
                  <input required type="email" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle} placeholder="researcher@institution.edu"
                    onFocus={handleFocus} onBlur={handleBlur} />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#9c9590" }}>Subject</label>
                  <select value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={handleFocus} onBlur={handleBlur}>
                    <option value="general">General Inquiry</option>
                    <option value="bulk">Bulk / Lab Quote Request</option>
                    <option value="documentation">Documentation Request</option>
                    <option value="order">Order Question</option>
                    <option value="availability">Availability / Backorder</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#9c9590" }}>Message *</label>
                  <textarea required rows={5} value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                    style={inputStyle}
                    placeholder="Please describe your research needs, the compounds you are interested in, and any specific questions..."
                    onFocus={handleFocus} onBlur={handleBlur} />
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.10)" }}>
                  <input type="checkbox" id="contact-confirm" required
                    checked={form.confirm}
                    onChange={e => setForm(f => ({ ...f, confirm: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded shrink-0 cursor-pointer"
                    style={{ accentColor: "#01696f" }} />
                  <label htmlFor="contact-confirm" className="text-xs leading-relaxed cursor-pointer" style={{ color: "#6b6560" }}>
                    I confirm that I am a qualified researcher or acting on behalf of a qualified institution.
                    I understand that all products from Gills Bio Lab are sold strictly for laboratory research use only
                    and will not be used on humans or animals.
                  </label>
                </div>

                {error && (
                  <p className="text-xs p-3 rounded-xl"
                    style={{ backgroundColor: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)", color: "#b91c1c" }}>
                    {error}
                  </p>
                )}

                <button type="submit" disabled={sending}
                  className="btn-shimmer w-full py-4 rounded-xl text-sm font-bold transition-all hover:scale-[1.01] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #01696f, #018a92)",
                    color: "#ffffff",
                    boxShadow: "0 6px 24px rgba(1,105,111,0.28), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}>
                  {sending ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
