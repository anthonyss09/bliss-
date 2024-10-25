import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function BsMainItem({
  name,
  path,
}: {
  name: String;
  path: String;
}) {
  const pathname = usePathname();
  return (
    <li
      className={`h-16 w-[192px] w-full pl-0 flex items-center ${
        pathname === `/${path}`
          ? "bg-[#3111f310]  justify-start pl-4"
          : "justify-center"
      }`}
    >
      <Link href="#" className={`flex items-center gap-4 `}>
        <p
          className={`font-semibold text-black tracking-wide text-base ${
            pathname === `/${path}` ? "" : ""
          }`}
        >
          {name}
        </p>
        {pathname != `/${path}` && (
          <Image
            src="/assets/svgs/chevronBlackRight.svg"
            alt="arrow right"
            height={16}
            width={10}
          />
        )}
      </Link>
    </li>
  );
}
