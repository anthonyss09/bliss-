import Image from "next/image";
import {
  useCreateCartMutation,
  selectCartData,
  useAddCartLineMutation,
} from "../../lib/features/cart/cartSlice";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { showAlert, clearAlert } from "../../lib/features/alerts/alertsSlice";
import addCartItem from "../utils/helpers/addCartItem";

interface props {
  product: {
    tags: [string, string, string];
    title: string;
    productType: string;
    description: string;
    variants: { nodes: [{ id: string }] };
    featuredImage: {
      url: string;
    };
    priceRange: {
      maxVariantPrice: {
        amount: string;
      };
    };
  };
}

export default function SingleProduct({ product }: props) {
  const [createCart] = useCreateCartMutation();
  const [addCartLine] = useAddCartLineMutation();
  const { cartData, cartId } = useAppSelector(selectCartData);
  const {
    cart: {
      lines: { edges: cartEdges },
    },
  } = cartData;
  const dispatch = useAppDispatch();

  // async function addCartItem() {
  //   if (cartId === "gid://shopify/Cart/null") {
  //     const cart = await createCart({
  //       merchandiseId: product.variants.nodes[0].id,
  //       productTitle: product.title,
  //       variantTitle: product.title,
  //       featuredImageUrl: product.featuredImage.url,
  //     }).then(() => {
  //       dispatch(
  //         showAlert({
  //           alertMessage: "Item added to cart!",
  //           alertType: "success",
  //         })
  //       );
  //     });
  //   } else {
  //   }
  //   setTimeout(() => {
  //     dispatch(clearAlert(null));
  //   }, 3000);
  //   return;
  // }
  return (
    <aside className={`sm:flex sm:items-center sm:gap-12 `}>
      <div className={`w-[300px] h-[300px] relative`}>
        {" "}
        <Image
          src={product.featuredImage.url}
          alt="bliss bottles"
          fill
          sizes="(min-width:768px)  25vw,(min-width:1024px) 25vw, 300px"
        />
      </div>
      <div className="flex flex-col sm:w-[300px]">
        {" "}
        <h3 className={`font-medium text-lg mb-2`}>{product.title}</h3>
        <p className={`font-medium text-sm mb-2 text-black/70`}>
          {`${product.tags[0]} + ${product.tags[1]} + ${product.tags[2]}`}
        </p>
        <p className={`font-light text-sm mb-2`}>{product.productType}</p>
        <p className={`font-medium text-base mb-4`}>
          ${product.priceRange.maxVariantPrice.amount}
        </p>
        <p className="mb-4 text-sm">{product.description}</p>
        <button
          onClick={() => {
            addCartItem({
              dispatch,
              createCart,
              addCartLine,
              cartId,
              cartEdges,
              merchandiseId: product.variants.nodes[0].id,
              variantTitle: product.title,
              productTitle: product.title,
              featuredImageUrl: product.featuredImage.url,
            });
          }}
          className="h-12 w-full font-semibold bg-[#0f7e7e70] hover:shadow-2xl hover:text-white hover:bg-[#0f7e7e]"
        >
          Add to cart
        </button>
      </div>
    </aside>
  );
}
