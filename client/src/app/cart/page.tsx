"use client";
import Image from "next/image";
import ProductPreview from "../components/ProductPreview";
import { selectCartData } from "../../lib/features/cart/cartSlice";
import { useAppSelector } from "../../lib/hooks";
import Spinner from "../components/Spinner";
import CartHeader from "../components/CartHeader";
import Link from "next/link";
import { CartItem } from "../../lib/features/cart/types";

export default function CartPage() {
  const { cartData, cartCount, cartLoading } = useAppSelector(selectCartData);
  const {
    cart: { checkoutUrl },
  } = cartData;
  let items;
  let content;
  let subTotal = 0;
  let total = 0;
  const tax = 0;

  if (cartLoading) {
    content = <Spinner />;
  } else if (cartData && cartCount) {
    items = cartData.cart.lines.edges;
    if (items.length) {
      content = items.map((item: CartItem) => {
        subTotal = cartData.cart.cost.subtotalAmount.amount;
        total = cartData.cart.cost.totalAmount.amount;
        subTotal = cartData.cart.cost.totalAmount.amount;

        const title = item.node.attributes[0].value;
        const featuredImageUrl = item.node.attributes[2].value;
        return (
          <ProductPreview
            key={item.node.merchandise.id}
            size=""
            title={title}
            profile=""
            productType=""
            price="40.00"
            id="111"
            merchandiseId={item.node.merchandise.id}
            featuredImageUrl={featuredImageUrl}
            quantity={item.node.quantity}
          />
        );
      });
    }
  } else {
    content = (
      <div className="my-auto mx-auto ">
        <p className="font-medium mb-4">No items in Cart.</p>
        <Link href="/products/all-products">
          <div className="h-12 w-32 border-2 bg-white border-blue-dark mx-auto grid place-items-center tracking-wide text-sm font-semibold hover:bg-black hover:border-0 hover:text-white">
            Go Shop
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-24 sm:mt-32 border-[#00000010] border-t-4 border-b-4 py-8 mb-4 md:grid md:grid-cols-2 md:grid-rows-3 md:h-[600px] relative">
      {cartCount > 0 && (
        <CartHeader
          cartCount={cartCount}
          tax={tax}
          subTotal={subTotal}
          total={total}
          checkoutUrl={checkoutUrl}
        />
      )}
      <main>
        <section className="mx-4 sm:mx-8  md:h-[550px] md:mx-0 md:mr-8">
          <p
            className={`mb-4 text-sm font-medium text-black/70  tracking-wide duration-100 sm:text-base ${
              cartCount === 0 ? "ml-8" : ""
            }`}
          >
            Items
          </p>
          <div
            className={`min-h-[300px] flex flex-wrap justify-around gap-12 mb-8 py-4 border-b-0 border-t-0 border-[#00000010] md:py-4 md:border-b-0 md:border-t-0 md:h-[515px] md:overflow-scroll  ${
              cartCount === 0 ? "w-screen" : ""
            }`}
          >
            {content}
          </div>
        </section>
      </main>
      <div
        className={`h-[140px] w-full relative md:row-start-3 ${
          cartCount === 0 ? "md:ml-[50%]" : ""
        }`}
      >
        <Image
          src="/assets/images/colors.jpeg"
          alt="bliss serum"
          fill
          className="px-4 sm:px-8"
        />
      </div>
    </div>
  );
}
