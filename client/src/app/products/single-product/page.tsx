"use client";
import { useSearchParams } from "next/navigation";
import { useGetProductQuery } from "../../../lib/features/products/productSlice";
import Image from "next/image";
import TryAgain from "../../components/TryAgain";
import Spinner from "../../components/Spinner";
import Carousel from "../../components/Carousel";
import Link from "next/link";

export default function SingleProduct() {
  const params = useSearchParams();
  const productId = params?.get("id");
  const { data, isLoading, isSuccess, refetch } = useGetProductQuery(productId);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <aside className={`sm:flex sm:items-center sm:gap-12 `}>
        <div className={`w-[300px] h-[300px] relative`}>
          {" "}
          <Image
            src="/assets/images/bottlesDouble.jpeg"
            alt="bliss bottles"
            fill
            sizes="(min-width:768px)  25vw,(min-width:1024px) 25vw, 300px"
          />
        </div>
        <div className="flex flex-col sm:w-[300px]">
          {" "}
          <h3 className={`font-medium text-lg mb-2`}>{data.product.title}</h3>
          <p className={`font-medium text-sm mb-2 text-black/70`}>
            {`${data.product.tags[0]} + ${data.product.tags[1]} + ${data.product.tags[2]}`}
          </p>
          <p className={`font-light text-sm mb-2`}>
            {data.product.productType}
          </p>
          <p className={`font-medium text-base mb-4`}>
            ${data.product.priceRange.maxVariantPrice.amount}
          </p>
          <p className="mb-4 text-sm">{data.product.description}</p>
          <button className="h-12 w-full font-semibold bg-[#0f7e7e70] hover:shadow-2xl hover:text-white hover:bg-[#0f7e7e]">
            Add to cart
          </button>
        </div>
      </aside>
    );
  } else {
    content = <TryAgain refetch={refetch} />;
  }

  return (
    <div className="mt-24 sm:mt-32">
      <header>
        {" "}
        <p className="ml-4 mb-8 mt-4 text-sm font-medium sm:text-sm tracking-wide sm:ml-8 sm:mt-8 sm:font-light">
          <Link
            href="/products/all-products"
            className="duration-300 hover:text-[#00000080] hover:font-semibold"
          >
            All Products
          </Link>{" "}
          / Single Product
        </p>
      </header>
      <main className="border-b-4 mb-8 border-[#00000005] ">
        {" "}
        <div className="min-h-[300px] flex justify-center mb-12 sm:justify-start">
          {content}
        </div>
        <div>
          <h3 className="ml-4 sm:ml-8 font-medium mb-8">You might also like</h3>
          <Carousel />
        </div>
      </main>
    </div>
  );
}
