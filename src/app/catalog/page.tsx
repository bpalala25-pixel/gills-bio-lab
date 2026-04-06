"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/product-card";
import { products, categories } from "@/lib/products";

const forms = ["All", "Lyophilized powder", "Solution"];
const stockOptions = ["All", "In Stock", "Backorder"];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [form, setForm] = useState("All");
  const [stock, setStock] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.code.toLowerCase().includes(q)) return false;
      }
      if (category !== "All" && p.category !== category) return false;
      if (form !== "All" && p.form !== form) return false;
      if (stock === "In Stock" && !p.inStock) return false;
      if (stock === "Backorder" && p.inStock) return false;
      return true;
    });
  }, [search, category, form, stock]);

  const paged = filtered.slice(0, page * PER_PAGE);
  const hasMore = paged.length < filtered.length;

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setForm("All");
    setStock("All");
    setPage(1);
  }

  const activeFilterCount = [
    category !== "All",
    form !== "All",
    stock !== "All",
    search !== "",
  ].filter(Boolean).length;

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{
        background: "linear-gradient(160deg, #f0ede8 0%, #ede9f5 60%, #e8f4f4 100%)",
        borderBottom: "1px solid rgba(28,25,23,0.08)",
      }}>
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-[360px] h-[260px] pointer-events-none"
          style={{ background: "radial-gradient(circle at 80% 30%, rgba(139,92,246,0.09) 0%, transparent 60%)", filter: "blur(30px)" }} />
        <div className="absolute bottom-0 left-0 w-[280px] h-[200px] pointer-events-none"
          style={{ background: "radial-gradient(circle at 20% 80%, rgba(1,105,111,0.09) 0%, transparent 60%)", filter: "blur(24px)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#01696f" }}>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#01696f" }} />
            Research Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-2 mb-3"
            style={{ color: "#1c1917", letterSpacing: "-0.02em" }}>
            Peptide Research{" "}
            <span style={{
              background: "linear-gradient(135deg, #01696f, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Catalog</span>
          </h1>
          <p className="text-base max-w-2xl leading-relaxed" style={{ color: "#6b6560" }}>
            Explore our current lineup of peptide research chemicals, organized for quick navigation and fast ordering.
            All products are intended strictly for in vitro and laboratory research only.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="btn-shimmer px-4 py-2 rounded-xl text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, rgba(1,105,111,0.12), rgba(139,92,246,0.08))",
                border: "1px solid rgba(1,105,111,0.20)",
                color: "#01696f",
              }}>
              {products.length} compounds available
            </span>
            <span className="px-4 py-2 rounded-xl text-sm font-semibold"
              style={{
                backgroundColor: "rgba(255,255,255,0.72)",
                border: "1px solid rgba(28,25,23,0.10)",
                color: "#9c9590",
                backdropFilter: "blur(8px)",
              }}>
              ≥ 98% purity · Research Use Only
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Filter toggle */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9c9590" }} />
            <input
              type="text"
              placeholder="Search by name or code..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(28,25,23,0.12)",
                color: "#1c1917",
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4" style={{ color: "#9c9590" }} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{
              backgroundColor: showFilters ? "rgba(1,105,111,0.08)" : "rgba(255,255,255,0.85)",
              border: `1px solid ${showFilters ? "rgba(1,105,111,0.30)" : "rgba(28,25,23,0.12)"}`,
              color: showFilters ? "#01696f" : "#3d3833",
            }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ backgroundColor: "#01696f" }}>
                {activeFilterCount}
              </span>
            )}
          </button>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{ color: "#9c9590" }}
            >
              <X className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="glass-card mb-6 p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: "#9c9590" }}>
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCategory(c); setPage(1); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      backgroundColor: category === c ? "rgba(1,105,111,0.10)" : "rgba(28,25,23,0.04)",
                      border: `1px solid ${category === c ? "rgba(1,105,111,0.30)" : "rgba(28,25,23,0.10)"}`,
                      color: category === c ? "#01696f" : "#6b6560",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: "#9c9590" }}>
                Form
              </label>
              <div className="flex flex-wrap gap-2">
                {forms.map((f) => (
                  <button
                    key={f}
                    onClick={() => { setForm(f); setPage(1); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      backgroundColor: form === f ? "rgba(1,105,111,0.10)" : "rgba(28,25,23,0.04)",
                      border: `1px solid ${form === f ? "rgba(1,105,111,0.30)" : "rgba(28,25,23,0.10)"}`,
                      color: form === f ? "#01696f" : "#6b6560",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: "#9c9590" }}>
                Availability
              </label>
              <div className="flex flex-wrap gap-2">
                {stockOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setStock(s); setPage(1); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      backgroundColor: stock === s ? "rgba(1,105,111,0.10)" : "rgba(28,25,23,0.04)",
                      border: `1px solid ${stock === s ? "rgba(1,105,111,0.30)" : "rgba(28,25,23,0.10)"}`,
                      color: stock === s ? "#01696f" : "#6b6560",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                style={{ backgroundColor: "rgba(1,105,111,0.08)", color: "#01696f", border: "1px solid rgba(1,105,111,0.22)" }}>
                Search: {search}
                <button onClick={() => setSearch("")}><X className="w-3 h-3" /></button>
              </span>
            )}
            {category !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                style={{ backgroundColor: "rgba(139,92,246,0.08)", color: "#7c3aed", border: "1px solid rgba(139,92,246,0.20)" }}>
                {category}
                <button onClick={() => setCategory("All")}><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: "#9c9590" }}>
            Showing{" "}
            <span className="font-semibold" style={{ color: "#1c1917" }}>{paged.length}</span>
            {" "}of{" "}
            <span className="font-semibold" style={{ color: "#1c1917" }}>{filtered.length}</span>
            {" "}compounds
          </p>
          <p className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{ backgroundColor: "rgba(220,38,38,0.06)", color: "#b91c1c", border: "1px solid rgba(220,38,38,0.14)" }}>
            Research Use Only
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <FlaskIcon />
            <p className="text-lg font-black mt-4 mb-2" style={{ color: "#1c1917" }}>No compounds found</p>
            <p className="text-sm mb-6" style={{ color: "#9c9590" }}>Try adjusting your search or filters.</p>
            <button onClick={clearFilters}
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #01696f, #018a92)", color: "#ffffff" }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paged.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="px-8 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
                  style={{
                    border: "1px solid rgba(1,105,111,0.25)",
                    color: "#01696f",
                    backgroundColor: "rgba(1,105,111,0.05)",
                  }}
                >
                  Load More ({filtered.length - paged.length} remaining)
                </button>
              </div>
            )}
          </>
        )}

        {/* Disclaimer */}
        <div className="mt-16 p-6 rounded-2xl text-sm text-center"
          style={{ backgroundColor: "rgba(220,38,38,0.03)", border: "1px solid rgba(220,38,38,0.10)", color: "#6b6560" }}>
          All peptide products listed are intended strictly for in vitro and laboratory research.
          They are{" "}
          <strong style={{ color: "#1c1917" }}>not for human consumption, medical treatment, or veterinary use.</strong>
        </div>
      </div>
    </div>
  );
}

function FlaskIcon() {
  return (
    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
      style={{ backgroundColor: "rgba(1,105,111,0.08)" }}>
      <svg className="w-8 h-8" style={{ color: "#01696f" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 3h6m-6 0v6l-4 10a1 1 0 001 1.5h12a1 1 0 001-1.5L15 9V3M9 3H7m8 0h2" />
      </svg>
    </div>
  );
}
