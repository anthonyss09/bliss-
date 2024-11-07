import Image from "next/image";

interface props {
  size: String;
  title: String;
  profile: String;
  productType: String;
  price: String;
}

export default function ProductPreview({
  size,
  title,
  profile,
  productType,
  price,
}: props) {
  var fit = true;
  if (size != "fit") {
    fit = false;
  }

  return (
    <aside className={`${fit ? "w-[50vw] md:w-[25vw]" : "w-[150px]"}`}>
      <button className="opacity-70 hover:opacity-100">
        {" "}
        <Image
          src="/assets/svgs/fastCart.svg"
          alt="add to cart"
          height={30}
          width={30}
        />
      </button>

      <div
        className={`${
          fit ? "w-full h-[215px]" : "w-[150px] h-[150px]"
        } relative`}
      >
        {" "}
        <Image
          src="/assets/images/bottlesDouble.jpeg"
          alt="bliss bottles"
          fill
          sizes="(min-width:768px)  25vw,(min-width:1024px) 25vw, 50vw"
        />
      </div>
      <div className="flex flex-col items-center">
        {" "}
        <h3 className={`font-medium text-base mb-2 text-center`}>{title}</h3>
        <p className={`font-medium text-sm mb-2 text-black/70 text-center`}>
          {profile}
        </p>
        <p className={`font-light text-sm mb-2`}>{productType}</p>
        <p className={`font-medium text-base mb-4`}>${price}</p>{" "}
      </div>
    </aside>
  );
}
