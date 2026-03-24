"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minimize2, FlaskConical, ChevronRight } from "lucide-react";

interface Message {
  id: string;
  from: "user" | "agent";
  text: string;
  time: string;
}

const QUICK_REPLIES = [
  "What's your minimum order?",
  "Do you have CoAs available?",
  "How is shipping handled?",
  "Do you offer bulk pricing?",
  "What payment methods do you accept?",
];

const AUTO_RESPONSES: Record<string, string> = {
  "minimum order": "There's no minimum order requirement. You can order a single vial of any compound in our catalog. Bulk pricing tiers are available for multi-unit orders — check each product page for options.",
  "coa": "Yes — Certificate of Analysis (CoA) and lot-specific documentation are available upon request for all products. Please contact us with your order number or compound of interest and we'll get that to you.",
  "shipping": "We ship using insulated packaging with ice packs where appropriate to preserve compound integrity during transit. Orders are processed within 1–2 business days. US domestic shipping typically arrives within 3–5 business days.",
  "bulk": "Yes, bulk pricing is available on all products. Each product page shows tiered pricing for multi-vial orders. For larger custom quantities not listed, reach out via this chat or our contact page and we'll provide a quote.",
  "payment": "We accept major credit and debit cards, ACH/bank transfer, and select cryptocurrency payments. All transactions are processed securely.",
  "human": "Understood — I'll connect you with a team member. Our support hours are Monday–Friday, 9am–5pm EST. You can also email us at support@gillsbiolab.com and we typically respond within a few hours.",
  "storage": "All of our lyophilized peptides should be stored at -20°C in a dry, dark location. Upon reconstitution, peptides are generally stable for 4–6 weeks refrigerated. We include storage guidance on every product page.",
  "return": "If there's an issue with your order — damaged vials, wrong product, or a quality concern — please contact us within 7 days of delivery and we'll make it right. We do not accept returns of opened products for regulatory reasons.",
  "purity": "Purity specifications are listed on each product page (typically ≥98% or ≥99%). Lot-specific CoA data including HPLC and MS results are available on request.",
};

function getAutoResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(AUTO_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hi there! I'm here to help with questions about our peptide research chemicals, orders, shipping, or documentation. What can I help you with today?";
  }
  if (lower.includes("thank")) {
    return "You're welcome! Let us know if there's anything else we can help with.";
  }
  return "Thanks for your message. For specific technical, order, or compliance questions, our team can provide the most accurate answers. Email us at support@gillsbiolab.com or let me know what topic you're interested in and I'll do my best to help.";
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      from: "agent",
      text: "Hi! Welcome to Gills Bio Lab support. How can we help with your research today?",
      time: now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, open, minimized]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), from: "user", text: text.trim(), time: now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    const delay = 900 + Math.random() * 600;
    setTimeout(() => {
      const reply = getAutoResponse(text);
      setTyping(false);
      const agentMsg: Message = { id: (Date.now() + 1).toString(), from: "agent", text: reply, time: now() };
      setMessages((m) => [...m, agentMsg]);
      if (!open || minimized) setUnread((n) => n + 1);
    }, delay);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleOpen() {
    setOpen(true);
    setMinimized(false);
    setUnread(0);
  }

  return (
    <>
      {/* Floating button */}
      {(!open || minimized) && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #2dd4bf, #0891b2)",
            boxShadow: "0 0 24px rgba(45,212,191,0.45), 0 4px 16px rgba(0,0,0,0.5)",
          }}
          aria-label="Open support chat"
        >
          <MessageCircle className="w-6 h-6 text-[#0d1117]" />
          {unread > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
              style={{ backgroundColor: "#f85149" }}
            >
              {unread}
            </span>
          )}
        </button>
      )}

      {/* Chat panel */}
      {open && !minimized && (
        <div
          className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            width: "360px",
            height: "520px",
            backgroundColor: "#0d1117",
            border: "1px solid rgba(45,212,191,0.25)",
            boxShadow: "0 0 40px rgba(45,212,191,0.12), 0 20px 60px rgba(0,0,0,0.7)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{
              background: "linear-gradient(135deg, #161b22, #1c2333)",
              borderBottom: "1px solid rgba(45,212,191,0.15)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)" }}
              >
                <FlaskConical className="w-4 h-4 text-[#0d1117]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-tight">Gills Bio Lab Support</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px]" style={{ color: "#8b949e" }}>Online · Typically replies fast</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized(true)}
                className="p-1.5 rounded-lg hover:bg-white/8 transition-colors"
                aria-label="Minimize"
              >
                <Minimize2 className="w-4 h-4" style={{ color: "#8b949e" }} />
              </button>
              <button
                onClick={() => { setOpen(false); setMinimized(false); }}
                className="p-1.5 rounded-lg hover:bg-white/8 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" style={{ color: "#8b949e" }} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ scrollbarWidth: "thin", scrollbarColor: "#30363d transparent" }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {msg.from === "agent" && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mr-2 mt-0.5"
                    style={{ background: "linear-gradient(135deg, #2dd4bf40, #0891b240)", border: "1px solid #2dd4bf30" }}
                  >
                    <FlaskConical className="w-3 h-3" style={{ color: "#2dd4bf" }} />
                  </div>
                )}
                <div className="max-w-[78%]">
                  <div
                    className="px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.from === "user"
                        ? { background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117", borderBottomRightRadius: "4px" }
                        : { backgroundColor: "#161b22", color: "#c9d1d9", border: "1px solid rgba(255,255,255,0.07)", borderBottomLeftRadius: "4px" }
                    }
                  >
                    {msg.text}
                  </div>
                  <p className={`text-[10px] mt-1 ${msg.from === "user" ? "text-right" : "text-left"}`} style={{ color: "#484f58" }}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mr-2 mt-0.5"
                  style={{ background: "linear-gradient(135deg, #2dd4bf40, #0891b240)", border: "1px solid #2dd4bf30" }}
                >
                  <FlaskConical className="w-3 h-3" style={{ color: "#2dd4bf" }} />
                </div>
                <div
                  className="px-4 py-3 rounded-2xl"
                  style={{ backgroundColor: "#161b22", border: "1px solid rgba(255,255,255,0.07)", borderBottomLeftRadius: "4px" }}
                >
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: "#2dd4bf",
                          animation: "bounce 1.2s ease-in-out infinite",
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && !typing && (
            <div
              className="px-4 py-3 shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#484f58" }}>
                Common Questions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => sendMessage(qr)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all hover:border-[#2dd4bf]/50 hover:text-[#2dd4bf]"
                    style={{
                      backgroundColor: "#161b22",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#8b949e",
                    }}
                  >
                    {qr}
                    <ChevronRight className="w-2.5 h-2.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="px-4 py-3 shrink-0 flex items-center gap-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)", backgroundColor: "#0d1117" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#161b22",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#e8edf2",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(45,212,191,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)" }}
            >
              <Send className="w-4 h-4 text-[#0d1117]" />
            </button>
          </form>

          {/* Footer note */}
          <div
            className="px-4 py-2 text-center shrink-0"
            style={{ backgroundColor: "#0a0d12", borderTop: "1px solid rgba(255,255,255,0.04)" }}
          >
            <p className="text-[10px]" style={{ color: "#484f58" }}>
              For urgent matters email{" "}
              <a href="mailto:support@gillsbiolab.com" className="underline hover:text-[#2dd4bf] transition-colors">
                support@gillsbiolab.com
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
