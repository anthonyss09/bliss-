"use client";
import Image from "next/image";
import ProductPreview from "../components/ProductPreview";

export default function CartPage() {
  const arr = [1, 2, 3, 4];
  const products = arr.map((product, index) => {
    return (
      <ProductPreview
        key={index}
        size=""
        title="title"
        profile={"profile"}
        productType="type"
        price="40.00"
        id="111"
      />
    );
  });

  return (
    <div className="mt-24 sm:mt-32 border-b-[#00000010] border-b-4 pb-8 mb-4 md:grid md:grid-cols-2 md:grid-rows-3 md:h-[600px] relative">
      <header
        id="cart-header"
        className="w-[100%] px-4 pb-4 mb-4 bg-white z-[20] border-b-[#00000005] border-b-2 md:px-8 md:row-start-1 md:row-span-2 md:col-start-1"
      >
        <div
          id="cart-details"
          className="w-full overflow-hidden flex flex-col gap-[1px] md:h-[300px] md:justify-around"
        >
          <h1 className="mb-4 font-semibold text-lg   tracking-wide  sm:text-xl md:mb-8">
            Your shopping cart
          </h1>
          <span className="flex gap-2 mb-2">
            <p className="font-semibold text-sm sm:text-base">9</p>
            <p className="font-light text-sm sm:text-base">items in cart</p>
          </span>
          <div className="w-full flex justify-between">
            <p className="font-medium text-black/70 text-sm sm:text-base">
              Cart subtotal:
            </p>
            <p className="font-medium text-sm sm:text-base">value</p>
          </div>
          <div className="w-full flex justify-between">
            <p className="font-medium text-black/70 text-sm sm:text-base">
              Estimated Delivery:
            </p>
            <p className="font-medium text-sm sm:text-base">value</p>
          </div>
          <div className="w-full flex justify-between text-sm sm:text-base">
            <p className="font-medium text-black/70 text-sm sm:text-base">
              Tax:
            </p>
            <p className="font-medium text-sm sm:text-base">value</p>
          </div>
          <div className="w-full flex justify-between mb-4 ">
            <p className="font-semibold sm:text-lg">Total:</p>
            <p className="font-semibold sm:text-lg">value</p>
          </div>
          <button className="h-12 w-full bg-[#bed3fb] hover:bg-[#2b9df0] hover:text-white font-semibold tracking-wide">
            Checkout
          </button>
        </div>
      </header>
      <main>
        <section className="mx-4 sm:mx-8  md:h-[550px] md:mx-0 md:mr-8">
          <p className="mb-4 text-sm font-medium text-black/70  tracking-wide duration-100 sm:text-base">
            Items
          </p>
          <div className="flex flex-wrap justify-around gap-12 mb-8 py-4 border-b-2 border-t-2 border-[#00000005] md:py-4 md:border-b-[3px] md:border-t-[3px] md:h-[515px] md:overflow-scroll">
            {products}
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
