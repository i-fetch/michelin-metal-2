// types/index.ts
export interface IProductSpecs {
  grade?: string;
  form?: string;
  purity?: string;
  source?: string;
  hazardCompliance?: string;
  zincContent?: string;
  [key: string]: string | undefined;
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: {
    name: string; // e.g., "ALUMINIUM", "NON-FERROUS"
    slug: string;
  };
  badge?: string; // e.g., "Most Requested", "Premium", "Available"
  specs: IProductSpecs;
  moq: {
    value: number;
    unit: "kg" | "tonne";
  };
  applications: string[];
  images: string[]; // ◄ Changed from image?: string to an array of strings
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

