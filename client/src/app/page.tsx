"use client";
import Image from "next/image";
import Link from "next/link";
import Carousel from "./components/Carousel";
import { useEffect, useState } from "react";

export default function Home() {
  const [divGrey, setDivGrey] = useState(false);
  const [brightBlueBG, setBrightBlueBG] = useState(false);

  function handleScroll() {
    if (typeof window !== "undefined") {
      if (window.scrollY > 768) {
        setBrightBlueBG(true);
      } else {
        setBrightBlueBG(false);
      }
      if (window.scrollY > 1200) {
        setDivGrey(true);
        setBrightBlueBG(false);
      } else {
        setDivGrey(false);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`w-screen mt-28 `}>
      <header className="px-4 mb-0  relative md:mb-0 md:px-8 lg:px-12">
        <div className="h-[200px] w-full relative sm:h-[320px] md:h-[400px]  lg:w-[80vw] lg:mx-auto">
          <Image
            src="/assets/images/bck.png"
            alt="bliss bottles"
            fill
            sizes="(min-width:640px) 608px,(min-width:768px) 704px,(min-width:1024px) 704px, 398px"
          />
        </div>
        <p className="w-[300px] ml-[50%] mb-4 translate-x-[-50%] z-20 text-center font-extralight text-[#190b72] text-2xl">
          Find bliss<span className="text-[#3111f3] font-light">+</span> more
          through skincare.
        </p>
        <Link href="/products/all-products">
          <div className="h-12 mb-8 w-[192px] text-[15px] text-[#190b72] font-medium bg-[#0f7e7e40] tracking-wide grid place-items-center border-[#190b72] border-2 ml-[50%] translate-x-[-50%] hover:bg-[#d1a7fc30]  shadow-sm">
            Shop Collection
          </div>
        </Link>
      </header>

      <main>
        <section
          id="section-about"
          className={`px-4 mb-8 md:px-0 md:mb-0 md:flex md:gap-4`}
        >
          <div
            id="serum-green-image"
            className={`h-[140px] w-full mb-12 relative  sm:h-[180px] md:h-[140px] md:w-1/2 `}
          >
            <Image
              src="/assets/images/colors.jpeg"
              alt="serum"
              fill
              sizes="(min-width:640px) 608px,(min-width:1024px) 466px,398px"
              className=""
            />
          </div>
          <div
            id="div-about"
            className=" flex flex-col justify-center md:w-1/2 md:px-8 md:mb-8 "
          >
            {" "}
            <h3 className="font-medium mb-4  text-xl sm:text-2xl">
              How does bliss+ approach skin wellness?
            </h3>
            <p className="font-light  text-[15px] mb-8 sm:text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
              dicta delectus harum maxime in at nemo commodi inventore eum
              placeat?
            </p>
            <Link href="#">
              <div className="h-[48px] w-[128px] grid place-items-center  bg-[#d1a7fc30] hover:bg-[#d1a7fc80] bg-[#d1a7fc] md:w-1/2 shadow-md">
                <p className="font-medium text-[15px] text-[#190b72]">
                  Learn More
                </p>
              </div>
            </Link>
          </div>
        </section>

        <section
          id="section-images"
          className={`mb-8 md:flex md:rows duration-500 ease-in-out ${
            brightBlueBG ? "bg-[#2b9df0]" : "bg-white"
          }`}
        >
          {" "}
          <div className="w-full py-8 md:w-[50%] md:py-auto">
            {" "}
            <div
              id="jasmine-flower-image"
              className={`w-[205px] h-[205px] relative mx-auto `}
            >
              <Image
                src="/assets/images/blissFlower.jpeg"
                alt="jasmine flower"
                fill
                sizes="(min-width:768px) 178px, (min-width:1024px) 205px,205px"
              />
            </div>
          </div>
          <div
            id="image-milk"
            className="w-full h-[189px] relative sm:h-[270px] md:w-1/2 "
          >
            <Image
              src="/assets/images/milk.jpeg"
              alt="milk & blue bowls"
              fill
            />
          </div>
        </section>

        <section id="section-best-selling" className="mb-4">
          <h3
            className={`w-[110px] h-[48px] text-lg font-medium ml-4 mb-8 sm:w-[140px] pt-[8px] sm:text-xl md:w-[192px] md:text-center md:ml-[25%] md:translate-x-[-50%] lg:text-[22px] duration-500 ease-in-out ${
              brightBlueBG
                ? "bg-[#2b9df0] w-[192px] text-center text-white"
                : "bg-white"
            }`}
          >
            <p> Best Selling</p>
          </h3>
          <Carousel />
          <div
            className={`${
              divGrey ? "bg-black/20" : "bg-white"
            } py-4 sm:py-8 lg:mx-24  duration-500 ease-in-out`}
          >
            <Link href="/products/all-products">
              <div className="h-12 w-40 border-2 bg-white border-blue-dark mx-auto grid place-items-center tracking-wide text-sm font-medium hover:bg-black hover:border-0 hover:text-white">
                Shop Collection
              </div>
            </Link>
          </div>
        </section>

        <section className="bg-[#ebdafb] p-16 mb-12 flex flex-col md:flex-row md:items-center lg:mx-24">
          <div className="w-[166px] h-[111px] relative mx-auto mb-8 sm:h-[150px] sm:w-[200px] md:h-[129px] md:w-[192px] lg:h-[161.25px] md:w-[240px]">
            <Image
              src="/assets/images/basil.png"
              alt="basil"
              fill
              sizes="(min-width:640px) 256px,(min-width:768px) 192px,(min-width:1024px) 240px, 192px"
            />
          </div>
          <div className="sm:px-8 md:px-0">
            {" "}
            <p className="font-regular text-lg text-black/60 mb-4 md:w-[296px]">
              We cherish our relationship with the environment. Learn about our
              commitment to sustainability.
            </p>
            <Link href="#">
              <div className="h-12 w-[192px] w-full bg-[#d1a7fc] grid place-items-center mr-auto shadow-md">
                {" "}
                <p className="font-bold text-base text-white text-right">
                  Learn More
                </p>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
