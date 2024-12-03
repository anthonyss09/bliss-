export interface getProductsArgs {
  first: number | null;
  last: number | null;
  after: string | null;
  before: string | null;
}

export interface ProductsEdge {
  cursor: string;
  node: {
    description: string;
    featuredImage: { url: string };
    id: string;
    priceRange: { maxVariantPrice: { amount: string } };
    productType: string;
    tags: Array<string>;
    title: string;
    variants: { nodes: Array<{ id: string }> };
  };
}
