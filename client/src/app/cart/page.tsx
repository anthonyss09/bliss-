"use client";
import Image from "next/image";
import ProductPreview from "../components/ProductPreview";
import { selectCartData } from "../../lib/features/cart/cartSlice";
import { useAppSelector } from "../../lib/hooks";
import Spinner from "../components/Spinner";
import CartHeader from "../components/CartHeader";

export default function CartPage() {
  const { cartData, cartCount, cartLoading } = useAppSelector(selectCartData);

  let items;
  let content;
  let subTotal = 0;
  let total = 0;
  let tax = 0;

  if (cartLoading) {
    content = <Spinner />;
  } else if (cartData && cartCount) {
    items = cartData.cart.lines.edges;
    if (items.length) {
      content = items.map((item: any) => {
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
    content = <div>No items in cart.</div>;
  }

  return (
    <div className=" mt-24 sm:mt-32 border-b-[#00000010] border-b-4 pb-8 mb-4 md:grid md:grid-cols-2 md:grid-rows-3 md:h-[600px] relative">
      {cartCount > 0 && (
        <CartHeader
          cartCount={cartCount}
          tax={tax}
          subTotal={subTotal}
          total={total}
        />
      )}
      <main>
        <section className="mx-4 sm:mx-8  md:h-[550px] md:mx-0 md:mr-8">
          <p className="mb-4 text-sm font-medium text-black/70  tracking-wide duration-100 sm:text-base">
            Items
          </p>
          <div className="min-h-[300px] flex flex-wrap justify-around gap-12 mb-8 py-4 border-b-2 border-t-2 border-[#00000005] md:py-4 md:border-b-[3px] md:border-t-[3px] md:h-[515px] md:overflow-scroll">
            {content}
          </div>
        </section>
      </main>
      <div className="h-[178px] w-full relative md:row-start-3">
        <Image
          src="/assets/images/serumGreenBG.jpeg"
          alt="bliss serum"
          fill
          className="px-4 sm:px-8"
        />
      </div>
    </div>
  );
}
