"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle, FlaskConical, AlertTriangle, Lock } from "lucide-react";
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

// State sales tax rates (combined state rate)
const STATE_TAX_RATES: Record<string, number> = {
  AL: 0.04, AK: 0.00, AZ: 0.056, AR: 0.065, CA: 0.0725,
  CO: 0.029, CT: 0.0635, DE: 0.00, FL: 0.06, GA: 0.04,
  HI: 0.04, ID: 0.06, IL: 0.0625, IN: 0.07, IA: 0.06,
  KS: 0.065, KY: 0.06, LA: 0.0445, ME: 0.055, MD: 0.06,
  MA: 0.0625, MI: 0.06, MN: 0.06875, MS: 0.07, MO: 0.04225,
  MT: 0.00, NE: 0.055, NV: 0.0685, NH: 0.00, NJ: 0.06625,
  NM: 0.05125, NY: 0.04, NC: 0.0475, ND: 0.05, OH: 0.0575,
  OK: 0.045, OR: 0.00, PA: 0.06, RI: 0.07, SC: 0.06,
  SD: 0.045, TN: 0.07, TX: 0.0625, UT: 0.0485, VT: 0.06,
  VA: 0.053, WA: 0.065, WV: 0.06, WI: 0.05, WY: 0.04,
  DC: 0.06,
};

const FEDERAL_TAX_RATE = 0.01; // 1% federal excise
const EXPRESS_SHIPPING_COST = 23.99;
const FREE_SHIPPING_THRESHOLD = 420;

const inputStyle = {
  backgroundColor: "rgba(255,255,255,0.85)",
  border: "1px solid rgba(28,25,23,0.12)",
  color: "#1c1917",
};

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>("info");
  const [placed, setPlaced] = useState(false);

  const [info, setInfo] = useState({ name: "", institution: "", role: "", email: "", phone: "" });
  const [shipping, setShipping] = useState({ address: "", city: "", state: "", zip: "", country: "US", method: "standard" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function isValidPhone(v: string) { return /^\+?[\d\s\-().]{7,15}$/.test(v.trim()); }
  function isValidAddress(v: string) { return /^\d+\s+\S/.test(v.trim()) && v.trim().length >= 6; }
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "cashapp">("cashapp");
  const [selectedCoin, setSelectedCoin] = useState<typeof CRYPTO_COINS[number]["id"]>("usdc");
  const [copied, setCopied] = useState(false);
  const [confirmResearch, setConfirmResearch] = useState(false);
  const [confirmTerms, setConfirmTerms] = useState(false);
  const [confirmWaiver, setConfirmWaiver] = useState(false);
  const [showWaiver, setShowWaiver] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [placeError, setPlaceError] = useState("");

  // Tax & shipping calculations
  const stateCode = shipping.state.trim().toUpperCase();
  const stateTaxRate = STATE_TAX_RATES[stateCode] ?? 0;
  const stateTax = total * stateTaxRate;
  const federalTax = total * FEDERAL_TAX_RATE;
  const totalTax = stateTax + federalTax;

  const STANDARD_SHIPPING_COST = 8.99;
  const shippingCost = total >= FREE_SHIPPING_THRESHOLD
    ? 0
    : shipping.method === "express"
      ? EXPRESS_SHIPPING_COST
      : STANDARD_SHIPPING_COST;

  const subtotalWithTax = total + totalTax + shippingCost;
  const isCrypto = paymentMethod === "crypto";
  const discountedTotal = isCrypto ? subtotalWithTax * 0.9 : subtotalWithTax;
  const savings = isCrypto ? subtotalWithTax * 0.1 : 0;
  const activeCoin = CRYPTO_COINS.find(c => c.id === selectedCoin)!;

  function copyAddress() {
    navigator.clipboard.writeText(activeCoin.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function stepIndex(s: Step) { return STEPS.findIndex(x => x.id === s); }

  async function placeOrder() {
    setPlacing(true);
    setPlaceError("");
    try {
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          info,
          shipping,
          paymentMethod,
          items: items.map(i => ({
            name: i.product.name,
            selectedQty: i.selectedQty,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
          })),
          subtotal: total,
          stateTax,
          federalTax,
          shippingCost,
          grandTotal: subtotalWithTax,
          discountedTotal,
          savings,
        }),
      });
    } catch {
      // Non-blocking — order still goes through even if email fails
    } finally {
      setPlacing(false);
    }
    clearCart();
    setPlaced(true);
  }

  if (placed) {
    return (
      <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}
        className="flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "linear-gradient(135deg, rgba(1,105,111,0.12), rgba(139,92,246,0.08))" }}>
            <CheckCircle className="w-10 h-10" style={{ color: "#01696f" }} />
          </div>
          <h1 className="text-2xl font-black mb-2" style={{ color: "#1c1917" }}>Order Submitted</h1>
          <p className="text-sm mb-2" style={{ color: "#9c9590" }}>
            Thank you for your research order. A confirmation will be sent to your email.
          </p>
          <p className="text-xs mb-8 p-3 rounded-xl"
            style={{ backgroundColor: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.10)", color: "#6b6560" }}>
            Your order may be subject to verification to ensure compliance with our research-only policy.
            We will contact you if additional information is required.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff", boxShadow: "0 4px 20px rgba(1,105,111,0.25)" }}
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }} className="flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-lg font-black mb-4" style={{ color: "#1c1917" }}>Your cart is empty.</p>
          <Link href="/catalog" className="text-sm font-medium" style={{ color: "#01696f" }}>Browse Catalog →</Link>
        </div>
      </div>
    );
  }

  const labelStyle = { color: "#9c9590" };

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-28">
        <h1 className="text-2xl font-black mb-8" style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>Secure Checkout</h1>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={{
                  backgroundColor: s.id === step ? "rgba(1,105,111,0.10)" : stepIndex(s.id) < stepIndex(step) ? "rgba(1,105,111,0.06)" : "rgba(255,255,255,0.72)",
                  border: `1px solid ${s.id === step ? "rgba(1,105,111,0.30)" : stepIndex(s.id) < stepIndex(step) ? "rgba(1,105,111,0.18)" : "rgba(28,25,23,0.10)"}`,
                  color: s.id === step ? "#01696f" : stepIndex(s.id) < stepIndex(step) ? "#01696f" : "#9c9590",
                }}>
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: s.id === step ? "#01696f" : stepIndex(s.id) < stepIndex(step) ? "#01696f" : "#d1cdc8" }}>
                  {stepIndex(s.id) < stepIndex(step) ? "✓" : i + 1}
                </span>
                {s.label}
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-6 h-px" style={{ backgroundColor: "rgba(28,25,23,0.10)" }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form area */}
          <div className="lg:col-span-2">
            {step === "info" && (
              <div className="space-y-4">
                <h2 className="text-lg font-black mb-2" style={{ color: "#1c1917" }}>Customer Information</h2>
                <p className="text-xs mb-4" style={{ color: "#9c9590" }}>Institution or lab name is required for all orders. Products are sold to qualified researchers and institutions only.</p>
                {[
                  { label: "Full Name *", key: "name", type: "text", placeholder: "Dr. Jane Smith" },
                  { label: "Institution / Lab Name *", key: "institution", type: "text", placeholder: "University Research Laboratory" },
                  { label: "Email Address *", key: "email", type: "email", placeholder: "researcher@institution.edu" },
                  { label: "Phone *", key: "phone", type: "tel", placeholder: "+1 (555) 000-0000" },
                ].map((f) => {
                  const val = info[f.key as keyof typeof info];
                  const showPhoneErr = f.key === "phone" && touched["phone"] && val && !isValidPhone(val);
                  return (
                    <div key={f.key}>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={labelStyle}>
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        value={val}
                        onChange={e => setInfo(i => ({ ...i, [f.key]: e.target.value }))}
                        onBlur={() => setTouched(t => ({ ...t, [f.key]: true }))}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ ...inputStyle, borderColor: showPhoneErr ? "rgba(220,38,38,0.50)" : undefined }}
                      />
                      {showPhoneErr && (
                        <p className="text-[11px] mt-1.5" style={{ color: "#dc2626" }}>
                          Please enter a valid phone number (e.g. +1 555 000-0000).
                        </p>
                      )}
                    </div>
                  );
                })}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={labelStyle}>
                    Researcher / Buyer Type *
                  </label>
                  <select
                    value={info.role}
                    onChange={e => setInfo(i => ({ ...i, role: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ ...inputStyle, color: info.role ? "#1c1917" : "#9c9590" }}
                  >
                    <option value="" disabled>Select your role...</option>
                    <option value="academic">Academic / University Researcher</option>
                    <option value="biotech">Biotech / Pharma Company</option>
                    <option value="cro">Contract Research Organization (CRO)</option>
                    <option value="hospital">Hospital / Medical Research Division</option>
                    <option value="government">Government / Regulatory Research</option>
                    <option value="independent">Independent Research Laboratory</option>
                    <option value="other">Other Qualified Research Entity</option>
                  </select>
                </div>

                <button
                  onClick={() => setStep("shipping")}
                  disabled={!info.name || !info.institution || !info.email || !info.role || !info.phone || !isValidPhone(info.phone)}
                  className="w-full py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                  style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff", boxShadow: "0 4px 20px rgba(1,105,111,0.25)" }}
                >
                  Continue to Shipping
                </button>
              </div>
            )}

            {step === "shipping" && (
              <div className="space-y-4">
                <h2 className="text-lg font-black mb-2" style={{ color: "#1c1917" }}>Shipping Details</h2>
                {[
                  { label: "Street Address *", key: "address", placeholder: "123 Research Drive" },
                  { label: "City *", key: "city", placeholder: "Boston" },
                  { label: "State / Province *", key: "state", placeholder: "MA" },
                  { label: "ZIP / Postal Code *", key: "zip", placeholder: "02101" },
                ].map((f) => {
                  const val = shipping[f.key as keyof typeof shipping] as string;
                  const showAddrErr = f.key === "address" && touched["address"] && val && !isValidAddress(val);
                  return (
                    <div key={f.key}>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={labelStyle}>
                        {f.label}
                      </label>
                      <input
                        type="text"
                        value={val}
                        onChange={e => setShipping(s => ({ ...s, [f.key]: e.target.value }))}
                        onBlur={() => setTouched(t => ({ ...t, [f.key]: true }))}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ ...inputStyle, borderColor: showAddrErr ? "rgba(220,38,38,0.50)" : undefined }}
                      />
                      {showAddrErr && (
                        <p className="text-[11px] mt-1.5" style={{ color: "#dc2626" }}>
                          Please enter a valid street address (e.g. 123 Research Drive).
                        </p>
                      )}
                    </div>
                  );
                })}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={labelStyle}>
                    Shipping Method
                  </label>
                  <div className="space-y-2">
                    {[
                      {
                        id: "standard",
                        label: "Standard Shipping",
                        est: "5-7 business days",
                        price: total >= FREE_SHIPPING_THRESHOLD ? "FREE" : "$8.99",
                        note: total >= FREE_SHIPPING_THRESHOLD ? "Free — order over $420" : "Free on orders over $420",
                      },
                      {
                        id: "express",
                        label: "Express Shipping",
                        est: "2-3 business days",
                        price: total >= FREE_SHIPPING_THRESHOLD ? "FREE" : `$${EXPRESS_SHIPPING_COST.toFixed(2)}`,
                        note: total >= FREE_SHIPPING_THRESHOLD ? "Free — order over $420" : "Free on orders over $420",
                      },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setShipping(s => ({ ...s, method: m.id }))}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm text-left transition-all"
                        style={{
                          backgroundColor: shipping.method === m.id ? "rgba(1,105,111,0.08)" : "rgba(255,255,255,0.85)",
                          border: `1px solid ${shipping.method === m.id ? "rgba(1,105,111,0.28)" : "rgba(28,25,23,0.10)"}`,
                          color: shipping.method === m.id ? "#01696f" : "#3d3833",
                        }}
                      >
                        <div>
                          <span className="font-semibold">{m.label}</span>
                          <span className="block text-xs mt-0.5" style={{ color: "#9c9590" }}>{m.est} · {m.note}</span>
                        </div>
                        <span className="text-sm font-bold shrink-0 ml-3"
                          style={{ color: m.price === "FREE" ? "#01696f" : "#1c1917" }}>
                          {m.price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep("info")}
                    className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all hover:bg-black/5"
                    style={{ border: "1px solid rgba(28,25,23,0.12)", color: "#3d3833" }}>
                    Back
                  </button>
                  <button
                    onClick={() => setStep("payment")}
                    disabled={!shipping.address || !isValidAddress(shipping.address) || !shipping.city || !shipping.zip}
                    className="flex-1 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105 disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff" }}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-4">
                <h2 className="text-lg font-black mb-2" style={{ color: "#1c1917" }}>Payment</h2>

                {/* Payment method selector */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "cashapp" as const, label: "Cash App", icon: "💚", desc: "$Cashtag" },
                    { id: "crypto" as const, label: "Crypto", icon: "₿", desc: "BTC, ETH, USDC — 10% off" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl text-center transition-all"
                      style={{
                        backgroundColor: paymentMethod === m.id ? "rgba(1,105,111,0.08)" : "rgba(255,255,255,0.85)",
                        border: `2px solid ${paymentMethod === m.id ? "rgba(1,105,111,0.40)" : "rgba(28,25,23,0.10)"}`,
                      }}
                    >
                      <span className="text-2xl">{m.icon}</span>
                      <span className="text-xs font-bold" style={{ color: "#1c1917" }}>{m.label}</span>
                      <span className="text-[10px]" style={{ color: "#9c9590" }}>{m.desc}</span>
                    </button>
                  ))}
                </div>

                {/* Cash App form */}
                {paymentMethod === "cashapp" && (
                  <div className="glass-card p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl">💚</span>
                      <span className="text-sm font-black" style={{ color: "#1c1917" }}>Cash App Payment</span>
                    </div>
                    <div className="flex items-center justify-center py-5 mb-4 rounded-xl"
                      style={{ backgroundColor: "rgba(0,214,50,0.05)", border: "1px solid rgba(0,214,50,0.12)" }}>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2"
                          style={{ background: "linear-gradient(135deg, #00d632, #00b01a)" }}>
                          <span className="text-3xl font-black text-white">$</span>
                        </div>
                        <p className="text-lg font-black" style={{ color: "#1c1917" }}>{CASHAPP_TAG}</p>
                        <p className="text-[10px] mt-1" style={{ color: "#9c9590" }}>Cash App Cashtag</p>
                        <p className="text-base font-bold mt-2" style={{ color: "#01696f" }}>${subtotalWithTax.toFixed(2)}</p>
                      </div>
                    </div>
                    <ol className="space-y-2 text-xs mb-4" style={{ color: "#6b6560" }}>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                          style={{ backgroundColor: "rgba(1,105,111,0.10)", color: "#01696f" }}>1</span>
                        Open Cash App and tap the <strong className="mx-1" style={{ color: "#1c1917" }}>$</strong> icon.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                          style={{ backgroundColor: "rgba(1,105,111,0.10)", color: "#01696f" }}>2</span>
                        Send <strong className="mx-1" style={{ color: "#1c1917" }}>${subtotalWithTax.toFixed(2)}</strong> to <strong className="mx-1" style={{ color: "#1c1917" }}>{CASHAPP_TAG}</strong>.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                          style={{ backgroundColor: "rgba(1,105,111,0.10)", color: "#01696f" }}>3</span>
                        Include your email address in the note so we can match your order.
                      </li>
                    </ol>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={labelStyle}>
                        Cash App Transaction ID <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <input type="text" placeholder="e.g. #ABC123XYZ" className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={inputStyle} />
                      <p className="text-[10px] mt-1.5" style={{ color: "#9c9590" }}>
                        Paste your transaction ID after sending. Order confirmed once payment is verified.
                      </p>
                    </div>
                  </div>
                )}

                {/* Crypto form */}
                {paymentMethod === "crypto" && (
                  <div className="glass-card p-5 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">₿</span>
                        <span className="text-sm font-black" style={{ color: "#1c1917" }}>Cryptocurrency Payment</span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: "rgba(1,105,111,0.10)", color: "#01696f", border: "1px solid rgba(1,105,111,0.25)" }}>
                        10% OFF applied
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl mb-4 text-sm"
                      style={{ backgroundColor: "rgba(1,105,111,0.05)", border: "1px solid rgba(1,105,111,0.14)" }}>
                      <div style={{ color: "#6b6560" }}>
                        <span>Original: </span><span className="line-through">${subtotalWithTax.toFixed(2)}</span>
                        <span className="mx-2">→</span>
                        <span className="text-xs" style={{ color: "#01696f" }}>Save ${savings.toFixed(2)}</span>
                      </div>
                      <span className="text-base font-black" style={{ color: "#01696f" }}>${discountedTotal.toFixed(2)}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {CRYPTO_COINS.map((coin) => (
                        <button key={coin.id}
                          onClick={() => setSelectedCoin(coin.id)}
                          className="py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1"
                          style={{
                            backgroundColor: selectedCoin === coin.id ? `${coin.color}18` : "rgba(255,255,255,0.85)",
                            border: `2px solid ${selectedCoin === coin.id ? coin.color : `${coin.color}30`}`,
                            color: coin.color,
                          }}>
                          <span className="text-base">{coin.id === "btc" ? "₿" : coin.id === "eth" ? "Ξ" : coin.id === "xrp" ? "✕" : "$"}</span>
                          {coin.symbol}
                        </button>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl mb-4"
                      style={{ backgroundColor: "rgba(28,25,23,0.03)", border: "1px solid rgba(28,25,23,0.08)" }}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#9c9590" }}>
                          {activeCoin.label} — {activeCoin.network}
                        </p>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                          style={{ backgroundColor: `${activeCoin.color}18`, color: activeCoin.color }}>
                          {activeCoin.symbol}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs break-all flex-1 font-mono" style={{ color: "#01696f" }}>
                          {activeCoin.address}
                        </code>
                        <button onClick={copyAddress}
                          className="px-2 py-1 rounded text-[10px] font-semibold shrink-0 transition-all hover:opacity-80"
                          style={{
                            backgroundColor: copied ? "rgba(34,197,94,0.10)" : "rgba(1,105,111,0.10)",
                            color: copied ? "#15803d" : "#01696f",
                            border: `1px solid ${copied ? "rgba(34,197,94,0.25)" : "rgba(1,105,111,0.25)"}`,
                          }}>
                          {copied ? "✓ Copied" : "Copy"}
                        </button>
                      </div>
                      <div className="mt-3 pt-3 flex items-center justify-between"
                        style={{ borderTop: "1px solid rgba(28,25,23,0.06)" }}>
                        <span className="text-[10px]" style={{ color: "#9c9590" }}>Amount due (10% discount applied)</span>
                        <span className="text-sm font-black" style={{ color: "#01696f" }}>${discountedTotal.toFixed(2)} USD</span>
                      </div>
                    </div>

                    <ol className="space-y-2 text-xs mb-4" style={{ color: "#6b6560" }}>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                          style={{ backgroundColor: "rgba(247,147,26,0.15)", color: "#f7931a" }}>1</span>
                        Send <strong style={{ color: "#1c1917" }}>${discountedTotal.toFixed(2)} USD</strong> worth of <strong style={{ color: "#1c1917" }}>{activeCoin.symbol}</strong> to the address above on <strong style={{ color: "#1c1917" }}>{activeCoin.network}</strong>.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                          style={{ backgroundColor: "rgba(247,147,26,0.15)", color: "#f7931a" }}>2</span>
                        After sending, paste your transaction hash below so we can verify on-chain.
                      </li>
                    </ol>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={labelStyle}>
                        Transaction Hash (TxID) <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <input type="text" placeholder="0x..." className="w-full px-4 py-3 rounded-xl text-sm outline-none font-mono"
                        style={inputStyle} />
                      <p className="text-[10px] mt-1.5" style={{ color: "#9c9590" }}>
                        Order processed once the transaction receives 1+ confirmation on-chain.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep("shipping")}
                    className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all hover:bg-black/5"
                    style={{ border: "1px solid rgba(28,25,23,0.12)", color: "#3d3833" }}>
                    Back
                  </button>
                  <button onClick={() => setStep("review")}
                    className="flex-1 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff" }}>
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === "review" && (
              <div className="space-y-5">
                <h2 className="text-lg font-black mb-2" style={{ color: "#1c1917" }}>Review & Confirm Order</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Customer", lines: [info.name, info.institution, info.email] },
                    { label: "Ship to", lines: [shipping.address, `${shipping.city}, ${shipping.state} ${shipping.zip}`] },
                    { label: "Payment", lines: [paymentMethod === "cashapp" ? `💚 Cash App (${CASHAPP_TAG})` : `₿ Crypto — ${activeCoin.symbol} (10% discount applied)`] },
                  ].map((box) => (
                    <div key={box.label} className="glass-card p-4 rounded-xl">
                      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#9c9590" }}>{box.label}</p>
                      {box.lines.map(l => <p key={l} className="text-sm" style={{ color: "#1c1917" }}>{l}</p>)}
                    </div>
                  ))}
                </div>

                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(28,25,23,0.06)" }}>
                    <p className="text-sm font-black" style={{ color: "#1c1917" }}>Order Items</p>
                  </div>
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.selectedQty}`}
                      className="flex items-center gap-3 px-4 py-3"
                      style={{ borderBottom: "1px solid rgba(28,25,23,0.04)" }}>
                      <FlaskConical className="w-5 h-5 shrink-0" style={{ color: "#01696f" }} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold" style={{ color: "#1c1917" }}>{item.product.name}</p>
                        <p className="text-xs" style={{ color: "#9c9590" }}>{item.selectedQty} × {item.quantity}</p>
                      </div>
                      <span className="font-bold text-sm" style={{ color: "#1c1917" }}>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  {/* Tax & shipping breakdown */}
                  <div className="px-4 py-3 space-y-2" style={{ borderTop: "1px solid rgba(28,25,23,0.06)", backgroundColor: "rgba(28,25,23,0.015)" }}>
                    <div className="flex justify-between text-xs" style={{ color: "#9c9590" }}>
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs" style={{ color: "#9c9590" }}>
                      <span>
                        State Tax {stateCode && STATE_TAX_RATES[stateCode] !== undefined
                          ? `(${stateCode} ${(stateTaxRate * 100).toFixed(2)}%)`
                          : "(enter state above)"}
                      </span>
                      <span>${stateTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs" style={{ color: "#9c9590" }}>
                      <span>Federal Excise (1%)</span>
                      <span>${federalTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs" style={{ color: "#9c9590" }}>
                      <span>Shipping ({shipping.method === "express" ? "Express" : "Standard"})</span>
                      <span style={{ color: shippingCost === 0 ? "#01696f" : "#1c1917" }}>
                        {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  <div className="px-4 py-3 flex items-center justify-between"
                    style={{ borderTop: "1px solid rgba(28,25,23,0.06)" }}>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm" style={{ color: "#1c1917" }}>Total</span>
                      {isCrypto && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(1,105,111,0.08)", color: "#01696f" }}>10% crypto discount</span>}
                    </div>
                    <div className="text-right">
                      {isCrypto && <div className="text-xs line-through font-normal" style={{ color: "#9c9590" }}>${subtotalWithTax.toFixed(2)}</div>}
                      <span className="font-black text-lg" style={{ color: "#01696f" }}>${discountedTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Legal checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ backgroundColor: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.10)" }}>
                    <input type="checkbox" id="confirm-research" checked={confirmResearch}
                      onChange={e => setConfirmResearch(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded cursor-pointer shrink-0" style={{ accentColor: "#01696f" }} />
                    <label htmlFor="confirm-research" className="text-xs leading-relaxed cursor-pointer" style={{ color: "#6b6560" }}>
                      <strong style={{ color: "#1c1917" }}>I confirm that I am a qualified researcher</strong> or acting on behalf of a qualified institution.
                      I understand that all products from Gills Bio Lab are sold strictly for laboratory research use only and
                      will <strong style={{ color: "#1c1917" }}>not be used on humans or animals.</strong>
                    </label>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ backgroundColor: "rgba(1,105,111,0.05)", border: "1px solid rgba(1,105,111,0.14)" }}>
                    <input type="checkbox" id="confirm-terms" checked={confirmTerms}
                      onChange={e => setConfirmTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded cursor-pointer shrink-0" style={{ accentColor: "#01696f" }} />
                    <label htmlFor="confirm-terms" className="text-xs leading-relaxed cursor-pointer" style={{ color: "#6b6560" }}>
                      I agree to the{" "}
                      <Link href="/legal/terms" className="underline" style={{ color: "#01696f" }}>Terms & Conditions</Link>
                      {" "}and{" "}
                      <Link href="/legal/research-use" className="underline" style={{ color: "#01696f" }}>Research Use Policy</Link>.
                    </label>
                  </div>

                  {/* Liability Waiver */}
                  <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(220,38,38,0.25)" }}>
                    <div className="flex items-center justify-between px-4 py-3"
                      style={{ backgroundColor: "rgba(220,38,38,0.06)" }}>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: "#dc2626" }} />
                        <span className="text-xs font-black" style={{ color: "#1c1917" }}>Research Use Only — Liability Waiver</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-bold"
                          style={{ backgroundColor: "rgba(220,38,38,0.12)", color: "#dc2626" }}>REQUIRED</span>
                      </div>
                      <button
                        onClick={() => setShowWaiver(v => !v)}
                        className="text-[10px] font-semibold transition-colors"
                        style={{ color: "#9c9590" }}>
                        {showWaiver ? "Hide ▲" : "Read full waiver ▼"}
                      </button>
                    </div>

                    {showWaiver && (
                      <div className="px-4 py-4 text-[11px] leading-relaxed space-y-3"
                        style={{ backgroundColor: "var(--bg-base)", color: "#6b6560", borderTop: "1px solid rgba(220,38,38,0.12)" }}>
                        <p><strong style={{ color: "#1c1917" }}>By checking this box and completing this purchase, I confirm and agree to the following:</strong></p>
                        {[
                          ["Research use only.", "I understand that all products supplied by Gills Bio Lab are sold strictly for laboratory research purposes only. They are not intended for human or veterinary use, ingestion, injection, diagnostic use, treatment, cure, or prevention of any disease."],
                          ["No medical or consumer use.", "I will not use, or allow others to use, any product from Gills Bio Lab as a drug, food, cosmetic, dietary supplement, or any other form of medical or consumer product, and I will not repackage or resell these products for such uses."],
                          ["Qualified purchaser.", "I represent that I am a qualified researcher, or I am purchasing on behalf of a qualified laboratory, institution, or business that is equipped and authorized to handle research chemicals and assumes full responsibility for their storage, handling, and use in accordance with all applicable laws, regulations, and safety standards."],
                          ["Assumption of risk.", "I understand that research chemicals and peptides may pose unknown hazards and risks. I voluntarily assume all risks associated with the possession, handling, storage, and use of these products in my research activities."],
                          ["Release of liability.", "To the fullest extent permitted by law, I release and discharge Gills Bio Lab, its owners, employees, and affiliates from any and all claims, damages, losses, or liabilities arising from or related to the use, misuse, handling, storage, or disposal of any products purchased, whether by me or by any third party to whom I provide access."],
                          ["Indemnification.", "I agree to indemnify and hold harmless Gills Bio Lab, its owners, employees, and affiliates from any claims, demands, actions, damages, costs, or expenses (including reasonable attorneys\u2019 fees) arising out of or related to my purchase, possession, use, misuse, or distribution of these products, or my violation of this agreement or any applicable law."],
                          ["No guarantees or warranties.", "I understand that all products are provided \u201cas is\u201d for research use only, without any express or implied warranties, including, without limitation, any warranty of safety, merchantability, fitness for a particular purpose, or non\u2011infringement."],
                          ["Compliance with laws.", "I am solely responsible for ensuring that my purchase, import, possession, and use of these products complies with all applicable local, state, and federal laws and regulations in my jurisdiction."],
                        ].map(([title, body]) => (
                          <div key={title}>
                            <p className="font-bold mb-0.5" style={{ color: "#1c1917" }}>{title}</p>
                            <p>{body}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-start gap-3 px-4 py-3"
                      style={{ backgroundColor: "rgba(220,38,38,0.04)", borderTop: "1px solid rgba(220,38,38,0.12)" }}>
                      <input type="checkbox" id="confirm-waiver" checked={confirmWaiver}
                        onChange={e => setConfirmWaiver(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded cursor-pointer shrink-0" style={{ accentColor: "#dc2626" }} />
                      <label htmlFor="confirm-waiver" className="text-xs leading-relaxed cursor-pointer" style={{ color: "#6b6560" }}>
                        I have read, understood, and agree to the Gills Bio Lab <strong style={{ color: "#1c1917" }}>&quot;Research Use Only&quot; Acknowledgment &amp; Liability Waiver</strong>. I confirm that I am purchasing strictly for laboratory research use and that Gills Bio Lab is not responsible for any misuse of these products.
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs" style={{ color: "#9c9590" }}>
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: "#d97706" }} />
                  Orders may be subject to verification to ensure compliance with research-only policy.
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep("payment")}
                    className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all hover:bg-black/5"
                    style={{ border: "1px solid rgba(28,25,23,0.12)", color: "#3d3833" }}>
                    Back
                  </button>
                  {placeError && (
                    <p className="text-xs p-3 rounded-xl" style={{ backgroundColor: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)", color: "#b91c1c" }}>
                      {placeError}
                    </p>
                  )}
                  <button
                    onClick={placeOrder}
                    disabled={!confirmResearch || !confirmTerms || !confirmWaiver || placing}
                    className="flex-1 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff", boxShadow: "0 4px 20px rgba(1,105,111,0.25)" }}
                  >
                    {placing ? "Placing Order…" : "Place Research Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div>
            <div className="glass-card rounded-2xl p-5 sticky top-24">
              <h3 className="font-black text-sm mb-4" style={{ color: "#1c1917" }}>Order Summary</h3>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedQty}`}
                    className="flex items-start gap-2 text-xs" style={{ color: "#9c9590" }}>
                    <FlaskConical className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#01696f" }} />
                    <span className="flex-1">{item.product.name} × {item.quantity}</span>
                    <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Tax + shipping breakdown in sidebar */}
              <div className="space-y-1.5 py-3" style={{ borderTop: "1px solid rgba(28,25,23,0.08)", borderBottom: "1px solid rgba(28,25,23,0.08)" }}>
                <div className="flex justify-between text-xs" style={{ color: "#9c9590" }}>
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs" style={{ color: "#9c9590" }}>
                  <span>
                    {stateCode && STATE_TAX_RATES[stateCode] !== undefined
                      ? `State Tax (${stateCode} ${(stateTaxRate * 100).toFixed(2)}%)`
                      : "State Tax"}
                  </span>
                  <span>
                    {stateCode && STATE_TAX_RATES[stateCode] !== undefined
                      ? `$${stateTax.toFixed(2)}`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between text-xs" style={{ color: "#9c9590" }}>
                  <span>Federal Excise (1%)</span>
                  <span>${federalTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs" style={{ color: "#9c9590" }}>
                  <span>Shipping</span>
                  <span style={{ color: shippingCost === 0 ? "#01696f" : "#9c9590" }}>
                    {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="pt-3">
                <div className="flex justify-between font-black text-sm">
                  <span style={{ color: "#1c1917" }}>Total</span>
                  <div className="text-right">
                    {isCrypto && <div className="text-xs line-through font-normal" style={{ color: "#9c9590" }}>${subtotalWithTax.toFixed(2)}</div>}
                    <span style={{ color: "#01696f" }}>${discountedTotal.toFixed(2)}</span>
                  </div>
                </div>
                {isCrypto && (
                  <p className="text-[10px] mt-1 text-right" style={{ color: "#01696f" }}>10% crypto discount saves you ${savings.toFixed(2)}</p>
                )}
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: "#9c9590" }}>
                <Lock className="w-3.5 h-3.5 shrink-0" style={{ color: "#01696f" }} />
                SSL encrypted checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
