"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle, ShieldCheck, Lock, FlaskConical, AlertTriangle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

type Step = "info" | "shipping" | "payment" | "review";
const STEPS: { id: Step; label: string }[] = [
  { id: "info", label: "Customer Info" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review & Confirm" },
];

const CRYPTO_COINS = [
  { id: "usdc", symbol: "USDC", label: "USD Coin", color: "#2775ca", address: "0xBb29172105b480c433928B9FC01627c467D4266B", network: "Base Network" },
  { id: "eth",  symbol: "ETH",  label: "Ethereum", color: "#627eea", address: "0x0848E9eD76F0859DA921e39312C96Cde47e3F36C", network: "Base Network" },
  { id: "xrp",  symbol: "XRP",  label: "XRP",      color: "#346aa9", address: "0x9211b593eA57a55641A057D57C0B95C93430d6c1", network: "Base Network" },
  { id: "btc",  symbol: "BTC",  label: "Bitcoin",  color: "#f7931a", address: "0x702c7Ea62f5bd424AD20CaE7289E8e1012151C15", network: "Base Network" },
] as const;

const CASHAPP_TAG = "$GillsResearch";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>("info");
  const [placed, setPlaced] = useState(false);

  const [info, setInfo] = useState({ name: "", institution: "", email: "", phone: "" });
  const [shipping, setShipping] = useState({ address: "", city: "", state: "", zip: "", country: "US", method: "standard" });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto" | "cashapp">("card");
  const [selectedCoin, setSelectedCoin] = useState<typeof CRYPTO_COINS[number]["id"]>("usdc");
  const [copied, setCopied] = useState(false);
  const [confirmResearch, setConfirmResearch] = useState(false);
  const [confirmTerms, setConfirmTerms] = useState(false);

  const isCrypto = paymentMethod === "crypto";
  const discountedTotal = isCrypto ? total * 0.9 : total;
  const savings = isCrypto ? total * 0.1 : 0;
  const activeCoin = CRYPTO_COINS.find(c => c.id === selectedCoin)!;

  function copyAddress() {
    navigator.clipboard.writeText(activeCoin.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function stepIndex(s: Step) { return STEPS.findIndex(x => x.id === s); }

  function placeOrder() {
    clearCart();
    setPlaced(true);
  }

  if (placed) {
    return (
      <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}
        className="flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "linear-gradient(135deg, #2dd4bf20, #0891b220)" }}>
            <CheckCircle className="w-10 h-10" style={{ color: "#2dd4bf" }} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Order Submitted</h1>
          <p className="text-sm mb-2" style={{ color: "#8b949e" }}>
            Thank you for your research order. A confirmation will be sent to your email.
          </p>
          <p className="text-xs mb-8 p-3 rounded-lg" style={{ backgroundColor: "#f8514908", border: "1px solid #f8514920", color: "#8b949e" }}>
            Your order may be subject to verification to ensure compliance with our research-only policy.
            We will contact you if additional information is required.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117" }}
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }} className="flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Your cart is empty.</p>
          <Link href="/catalog" className="text-sm" style={{ color: "#2dd4bf" }}>Browse Catalog →</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-white mb-8">Secure Checkout</h1>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 shrink-0">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all`}
                style={{
                  backgroundColor: s.id === step ? "#2dd4bf20" : stepIndex(s.id) < stepIndex(step) ? "#2dd4bf10" : "#161b22",
                  border: `1px solid ${s.id === step ? "#2dd4bf50" : stepIndex(s.id) < stepIndex(step) ? "#2dd4bf30" : "rgba(255,255,255,0.08)"}`,
                  color: s.id === step ? "#2dd4bf" : stepIndex(s.id) < stepIndex(step) ? "#2dd4bf80" : "#8b949e",
                }}>
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ backgroundColor: s.id === step ? "#2dd4bf" : "transparent", color: "#0d1117" }}>
                  {stepIndex(s.id) < stepIndex(step) ? "✓" : i + 1}
                </span>
                {s.label}
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-6 h-px" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form area */}
          <div className="lg:col-span-2">
            {step === "info" && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-white mb-2">Customer Information</h2>
                <p className="text-xs mb-4" style={{ color: "#8b949e" }}>Institution or lab name is required for all orders.</p>
                {[
                  { label: "Full Name *", key: "name", type: "text", placeholder: "Dr. Jane Smith" },
                  { label: "Institution / Lab Name *", key: "institution", type: "text", placeholder: "University Research Laboratory" },
                  { label: "Email Address *", key: "email", type: "email", placeholder: "researcher@institution.edu" },
                  { label: "Phone (optional)", key: "phone", type: "tel", placeholder: "+1 (555) 000-0000" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      value={info[f.key as keyof typeof info]}
                      onChange={e => setInfo(i => ({ ...i, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ backgroundColor: "#161b22", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }}
                    />
                  </div>
                ))}
                <button
                  onClick={() => setStep("shipping")}
                  disabled={!info.name || !info.institution || !info.email}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                  style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117" }}
                >
                  Continue to Shipping
                </button>
              </div>
            )}

            {step === "shipping" && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-white mb-2">Shipping Details</h2>
                {[
                  { label: "Street Address *", key: "address", placeholder: "123 Research Drive" },
                  { label: "City *", key: "city", placeholder: "Boston" },
                  { label: "State / Province *", key: "state", placeholder: "MA" },
                  { label: "ZIP / Postal Code *", key: "zip", placeholder: "02101" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
                      {f.label}
                    </label>
                    <input
                      type="text"
                      value={shipping[f.key as keyof typeof shipping]}
                      onChange={e => setShipping(s => ({ ...s, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ backgroundColor: "#161b22", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#8b949e" }}>
                    Shipping Method
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: "standard", label: "Standard Shipping", est: "5-7 business days", price: "Calculated at order" },
                      { id: "express", label: "Express Shipping", est: "2-3 business days", price: "Calculated at order" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setShipping(s => ({ ...s, method: m.id }))}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm text-left transition-all"
                        style={{
                          backgroundColor: shipping.method === m.id ? "#2dd4bf15" : "#161b22",
                          border: `1px solid ${shipping.method === m.id ? "#2dd4bf50" : "rgba(255,255,255,0.08)"}`,
                          color: shipping.method === m.id ? "#2dd4bf" : "#c9d1d9",
                        }}
                      >
                        <div>
                          <span className="font-medium">{m.label}</span>
                          <span className="block text-xs mt-0.5" style={{ color: "#8b949e" }}>{m.est}</span>
                        </div>
                        <span className="text-xs">{m.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep("info")}
                    className="flex-1 py-3.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#c9d1d9" }}>
                    Back
                  </button>
                  <button
                    onClick={() => setStep("payment")}
                    disabled={!shipping.address || !shipping.city || !shipping.zip}
                    className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117" }}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-white mb-2">Payment</h2>

                {/* Payment method selector */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "card" as const, label: "Credit Card", icon: "💳", desc: "Visa, MC, Amex" },
                    { id: "cashapp" as const, label: "Cash App", icon: "💚", desc: "$Cashtag" },
                    { id: "crypto" as const, label: "Crypto", icon: "₿", desc: "BTC, ETH, USDC" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl text-center transition-all"
                      style={{
                        backgroundColor: paymentMethod === m.id ? "#2dd4bf15" : "#161b22",
                        border: `2px solid ${paymentMethod === m.id ? "#2dd4bf" : "rgba(255,255,255,0.08)"}`,
                      }}
                    >
                      <span className="text-2xl">{m.icon}</span>
                      <span className="text-xs font-bold text-white">{m.label}</span>
                      <span className="text-[10px]" style={{ color: "#8b949e" }}>{m.desc}</span>
                    </button>
                  ))}
                </div>

                {/* Card form */}
                {paymentMethod === "card" && (
                  <div className="p-5 rounded-xl border border-white/8" style={{ backgroundColor: "#161b22" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="w-4 h-4" style={{ color: "#2dd4bf" }} />
                      <span className="text-sm font-medium text-white">Secure Card Payment</span>
                      <ShieldCheck className="w-4 h-4 ml-auto" style={{ color: "#2dd4bf" }} />
                    </div>
                    <p className="text-xs mb-4" style={{ color: "#8b949e" }}>
                      All transactions are encrypted. Card details are never stored on our servers.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>Card Number</label>
                        <input type="text" placeholder="•••• •••• •••• ••••" className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                          style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>Expiry</label>
                          <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                            style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>CVV</label>
                          <input type="text" placeholder="•••" className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                            style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cash App form */}
                {paymentMethod === "cashapp" && (
                  <div className="p-5 rounded-xl border border-white/8" style={{ backgroundColor: "#161b22" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl">💚</span>
                      <span className="text-sm font-medium text-white">Cash App Payment</span>
                    </div>
                    <div className="flex items-center justify-center py-5 mb-4 rounded-xl"
                      style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2"
                          style={{ background: "linear-gradient(135deg, #00d632, #00b01a)" }}>
                          <span className="text-3xl font-black text-white">$</span>
                        </div>
                        <p className="text-lg font-black text-white">{CASHAPP_TAG}</p>
                        <p className="text-[10px] mt-1" style={{ color: "#8b949e" }}>Cash App Cashtag</p>
                        <p className="text-base font-bold mt-2" style={{ color: "#2dd4bf" }}>${total.toFixed(2)}</p>
                      </div>
                    </div>
                    <ol className="space-y-2 text-xs mb-4" style={{ color: "#8b949e" }}>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                          style={{ backgroundColor: "#2dd4bf20", color: "#2dd4bf" }}>1</span>
                        Open Cash App and tap the <strong className="text-white mx-1">$</strong> icon.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                          style={{ backgroundColor: "#2dd4bf20", color: "#2dd4bf" }}>2</span>
                        Send <strong className="text-white mx-1">${total.toFixed(2)}</strong> to <strong className="text-white mx-1">{CASHAPP_TAG}</strong>.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                          style={{ backgroundColor: "#2dd4bf20", color: "#2dd4bf" }}>3</span>
                        Include your email address in the note so we can match your order.
                      </li>
                    </ol>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
                        Cash App Transaction ID <span style={{ color: "#f85149" }}>*</span>
                      </label>
                      <input type="text" placeholder="e.g. #ABC123XYZ" className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }} />
                      <p className="text-[10px] mt-1.5" style={{ color: "#8b949e" }}>
                        Paste your transaction ID after sending. Order confirmed once payment is verified.
                      </p>
                    </div>
                  </div>
                )}

                {/* Crypto form */}
                {paymentMethod === "crypto" && (
                  <div className="p-5 rounded-xl border border-white/8" style={{ backgroundColor: "#161b22" }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">₿</span>
                        <span className="text-sm font-medium text-white">Cryptocurrency Payment</span>
                      </div>
                      {/* 10% discount badge */}
                      <span className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: "linear-gradient(135deg, #2dd4bf20, #0891b220)", color: "#2dd4bf", border: "1px solid #2dd4bf40" }}>
                        10% OFF applied
                      </span>
                    </div>

                    {/* Discount summary */}
                    <div className="flex items-center justify-between p-3 rounded-xl mb-4 text-sm"
                      style={{ backgroundColor: "#2dd4bf08", border: "1px solid #2dd4bf20" }}>
                      <div style={{ color: "#8b949e" }}>
                        <span>Original: </span><span className="line-through">${total.toFixed(2)}</span>
                        <span className="mx-2">→</span>
                        <span className="text-xs" style={{ color: "#2dd4bf" }}>Save ${savings.toFixed(2)}</span>
                      </div>
                      <span className="text-base font-black" style={{ color: "#2dd4bf" }}>${discountedTotal.toFixed(2)}</span>
                    </div>

                    {/* Coin selector */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {CRYPTO_COINS.map((coin) => (
                        <button key={coin.id}
                          onClick={() => setSelectedCoin(coin.id)}
                          className="py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1"
                          style={{
                            backgroundColor: selectedCoin === coin.id ? `${coin.color}20` : "#0d1117",
                            border: `2px solid ${selectedCoin === coin.id ? coin.color : `${coin.color}30`}`,
                            color: coin.color,
                          }}>
                          <span className="text-base">{coin.id === "btc" ? "₿" : coin.id === "eth" ? "Ξ" : coin.id === "xrp" ? "✕" : "$"}</span>
                          {coin.symbol}
                        </button>
                      ))}
                    </div>

                    {/* Wallet address */}
                    <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#8b949e" }}>
                          {activeCoin.label} — {activeCoin.network}
                        </p>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                          style={{ backgroundColor: `${activeCoin.color}20`, color: activeCoin.color }}>
                          {activeCoin.symbol}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs break-all flex-1 font-mono" style={{ color: "#2dd4bf" }}>
                          {activeCoin.address}
                        </code>
                        <button onClick={copyAddress}
                          className="px-2 py-1 rounded text-[10px] font-semibold shrink-0 transition-all hover:opacity-80"
                          style={{ backgroundColor: copied ? "#16a34a20" : "#2dd4bf20", color: copied ? "#4ade80" : "#2dd4bf", border: `1px solid ${copied ? "#4ade8030" : "#2dd4bf30"}` }}>
                          {copied ? "✓ Copied" : "Copy"}
                        </button>
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px]" style={{ color: "#8b949e" }}>Amount due (10% discount applied)</span>
                        <span className="text-sm font-black" style={{ color: "#2dd4bf" }}>${discountedTotal.toFixed(2)} USD</span>
                      </div>
                    </div>

                    <ol className="space-y-2 text-xs mb-4" style={{ color: "#8b949e" }}>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                          style={{ backgroundColor: "#f7931a20", color: "#f7931a" }}>1</span>
                        Send <strong className="text-white">${discountedTotal.toFixed(2)} USD</strong> worth of <strong className="text-white">{activeCoin.symbol}</strong> to the address above on <strong className="text-white">{activeCoin.network}</strong>.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                          style={{ backgroundColor: "#f7931a20", color: "#f7931a" }}>2</span>
                        After sending, paste your transaction hash below so we can verify on-chain.
                      </li>
                    </ol>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
                        Transaction Hash (TxID) <span style={{ color: "#f85149" }}>*</span>
                      </label>
                      <input type="text" placeholder="0x..." className="w-full px-4 py-3 rounded-xl text-sm outline-none font-mono"
                        style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf2" }} />
                      <p className="text-[10px] mt-1.5" style={{ color: "#8b949e" }}>
                        Order processed once the transaction receives 1+ confirmation on-chain.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep("shipping")}
                    className="flex-1 py-3.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#c9d1d9" }}>
                    Back
                  </button>
                  <button onClick={() => setStep("review")}
                    className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117" }}>
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === "review" && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-white mb-2">Review & Confirm Order</h2>

                {/* Summary boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Customer", lines: [info.name, info.institution, info.email] },
                    { label: "Ship to", lines: [shipping.address, `${shipping.city}, ${shipping.state} ${shipping.zip}`] },
                    { label: "Payment", lines: [paymentMethod === "card" ? "💳 Credit Card" : paymentMethod === "cashapp" ? `💚 Cash App (${CASHAPP_TAG})` : `₿ Crypto — ${activeCoin.symbol} (10% discount applied)`] },
                  ].map((box) => (
                    <div key={box.label} className="p-4 rounded-xl border border-white/8" style={{ backgroundColor: "#161b22" }}>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#8b949e" }}>{box.label}</p>
                      {box.lines.map(l => <p key={l} className="text-sm text-white">{l}</p>)}
                    </div>
                  ))}
                </div>

                {/* Products */}
                <div className="rounded-xl border border-white/8 overflow-hidden" style={{ backgroundColor: "#161b22" }}>
                  <div className="px-4 py-3 border-b border-white/8">
                    <p className="text-sm font-semibold text-white">Order Items</p>
                  </div>
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.selectedQty}`}
                      className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0">
                      <FlaskConical className="w-5 h-5 shrink-0" style={{ color: "#2dd4bf" }} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{item.product.name}</p>
                        <p className="text-xs" style={{ color: "#8b949e" }}>{item.selectedQty} × {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-sm text-white">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="px-4 py-3 border-t border-white/8 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white">Total</span>
                      {isCrypto && <span className="ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#2dd4bf20", color: "#2dd4bf" }}>10% crypto discount</span>}
                    </div>
                    <div className="text-right">
                      {isCrypto && <div className="text-xs line-through" style={{ color: "#6e7681" }}>${total.toFixed(2)}</div>}
                      <span className="font-bold text-lg" style={{ color: "#2dd4bf" }}>${discountedTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Legal checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ backgroundColor: "#f8514908", border: "1px solid #f8514920" }}>
                    <input
                      type="checkbox"
                      id="confirm-research"
                      checked={confirmResearch}
                      onChange={e => setConfirmResearch(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded cursor-pointer shrink-0"
                      style={{ accentColor: "#2dd4bf" }}
                    />
                    <label htmlFor="confirm-research" className="text-xs leading-relaxed cursor-pointer" style={{ color: "#8b949e" }}>
                      <strong className="text-white">I confirm that I am a qualified researcher</strong> or acting on behalf of a qualified institution.
                      I understand that all products from Gills Bio Lab are sold strictly for laboratory research use only and
                      will <strong className="text-white">not be used on humans or animals.</strong>
                    </label>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ backgroundColor: "#2dd4bf08", border: "1px solid #2dd4bf20" }}>
                    <input
                      type="checkbox"
                      id="confirm-terms"
                      checked={confirmTerms}
                      onChange={e => setConfirmTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded cursor-pointer shrink-0"
                      style={{ accentColor: "#2dd4bf" }}
                    />
                    <label htmlFor="confirm-terms" className="text-xs leading-relaxed cursor-pointer" style={{ color: "#8b949e" }}>
                      I agree to the{" "}
                      <Link href="/legal/terms" className="underline" style={{ color: "#2dd4bf" }}>Terms & Conditions</Link>
                      {" "}and{" "}
                      <Link href="/legal/research-use" className="underline" style={{ color: "#2dd4bf" }}>Research Use Policy</Link>.
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs" style={{ color: "#8b949e" }}>
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: "#e3b341" }} />
                  Orders may be subject to verification to ensure compliance with research-only policy.
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep("payment")}
                    className="flex-1 py-3.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#c9d1d9" }}>
                    Back
                  </button>
                  <button
                    onClick={placeOrder}
                    disabled={!confirmResearch || !confirmTerms}
                    className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117", boxShadow: "0 0 15px rgba(45,212,191,0.2)" }}
                  >
                    Place Research Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div>
            <div className="rounded-xl border border-white/8 p-5 sticky top-24" style={{ backgroundColor: "#161b22" }}>
              <h3 className="font-bold text-white mb-4 text-sm">Order Summary</h3>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedQty}`}
                    className="flex items-start gap-2 text-xs" style={{ color: "#8b949e" }}>
                    <FlaskConical className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#2dd4bf" }} />
                    <span className="flex-1">{item.product.name} × {item.quantity}</span>
                    <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/8 pt-3">
                <div className="flex justify-between font-bold">
                  <span className="text-white text-sm">Total</span>
                  <div className="text-right">
                    {isCrypto && <div className="text-xs line-through font-normal" style={{ color: "#6e7681" }}>${total.toFixed(2)}</div>}
                    <span style={{ color: "#2dd4bf" }}>${discountedTotal.toFixed(2)}</span>
                  </div>
                </div>
                {isCrypto && (
                  <p className="text-[10px] mt-1 text-right" style={{ color: "#2dd4bf" }}>10% crypto discount saves you ${savings.toFixed(2)}</p>
                )}
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: "#8b949e" }}>
                <Lock className="w-3.5 h-3.5 shrink-0" style={{ color: "#2dd4bf" }} />
                SSL encrypted checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
