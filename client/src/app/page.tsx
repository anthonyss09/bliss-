"use client";
import Image from "next/image";
import Link from "next/link";
import Carousel from "./components/Carousel";
import { useEffect, useState } from "react";

export default function Home() {
  const [divGrey, setDivGrey] = useState(false);
  const [brightBlueBG, setBrightBlueBG] = useState(false);

  function handleScroll(e: any) {
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
    <div className={`w-screen mt-24 `}>
      <header className="px-4 mb-0  relative md:mb-0 md:px-8 lg:px-12">
        <div className="h-[345px] w-full relative sm:h-[527px] md:h-[610px] lg:h-[610px] lg:w-[80vw] lg:mx-auto">
          <Image
            src="/assets/images/mainHeaderImg.png"
            alt="bliss bottles"
            fill
            sizes="(min-width:640px) 608px,(min-width:768px) 704px,(min-width:1024px) 704px, 398px"
          />
        </div>
        <Link href="/products/all-products">
          <div className="h-12 text-[15px] font-semibold text-[#190B72] tracking-wide grid place-items-center border-2 border-[#190B72] w-[192px] absolute left-1/2 top-[180px] sm:top-1/2 translate-x-[-50%] translate-y-[-50%] bg-white/70 shadow-lg hover:bg-black hover:text-white">
            Shop Collection
          </div>
        </Link>
      </header>

      <main>
        <section id="section-about" className={`px-4 md:px-0 md:mb-0 md:flex`}>
          <div
            id="serum-green-image"
            className={`h-[195px] w-full mb-8 relative shadow-sm sm:h-[297px] md:h-[187] md:w-1/2 md:mb-0 lg:h-[228]`}
          >
            <Image
              src="/assets/images/serumGreenBG.jpeg"
              alt="serum"
              fill
              sizes="(min-width:640px) 608px,(min-width:1024px) 466px,398px"
              className=""
            />
          </div>
          <div
            id="div-about"
            className=" flex flex-col justify-center md:w-1/2 md:px-8 "
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
              <div className="h-[48px] w-[128px] grid place-items-center bg-[#d1a7fc] md:w-1/2 shadow-md">
                <p className="font-medium text-[15px] text-white">Learn More</p>
              </div>
            </Link>
          </div>
        </section>

        <section
          id="section-images"
          className={` md:flex md:rows md:mb-0 duration-500 ease-in-out ${
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
              divGrey ? "bg-black/10" : "bg-white"
            } py-4 sm:py-8 lg:mx-24  duration-500 ease-in-out`}
          >
            <Link href="/products/all-products">
              <div className="h-12 w-32 border-2 bg-white border-blue-dark mx-auto grid place-items-center tracking-wide text-sm font-medium hover:bg-black hover:border-0 hover:text-white">
                Shop Collection
              </div>
            </Link>
          </div>
        </section>

        <section className="bg-[#D1A7FC] p-16 mb-12 flex flex-col md:flex-row md:items-center lg:mx-24">
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
            <p className="font-medium text-lg text-white mb-4 md:w-[296px]">
              We cherish our relationship with the environment. Learn about our
              commitment to sustainability.
            </p>
            <Link href="#">
              <div className="h-12 w-[192px] w-full bg-[#EBDAFB] grid place-items-center mr-auto shadow-md">
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
