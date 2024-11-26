interface args {
  cartId: string;
  merchandiseId: string;
  productTitle: string;
  variantTitle: string;
  featuredImageUrl: string;
  cartEdges: Array<any>;
  updateCartLine: (obj: any) => any;
}

export default async function removeCartItem({
  cartId,
  cartEdges,
  merchandiseId,
  productTitle,
  variantTitle,
  featuredImageUrl,
  updateCartLine,
}: args) {
  let lineId = null;
  let currentQuantity = 0;
  cartEdges.map((edge) => {
    if (edge.node.merchandise.id === merchandiseId) {
      lineId = edge.node.id;
      currentQuantity = edge.node.quantity;
    }
  });
  if (lineId) {
    console.log("update line");
    updateCartLine({
      cartId,
      lineId,
      productTitle,
      variantTitle,
      featuredImageUrl,
      merchandiseId,
      quantity: currentQuantity - 1,
      message: "Item removed from cart!",
    });
  }
  return;
}
