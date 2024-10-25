import Image from "next/image";

interface props {
  size: String;
}

export default function ProductPreview({ size }: props) {
  var fit = true;
  if (size != "fit") {
    fit = false;
  }

  return (
    <aside className={`${fit ? "w-[50vw] md:w-[25vw]" : ""}`}>
      <div className={`${fit ? "w-full h-[215px]" : ""} relative`}>
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
        <h3 className={`font-medium text-base mb-2`}>Focus</h3>
        <p className={`font-medium text-sm mb-2 text-black/70`}>
          Basil + Kiwi + Coriander
        </p>
        <p className={`font-light text-sm mb-2`}>Body Lotion</p>
        <p className={`font-medium text-base mb-4`}>$40</p>
      </div>
    </aside>
  );
}
