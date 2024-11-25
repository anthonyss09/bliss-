import { AppDispatch } from "../../../lib/store";
import {
  clearAlert,
  showAlert,
} from "../../../lib/features/alerts/alertsSlice";

interface args {
  cartId: string;
  merchandiseId: string;
  productTitle: string;
  variantTitle: string;
  featuredImageUrl: string;
  cartEdges: Array;
  dispatch: AppDispatch;
  createCart: () => any;
  addCartLine: () => any;
}

export default async function addCartItem({
  cartId,
  cartEdges,
  merchandiseId,
  productTitle,
  variantTitle,
  featuredImageUrl,
  dispatch,
  createCart,
  addCartLine,
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
    cartEdges.map((edge) => {
      if (edge.node.merchandise.id === merchandiseId) {
        lineId = edge.node.id;
      }
    });
    if (lineId) {
      console.log("update line");
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
