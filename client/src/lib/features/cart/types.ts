export interface cartLinesAddArgs {
  cartId: string;
  quantity: number;
  productTitle: string;
  variantTitle: string;
  productImageUrl: string;
  merchandiseId: string;
}

export interface updateCartLineArgs {
  cartId: string;
  lineId: string;
  quantity: number;
  productTitle: string;
  productImageUrl: string;
  variantTitle: string;
}
