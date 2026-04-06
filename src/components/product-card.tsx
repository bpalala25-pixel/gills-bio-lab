"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";
import VialImage, { getVialColors } from "@/components/vial-image";

interface Props { product: Product; }

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { accent } = getVialColors(product.category);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product, product.prices[0].qty, product.prices[0].price, 1);
    setAdded(true);
    setTimeout(() => { setAdded(false); router.push("/cart"); }, 800);
  }

  return (
    <div
      className="glass-card group relative flex flex-col rounded-2xl overflow-hidden"
      style={{ transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Image zone */}
      <div className="relative h-52 flex items-center justify-center overflow-hidden"
        style={{
          background: hovered
            ? "linear-gradient(160deg, #edf6f6 0%, #ede9f5 50%, #f0ede8 100%)"
            : "linear-gradient(160deg, #f7f5f2 0%, #ede9e3 100%)",
          transition: "background 0.4s ease",
        }}>

        {/* Iridescent shimmer overlay on hover */}
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: "radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.07) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(1,105,111,0.07) 0%, transparent 50%)",
          }} />

        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
            style={{ transition: "transform 0.5s ease", transform: hovered ? "scale(1.07)" : "scale(1)" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-28 h-44" style={{ transition: "transform 0.5s ease", transform: hovered ? "scale(1.05) translateY(-3px)" : "scale(1)" }}>
            <VialImage
              name={product.code}
              quantity={product.quantity}
              capColor={accent}
              labelColor={accent}
              className="w-full h-full"
            />
          </div>
        )}

        {/* Teal bottom glow on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none transition-opacity duration-400"
          style={{
            opacity: hovered ? 1 : 0,
            background: "linear-gradient(to top, rgba(1,105,111,0.06), transparent)",
          }} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.labFavorite && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ backgroundColor: "rgba(1,105,111,0.10)", color: "#01696f", border: "1px solid rgba(1,105,111,0.22)", backdropFilter: "blur(8px)" }}>
              <Star className="w-2.5 h-2.5" />
              Lab Favorite
            </span>
          )}
          {!product.inStock && (
            <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ backgroundColor: "rgba(220,38,38,0.08)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.18)", backdropFilter: "blur(8px)" }}>
              Backorder
            </span>
          )}
          {product.badge && product.inStock && (
            <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ backgroundColor: "rgba(139,92,246,0.10)", color: "#7c3aed", border: "1px solid rgba(139,92,246,0.20)", backdropFilter: "blur(8px)" }}>
              {product.badge}
            </span>
          )}
        </div>

        <span className="absolute top-3 right-3 z-10 text-[9px] font-semibold px-2 py-0.5 rounded-full tracking-wide"
          style={{ backgroundColor: "rgba(220,38,38,0.07)", color: "#b91c1c", border: "1px solid rgba(220,38,38,0.14)", backdropFilter: "blur(8px)" }}>
          RUO
        </span>
      </div>

      {/* Iridescent divider */}
      <div style={{ height: 1, background: hovered
        ? "linear-gradient(90deg, rgba(1,105,111,0.3), rgba(139,92,246,0.3), rgba(1,105,111,0.3))"
        : "linear-gradient(90deg, transparent, rgba(180,175,170,0.5), transparent)",
        transition: "background 0.4s ease" }} />

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-sm leading-tight transition-colors"
              style={{ color: hovered ? "#01696f" : "#1c1917" }}>
              {product.name}
            </h3>
            <span className="text-[9px] font-mono shrink-0 mt-0.5 px-1.5 py-0.5 rounded"
              style={{ backgroundColor: "rgba(28,25,23,0.06)", color: "#6b6560" }}>
              {product.code}
            </span>
          </div>
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#9c9590" }}>{product.tagline}</p>
        </div>

        <div className="space-y-1.5 mb-4 pb-4" style={{ borderBottom: "1px solid rgba(28,25,23,0.06)" }}>
          {[
            { label: "Quantity", value: product.quantity,  highlight: false },
            { label: "Form",     value: product.form,      highlight: false },
            { label: "Purity",   value: product.purity,    highlight: true  },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="flex items-center justify-between text-xs">
              <span style={{ color: "#9c9590" }}>{label}</span>
              <span className="font-medium" style={{ color: highlight ? "#01696f" : "#3d3833" }}>{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-xl font-black transition-colors" style={{ color: hovered ? "#01696f" : "#1c1917" }}>
              ${product.priceFrom.toFixed(2)}
            </span>
            <span className="text-xs" style={{ color: "#9c9590" }}>/ vial</span>
          </div>

          <div className="flex gap-2">
            <Link href={`/catalog/${product.slug}`}
              className="flex-1 flex items-center justify-center gap-1 text-center py-2 rounded-lg text-xs font-semibold transition-all"
              style={{
                border: "1px solid rgba(28,25,23,0.12)",
                color: hovered ? "#01696f" : "#3d3833",
                backgroundColor: hovered ? "rgba(1,105,111,0.05)" : "transparent",
              }}>
              View Specs
              <ArrowRight className="w-3 h-3" />
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="btn-shimmer flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: added
                  ? "linear-gradient(135deg,#047857,#065f46)"
                  : product.inStock
                    ? "linear-gradient(135deg,#01696f,#018a92)"
                    : "#d1cdc8",
                color: product.inStock ? "#ffffff" : "#9c9590",
                boxShadow: product.inStock && !added ? "0 3px 14px rgba(1,105,111,0.28)" : "none",
              }}>
              <ShoppingCart className="w-3.5 h-3.5" />
              {added ? "Added!" : product.inStock ? "Order" : "Backorder"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
