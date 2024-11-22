"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCreateCartMutation,
  selectCartData,
} from "../../lib/features/cart/cartSlice";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { showAlert, clearAlert } from "../../lib/features/alerts/alertsSlice";

interface props {
  id: string;
  size: string;
  title: string;
  profile: string;
  productType: string;
  price: string;
  merchandiseId: string;
  featuredImageUrl: string;
  quantity: number;
}

export default function ProductPreview({
  id,
  size,
  title,
  profile,
  productType,
  price,
  merchandiseId,
  featuredImageUrl,
  quantity,
}: props) {
  var fit = true;
  if (size != "fit") {
    fit = false;
  }

  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [createCart] = useCreateCartMutation();
  const { cartData, cartId } = useAppSelector(selectCartData);

  async function addCartItem() {
    if (cartId === "gid://shopify/Cart/null") {
      const cart = await createCart({
        merchandiseId: merchandiseId,
        productTitle: title,
        variantTitle: title,
        featuredImageUrl: featuredImageUrl,
      }).then(() => {
        dispatch(
          showAlert({
            alertMessage: "Item added to cart!",
            alertType: "success",
          })
        );
      });
    } else {
      //add item to cart lines
    }
    setTimeout(() => {
      dispatch(clearAlert(null));
    }, 3000);
    return;
  }

  return (
    <aside className={`${fit ? "w-[50vw] md:w-[25vw]" : "w-[125px]"}`}>
      {pathname !== "/cart" && (
        <button
          onClick={addCartItem}
          className="opacity-40 ml-4 hover:opacity-100"
        >
          {" "}
          <Image
            src="/assets/svgs/fastCart.svg"
            alt="add to cart"
            height={30}
            width={30}
          />
        </button>
      )}

      <Link href={`/products/single-product?id=${id}`}>
        <div
          className={`${
            fit ? "w-full h-[215px]" : "w-[125px] h-[125px]"
          } relative mx-auto`}
        >
          {" "}
          <Image
            src={featuredImageUrl}
            alt="bliss bottles"
            fill
            sizes="(min-width:768px)  25vw,(min-width:1024px) 25vw, 50vw"
          />
        </div>
        <div className="flex flex-col items-center">
          {" "}
          <h3 className={`font-medium text-[15px] mb-[1px] text-center`}>
            {title}
          </h3>
          <p
            className={`font-medium text-sm mb-[1px] text-black/70 text-center`}
          >
            {profile}
          </p>
          <p className={`font-light text-sm mb-2`}>{productType}</p>
          <p className={`font-medium text-sm mb-4`}>${price}</p>{" "}
        </div>
      </Link>
      {pathname === "/cart" && (
        <div className="flex items-center justify-center gap-4">
          <button className="h-[28px] w-[28px] font-semibold bg-[#00000010] hover:bg-black/50 hover:text-white">
            -
          </button>
          <p className="text-sm font-bold">{quantity}</p>
          <button
            onClick={addCartItem}
            className="h-[28px] w-[28px] font-semibold bg-[#00000010] hover:bg-black/70 hover:text-white"
          >
            +
          </button>
        </div>
      )}
    </aside>
  );
}
