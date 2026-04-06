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
          {/* Site-wide RUO compliance bar */}
          <div className="fixed top-16 left-0 right-0 z-40 text-center text-[11px] font-medium py-1.5 px-4"
            style={{ backgroundColor: "rgba(220,38,38,0.05)", borderBottom: "1px solid rgba(220,38,38,0.12)", color: "#9c9590" }}>
            <span style={{ color: "#b91c1c" }} className="font-semibold">Research Use Only</span>
            {" "}— All products are for qualified laboratory use only. Not for human or veterinary use.{" "}
            Not a drug, food, cosmetic, or dietary supplement.
          </div>
          <main className="min-h-screen" style={{ paddingTop: "88px" }}>
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
