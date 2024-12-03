"use client";
import { useSearchParams } from "next/navigation";
import { useGetProductQuery } from "../../../lib/features/products/productSlice";
import TryAgain from "../../components/TryAgain";
import Spinner from "../../components/Spinner";
import Carousel from "../../components/Carousel";
import Link from "next/link";
import SingleProduct from "../../components/SingleProduct";
import { Suspense } from "react";

function SuspensefulSingleProduct() {
  const params = useSearchParams();
  const productId = params?.get("id");
  const { data, isLoading, isSuccess, refetch } = useGetProductQuery(productId);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = <SingleProduct product={data.product} />;
  } else {
    content = <TryAgain refetch={refetch} />;
  }
  return <div>{content}</div>;
}

export default function SingleProductPage() {
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
          <Suspense>
            <SuspensefulSingleProduct />
          </Suspense>
        </div>
        <div>
          <h3 className="ml-4 sm:ml-8 font-medium mb-8">You might also like</h3>
          <Carousel />
        </div>
      </main>
    </div>
  );
}
