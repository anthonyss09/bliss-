import Image from "next/image";

interface PaginationArgs {
  getNextProducts: () => void;
  getPreviousProducts: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageNumber: number;
}

export default function Pagination({
  getNextProducts,
  getPreviousProducts,
  hasNextPage,
  hasPreviousPage,
  pageNumber,
}: PaginationArgs) {
  return (
    <div className="flex justify-center items-center gap-12">
      <button
        onClick={getPreviousProducts}
        disabled={!hasPreviousPage}
        className={`bg-white/60 ${!hasPreviousPage ? "opacity-20" : ""}`}
      >
        {" "}
        <Image
          src="/assets/svgs/chevronBlackLeft.svg"
          alt="chevron left"
          width={17}
          height={30}
        />
      </button>

      <div className="flex items-center gap-4">
        <p>Page</p>
        <p>{pageNumber}</p>
      </div>
      <button
        onClick={getNextProducts}
        disabled={!hasNextPage}
        className={`bg-white/60 ${!hasNextPage ? "opacity-20" : ""}`}
      >
        {" "}
        <Image
          src="/assets/svgs/chevronBlackRight.svg"
          alt="chevron left"
          width={17}
          height={30}
        />
      </button>
    </div>
  );
}
