export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  tagline: string;
  description: string;
  quantity: string;
  form: string;
  purity: string;
  storage: string;
  handling: string;
  priceFrom: number;
  prices: { qty: string; price: number }[];
  inStock: boolean;
  featured: boolean;
  labFavorite?: boolean;
  badge?: string;
  slug: string;
  image?: string;
}

export const products: Product[] = [
  {
    id: "bpc-157",
    slug: "bpc-157",
    image: "/images/bpc-157.png",
    name: "BPC-157",
    code: "BPC-157",
    category: "Peptides",
    tagline: "Body Protection Compound for advanced laboratory research applications.",
    description:
      "BPC-157 is a synthetic pentadecapeptide research chemical composed of 15 amino acids, supplied by Gills Bio Lab strictly for laboratory applications. This compound is not approved for human or veterinary use and must not be used for diagnosis, treatment, or any form of therapeutic or cosmetic application. Produced with a focus on consistency and reliability, BPC-157 is suitable for in vitro, analytical, and other controlled research settings where peptide behavior, stability, and interaction are under investigation.",
    quantity: "10 mg / vial",
    form: "Lyophilized powder",
    purity: "≥ 99%",
    storage: "-20°C in a dry, dark location",
    handling: "Use appropriate personal protective equipment and follow institutional safety protocols.",
    priceFrom: 64,
    prices: [{ qty: "10 mg × 1", price: 64 }],
    inStock: true,
    featured: true,
    labFavorite: true,
  },
  {
    id: "selank",
    slug: "selank",
    image: "/images/selank.png",
    name: "Selank",
    code: "SEL",
    category: "Neuropeptides",
    tagline: "Anxiolytic heptapeptide research chemical for neuropeptide studies.",
    description:
      "Selank is a synthetic heptapeptide research chemical derived from tuftsin, supplied by Gills Bio Lab for laboratory use only. Suitable for in vitro and controlled neuropeptide research investigating GABAergic modulation and peptide–receptor interaction.",
    quantity: "10 mg / vial",
    form: "Lyophilized powder",
    purity: "≥ 98%",
    storage: "-20°C in a dry, dark location",
    handling: "Use appropriate personal protective equipment and follow institutional safety protocols.",
    priceFrom: 47,
    prices: [{ qty: "10 mg × 1", price: 47 }],
    inStock: true,
    featured: true,
  },
  {
    id: "ghk-cu-10",
    slug: "ghk-cu-10",
    image: "/images/ghk-cu.png",
    name: "GHK-Cu 10 mg",
    code: "GHK-10",
    category: "Peptides",
    tagline: "Copper-binding tripeptide research chemical for collagen synthesis pathway studies.",
    description:
      "GHK-Cu is a naturally occurring copper-binding tripeptide supplied by Gills Bio Lab as a research chemical for laboratory use only. Suitable for in vitro research into copper peptide biology, collagen synthesis signaling pathways, and related controlled laboratory investigations.",
    quantity: "10 mg / vial",
    form: "Lyophilized powder",
    purity: "≥ 98%",
    storage: "-20°C in a dry, dark location",
    handling: "Use appropriate personal protective equipment and follow institutional safety protocols.",
    priceFrom: 32,
    prices: [{ qty: "10 mg × 1", price: 32 }],
    inStock: true,
    featured: true,
    labFavorite: true,
  },
  {
    id: "ghk-cu-100",
    slug: "ghk-cu-100",
    image: "/images/ghk-cu.png",
    name: "GHK-Cu 100 mg",
    code: "GHK-100",
    category: "Peptides",
    tagline: "High-volume copper tripeptide research chemical vial for large-scale in vitro studies.",
    description:
      "GHK-Cu 100 mg is a bulk-quantity copper-binding tripeptide research chemical supplied by Gills Bio Lab for laboratory use only. Suitable for large-scale in vitro studies requiring significant quantities of this copper peptide compound.",
    quantity: "100 mg / vial",
    form: "Lyophilized powder",
    purity: "≥ 98%",
    storage: "-20°C in a dry, dark location",
    handling: "Use appropriate personal protective equipment and follow institutional safety protocols.",
    priceFrom: 169,
    prices: [{ qty: "100 mg × 1", price: 169 }],
    inStock: true,
    featured: false,
  },
  {
    id: "kpv",
    slug: "kpv",
    image: "/images/kpv.png",
    name: "KPV",
    code: "KPV",
    category: "Peptides",
    tagline: "Alpha-MSH-derived tripeptide research chemical for inflammation studies.",
    description:
      "KPV is a C-terminal tripeptide fragment of alpha-melanocyte-stimulating hormone supplied by Gills Bio Lab as a research chemical for laboratory use only. Suitable for in vitro research into melanocortin signaling, inflammatory pathway modulation, and peptide–receptor interactions.",
    quantity: "10 mg / vial",
    form: "Lyophilized powder",
    purity: "≥ 98%",
    storage: "-20°C in a dry, dark location",
    handling: "Use appropriate personal protective equipment and follow institutional safety protocols.",
    priceFrom: 47,
    prices: [{ qty: "10 mg × 1", price: 47 }],
    inStock: true,
    featured: true,
  },
  {
    id: "ss-31",
    slug: "ss-31",
    image: "/images/ss-31.png",
    name: "SS-31",
    code: "SS-31",
    category: "Mitochondrial Research",
    tagline: "Mitochondria-targeted tetrapeptide research chemical for membrane dynamics studies.",
    description:
      "SS-31 (Szeto-Schiller peptide 31) is a mitochondria-targeted tetrapeptide research chemical supplied by Gills Bio Lab for laboratory use only. Suitable for in vitro research into mitochondrial membrane dynamics, reactive oxygen species (ROS) pathway investigations, and cardiolipin-targeted peptide interactions.",
    quantity: "50 mg / vial",
    form: "Lyophilized powder",
    purity: "≥ 99%",
    storage: "-20°C in a dry, dark location",
    handling: "Use appropriate personal protective equipment and follow institutional safety protocols.",
    priceFrom: 149,
    prices: [{ qty: "50 mg × 1", price: 149 }],
    inStock: true,
    featured: true,
    badge: "New",
  },
  {
    id: "mots-c",
    slug: "mots-c",
    image: "/images/mots-c.png",
    name: "MOTS-C",
    code: "MOTS",
    category: "Mitochondrial Research",
    tagline: "Mitochondrial-derived peptide research chemical for metabolic studies.",
    description:
      "MOTS-C is a mitochondrial open reading frame peptide supplied by Gills Bio Lab as a research chemical for laboratory use only. Suitable for in vitro research into mitochondrial signaling, AMPK pathway activation, and metabolic regulation at the cellular level.",
    quantity: "10 mg / vial",
    form: "Lyophilized powder",
    purity: "≥ 99%",
    storage: "-20°C in a dry, dark location",
    handling: "Use appropriate personal protective equipment and follow institutional safety protocols.",
    priceFrom: 179,
    prices: [{ qty: "10 mg × 1", price: 179 }],
    inStock: true,
    featured: true,
    badge: "New",
  },
  {
    id: "nad-plus",
    slug: "nad-plus",
    image: "/images/nad-plus.png",
    name: "NAD+",
    code: "NAD+",
    category: "Metabolic / NAD",
    tagline: "Nicotinamide adenine dinucleotide research chemical for cellular energy studies.",
    description:
      "NAD+ (Nicotinamide Adenine Dinucleotide) is a vital coenzyme supplied by Gills Bio Lab as a research chemical for laboratory use only. Suitable for in vitro research into cellular energy metabolism, sirtuin activation, DNA repair pathways, and mitochondrial bioenergetics.",
    quantity: "500 mg / vial",
    form: "Lyophilized powder",
    purity: "≥ 98%",
    storage: "Store at 2-8°C (36-46°F)",
    handling: "Use appropriate personal protective equipment and follow institutional safety protocols.",
    priceFrom: 79,
    prices: [{ qty: "500 mg × 1", price: 79 }],
    inStock: true,
    featured: true,
    labFavorite: true,
    badge: "New",
  },
  {
    id: "glow-blend",
    slug: "glow-blend",
    image: "/images/glow-blend.png",
    name: "\"Glow\" Blend",
    code: "GLOW",
    category: "Blends",
    tagline: "BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg precision research blend.",
    description:
      "The Gills Bio Lab \"Glow\" Blend combines BPC-157 (10 mg), GHK-Cu (50 mg), and TB-500 (10 mg) in a single precision-blended vial. Supplied as a research chemical for laboratory use only. Suitable for in vitro studies examining the combined interaction profiles of these peptide and copper-tripeptide compounds in a controlled laboratory setting.",
    quantity: "70 mg total / vial",
    form: "Lyophilized powder",
    purity: "≥ 98%",
    storage: "-20°C in a dry, dark location",
    handling: "Use appropriate personal protective equipment and follow institutional safety protocols.",
    priceFrom: 169,
    prices: [{ qty: "70 mg × 1", price: 169 }],
    inStock: true,
    featured: true,
    labFavorite: true,
    badge: "New",
  },
  {
    id: "cjc-ipa-blend-5",
    slug: "cjc-ipa-blend-5",
    image: "/images/cjc-ipa.png",
    name: "CJC-1295 / Ipamorelin",
    code: "CJC+IPA",
    category: "Blends",
    tagline: "CJC-1295 No DAC 10 mg + Ipamorelin 10 mg synergistic research blend.",
    description:
      "A precision blend of CJC-1295 No DAC (10 mg) and Ipamorelin (10 mg) supplied by Gills Bio Lab as a research chemical for laboratory use only. Suitable for in vitro studies examining combined GHRH analogue and GH secretagogue receptor interactions in a single formulation.",
    quantity: "10 mg / 10 mg vial",
    form: "Lyophilized powder",
    purity: "≥ 98%",
    storage: "-20°C in a dry, dark location",
    handling: "Use appropriate personal protective equipment and follow institutional safety protocols.",
    priceFrom: 89,
    prices: [{ qty: "10 mg × 1", price: 89 }],
    inStock: true,
    featured: true,
    labFavorite: true,
  },
  {
    id: "retatrutide",
    slug: "retatrutide",
    image: "/images/retatrutide.png",
    name: "Retatrutide",
    code: "RET",
    category: "GLP-1 / Metabolic",
    tagline: "Triple GIP/GLP-1/glucagon receptor agonist research chemical.",
    description:
      "Retatrutide is a synthetic triple agonist targeting GIP, GLP-1, and glucagon receptors, supplied by Gills Bio Lab as a research chemical for laboratory use only. Suitable for in vitro research into multi-receptor incretin pharmacology and energy homeostasis pathways.",
    quantity: "30 mg / vial",
    form: "Lyophilized powder",
    purity: "≥ 99%",
    storage: "-20°C in a dry, dark location",
    handling: "Use appropriate personal protective equipment and follow institutional safety protocols.",
    priceFrom: 219,
    prices: [{ qty: "30 mg × 1", price: 219 }],
    inStock: true,
    featured: true,
    badge: "New",
  },
];

export const categories = [
  "All",
  "Peptides",
  "Neuropeptides",
  "Mitochondrial Research",
  "Metabolic / NAD",
  "GLP-1 / Metabolic",
  "Blends",
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
