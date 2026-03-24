"use client";
import { products, categories } from "@/lib/products";
import { useEffect } from "react";

const categoryOrder = [
  "GLP-1 / Metabolic",
  "Peptides",
  "Growth Factors",
  "Neuropeptides",
  "Blends",
  "Mitochondrial Research",
  "Metabolic / NAD",
  "Hormonal Research",
  "Reconstitution Supplies",
];

const categoryColors: Record<string, string> = {
  "GLP-1 / Metabolic":       "#6366f1",
  "Peptides":                 "#2dd4bf",
  "Growth Factors":           "#34d399",
  "Neuropeptides":            "#a78bfa",
  "Blends":                   "#f59e0b",
  "Mitochondrial Research":   "#f87171",
  "Metabolic / NAD":          "#38bdf8",
  "Hormonal Research":        "#fb923c",
  "Reconstitution Supplies":  "#94a3b8",
};

const categoryDescriptions: Record<string, string> = {
  "GLP-1 / Metabolic":       "Incretin receptor agonists for metabolic pathway research",
  "Peptides":                 "High-purity peptide research chemicals ≥ 98% purity",
  "Growth Factors":           "GHRH analogues, secretagogues & IGF-class compounds",
  "Neuropeptides":            "CNS-active peptides for receptor pharmacology studies",
  "Blends":                   "Precision multi-peptide formulations in single vials",
  "Mitochondrial Research":   "Mitochondria-targeted compounds for cellular studies",
  "Metabolic / NAD":          "Coenzyme & metabolic research chemicals",
  "Hormonal Research":        "Gonadotropin & hormonal research compounds",
  "Reconstitution Supplies":  "Laboratory-grade reconstitution solutions",
};

export default function CatalogPDFPage() {
  useEffect(() => {
    document.title = "Gills Bio Lab – Product Catalog 2026";
  }, []);

  const grouped = categoryOrder.reduce<Record<string, typeof products>>((acc, cat) => {
    const items = products.filter((p) => p.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  const totalProducts = products.length;

  return (
    <div className="catalog-pdf-root" style={{ fontFamily: "'Geist', 'Inter', sans-serif", backgroundColor: "#fff", color: "#0d1117" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #fff !important; }

        .catalog-pdf-root {
          max-width: 900px;
          margin: 0 auto;
          background: #fff;
        }

        /* ── Cover ── */
        .cover {
          min-height: 100vh;
          background: linear-gradient(160deg, #0d1117 0%, #161b22 60%, #0d1117 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 60px 64px;
          position: relative;
          overflow: hidden;
          page-break-after: always;
        }
        .cover-bg-glow {
          position: absolute;
          top: -120px; left: -120px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, #2dd4bf18 0%, transparent 70%);
          pointer-events: none;
        }
        .cover-bg-glow2 {
          position: absolute;
          bottom: -100px; right: -100px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, #6366f118 0%, transparent 70%);
          pointer-events: none;
        }
        .cover-logo {
          display: flex;
          align-items: center;
          gap: 14px;
          z-index: 1;
        }
        .cover-logo-mark {
          width: 48px; height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #2dd4bf, #0891b2);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
        }
        .cover-logo-text {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.3px;
        }
        .cover-logo-sub {
          font-size: 11px;
          color: #8b949e;
          margin-top: 2px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .cover-hero {
          z-index: 1;
          text-align: center;
          padding: 40px 0;
        }
        .cover-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #2dd4bf;
          border: 1px solid #2dd4bf40;
          background: #2dd4bf10;
          border-radius: 100px;
          padding: 6px 16px;
          margin-bottom: 28px;
        }
        .cover-title {
          font-size: 64px;
          font-weight: 900;
          line-height: 1.0;
          color: #fff;
          letter-spacing: -2px;
          margin-bottom: 6px;
        }
        .cover-title span {
          background: linear-gradient(135deg, #2dd4bf, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cover-subtitle {
          font-size: 18px;
          color: #8b949e;
          margin-top: 20px;
          font-weight: 400;
          line-height: 1.5;
        }
        .cover-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 44px;
        }
        .cover-stat {
          text-align: center;
        }
        .cover-stat-num {
          font-size: 32px;
          font-weight: 800;
          color: #fff;
        }
        .cover-stat-label {
          font-size: 11px;
          color: #8b949e;
          margin-top: 4px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .cover-divider {
          width: 1px;
          background: #30363d;
          height: 48px;
          align-self: center;
        }
        .cover-footer {
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .cover-footer-note {
          font-size: 10px;
          color: #6e7681;
          max-width: 340px;
          line-height: 1.5;
        }
        .cover-footer-date {
          font-size: 10px;
          color: #6e7681;
          text-align: right;
        }

        /* ── TOC ── */
        .toc-page {
          min-height: 100vh;
          background: #f8fafc;
          padding: 60px 64px;
          page-break-after: always;
        }
        .toc-header {
          margin-bottom: 40px;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 20px;
        }
        .toc-title {
          font-size: 28px;
          font-weight: 800;
          color: #0d1117;
          letter-spacing: -0.5px;
        }
        .toc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .toc-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          border-radius: 12px;
          background: #fff;
          border: 1px solid #e2e8f0;
        }
        .toc-dot {
          width: 12px; height: 12px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .toc-cat-name {
          font-size: 13px;
          font-weight: 600;
          color: #0d1117;
          flex: 1;
        }
        .toc-cat-desc {
          font-size: 10px;
          color: #64748b;
          margin-top: 2px;
        }
        .toc-count {
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          background: #f1f5f9;
          border-radius: 20px;
          padding: 2px 10px;
        }
        .toc-disclaimer {
          margin-top: 32px;
          padding: 20px 24px;
          background: #fff3cd;
          border: 1px solid #ffc10740;
          border-radius: 12px;
          font-size: 11px;
          color: #92400e;
          line-height: 1.6;
        }

        /* ── Section header ── */
        .section-header {
          padding: 40px 64px 28px;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 0;
          page-break-before: always;
        }
        .section-header:first-of-type {
          page-break-before: avoid;
        }
        .section-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .section-tag-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
        }
        .section-title {
          font-size: 30px;
          font-weight: 800;
          color: #0d1117;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }
        .section-desc {
          font-size: 13px;
          color: #64748b;
        }

        /* ── Product table ── */
        .product-table-wrap {
          padding: 0 64px 40px;
        }
        .product-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .product-table thead tr {
          background: #f8fafc;
          border-bottom: 2px solid #e2e8f0;
        }
        .product-table thead th {
          padding: 10px 14px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #64748b;
          text-align: left;
        }
        .product-table thead th:last-child {
          text-align: right;
        }
        .product-table tbody tr {
          border-bottom: 1px solid #f1f5f9;
          transition: background 0.15s;
        }
        .product-table tbody tr:last-child {
          border-bottom: none;
        }
        .product-table tbody tr:hover {
          background: #f8fafc;
        }
        .product-table td {
          padding: 14px;
          vertical-align: top;
        }
        .prod-name {
          font-size: 13px;
          font-weight: 700;
          color: #0d1117;
        }
        .prod-code {
          display: inline-block;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #94a3b8;
          font-family: monospace;
          background: #f1f5f9;
          border-radius: 4px;
          padding: 1px 6px;
          margin-top: 3px;
        }
        .prod-tagline {
          font-size: 11px;
          color: #64748b;
          margin-top: 4px;
          line-height: 1.4;
          max-width: 320px;
        }
        .prod-qty {
          font-size: 12px;
          color: #334155;
          font-weight: 500;
        }
        .prod-purity {
          font-size: 12px;
          font-weight: 600;
        }
        .prod-price {
          font-size: 16px;
          font-weight: 800;
          color: #0d1117;
          text-align: right;
        }
        .prod-price-sub {
          font-size: 10px;
          color: #94a3b8;
          text-align: right;
          margin-top: 2px;
        }
        .badge {
          display: inline-block;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 100px;
          margin-left: 6px;
          vertical-align: middle;
        }
        .badge-new { background: #dcfce7; color: #166534; }
        .badge-fav { background: #dbeafe; color: #1e40af; }

        /* ── Print button ── */
        .print-bar {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          gap: 12px;
          z-index: 9999;
        }
        .print-btn {
          padding: 12px 24px;
          border-radius: 12px;
          background: linear-gradient(135deg, #2dd4bf, #0891b2);
          color: #0d1117;
          font-weight: 700;
          font-size: 13px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(45,212,191,0.35);
        }
        .print-btn:hover { opacity: 0.9; }

        @media print {
          .print-bar { display: none !important; }
          .cover { min-height: 100vh; page-break-after: always; }
          .toc-page { page-break-after: always; }
          .section-header { page-break-before: always; }
          body { background: #fff !important; }
          @page { margin: 0; size: A4; }
        }
      `}</style>

      {/* Print Button */}
      <div className="print-bar">
        <button className="print-btn" onClick={() => window.print()}>
          ⬇ Download PDF
        </button>
      </div>

      {/* ── COVER PAGE ── */}
      <div className="cover">
        <div className="cover-bg-glow" />
        <div className="cover-bg-glow2" />

        <div className="cover-logo">
          <div className="cover-logo-mark">🧪</div>
          <div>
            <div className="cover-logo-text">Gills Bio Lab</div>
            <div className="cover-logo-sub">Research Chemicals</div>
          </div>
        </div>

        <div className="cover-hero">
          <div className="cover-tag">Research Chemical Catalog</div>
          <div className="cover-title">
            Peptide<br /><span>Research</span><br />Catalog
          </div>
          <div className="cover-subtitle">
            Lab-grade peptides, growth factors & metabolic research chemicals.<br />
            For qualified research professionals and institutions only.
          </div>

          <div className="cover-stats">
            <div className="cover-stat">
              <div className="cover-stat-num">{totalProducts}</div>
              <div className="cover-stat-label">Products</div>
            </div>
            <div className="cover-divider" />
            <div className="cover-stat">
              <div className="cover-stat-num">9</div>
              <div className="cover-stat-label">Categories</div>
            </div>
            <div className="cover-divider" />
            <div className="cover-stat">
              <div className="cover-stat-num">≥98%</div>
              <div className="cover-stat-label">Avg. Purity</div>
            </div>
            <div className="cover-divider" />
            <div className="cover-stat">
              <div className="cover-stat-num">2026</div>
              <div className="cover-stat-label">Edition</div>
            </div>
          </div>
        </div>

        <div className="cover-footer">
          <div className="cover-footer-note">
            All products are supplied strictly for laboratory and research purposes only.
            Not for human or veterinary use. Not for diagnosis, treatment, or therapeutic application.
            For use by qualified research professionals and licensed institutions.
          </div>
          <div className="cover-footer-date">
            <div style={{ color: "#8b949e", fontSize: "11px" }}>gillsbiolab.com</div>
            <div style={{ color: "#6e7681", fontSize: "10px", marginTop: "4px" }}>Edition March 2026</div>
          </div>
        </div>
      </div>

      {/* ── TABLE OF CONTENTS ── */}
      <div className="toc-page">
        <div className="toc-header">
          <div className="toc-title">Table of Contents</div>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "8px" }}>
            {totalProducts} research compounds across {categoryOrder.filter(c => grouped[c]).length} categories
          </p>
        </div>

        <div className="toc-grid">
          {categoryOrder.filter((c) => grouped[c]).map((cat) => (
            <div className="toc-item" key={cat}>
              <div className="toc-dot" style={{ backgroundColor: categoryColors[cat] }} />
              <div style={{ flex: 1 }}>
                <div className="toc-cat-name">{cat}</div>
                <div className="toc-cat-desc">{categoryDescriptions[cat]}</div>
              </div>
              <div className="toc-count">{grouped[cat].length}</div>
            </div>
          ))}
        </div>

        <div className="toc-disclaimer">
          <strong>⚠ Research Use Only Disclaimer:</strong> All products listed in this catalog are supplied exclusively for laboratory and research purposes. They are not approved by the FDA or any regulatory agency for human or veterinary use. These compounds must not be used for diagnosis, treatment, cure, or prevention of any disease or condition. Purchasers must be qualified research professionals or licensed institutions. Gills Bio Lab assumes no liability for misuse.
        </div>
      </div>

      {/* ── PRODUCT SECTIONS ── */}
      {categoryOrder.filter((cat) => grouped[cat]).map((cat) => {
        const color = categoryColors[cat];
        const items = grouped[cat];

        return (
          <div key={cat}>
            <div className="section-header" style={{ borderTop: `4px solid ${color}` }}>
              <div className="section-tag" style={{ color }}>
                <div className="section-tag-dot" style={{ backgroundColor: color }} />
                {cat}
              </div>
              <div className="section-title">{cat}</div>
              <div className="section-desc">{categoryDescriptions[cat]} · {items.length} product{items.length !== 1 ? "s" : ""}</div>
            </div>

            <div className="product-table-wrap">
              <table className="product-table">
                <thead>
                  <tr>
                    <th style={{ width: "42%" }}>Product</th>
                    <th style={{ width: "20%" }}>Vial Size</th>
                    <th style={{ width: "13%" }}>Purity</th>
                    <th style={{ width: "13%" }}>Form</th>
                    <th style={{ width: "12%" }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="prod-name">
                          {p.name}
                          {p.badge === "New" && <span className="badge badge-new">New</span>}
                          {p.labFavorite && <span className="badge badge-fav">★ Fav</span>}
                        </div>
                        <div className="prod-code">{p.code}</div>
                        <div className="prod-tagline">{p.tagline}</div>
                      </td>
                      <td>
                        <div className="prod-qty">{p.quantity}</div>
                      </td>
                      <td>
                        <div className="prod-purity" style={{ color }}>{p.purity}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>{p.form}</div>
                      </td>
                      <td>
                        <div className="prod-price">${p.priceFrom.toFixed(2)}</div>
                        <div className="prod-price-sub">per vial</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {/* ── BACK COVER ── */}
      <div className="cover" style={{ minHeight: "60vh", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div className="cover-bg-glow" />
        <div className="cover-logo" style={{ flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div className="cover-logo-mark" style={{ width: "64px", height: "64px", fontSize: "28px" }}>🧪</div>
          <div>
            <div className="cover-logo-text" style={{ fontSize: "24px" }}>Gills Bio Lab</div>
            <div className="cover-logo-sub">Research Chemicals · gillsbiolab.com</div>
          </div>
        </div>
        <div style={{ marginTop: "32px", color: "#8b949e", fontSize: "12px", maxWidth: "480px", lineHeight: "1.7" }}>
          All products are for laboratory research use only.<br />
          Not for human or veterinary use.<br />
          © 2026 Gills Bio Lab. All rights reserved.
        </div>
      </div>
    </div>
  );
}
