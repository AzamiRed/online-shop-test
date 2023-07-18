export type RegularPriceType = {
  currency: string;
  value: number;
}

export type Product = {
  type: string;
  title: string;
  sku: string;
  image: string;
  brand: number;
  id: number;
  regularPrice: RegularPriceType;
  length: number;
  count: number;
  brandName?: string;
};