import {
  AddCartLineArgs,
  CreateCartArgs,
  UpdateCartLineArgs,
  CartItem,
} from "../../../lib/features/cart/types";

interface args {
  cartId: string;
  merchandiseId: string;
  productTitle: string;
  variantTitle: string;
  featuredImageUrl: string;
  cartEdges: Array<CartItem>;
  createCart: (args: CreateCartArgs) => void;
  addCartLine: (args: AddCartLineArgs) => void;
  updateCartLine: (args: UpdateCartLineArgs) => void;
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
    createCart({
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
      addCartLine({
        cartId,
        productTitle,
        variantTitle,
        featuredImageUrl,
        merchandiseId,
        quantity: 1,
      });
    }
  }

  return;
}
