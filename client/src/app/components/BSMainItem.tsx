import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function BsMainItem({
  name,
  path,
  toggleSidebar,
}: {
  name: string;
  path: string;
  toggleSidebar: (bool: boolean) => void;
}) {
  const pathname = usePathname();
  return (
    <Link href={`${path}`} className={`flex items-center gap-4 w-full`}>
      <li
        className={`h-16 w-full pl-0 flex gap-4 items-center hover:bg-[#0f7e7e10] hover:pr-8 duration-300 border-t-0 border-b-0 border-[#00000005] rounded ${
          pathname === `${path}`
            ? "bg-[#0f7e7e10]  justify-start pl-20"
            : "justify-center"
        }`}
        onClick={() => {
          toggleSidebar(false);
        }}
      >
        <p
          className={`font-semibold text-black tracking-wide text-base ${
            pathname === `${path}` ? "" : ""
          }`}
        >
          {name}
        </p>
        {pathname != `${path}` && (
          <Image
            src="/assets/svgs/chevronBlackRight.svg"
            alt="arrow right"
            height={30}
            width={17}
            className="h-[16px] w-[auto]"
          />
        )}
      </li>
    </Link>
  );
}
