"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";
import VialImage, { getVialColors } from "@/components/vial-image";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product, product.prices[0].qty, product.prices[0].price, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      router.push("/cart");
    }, 800);
  }

  const { cap, accent } = getVialColors(product.category);

  return (
    <div className="group relative flex flex-col rounded-xl border border-white/8 overflow-hidden transition-all duration-300 hover:border-[#2dd4bf]/30 hover:shadow-lg hover:shadow-[#2dd4bf]/5"
      style={{ backgroundColor: "#161b22" }}>
      {/* Top image area */}
      <div className="relative h-48 flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1c2333, #0d1117)" }}>

        {product.image ? (
          <div className="relative w-full h-full flex items-center justify-center py-2">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        ) : (
          <div className="w-28 h-44 transition-transform duration-500 group-hover:scale-105">
            <VialImage
              name={product.code}
              quantity={product.quantity}
              capColor={cap}
              labelColor={accent}
              className="w-full h-full"
            />
          </div>
        )}

        {/* Subtle glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 50%, #2dd4bf08, transparent 70%)" }} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.labFavorite && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ backgroundColor: "#2dd4bf20", color: "#2dd4bf", border: "1px solid #2dd4bf30" }}>
              <Star className="w-2.5 h-2.5" />
              Lab Favorite
            </span>
          )}
          {!product.inStock && (
            <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ backgroundColor: "#f8514920", color: "#f85149", border: "1px solid #f8514930" }}>
              Backorder
            </span>
          )}
          {product.badge && product.inStock && (
            <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ backgroundColor: "#e3b34120", color: "#e3b341", border: "1px solid #e3b34130" }}>
              {product.badge}
            </span>
          )}
        </div>

        <span className="absolute top-3 right-3 z-10 text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: "#f8514910", color: "#f85149", border: "1px solid #f8514920" }}>
          Research Only
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-white text-sm leading-tight group-hover:text-[#2dd4bf] transition-colors">
              {product.name}
            </h3>
            <span className="text-[10px] text-[#8b949e] font-mono shrink-0 mt-0.5">{product.code}</span>
          </div>
          <p className="text-xs text-[#8b949e] leading-relaxed line-clamp-2">{product.tagline}</p>
        </div>

        <div className="space-y-1 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8b949e]">Quantity</span>
            <span className="text-[#c9d1d9] font-medium">{product.quantity}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8b949e]">Form</span>
            <span className="text-[#c9d1d9]">{product.form}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8b949e]">Purity</span>
            <span style={{ color: "#2dd4bf" }} className="font-medium">{product.purity}</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-lg font-bold text-white">
              ${product.priceFrom.toFixed(2)}
            </span>
            <span className="text-xs text-[#8b949e]">/ vial</span>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/catalog/${product.slug}`}
              className="flex-1 text-center py-2 rounded-lg text-xs font-medium transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#c9d1d9" }}
            >
              View Lab Specs
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: added ? "#0d9488" : product.inStock ? "#2dd4bf" : "#333",
                color: product.inStock ? "#0d1117" : "#8b949e",
              }}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {added ? "Added!" : product.inStock ? "Add to Order" : "Backorder"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
