export interface Variant {
  id: number;
  attributes: Record<string, any>;
  price: number;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  variants: Variant[];
}