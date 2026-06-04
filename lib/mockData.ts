import { Product, DashboardMetric, AnalyticsData } from "./types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    _id: "prod-1",
    title: "Premium Zinc Oxide Active Grade",
    slug: "premium-zinc-oxide-active-grade",
    description: "Our flagship pharmaceutical/active zinc oxide is characterized by high surface area, precise catalytic capability, and extremely low heavy metal residue. It serves as a vital crosslinking and curing activator across premium industrial sectors, glass production, and performance cosmetics seeking highest UV shielding.",
    category: { name: "Zinc Oxide", slug: "zinc-oxide" },
    badge: "Premium Active",
    specs: {
      grade: "Active Pharmaceutical & High-Tech Rubber",
      form: "Ultra-fine Precipitated Powder",
      purity: "99.92%",
      source: "Secondary Premium Hydrogen Vaporized Zinc",
      hazardCompliance: "Slight toxicity to aquatic life, handle with standard PPE-10",
      zincContent: "80.3%"
    },
    moq: { value: 5, unit: "tonne" },
    applications: [
      "Cross-linking agent in rubber formulations and performance tires",
      "Stabilizing catalyst for custom high-end ceramic glazes",
      "UVA/UVB sun preservation barrier in cosmetic sunscreen lotions",
      "Raw materials in medical plaster adhesive manufacture"
    ],
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
    ],
    createdAt: "2026-02-15T08:30:00Z",
    updatedAt: "2026-05-10T14:22:00Z"
  },
  {
    _id: "prod-2",
    title: "Superfine Zinc Dust (4 Micron)",
    slug: "superfine-zinc-dust-4-micron",
    description: "Highly reactive, atomized spherical zinc dust refined specifically for structural anti-corrosive protective paint linings. This super-fine micron layout ensures dense coating coverage, active galvanic prevention for marine structures, pipelines, and offshore oil platforms.",
    category: { name: "Zinc Dust", slug: "zinc-dust" },
    badge: "High Efficiency",
    specs: {
      grade: "Class A Maritime Heavy Duty",
      form: "Spherical Micro-powders",
      purity: "98.5%",
      source: "Direct High-Temperature Crucible Vapor condensation",
      hazardCompliance: "Flammable Solid Class 4.3 - Avoid direct water presence",
      zincContent: "98.5%"
    },
    moq: { value: 1, unit: "tonne" },
    applications: [
      "Protective priming paint for ocean freight and steel infrastructure",
      "Precipitation chemical agent in hydrometallurgical gold recovery",
      "Sintering structural friction modifier in modern automotive brakes",
      "Chemical reducing agent in organic synthesis reactions"
    ],
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80"
    ],
    createdAt: "2026-03-01T10:15:00Z",
    updatedAt: "2026-05-20T09:40:00Z"
  },
  {
    _id: "prod-3",
    title: "Eco-Grade Secondary Zinc Oxide Catalyst",
    slug: "secondary-zinc-oxide-catalyst",
    description: "Sustainable refined zinc oxide produced primarily through certified recycling loops of primary industrial compounds. Crafted for high volume industrial demands like general rubber vulcanization, agriculture supplements, and bulk ceramics where carbon footprint offsets are vital.",
    category: { name: "Zinc Oxide", slug: "zinc-oxide" },
    badge: "Eco-Certified",
    specs: {
      grade: "Rubber Vulcanizing & Agriculture Milled",
      form: "Coarser Crystalline Powder",
      purity: "99.0%",
      source: "Premium Recovered Zinc Condensate Loops",
      hazardCompliance: "Environmentally Hazardous Category 1",
      zincContent: "79.2%"
    },
    moq: { value: 15, unit: "tonne" },
    applications: [
      "General tire rubber vulcanization activator",
      "Micronutrient source in premium agricultural fertilizers",
      "Glass production modifier for optical density stabilization",
      "Frit additive in low-temperature industrial glazes"
    ],
    images: [
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80"
    ],
    createdAt: "2026-01-10T11:00:00Z",
    updatedAt: "2026-04-18T16:15:00Z"
  },
  {
    _id: "prod-4",
    title: "Premium Zinc Granules 99.99%",
    slug: "premium-zinc-granules-purity",
    description: "Ultra-pure heavy metal granules engineered for premium laboratory testing, chemical catalysis, and precision alloying. These custom granules prevent dusting losses and support smooth dissolution in acid bath setups and electroplating anodes.",
    category: { name: "Zinc Granules", slug: "zinc-granules" },
    badge: "Extreme Purity",
    specs: {
      grade: "Analytical Reagent / High Purity Ingot Form",
      form: "Teardrop Metallic Granules (1-3mm size)",
      purity: "99.995%",
      source: "Electrolytic High-Refinement Aluminum-Free Zinc",
      hazardCompliance: "Generally stable solid, avoid strong oxidizers",
      zincContent: "99.99%"
    },
    moq: { value: 500, unit: "kg" },
    applications: [
      "High precision academic & organic synthesis research",
      "Premium zinc plating electrolyte replenishment",
      "Foundry modification of technical brass compounds",
      "Sulfide chemical precipitation processes"
    ],
    images: [
      "https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
    ],
    createdAt: "2026-04-05T09:00:00Z",
    updatedAt: "2026-04-05T09:00:00Z"
  },
  {
    _id: "prod-5",
    title: "High-Conductivity Copper Powder (Catalytic)",
    slug: "high-conductivity-copper-powder",
    description: "Premium copper micron powder with specialized dendritic particle shape, offering high thermal and electrical conductivity, perfect for multi-stage alloy sintering, electromagnetic shields, and catalytic industrial mixtures.",
    category: { name: "Copper & Alloys", slug: "copper-alloys" },
    badge: "Thermal Grade",
    specs: {
      grade: "Electronics-Sintering High Conductivity",
      form: "Dendritic Red Metallic Powder",
      purity: "99.90%",
      source: "Electrolytic Recycled Copper Wire Core",
      hazardCompliance: "Highly aquatic toxic, avoid dust inhalation",
      zincContent: "0.0% (Copper Oxide Blend)"
    },
    moq: { value: 2, unit: "tonne" },
    applications: [
      "Conductive paste formulations for PCB engineering",
      "Sintered metallic matrix composite drill bit manufacturing",
      "Marine anti-fouling protective primers and sealers",
      "High-output metallurgical copper-alloy casting adjustments"
    ],
    images: [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&w=1200&q=80"
    ],
    createdAt: "2026-03-12T14:50:00Z",
    updatedAt: "2026-05-18T11:10:00Z"
  }
];

export const INITIAL_METRICS: DashboardMetric[] = [
  {
    title: "Total Listings",
    value: 5,
    change: "+2 this month",
    changeType: "increase",
    description: "Active high-purity industrial metal product catalog listings."
  },
  {
    title: "Catalogue Views",
    value: "14.2k",
    change: "+28.4% vs last week",
    changeType: "increase",
    description: "Unique visitor inquiries and B2B specs views."
  },
  {
    title: "B2B Trade Inquiries",
    value: 189,
    change: "+12.1% monthly",
    changeType: "increase",
    description: "Form inquiries generated via product specs sheets."
  },
  {
    title: "Pending Sample Orders",
    value: 24,
    change: "-15% reduction",
    changeType: "decrease",
    description: "Sample shipments and lab analysis packets in transit."
  }
];

export const ANALYTICS_DATA: AnalyticsData[] = [
  { month: "Jan", pageViews: 3200, inquiries: 85, sampleRequests: 12 },
  { month: "Feb", pageViews: 4500, inquiries: 110, sampleRequests: 18 },
  { month: "Mar", pageViews: 5100, inquiries: 135, sampleRequests: 15 },
  { month: "Apr", pageViews: 6800, inquiries: 160, sampleRequests: 22 },
  { month: "May", pageViews: 8400, inquiries: 195, sampleRequests: 31 },
  { month: "Jun", pageViews: 14200, inquiries: 240, sampleRequests: 45 }
];

export const INITIAL_INQUIRIES = [
  {
    id: "inq-demo-1",
    productTitle: "Premium Zinc Oxide Active Grade",
    productSlug: "premium-zinc-oxide-active-grade",
    companyName: "Apex Tire Corporation",
    contactName: "Marcus Vance",
    contactEmail: "m.vance@apextire.com",
    quantityRequested: 25,
    quantityUnit: "tonne",
    inquiryType: "Commercial Price Quote",
    notes: "We are scaling our performance tire lines and require monthly deliveries. Please supply premium REACH certificate reports.",
    createdAt: "2026-06-03T09:12:00Z"
  },
  {
    id: "inq-demo-2",
    productTitle: "Superfine Zinc Dust (4 Micron)",
    productSlug: "superfine-zinc-dust-4-micron",
    companyName: "Nordic Shipbuilding Baltic",
    contactName: "Helena Lindstrom",
    contactEmail: "h.lindstrom@nordicmarine.se",
    quantityRequested: 5,
    quantityUnit: "tonne",
    inquiryType: "Free Lab Sample Tube",
    notes: "We require a small 500g testing sample tube for direct atmospheric saltwater corrosion performance testing.",
    createdAt: "2026-06-04T10:05:00Z"
  }
];

