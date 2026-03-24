"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Download } from "lucide-react";
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
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#161b22", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#2dd4bf" }}>
            Research Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-3">
            Peptide Research Catalog
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "#8b949e" }}>
            Explore our current lineup of peptide research chemicals, organized for quick navigation and fast ordering.
            All products are intended strictly for in vitro and laboratory research only.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="/price-list.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117" }}
            >
              <Download className="w-4 h-4" />
              Download Full Price List
            </a>
            <span className="px-3 py-2 rounded-lg text-sm" style={{ color: "#8b949e", backgroundColor: "#1c2333" }}>
              {products.length} compounds available
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Filter toggle */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#8b949e" }} />
            <input
              type="text"
              placeholder="Search by name or code..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#161b22",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e8edf2",
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4" style={{ color: "#8b949e" }} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all"
            style={{
              backgroundColor: showFilters ? "#2dd4bf20" : "#161b22",
              border: `1px solid ${showFilters ? "#2dd4bf50" : "rgba(255,255,255,0.1)"}`,
              color: showFilters ? "#2dd4bf" : "#c9d1d9",
            }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                style={{ backgroundColor: "#2dd4bf", color: "#0d1117" }}>
                {activeFilterCount}
              </span>
            )}
          </button>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-all hover:text-white"
              style={{ color: "#8b949e" }}
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="mb-6 p-5 rounded-xl border border-white/8 grid grid-cols-1 sm:grid-cols-3 gap-6"
            style={{ backgroundColor: "#161b22" }}>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-3 block" style={{ color: "#8b949e" }}>
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCategory(c); setPage(1); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      backgroundColor: category === c ? "#2dd4bf20" : "#1c2333",
                      border: `1px solid ${category === c ? "#2dd4bf50" : "rgba(255,255,255,0.08)"}`,
                      color: category === c ? "#2dd4bf" : "#8b949e",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-3 block" style={{ color: "#8b949e" }}>
                Form
              </label>
              <div className="flex flex-wrap gap-2">
                {forms.map((f) => (
                  <button
                    key={f}
                    onClick={() => { setForm(f); setPage(1); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      backgroundColor: form === f ? "#2dd4bf20" : "#1c2333",
                      border: `1px solid ${form === f ? "#2dd4bf50" : "rgba(255,255,255,0.08)"}`,
                      color: form === f ? "#2dd4bf" : "#8b949e",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-3 block" style={{ color: "#8b949e" }}>
                Availability
              </label>
              <div className="flex flex-wrap gap-2">
                {stockOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setStock(s); setPage(1); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      backgroundColor: stock === s ? "#2dd4bf20" : "#1c2333",
                      border: `1px solid ${stock === s ? "#2dd4bf50" : "rgba(255,255,255,0.08)"}`,
                      color: stock === s ? "#2dd4bf" : "#8b949e",
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
                style={{ backgroundColor: "#2dd4bf15", color: "#2dd4bf", border: "1px solid #2dd4bf30" }}>
                Search: {search}
                <button onClick={() => setSearch("")}><X className="w-3 h-3" /></button>
              </span>
            )}
            {category !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                style={{ backgroundColor: "#2dd4bf15", color: "#2dd4bf", border: "1px solid #2dd4bf30" }}>
                {category}
                <button onClick={() => setCategory("All")}><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: "#8b949e" }}>
            Showing{" "}
            <span className="text-white font-medium">{paged.length}</span>
            {" "}of{" "}
            <span className="text-white font-medium">{filtered.length}</span>
            {" "}compounds
          </p>
          <p className="text-xs" style={{ color: "#f85149" }}>All products: Research Use Only</p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <FlaskConicalIcon />
            <p className="text-lg font-medium text-white mt-4 mb-2">No compounds found</p>
            <p className="text-sm mb-6" style={{ color: "#8b949e" }}>Try adjusting your search or filters.</p>
            <button onClick={clearFilters}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #2dd4bf, #0891b2)", color: "#0d1117" }}>
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
                  className="px-8 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{ border: "1px solid #2dd4bf40", color: "#2dd4bf" }}
                >
                  Load More ({filtered.length - paged.length} remaining)
                </button>
              </div>
            )}
          </>
        )}

        {/* Disclaimer */}
        <div className="mt-16 p-6 rounded-xl text-sm text-center"
          style={{ backgroundColor: "#f8514908", border: "1px solid #f8514920", color: "#8b949e" }}>
          All peptide products listed are intended strictly for in vitro and laboratory research.
          They are <strong className="text-white">not for human consumption, medical treatment, or veterinary use.</strong>
        </div>
      </div>
    </div>
  );
}

function FlaskConicalIcon() {
  return (
    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
      style={{ backgroundColor: "#2dd4bf15" }}>
      <svg className="w-8 h-8" style={{ color: "#2dd4bf" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 3h6m-6 0v6l-4 10a1 1 0 001 1.5h12a1 1 0 001-1.5L15 9V3M9 3H7m8 0h2" />
      </svg>
    </div>
  );
}
