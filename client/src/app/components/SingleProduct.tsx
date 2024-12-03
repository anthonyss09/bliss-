import Image from "next/image";
import {
  useCreateCartMutation,
  selectCartData,
  useAddCartLineMutation,
  useUpdateCartLineMutation,
} from "../../lib/features/cart/cartSlice";
import { useAppSelector } from "../../lib/hooks";
import addCartItem from "../utils/helpers/addCartItem";
import {
  CreateCartArgs,
  AddCartLineArgs,
  UpdateCartLineArgs,
} from "../../lib/features/cart/types";

interface Props {
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

export default function SingleProduct({ product }: Props) {
  const [createCart] = useCreateCartMutation();
  const [addCartLine] = useAddCartLineMutation();
  const [updateCartLine] = useUpdateCartLineMutation();
  const { cartData, cartId } = useAppSelector(selectCartData);
  async function handleCreateCart(args: CreateCartArgs) {
    await createCart(args);
  }
  async function handleAddCartLine(args: AddCartLineArgs) {
    await addCartLine(args);
  }
  async function handleUpdateCartLine(args: UpdateCartLineArgs) {
    await updateCartLine(args);
  }
  const {
    cart: {
      lines: { edges: cartEdges },
    },
  } = cartData;
  console.log("the edges", cartEdges);

  return (
    <aside className={`sm:flex sm:items-center sm:gap-12 `}>
      <div className={`w-[300px] h-[300px] relative`}>
        {" "}
        <Image
          priority={true}
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
          ${Number(product.priceRange.maxVariantPrice.amount).toFixed(0)}
        </p>
        <p className="mb-4 text-sm">{product.description}</p>
        <button
          onClick={() => {
            addCartItem({
              createCart: handleCreateCart,
              addCartLine: handleAddCartLine,
              updateCartLine: handleUpdateCartLine,
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
