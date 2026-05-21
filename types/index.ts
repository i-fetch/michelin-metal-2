export interface Material {
  id: string;
  name: string;
  category: 'Non-Ferrous' | 'Ferrous' | 'Industrial' | 'Auto Scrap';
  description: string;
  imageUrl: string;
  pricePerLbMin: number;
  pricePerLbMax: number;
  specifications: string[];
}

export interface QuoteRequest {
  id: string;
  materialId: string;
  materialName: string;
  weight: number;
  unit: 'lbs' | 'kgs';
  estimatedValueMin: number;
  estimatedValueMax: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  status: 'Pending' | 'Reviewing' | 'Qualified' | 'Completed';
  createdAt: string;
}

export const MATERIALS: Material[] = [
  {
    id: 'aluminum',
    name: 'Aluminum',
    category: 'Non-Ferrous',
    description: 'High-purity aluminum scrap ideal for smelting and reprocessing. Available in various grades including 6061 and 6063.',
    imageUrl: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=600&q=80',
    pricePerLbMin: 0.45,
    pricePerLbMax: 0.70,
    specifications: ['Grade 6061', 'Grade 6063', 'Clean extrusions', 'Low oil contamination']
  },
  {
    id: 'cast-aluminum',
    name: 'Cast Aluminum',
    category: 'Non-Ferrous',
    description: 'Engine blocks, transmission housings, and industrial cast aluminum components for remelting into new alloy products.',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
    pricePerLbMin: 0.35,
    pricePerLbMax: 0.55,
    specifications: ['Clean automotive casting', 'Iron attachments removed', 'No excessive oil/sludge', 'Various alloy types']
  },
  {
    id: 'iron-steel',
    name: 'Iron & Steel',
    category: 'Ferrous',
    description: 'Heavy melting scrap (HMS 1&2), shredded steel, and structural iron for electric arc furnaces and foundry use.',
    imageUrl: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=600&q=80',
    pricePerLbMin: 0.08,
    pricePerLbMax: 0.15,
    specifications: ['HMS 1 (Thickness > 1/4")', 'HMS 2 (Thickness > 1/8")', 'Shredded steel', 'Structural or plate scrap']
  },
  {
    id: 'condenser',
    name: 'Condenser',
    category: 'Industrial',
    description: 'Air-conditioning and refrigeration condensers with high copper-aluminum content for efficient material recovery.',
    imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
    pricePerLbMin: 1.20,
    pricePerLbMax: 1.80,
    specifications: ['Copper-aluminum coils', 'Cleaned or with ends', 'Iron attachments minimized', 'Refrigerant safely evacuated']
  },
  {
    id: 'ubc-cans',
    name: 'UBC (Used Beverage Cans)',
    category: 'Non-Ferrous',
    description: 'Baled used beverage cans — one of the most recycled aluminum products globally, ideal for remelting into new sheet material.',
    imageUrl: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=600&q=80',
    pricePerLbMin: 0.50,
    pricePerLbMax: 0.75,
    specifications: ['Baled or loose', 'Magnet checked', 'Moisture under 2%', 'Free of excessive trash/liquids']
  },
  {
    id: 'ferrous-metals',
    name: 'Ferrous Metals',
    category: 'Ferrous',
    description: 'Comprehensive range of iron-based scrap including structural steel, rebar, plate steel, and industrial equipment scrap.',
    imageUrl: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=600&q=80',
    pricePerLbMin: 0.06,
    pricePerLbMax: 0.12,
    specifications: ['Rebar bundles', 'Sheet metal scrap', 'Cast iron pipes', 'Industrial machinery frames']
  },
  {
    id: 'non-ferrous-metals',
    name: 'Non-Ferrous Metals',
    category: 'Non-Ferrous',
    description: 'Copper, brass, bronze, lead, and zinc in various forms — wires, pipes, fittings, and sheets — ready for processing.',
    imageUrl: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=600&q=80',
    pricePerLbMin: 1.80,
    pricePerLbMax: 2.90,
    specifications: ['Copper wires (#1 & #2)', 'Yellow/Red brass scrap', 'Lead battery terminals', 'Zinc sheets']
  },
  {
    id: 'vehicle-scrap',
    name: 'Vehicle Scrap Metals',
    category: 'Auto Scrap',
    description: 'End-of-life vehicles stripped and processed — engine blocks, body panels, axles, and mixed metal recovery from automotive sources.',
    imageUrl: 'https://images.unsplash.com/photo-1584467735871-8e9cb4573e6f?w=600&q=80',
    pricePerLbMin: 0.07,
    pricePerLbMax: 0.14,
    specifications: ['Drained liquids certificate', 'Engines separated', 'Catalytic converters removed', 'Mixed auto shred scrap']
  }
];
