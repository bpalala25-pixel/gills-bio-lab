"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";
import VialImage, { getVialColors } from "@/components/vial-image";

interface Props { product: Product; }

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const { accent } = getVialColors(product.category);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product, product.prices[0].qty, product.prices[0].price, 1);
    setAdded(true);
    setTimeout(() => { setAdded(false); router.push("/cart"); }, 800);
  }

  return (
    <div className="glass-card group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">

      {/* Image zone */}
      <div className="relative h-52 flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, #f7f5f2 0%, #ede9e3 100%)" }}>

        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-106"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-28 h-44 transition-transform duration-500 group-hover:scale-105">
            <VialImage
              name={product.code}
              quantity={product.quantity}
              capColor={accent}
              labelColor={accent}
              className="w-full h-full"
            />
          </div>
        )}

        {/* Subtle hover sheen */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 30%, rgba(1,105,111,0.05), transparent 65%)" }} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.labFavorite && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ backgroundColor: "rgba(1,105,111,0.10)", color: "#01696f", border: "1px solid rgba(1,105,111,0.22)" }}>
              <Star className="w-2.5 h-2.5" />
              Lab Favorite
            </span>
          )}
          {!product.inStock && (
            <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ backgroundColor: "rgba(220,38,38,0.08)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.18)" }}>
              Backorder
            </span>
          )}
          {product.badge && product.inStock && (
            <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ backgroundColor: "rgba(139,92,246,0.10)", color: "#7c3aed", border: "1px solid rgba(139,92,246,0.20)" }}>
              {product.badge}
            </span>
          )}
        </div>

        <span className="absolute top-3 right-3 z-10 text-[9px] font-semibold px-2 py-0.5 rounded-full tracking-wide"
          style={{ backgroundColor: "rgba(220,38,38,0.07)", color: "#b91c1c", border: "1px solid rgba(220,38,38,0.14)" }}>
          Research Only
        </span>
      </div>

      {/* Silver divider */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(180,175,170,0.5), transparent)" }} />

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-sm leading-tight transition-colors"
              style={{ color: "#1c1917" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#01696f")}
              onMouseLeave={e => (e.currentTarget.style.color = "#1c1917")}>
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
            <span className="text-xl font-black" style={{ color: "#1c1917" }}>
              ${product.priceFrom.toFixed(2)}
            </span>
            <span className="text-xs" style={{ color: "#9c9590" }}>/ vial</span>
          </div>

          <div className="flex gap-2">
            <Link href={`/catalog/${product.slug}`}
              className="flex-1 text-center py-2 rounded-lg text-xs font-semibold transition-all hover:bg-black/5"
              style={{ border: "1px solid rgba(28,25,23,0.12)", color: "#3d3833" }}>
              View Specs
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: added
                  ? "linear-gradient(135deg,#047857,#065f46)"
                  : product.inStock
                    ? "linear-gradient(135deg,#01696f,#018a92)"
                    : "#d1cdc8",
                color: product.inStock ? "#ffffff" : "#9c9590",
                boxShadow: product.inStock && !added ? "0 2px 12px rgba(1,105,111,0.25)" : "none",
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
