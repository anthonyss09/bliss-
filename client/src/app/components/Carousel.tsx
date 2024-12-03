"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import { useGetProductsQuery } from "../../lib/features/products/productSlice";
import Spinner from "./Spinner";
import { ProductsEdge } from "../../lib/features/products/types";

export default function Carousel() {
  let bestSellers = [];
  let content;
  const { data, isSuccess, isLoading } = useGetProductsQuery({
    first: 8,
    after: null,
    before: null,
    last: null,
  });
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    const {
      products: { edges },
    } = data;
    bestSellers = edges;
    content = (
      <div id="slider" className={`shrink-0 duration-300 flex relative`}>
        {bestSellers.map((product: ProductsEdge) => {
          return (
            <div key={product.node.id}>
              <ProductPreview
                size="fit"
                title={product.node.title}
                productType={product.node.productType}
                price={product.node.priceRange.maxVariantPrice.amount}
                profile={
                  product.node.tags[0] +
                  "+" +
                  product.node.tags[1] +
                  "+" +
                  product.node.tags[2]
                }
                id={product.node.id}
                featuredImageUrl={product.node.featuredImage.url}
                merchandiseId={product.node.variants.nodes[0].id}
                quantity={1}
              />
            </div>
          );
        })}
      </div>
    );
  }

  const [position, setPosition] = useState(0);

  const windowWidthRef = useRef<number>(0);
  const [windowWidth, setWindowWidth] = useState(windowWidthRef.current);

  function slideLeft() {
    if (position === 0) {
      return;
    }
    const distance = "-" + ((position - 1) * 100).toString() + "vw";
    const el = document.getElementById("slider");
    if (el) {
      el.style.transform = `translateX(${distance})`;
    }
    setPosition(position - 1);
  }

  function slideRight() {
    if ((windowWidthRef.current > 768 && position === 1) || position === 3) {
      return;
    }
    const distance = "-" + ((position + 1) * 100).toString() + "vw";
    const el = document.getElementById("slider");
    if (el) {
      el.style.transform = `translateX(${distance})`;
    }
    setPosition(position + 1);
  }

  function isOdd(num: number) {
    return num % 2;
  }

  function handleResize() {
    const el = document.getElementById("slider");
    let distance;
    if (windowWidthRef.current < 768 && window.innerWidth > 768) {
      const newPosition = Math.floor(position / 2);
      setPosition(newPosition);
      distance = "-" + (newPosition * 100).toString() + "vw";
      windowWidthRef.current = window.innerWidth;
      setWindowWidth(window.innerWidth);
      if (el) {
        el.style.transform = `translateX(${distance})`;
      }
    }
    if (windowWidthRef.current > 768 && window.innerWidth < 768) {
      let newPosition = position * 2;
      if (position !== 0 && !isOdd(position)) {
        newPosition = newPosition + 1;
      }
      setPosition(newPosition);
      distance = "-" + (newPosition * 100).toString() + "vw";
      windowWidthRef.current = window.innerWidth;
      setWindowWidth(window.innerWidth);
      if (el) {
        el.style.transform = `translateX(${distance})`;
      }
    }
  }

  useEffect(() => {
    windowWidthRef.current = window.innerWidth;
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="relative">
      <button
        onClick={slideLeft}
        className={`h-16 w-16 bg-white/60 grid place-items-center absolute z-10 top-1/2 translate-y-[-50%] left-0 ${
          position === 0 ? "opacity-20" : ""
        }`}
      >
        {" "}
        <Image
          src="/assets/svgs/chevronBlackLeft.svg"
          alt="chevron arrow left"
          height={30}
          width={17}
        />
      </button>
      <div id="view-port" className="w-screen overflow-hidden">
        {" "}
        {content}
      </div>

      <button
        onClick={slideRight}
        className={`h-16 w-16 bg-white/60 grid place-items-center absolute z-10 right-0 top-1/2 translate-y-[-50%] ${
          position >= 3 || (windowWidth >= 768 && position >= 1)
            ? "opacity-20"
            : ""
        }`}
      >
        {" "}
        <Image
          src="/assets/svgs/chevronBlackRight.svg"
          alt="chevron arrow right"
          height={30}
          width={17}
        />
      </button>
    </div>
  );
}
