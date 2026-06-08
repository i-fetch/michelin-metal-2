// // lib/productCategories.ts

// export const PRODUCT_CATEGORIES = [
//   {
//     id: 'aluminium',
//     label: 'Aluminium',
//     accent: '#16a34a',
//     icon: '🔩',
//     subcategories: [
//       'Profile', 'UBC', 'Soft Aluminum', 'Zinc', 'Radiator',
//       'Rim', 'Printing & Letto Sheets', 'Chaff', 'Cast Aluminum',
//     ],
//   },
//   {
//     id: 'metals',
//     label: 'Metals',
//     accent: '#0284c7',
//     icon: '⚙️',
//     subcategories: ['Copper', 'Brass', 'Radiator Brass', 'Lead', 'Battery Scrap'],
//   },
//   {
//     id: 'ferrous',
//     label: 'Ferrous Metals',
//     accent: '#dc2626',
//     icon: '🏗️',
//     subcategories: ['HMS 1 & 2', 'Steel Scrap', 'Cast Iron', 'Heavy Melting Scrap', 'Machinery Scrap'],
//   },
//   {
//     id: 'non-ferrous',
//     label: 'Non-Ferrous',
//     accent: '#d97706',
//     icon: '✨',
//     subcategories: ['Copper Wire', 'Aluminum Ingots', 'Zinc Scrap', 'Lead Ingots', 'Brass Scrap'],
//   },
//   {
//     id: 'bulk',
//     label: 'Bulk Supply',
//     accent: '#7c3aed',
//     icon: '📦',
//     subcategories: ['Industrial Bulk Orders', 'Container Supply', 'Export Supply', 'Factory Supply Contracts'],
//   },
// ] as const

// export type ProductCategory = typeof PRODUCT_CATEGORIES[number]['id']

// export const PRODUCT_CATEGORY_MAP = Object.fromEntries(
//   PRODUCT_CATEGORIES.map(c => [c.id, c])
// ) as Record<ProductCategory, typeof PRODUCT_CATEGORIES[number]>

// export const PRODUCT_CATEGORY_BADGE: Record<ProductCategory, { bg: string; color: string }> = {
//   aluminium:    { bg: 'rgba(22,163,74,0.12)',  color: '#16a34a' },
//   metals:       { bg: 'rgba(2,132,199,0.12)',  color: '#0284c7' },
//   ferrous:      { bg: 'rgba(220,38,38,0.12)',  color: '#dc2626' },
//   'non-ferrous':{ bg: 'rgba(217,119,6,0.12)',  color: '#d97706' },
//   bulk:         { bg: 'rgba(124,58,237,0.12)', color: '#7c3aed' },
// }

// export const UNIT_TYPES = [
//   'Metric Tons', 'Tons', 'Kilograms', 'Containers', 'Bales',
//   'Drums', 'Pallets', 'Pieces', 'Lots',
// ] as const

// export const CURRENCIES = ['USD', 'NGN', 'EUR', 'GBP'] as const

// export const PACKAGING_TYPES = [
//   'Loose', 'Baled', 'Briquetted', 'Drummed', 'Palletized',
//   'Containerized', 'Bulk', 'Custom',
// ] as const


