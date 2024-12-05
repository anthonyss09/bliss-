import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mt-32 px-4">
      <header className="mb-12">
        {" "}
        <p className="w-[300px] ml-[50%] translate-x-[-50%] z-20 text-center font-extralight text-[#190b72] text-2xl">
          Find bliss<span className="text-[#3111f3] font-light">+</span> more
          through skincare.
        </p>
      </header>
      <main className="mb-4 border-b-4 border-b-[#00000010] flex flex-col gap-8">
        <section className="mb-8 md:flex md:items-end">
          <div className="md:w-1/2">
            <div className="h-16 mb-4 px-4 bg-[#B3AFFB90] rounded-2xl grid items-center">
              <p>How does bliss+ approach skin wellness?</p>
            </div>

            <p className="px-4 font-light text-sm text-black">
              {" "}
              Our greatest state of being is bliss, but on a daily basis we
              might benefit from a little more.
              <br />
              <br />
              On occasion we might strive for Focus, on another a boost of
              Confidence.
              <br />
              <br />
              That&apos;s why bliss+ approaches skin wellness comprehensively,
              taking into account our state of being as a whole. Each one of our
              products has an energy and intention behind it&apos;s development
              to meet your daily needs.
            </p>
          </div>
          <div className="md:w-1/2">
            {" "}
            <div className="h-[200px] w-full relative sm:h-[320px] md:h-[200px]  lg:mx-auto">
              <Image
                src="/assets/images/bck.png"
                alt="bliss bottles"
                fill
                sizes="(min-width:768px) 50vw, 100vw"
              />
            </div>
            <Link href="/products/all-products">
              <p className="h-12 w-full bg-[#0f7e7e40] hover:bg-[#0f7e7e80] grid items-center text-center font-medium">
                {" "}
                Shop Collection
              </p>
            </Link>
          </div>
        </section>

        <section className="mb-8 md:flex md:items-center">
          <div
            className={`h-[140px] w-full mb-12 relative  sm:h-[180px] md:h-[140px] md:w-1/2 `}
          >
            <Image
              src="/assets/images/colors.jpeg"
              alt="serum"
              fill
              sizes="(min-width:768px) 50vw, 100vw"
            />
          </div>
          <div className="md:w-1/2">
            <div className="h-16 mb-4 px-4 bg-[#2B9DF060] rounded-2xl grid items-center">
              <p>How does bliss+ approach product development?</p>
            </div>

            <p className="px-4 font-light text-sm text-black">
              {" "}
              Our greatest state of being is bliss, but on a daily basis we
              might benefit from a little more.
              <br />
              <br />
              On occasion we might strive for Focus, on another a boost of
              Confidence.
              <br />
              <br />
              That&apos;s why bliss+ approaches skin wellness comprehensively,
              taking into account our state of being as a whole. Each one of our
              products has an energy and intention behind it&apos;s development
              to meet your daily needs.
            </p>
          </div>
        </section>

        <section className="mb-8 md:flex md:items-center ">
          <div className="mb-8 md:w-1/2">
            <div className="h-16 mb-4 px-4 bg-[#D1A7FC] rounded-2xl grid items-center">
              <p className="text-white">
                How does bliss+ honor our commitment to the environment?
              </p>
            </div>

            <p className="px-4 font-light text-sm text-black">
              {" "}
              Our greatest state of being is bliss, but on a daily basis we
              might benefit from a little more.
              <br />
              <br />
              On occasion we might strive for Focus, on another a boost of
              Confidence.
              <br />
              <br />
              That&apos;s why bliss+ approaches skin wellness comprehensively,
              taking into account our state of being as a whole. Each one of our
              products has an energy and intention behind it&apos;s development
              to meet your daily needs.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 md:w-1/2">
            {" "}
            <Image
              src="/assets/images/basil.png"
              alt="basil"
              height={250}
              width={250}
            />
            <p>For further interest in bliss+ please reach out.</p>
            <Link href="/products/all-products" className="w-full">
              <p className="h-12 w-full bg-[#B3AFFB60] hover:bg-[#B3AFFB] grid items-center text-center font-medium">
                {" "}
                Contact
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
