"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";

export default function Carousel() {
  const slidesArray = [1, 2, 3, 4, 5, 6, 7, 8];

  const [position, setPosition] = useState(0);

  const windowWidthRef = useRef<number>(0);
  const [windowWidth, setWindowWidth] = useState(windowWidthRef.current);

  const slides = (
    <div id="slider" className={`shrink-0 duration-300 flex relative`}>
      {slidesArray.map((slide, index) => {
        return (
          <div key={index}>
            <ProductPreview
              size="fit"
              title="Best Seller"
              productType="Body Lotion"
              price="40.00"
              profile="Basil + Kiwi + Coriander"
            />
          </div>
        );
      })}
    </div>
  );

  function slideLeft() {
    if (position === 0) {
      return;
    }
    var distance = "-" + ((position - 1) * 100).toString() + "vw";
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
    let distance = "-" + ((position + 1) * 100).toString() + "vw";
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
        {slides}
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
          src="/assets/svgs/chevronBlackright.svg"
          alt="chevron arrow right"
          height={30}
          width={17}
        />
      </button>
    </div>
  );
}
