import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";
import { CartProvider } from "@/lib/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gills Bio Lab – Peptide Research Chemicals",
  description:
    "Professional, lab-grade peptide research chemicals for serious laboratories and qualified research professionals. All products are for laboratory research use only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: "#f7f5f2", color: "#1c1917" }}>
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "GillsBioLab", "version": "1.0.0"}'
        />
        <CartProvider>
          <Navbar />

          {/* Free Shipping Banner — 36px, sits at top-16 */}
          <div className="fixed top-16 left-0 right-0 z-40 overflow-hidden"
            style={{
              background: "linear-gradient(90deg, #01696f 0%, #7c3aed 40%, #018a92 70%, #01696f 100%)",
              backgroundSize: "200% 100%",
              animation: "gradient-x 5s ease infinite",
              height: "36px",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
            }}>
            {/* Scrolling text track */}
            <div className="animate-shipping-scroll flex items-center h-full whitespace-nowrap">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="inline-flex items-center gap-3 px-8 animate-shipping-flash text-white font-bold text-xs tracking-widest uppercase">
                  <span style={{ opacity: 0.7 }}>✦</span>
                  Free Shipping on Orders Over $420
                  <span style={{ opacity: 0.7 }}>✦</span>
                  <span style={{ opacity: 0.5, fontWeight: 400 }}>|</span>
                </span>
              ))}
              {/* Duplicate for seamless loop */}
              {[...Array(6)].map((_, i) => (
                <span key={`b-${i}`} className="inline-flex items-center gap-3 px-8 animate-shipping-flash text-white font-bold text-xs tracking-widest uppercase">
                  <span style={{ opacity: 0.7 }}>✦</span>
                  Free Shipping on Orders Over $420
                  <span style={{ opacity: 0.7 }}>✦</span>
                  <span style={{ opacity: 0.5, fontWeight: 400 }}>|</span>
                </span>
              ))}
            </div>
          </div>

          {/* Site-wide RUO compliance bar — 24px, sits below shipping banner */}
          <div className="fixed left-0 right-0 z-40 text-center text-[11px] font-medium py-1.5 px-4"
            style={{ top: "100px", backgroundColor: "rgba(220,38,38,0.05)", borderBottom: "1px solid rgba(220,38,38,0.12)", color: "#9c9590" }}>
            <span style={{ color: "#b91c1c" }} className="font-semibold">Research Use Only</span>
            {" "}— All products are for qualified laboratory use only. Not for human or veterinary use.{" "}
            Not a drug, food, cosmetic, or dietary supplement.
          </div>

          {/* paddingTop: navbar 64 + shipping banner 36 + RUO bar 24 = 124px */}
          <main className="min-h-screen" style={{ paddingTop: "124px" }}>
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </CartProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
