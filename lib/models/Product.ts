import mongoose, { Schema, Model, Document } from "mongoose";

export interface IProduct {
  id: string;
  title: string;
  subtitle: string;
  sku: string;
  price: string;
  numericPrice: number;
  category: "SARMs" | "Peptides" | "Mass Builders" | "PCT & Recovery" | "Fat Burners";
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewsCount: number;
  image: string;
  desc: string;
  details?: string;
  createdAt?: Date;
}

export interface ProductDocument extends IProduct, Document {}

const ProductSchema: Schema = new Schema<ProductDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, index: true },
    subtitle: { type: String, required: true, default: "UNITED HORMONE" },
    sku: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    numericPrice: { type: Number, required: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ["SARMs", "Peptides", "Mass Builders", "PCT & Recovery", "Fat Burners"],
      index: true,
    },
    inStock: { type: Boolean, required: true, default: true, index: true },
    stockQuantity: { type: Number, required: true, default: 50 },
    rating: { type: Number, required: true, default: 4.8 },
    reviewsCount: { type: Number, required: true, default: 5 },
    image: { type: String, required: true },
    desc: { type: String, required: true },
    details: { type: String },
  },
  { timestamps: true }
);

// Create compound index for Elastic-like fuzzy text search
ProductSchema.index({
  title: "text",
  subtitle: "text",
  sku: "text",
  desc: "text",
  category: "text",
});

export const ProductModel: Model<ProductDocument> =
  mongoose.models.Product || mongoose.model<ProductDocument>("Product", ProductSchema);

// Rich Default Seed Dataset used as database initial data & offline fallback
export const seedProducts: IProduct[] = [
  {
    id: "mk677",
    title: "Ibutamoren MK-677",
    subtitle: "UNITED HORMONE",
    sku: "UH-MK677-280",
    price: "$49.99",
    numericPrice: 49.99,
    category: "SARMs",
    inStock: true,
    stockQuantity: 42,
    rating: 4.85,
    reviewsCount: 18,
    image: "/products/mk677.webp",
    desc: "High potency growth factor secretagogue engineered for lean muscle retention and rapid cellular recovery.",
    details: "Dose: 25mg/ml | Volume: 30ml | Purity: 99.4% HPLC verified. Promotes GH release without suppressing natural testosterone axis.",
  },
  {
    id: "yk11",
    title: "Mutant YK-11",
    subtitle: "UNITED HORMONE",
    sku: "UH-YK11-MUTANT",
    price: "$59.99",
    numericPrice: 59.99,
    category: "SARMs",
    inStock: true,
    stockQuantity: 15,
    rating: 4.75,
    reviewsCount: 24,
    image: "/products/yk11.webp",
    desc: "Advanced myostatin inhibitor compound formulated for dense muscular hypertrophy and extreme strength output.",
    details: "Dose: 10mg/ml | Volume: 30ml | Purity: 99.1% HPLC verified. Inhibits myostatin protein synthesis for uncapped muscle gains.",
  },
  {
    id: "mk2866",
    title: "Ostarine MK-2866",
    subtitle: "UNITED HORMONE",
    sku: "UH-MK2866-OST",
    price: "$44.99",
    numericPrice: 44.99,
    category: "SARMs",
    inStock: true,
    stockQuantity: 60,
    rating: 4.90,
    reviewsCount: 31,
    image: "/products/mk2866.webp",
    desc: "Selective tissue-targeted anabolic agent designed for joint resilience and clean lean muscle preservation.",
    details: "Dose: 25mg/ml | Volume: 30ml | Purity: 99.6% HPLC verified. Exceptional anti-catabolic properties during caloric deficit.",
  },
  {
    id: "bulkmass",
    title: "UNI-BULK MASS",
    subtitle: "UNITED HORMONE",
    sku: "UH-BULK-MASS",
    price: "$79.99",
    numericPrice: 79.99,
    category: "Mass Builders",
    inStock: true,
    stockQuantity: 28,
    rating: 4.88,
    reviewsCount: 42,
    image: "/products/bulkmass.webp",
    desc: "Synergistic mass matrix engineered for rapid nitrogen retention and peak physical conditioning.",
    details: "Proprietary triple-stage muscular density matrix. Formulated for athletes seeking explosive volume and hardness.",
  },
  {
    id: "lgd4033",
    title: "Ligandrol LGD-4033",
    subtitle: "UNITED HORMONE",
    sku: "UH-LGD4033-LIG",
    price: "$54.99",
    numericPrice: 54.99,
    category: "SARMs",
    inStock: true,
    stockQuantity: 35,
    rating: 4.80,
    reviewsCount: 19,
    image: "/products/lgd4033.webp",
    desc: "Pharmaceutical-grade anabolic agonist for extreme muscle density, stamina, and structural integrity.",
    details: "Dose: 10mg/ml | Volume: 30ml | Purity: 99.5% HPLC verified. Potent androgenic affinity with minimal liver stress.",
  },
  {
    id: "rad140",
    title: "Testolone RAD-140",
    subtitle: "UNITED HORMONE",
    sku: "UH-RAD140-[#1]",
    price: "$64.99",
    numericPrice: 64.99,
    category: "SARMs",
    inStock: true,
    stockQuantity: 20,
    rating: 4.95,
    reviewsCount: 56,
    image: "/products/mk677.webp",
    desc: "Ultra-potent selective androgen receptor modulator engineered for raw aggression and lean tissue synthesis.",
    details: "Dose: 20mg/ml | Volume: 30ml | Purity: 99.8% HPLC verified. High anabolic ratio with zero aromatization.",
  },
  {
    id: "bpc157",
    title: "BPC-157 Regenerator",
    subtitle: "UNITED HORMONE",
    sku: "UH-BPC157-PEP",
    price: "$49.99",
    numericPrice: 49.99,
    category: "Peptides",
    inStock: true,
    stockQuantity: 50,
    rating: 4.92,
    reviewsCount: 38,
    image: "/products/yk11.webp",
    desc: "Stable gastric pentadecapeptide targeted for tendon, ligament, and gut mucosal tissue repair.",
    details: "Dose: 5mg Vial | Lyophilized Peptide | Purity: >99.0%. Accelerates angiogenesis and connective tissue healing.",
  },
  {
    id: "tb500",
    title: "TB-500 Thymosin Beta-4",
    subtitle: "UNITED HORMONE",
    sku: "UH-TB500-PEP",
    price: "$54.99",
    numericPrice: 54.99,
    category: "Peptides",
    inStock: true,
    stockQuantity: 18,
    rating: 4.86,
    reviewsCount: 22,
    image: "/products/mk2866.webp",
    desc: "Synthetic peptide derivative of thymosin beta-4 for cell migration and vascular tissue regeneration.",
    details: "Dose: 10mg Vial | Lyophilized Peptide | Purity: >98.8%. Promotes actin regulation and systemic cellular recovery.",
  },
  {
    id: "gw501516",
    title: "Cardarine GW-501516",
    subtitle: "UNITED HORMONE",
    sku: "UH-GW501516-END",
    price: "$49.99",
    numericPrice: 49.99,
    category: "Fat Burners",
    inStock: true,
    stockQuantity: 33,
    rating: 4.89,
    reviewsCount: 45,
    image: "/products/bulkmass.webp",
    desc: "PPARδ receptor agonist engineered for extreme cardiovascular endurance and lipid oxidation.",
    details: "Dose: 20mg/ml | Volume: 30ml | Purity: 99.3% HPLC verified. Enhances fatty acid oxidation without central nervous stimulant crash.",
  },
  {
    id: "sr9009",
    title: "Stenabolic SR-9009",
    subtitle: "UNITED HORMONE",
    sku: "UH-SR9009-REV",
    price: "$52.99",
    numericPrice: 52.99,
    category: "Fat Burners",
    inStock: false,
    stockQuantity: 0,
    rating: 4.70,
    reviewsCount: 14,
    image: "/products/lgd4033.webp",
    desc: "Rev-ErbA agonist for basal metabolic rate escalation and mitochondrial biogenesis.",
    details: "Dose: 20mg/ml | Volume: 30ml | Purity: 99.0% HPLC verified. Increases metabolic activity in skeletal muscle tissue.",
  },
  {
    id: "pctultra",
    title: "PCT Ultra Shield",
    subtitle: "UNITED HORMONE",
    sku: "UH-PCT-SHIELD",
    price: "$39.99",
    numericPrice: 39.99,
    category: "PCT & Recovery",
    inStock: true,
    stockQuantity: 40,
    rating: 4.91,
    reviewsCount: 29,
    image: "/products/mk677.webp",
    desc: "Comprehensive post-cycle therapy matrix for natural LH/FSH restoration and estrogen modulation.",
    details: "Formulated with Arimistane, D-Aspartic Acid, and Milk Thistle for full hypothalamic axis homeostasis.",
  },
  {
    id: "cjc1295",
    title: "CJC-1295 + Ipamorelin",
    subtitle: "UNITED HORMONE",
    sku: "UH-CJC-IPA-PEP",
    price: "$69.99",
    numericPrice: 69.99,
    category: "Peptides",
    inStock: true,
    stockQuantity: 25,
    rating: 4.97,
    reviewsCount: 51,
    image: "/products/yk11.webp",
    desc: "Dual peptide synergy blend for sustained nocturnal growth hormone release and deep REM sleep recovery.",
    details: "Dose: 5mg Blend | Lyophilized Peptide | Purity: 99.2%. Synergistic GHRH + GHRP peptide combination.",
  },
];
