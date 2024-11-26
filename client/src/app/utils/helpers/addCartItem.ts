interface args {
  cartId: string;
  merchandiseId: string;
  productTitle: string;
  variantTitle: string;
  featuredImageUrl: string;
  cartEdges: Array<any>;
  createCart: (obj: any) => any;
  addCartLine: (obj: any) => any;
  updateCartLine: (obj: any) => any;
}

export default async function addCartItem({
  cartId,
  cartEdges,
  merchandiseId,
  productTitle,
  variantTitle,
  featuredImageUrl,
  createCart,
  addCartLine,
  updateCartLine,
}: args) {
  if (cartId === "gid://shopify/Cart/null") {
    const cart = await createCart({
      merchandiseId,
      productTitle,
      variantTitle,
      featuredImageUrl,
    });
  } else {
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
        quantity: currentQuantity + 1,
        message: "Item added to cart!",
      });
    } else {
      console.log("add line");
      const res = await addCartLine({
        cartId,
        productTitle,
        variantTitle,
        featuredImageUrl,
        merchandiseId,
        quantity: 1,
      });
      console.log(res);
    }
  }

  return;
}
