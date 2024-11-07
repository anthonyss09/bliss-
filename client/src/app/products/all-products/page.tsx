"use client";
import ProductPreview from "../../components/ProductPreview";
import Pagination from "../../components/Pagination";
import { useGetProductsQuery } from "../../../lib/features/products/productSlice";
import { useState, useRef } from "react";
import { getProductsArgs } from "../../../lib/features/products/types";
import Spinner from "../../components/Spinner";
import TryAgain from "../../components/TryAgain";
import Link from "next/link";

export default function AllProducts() {
  const [productArgs, setProductArgs] = useState<getProductsArgs>({
    first: 10,
    after: null,
    before: null,
    last: null,
  });
  const afterRef = useRef(null);
  const beforeRef = useRef(null);
  const pageNumberRef = useRef(1);

  const { data, isSuccess, isLoading, refetch } =
    useGetProductsQuery(productArgs);

  const { pageInfo, edges: products } = isSuccess
    ? data.products
    : { pageInfo: null };

  const { hasNextPage, hasPreviousPage } = isSuccess
    ? pageInfo
    : { hasNextPage: null, hasPreviousPage: null };

  if (isSuccess) {
    afterRef.current = products[products.length - 1].cursor;
    beforeRef.current = products[0].cursor;
  }

  function getNextProducts() {
    pageNumberRef.current++;
    setProductArgs({
      first: 10,
      after: afterRef.current,
      before: null,
      last: null,
    });
    window.scrollTo(0, 0);
  }

  function getPreviousProducts() {
    pageNumberRef.current--;
    setProductArgs({
      first: null,
      after: null,
      before: beforeRef.current,
      last: 10,
    });
    window.scrollTo(0, 0);
  }

  let content;
  if (isLoading) {
    content = (
      <div>
        <Spinner />
      </div>
    );
  } else if (isSuccess) {
    content = products.map((product: any) => {
      const { title, tags, productType, id } = product.node;
      const profile = `${tags[0]} + ${tags[1]} + ${tags[2]}`;
      const price = product.node.priceRange.maxVariantPrice.amount;
      return (
        <ProductPreview
          size=""
          key={product.node.id}
          title={title}
          profile={profile}
          price={price}
          productType={productType}
          id={id}
        />
      );
    });
  } else {
    content = <TryAgain refetch={refetch} />;
  }

  return (
    <div className="mt-24 sm:mt-32">
      <header>
        <p className="ml-4 mb-8 text-sm font-medium sm:text-sm tracking-wide sm:ml-8 sm:font-light">
          <Link
            href="/"
            className="duration-300 hover:text-[#00000080] hover:font-semibold"
          >
            Home
          </Link>{" "}
          / All Products
        </p>
      </header>
      <main className="border-b-4 pt-8 mb-4 border-[#00000005] border-t-2">
        <div className="min-h-[300px] w-full flex flex-wrap justify-center gap-16 mb-4 sm:gap-12 md:gap-16 lg:gap-20">
          {content}
        </div>
        <div className="w-full border-[#00000005] border-t-2 py-4">
          <Pagination
            getNextProducts={getNextProducts}
            getPreviousProducts={getPreviousProducts}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            pageNumber={pageNumberRef.current}
          />
        </div>
      </main>
    </div>
  );
}
