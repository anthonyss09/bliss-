export interface productEdge {
  node: {
    priceRange: {
      maxVariantPrice: { amount: string };
    };
    tags: [string, string, string];
    title: string;
    productType: string;
    id: string;
    featuredImage: { url: string };
    variants: { nodes: [{ id: string }] };
  };
}
