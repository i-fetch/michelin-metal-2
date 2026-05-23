// scripts/seed-products.ts
import 'dotenv/config'
import mongoose from 'mongoose'
import slugify  from 'slugify'

const MONGODB_URI = process.env.MONGODB_URI!
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1) }

const ProductSchema = new mongoose.Schema(
  {
    title: String, slug: { type: String, unique: true }, imageIds: [{ type: mongoose.Schema.Types.ObjectId }],
    shortDescription: String, fullDescription: String,
    category: String, subcategory: String, featured: Boolean, status: String,
    specs: [String], applications: [String], purity: String, materialGrade: String,
    condition: String, recyclingClass: String,
    quantityAvailable: String, unitType: String, supplyCapacity: String, moq: String,
    packagingType: String, countryOfOrigin: String, deliveryTimeline: String,
    exportAvailable: Boolean, stockAvailable: Boolean,
    price: Number, currency: String, priceNegotiable: Boolean, showPrice: Boolean,
    bulkPricing: String, requestQuote: Boolean,
    tags: [String], seoTitle: String, seoDescription: String,
  },
  { timestamps: true }
)
const Product = mongoose.models.Product ?? mongoose.model('Product', ProductSchema)

const PRODUCTS = [
  // ── ALUMINIUM ────────────────────────────────────────────────────────────────
  {
    title: 'Aluminium Profile',
    category: 'aluminium', subcategory: 'Profile',
    shortDescription: 'High-grade aluminium extrusion profile scrap from structural and industrial off-cuts.',
    fullDescription: 'Aluminium Profile scrap is derived from extrusion processes and structural fabrication — window frames, door profiles, curtain walling and industrial sections.\n\nOur Profile material is carefully sorted to remove steel inserts, gaskets and non-aluminium components before packaging. Available in bundles or loose form per buyer specification.',
    specs: ['Purity: ≥98% Al', 'Form: Bundles / Loose', 'Max Fe: 0.3%', 'Moisture-free'],
    applications: ['Extrusion billet remelting', 'Secondary smelting', 'Ingot casting', 'Export'],
    purity: '≥98% Al', materialGrade: 'Grade A', condition: 'Recycled', recyclingClass: 'Taint/Tabor',
    unitType: 'Metric Tons', moq: '5', supplyCapacity: '200 MT/month', packagingType: 'Baled',
    countryOfOrigin: 'Nigeria', deliveryTimeline: '7–14 business days, FOB Lagos',
    exportAvailable: true, stockAvailable: true, featured: true, status: 'active',
    price: 1450, currency: 'USD', showPrice: true, priceNegotiable: true,
    bulkPricing: '3% discount for orders over 50 MT. Container pricing available.',
    tags: ['aluminium', 'profile', 'extrusion', 'scrap', 'Nigeria', 'export'],
  },
  {
    title: 'Aluminium UBC Bales',
    category: 'aluminium', subcategory: 'UBC',
    shortDescription: 'Used Beverage Cans densely baled for efficient transport and high metal recovery.',
    fullDescription: 'Used Beverage Cans (UBC) are one of the most recycled aluminium streams globally. Our UBC material is collected, sorted, cleaned and compressed to a standard bale density of 25–30 kg.\n\nFree from steel cans and excessive moisture — ideal for remelting into new can sheet or casting alloys.',
    specs: ['Bale weight: 25–30 kg', 'Density: ~500 kg/m³', 'Steel contamination: <0.5%', 'Moisture: <2%'],
    applications: ['Can sheet rolling', 'Secondary casting alloys', 'Automotive sheet', 'Foil production'],
    purity: '≥96% Al', materialGrade: 'Tableware', condition: 'Recycled', recyclingClass: 'Taint/Tabor',
    unitType: 'Metric Tons', moq: '10', supplyCapacity: '300 MT/month', packagingType: 'Baled',
    countryOfOrigin: 'Nigeria', deliveryTimeline: '5–10 business days',
    exportAvailable: true, stockAvailable: true, featured: true, status: 'active',
    price: 1380, currency: 'USD', showPrice: true, priceNegotiable: true,
    bulkPricing: 'Volume discounts from 50 MT. Ask for container load pricing.',
    tags: ['UBC', 'aluminium', 'cans', 'beverage', 'bales', 'recycled'],
  },
  {
    title: 'Soft Aluminium Scrap',
    category: 'aluminium', subcategory: 'Soft Aluminum',
    shortDescription: 'Clean unalloyed soft aluminium including foil, domestic cookware and wire.',
    fullDescription: 'Soft Aluminium covers low-alloy aluminium scrap: foil, cookware, wire and thin-gauge sheet. Lower iron content than casting alloys — suited to wrought product remelting.\n\nAvailable loose, baled or shredded.',
    specs: ['Al content: ≥96%', 'Low alloy grade', 'Fe: <0.4%', 'Form: Baled / Loose / Shredded'],
    applications: ['Foil production', 'Wire drawing', 'Wrought alloy ingots', 'Secondary smelting'],
    purity: '≥96% Al', materialGrade: 'Low Alloy', condition: 'Recycled', recyclingClass: 'Twitch',
    unitType: 'Metric Tons', moq: '5', supplyCapacity: '150 MT/month', packagingType: 'Baled',
    countryOfOrigin: 'Nigeria', deliveryTimeline: '7–14 days',
    exportAvailable: true, stockAvailable: true, featured: false, status: 'active',
    requestQuote: true, showPrice: false, price: null, currency: 'USD', priceNegotiable: true,
    tags: ['soft aluminium', 'foil', 'wire', 'cookware', 'scrap'],
  },
  {
    title: 'Aluminium Radiator Core',
    category: 'aluminium', subcategory: 'Radiator',
    shortDescription: 'Automotive aluminium radiator cores, stripped of plastics and steel components.',
    fullDescription: 'Aluminium Radiator scrap consists of automotive cooling radiators with plastic headers and steel parts removed. The cleaned aluminium core contains brazed fins and tubes of high-purity alloy.\n\nPremium pricing due to consistent chemistry — ideal for casting alloys.',
    specs: ['Al purity: ≥95%', 'Steel-free core', 'Form: Flat / Loose', 'No residual coolant'],
    applications: ['Automotive casting alloy', 'Secondary ingot production', 'Aluminium remelting'],
    purity: '≥95% Al', materialGrade: 'A380', condition: 'Recycled', recyclingClass: 'Honey',
    unitType: 'Metric Tons', moq: '3', supplyCapacity: '80 MT/month', packagingType: 'Loose',
    countryOfOrigin: 'Nigeria', deliveryTimeline: '10–15 days',
    exportAvailable: true, stockAvailable: true, featured: false, status: 'active',
    price: 1520, currency: 'USD', showPrice: true, priceNegotiable: true,
    tags: ['aluminium radiator', 'automotive', 'scrap', 'core'],
  },
  {
    title: 'Aluminium Cast Scrap',
    category: 'aluminium', subcategory: 'Cast Aluminum',
    shortDescription: 'Mixed cast aluminium including engine blocks, gear housings and structural castings.',
    fullDescription: 'Aluminium Cast scrap covers die-cast, sand-cast and permanent-mould components — engine blocks, transmission housings, pump bodies and industrial castings.\n\nSorted to remove steel inserts and iron bearings before packaging.',
    specs: ['Al: ≥80%', 'Mixed casting alloys', 'Steel inserts removed', 'Form: Loose / Shredded'],
    applications: ['Secondary casting alloy', 'Automotive foundry', 'General purpose ingot'],
    purity: '≥80% Al', materialGrade: 'Mixed Cast', condition: 'Recycled',
    unitType: 'Metric Tons', moq: '10', supplyCapacity: '250 MT/month', packagingType: 'Loose',
    countryOfOrigin: 'Nigeria', deliveryTimeline: '7–14 days',
    exportAvailable: true, stockAvailable: true, featured: true, status: 'active',
    price: 1200, currency: 'USD', showPrice: true, priceNegotiable: true,
    tags: ['aluminium', 'cast', 'engine', 'scrap', 'die-cast'],
  },
  {
    title: 'Aluminium Wheel Rims',
    category: 'aluminium', subcategory: 'Rim',
    shortDescription: 'Clean alloy wheel rims from vehicle dismantlers — tyres and valves removed.',
    fullDescription: 'Aluminium wheel rims (alloy wheels) are primarily A356 casting alloy. Sourced from vehicle dismantlers and wheel refurbishers with tyres and valve inserts removed.\n\nConsistent chemistry makes this excellent feedstock for automotive casting.',
    specs: ['Alloy: Typically A356', 'Tyres removed', 'Al: ≥85%', 'Form: Whole or cut'],
    applications: ['Automotive casting', 'General casting ingot', 'Premium alloy ingot'],
    purity: '≥85% Al', materialGrade: 'A356', condition: 'Recycled',
    unitType: 'Metric Tons', moq: '5', supplyCapacity: '100 MT/month', packagingType: 'Loose',
    countryOfOrigin: 'Nigeria', deliveryTimeline: '7–14 days',
    exportAvailable: true, stockAvailable: true, featured: false, status: 'active',
    requestQuote: true, showPrice: false, price: null, currency: 'USD', priceNegotiable: true,
    tags: ['alloy wheels', 'rims', 'aluminium', 'A356', 'automotive'],
  },
  // ── METALS ───────────────────────────────────────────────────────────────────
  {
    title: 'Bare Bright Copper',
    category: 'metals', subcategory: 'Copper',
    shortDescription: 'Premium bare bright copper — uncoated, unalloyed wire in clean condition.',
    fullDescription: 'Bare Bright Copper is the highest-grade copper scrap available, sourced from electrical contractors and manufacturing waste. Free from insulation, solder, paint or coating.\n\nAvailable in compressed bales or loose form per buyer specification.',
    specs: ['Purity: ≥99.9% Cu', 'Form: Baled / Loose', 'No coating or insulation', 'No solder'],
    applications: ['Rod and wire drawing', 'Copper cathode production', 'Electrical conductor', 'Foundry use'],
    purity: '≥99.9% Cu', materialGrade: 'Bare Bright', condition: 'Recycled', recyclingClass: 'Bare Bright',
    unitType: 'Metric Tons', moq: '2', supplyCapacity: '100 MT/month', packagingType: 'Baled',
    countryOfOrigin: 'Nigeria', deliveryTimeline: '5–10 days, FOB Lagos',
    exportAvailable: true, stockAvailable: true, featured: true, status: 'active',
    price: 8200, currency: 'USD', showPrice: true, priceNegotiable: true,
    bulkPricing: 'Best pricing for 10+ MT lots. LME-based pricing available.',
    tags: ['copper', 'bare bright', 'wire', 'scrap', 'No.1 copper', 'Nigeria'],
  },
  {
    title: 'Yellow Brass Scrap',
    category: 'metals', subcategory: 'Brass',
    shortDescription: 'High-quality yellow brass scrap from plumbing, valves and turned components.',
    fullDescription: 'Yellow Brass is an alloy of approximately 67% copper and 33% zinc recovered from plumbing fittings, valves, electrical components and turned machined parts.\n\nFree from iron and excessive contamination. Lead-free grades available on request.',
    specs: ['Yellow Brass: ~67% Cu, 33% Zn', 'Iron: <0.5%', 'Form: Baled / Turnings / Cut', 'Sorted by grade'],
    applications: ['Brass rod extrusion', 'Foundry ingot', 'Plumbing fittings', 'Casting'],
    purity: '67% Cu / 33% Zn', materialGrade: 'Yellow Brass', condition: 'Recycled',
    unitType: 'Metric Tons', moq: '3', supplyCapacity: '80 MT/month', packagingType: 'Baled',
    countryOfOrigin: 'Nigeria', deliveryTimeline: '7–14 days',
    exportAvailable: true, stockAvailable: true, featured: true, status: 'active',
    price: 5400, currency: 'USD', showPrice: true, priceNegotiable: true,
    tags: ['brass', 'yellow brass', 'copper zinc', 'scrap', 'plumbing'],
  },
  {
    title: 'Radiator Brass (Honey)',
    category: 'metals', subcategory: 'Radiator Brass',
    shortDescription: 'Copper-brass automotive radiators cleaned to ISRI Honey grade standard.',
    fullDescription: 'Radiator Brass sourced from vehicle cooling systems — copper-brass radiators with plastic tanks, steel fittings and iron end-caps removed.\n\nSupplied per ISRI "Honey" or "Birch/Cliff" grade standards with competitive recovery for smelters and brass mills.',
    specs: ['Grade: Honey / Birch', 'Plastic removed', 'Cu+Zn: ≥70%', 'Form: Whole / Flattened'],
    applications: ['Brass foundry', 'Secondary smelting', 'Copper recovery'],
    purity: 'Cu+Zn: ≥70%', materialGrade: 'ISRI Honey', condition: 'Recycled',
    unitType: 'Metric Tons', moq: '3', supplyCapacity: '60 MT/month', packagingType: 'Loose',
    countryOfOrigin: 'Nigeria', deliveryTimeline: '7–14 days',
    exportAvailable: true, stockAvailable: true, featured: false, status: 'active',
    requestQuote: true, showPrice: false, price: null, currency: 'USD', priceNegotiable: true,
    tags: ['radiator brass', 'honey', 'copper', 'automotive', 'scrap'],
  },
  {
    title: 'Lead-Acid Battery Scrap',
    category: 'metals', subcategory: 'Battery Scrap',
    shortDescription: 'Whole drained lead-acid batteries — automotive and industrial grades, UN compliant packaging.',
    fullDescription: 'Lead-acid battery scrap is one of the most efficiently recycled materials globally with lead recovery rates exceeding 98%.\n\nWe supply whole drained automotive batteries (OBCs) and industrial forklift batteries transported in dedicated UN-approved containers with full hazmat documentation.',
    specs: ['Lead content: ~60–65%', 'Drained or intact options', 'Automotive & industrial', 'UN hazmat compliant packaging'],
    applications: ['Lead smelting and refining', 'Battery recycling plants', 'Lead ingot production'],
    purity: '~60-65% Pb', materialGrade: 'OBC / Industrial', condition: 'Recycled',
    unitType: 'Metric Tons', moq: '5', supplyCapacity: '200 MT/month', packagingType: 'Containerized',
    countryOfOrigin: 'Nigeria', deliveryTimeline: '10–21 days (hazmat)',
    exportAvailable: true, stockAvailable: true, featured: true, status: 'active',
    price: 380, currency: 'USD', showPrice: true, priceNegotiable: true,
    bulkPricing: 'Container load (20 FCL) pricing available. Long-term supply contracts welcome.',
    tags: ['battery', 'lead acid', 'scrap', 'OBC', 'smelting', 'hazmat'],
  },
  // ── FERROUS ──────────────────────────────────────────────────────────────────
  {
    title: 'HMS 1 & 2 Steel Scrap',
    category: 'ferrous', subcategory: 'HMS 1 & 2',
    shortDescription: 'Heavy Melting Steel 1 & 2 — clean, sorted ferrous scrap for electric arc furnaces.',
    fullDescription: 'Heavy Melting Steel (HMS) 1 & 2 is a standard grade of ferrous scrap widely traded internationally. HMS 1 consists of wrought iron and steel scrap at least 6mm thick. HMS 2 includes thinner gauge material.\n\nAll material is sorted, free from non-metallics, stainless steel and excessive rust.',
    specs: ['HMS 1: ≥6mm thick, wrought iron/steel', 'HMS 2: <6mm, mixed steel', 'Non-metallics: <1%', 'Radiation-free certified'],
    applications: ['Electric arc furnace', 'Basic oxygen furnace', 'Steel billet production', 'Rebar manufacturing'],
    purity: 'Fe: ≥98%', materialGrade: 'HMS 1 & 2', condition: 'Recycled',
    unitType: 'Metric Tons', moq: '100', supplyCapacity: '5000 MT/month', packagingType: 'Loose',
    countryOfOrigin: 'Nigeria', deliveryTimeline: '14–21 days, CIF available',
    exportAvailable: true, stockAvailable: true, featured: true, status: 'active',
    price: 310, currency: 'USD', showPrice: true, priceNegotiable: true,
    bulkPricing: 'Pricing per container or Panamax vessel. Long-term supply agreements available.',
    tags: ['HMS', 'steel scrap', 'ferrous', 'heavy melting', 'EAF', 'iron'],
  },
  {
    title: 'Cast Iron Scrap',
    category: 'ferrous', subcategory: 'Cast Iron',
    shortDescription: 'Clean cast iron scrap from industrial machinery, engine blocks and pipe fittings.',
    fullDescription: 'Cast Iron scrap sourced from industrial dismantling, foundries and engineering works. Material includes engine blocks, gearboxes, pump housings and pipe fittings.\n\nFree from steel plate, malleable iron and non-metallic contamination.',
    specs: ['C: 2–4%', 'Si: 1–3%', 'Free from malleable iron', 'Lump form, sorted'],
    applications: ['Grey iron foundry', 'Ductile iron casting', 'Steel alloy additive', 'Re-melting'],
    purity: 'Fe: ≥94%', materialGrade: 'Grey Cast Iron', condition: 'Recycled',
    unitType: 'Metric Tons', moq: '20', supplyCapacity: '500 MT/month', packagingType: 'Loose',
    countryOfOrigin: 'Nigeria', deliveryTimeline: '7–14 days',
    exportAvailable: true, stockAvailable: true, featured: false, status: 'active',
    requestQuote: true, showPrice: false, price: null, currency: 'USD', priceNegotiable: true,
    tags: ['cast iron', 'ferrous', 'foundry', 'scrap', 'engine block'],
  },
  // ── NON-FERROUS ───────────────────────────────────────────────────────────────
  {
    title: 'Copper Wire Scrap',
    category: 'non-ferrous', subcategory: 'Copper Wire',
    shortDescription: 'Insulated and bare copper wire scrap — Millberry grade to No.2 wire available.',
    fullDescription: 'Copper wire scrap ranging from high-purity Millberry (bare bright) to insulated No.2 wire. Sourced from demolition contractors, electrical wholesalers and cable manufacturers.\n\nAvailable stripped, baled or granulated per buyer requirement.',
    specs: ['Millberry: ≥99.9% Cu', 'No.2 Wire: ≥94% Cu', 'Insulated: available with/without insulation', 'Form: Baled / Granulated / Loose'],
    applications: ['Copper rod drawing', 'Granule production', 'Cable manufacturing', 'Brass alloying'],
    purity: '≥94% Cu (No.2)', materialGrade: 'Millberry / No.2', condition: 'Recycled',
    unitType: 'Metric Tons', moq: '3', supplyCapacity: '120 MT/month', packagingType: 'Baled',
    countryOfOrigin: 'Nigeria', deliveryTimeline: '7–14 days',
    exportAvailable: true, stockAvailable: true, featured: true, status: 'active',
    price: 7600, currency: 'USD', showPrice: true, priceNegotiable: true,
    tags: ['copper wire', 'millberry', 'No.2', 'scrap', 'insulated', 'cable'],
  },
  {
    title: 'Aluminium Ingots',
    category: 'non-ferrous', subcategory: 'Aluminum Ingots',
    shortDescription: 'Reprocessed aluminium ingots — A380 and ADC12 alloy available for casting operations.',
    fullDescription: 'Aluminium ingots produced from reprocessed scrap material. Available in A380 die-casting alloy and ADC12 high-pressure die-casting alloy.\n\nEach batch is spectrographically analysed with COA provided. Packed in standard 7–10 kg T-bar ingots on pallets.',
    specs: ['A380: Al 80–90%, Si 7.5–9.5%, Cu 3–4%', 'ADC12: per JIS H 5302', 'Weight: 7–10 kg/ingot', 'COA with each lot'],
    applications: ['High-pressure die casting', 'Automotive components', 'Engineering parts', 'General casting'],
    purity: 'Alloy specific', materialGrade: 'A380 / ADC12', condition: 'Processed',
    unitType: 'Metric Tons', moq: '5', supplyCapacity: '300 MT/month', packagingType: 'Palletized',
    countryOfOrigin: 'Nigeria', deliveryTimeline: '7–14 days',
    exportAvailable: true, stockAvailable: true, featured: false, status: 'active',
    price: 1850, currency: 'USD', showPrice: true, priceNegotiable: true,
    tags: ['aluminium ingots', 'A380', 'ADC12', 'die casting', 'processed'],
  },
  // ── BULK ─────────────────────────────────────────────────────────────────────
  {
    title: 'Container Bulk Export Package',
    category: 'bulk', subcategory: 'Container Supply',
    shortDescription: '20ft and 40ft container bulk supply packages — mixed or single-grade metals.',
    fullDescription: 'Mechelin Metals offers full container load (FCL) export packages for international buyers. We handle all export documentation, loading supervision, weight certification and B/L preparation.\n\nAvailable for all our product grades. Minimum 1 x 20FCL per order.',
    specs: ['20FCL: ~22–25 MT depending on material', '40FCL: ~24–28 MT', 'Full export docs included', 'Pre-shipment inspection available'],
    applications: ['International export', 'Large-scale procurement', 'Factory supply contracts'],
    unitType: 'Containers', moq: '1', supplyCapacity: '50 containers/month', packagingType: 'Containerized',
    countryOfOrigin: 'Nigeria', deliveryTimeline: 'FOB / CFR / CIF available',
    exportAvailable: true, stockAvailable: true, featured: true, status: 'active',
    requestQuote: true, showPrice: false, price: null, currency: 'USD', priceNegotiable: true,
    tags: ['bulk', 'container', 'export', 'FCL', 'international', 'West Africa'],
  },
]

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected to MongoDB')
  let created = 0
  for (const p of PRODUCTS) {
    const slug = slugify(p.title, { lower: true, strict: true })
    if (await Product.findOne({ slug })) {
      console.log(`⏭  Skip (exists): ${p.title}`)
      continue
    }
    await Product.create({ ...p, slug, imageIds: [] })
    console.log(`✅ Created: ${p.title}`)
    created++
  }
  console.log(`\n🎉 Done — ${created} product(s) seeded.`)
  await mongoose.disconnect()
}

seed().catch(e => { console.error(e); process.exit(1) })
