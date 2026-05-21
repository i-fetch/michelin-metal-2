export interface IProduct {
  _id: string
  title: string
  slug: string
  image: string
  shortDescription: string
  fullDescription: string
  specs: string[]
  applications: string[]
  category: 'aluminium' | 'ferrous' | 'non-ferrous' | 'bulk'
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface IAdmin {
  _id: string
  email: string
  password: string
  role: 'admin'
  createdAt: string
}

export type ActionResult<T = void> =
  | { success: true; data?: T; message?: string }
  | { success: false; error: string }
