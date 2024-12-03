export interface AddCartLineArgs {
  cartId: string;
  productTitle: string;
  variantTitle: string;
  featuredImageUrl: string;
  merchandiseId: string;
  quantity: number;
}

export interface AddCartLineResponse {
  cartId: string;
  lines: [
    {
      attributes: Array<{ key: string; value: string }>;
      merchandiseId: string;
      quatity: number;
    }
  ];
}

export interface CartItem {
  node: {
    id: string;
    quantity: number;
    merchandise: { id: string };
    attributes: Array<{ key: string; value: string }>;
  };
}

export interface CreateCartArgs {
  merchandiseId: string;
  productTitle: string;
  variantTitle: string;
  featuredImageUrl: string;
}

export interface UpdateCartLineArgs {
  cartId: string;
  productTitle: string;
  variantTitle: string;
  featuredImageUrl: string;
  lineId: string;
  merchandiseId: string;
  quantity: number;
  message: string;
}
