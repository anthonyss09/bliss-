import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <Link
      href={`${path}`}
      className={`h-8 w-24 font-medium tracking-wide grid place-items-center duration-300 ${
        pathname === `${path}`
          ? "bg-[#190b7220]  text-white shadow-sm"
          : "hover:bg-[#190b7220] hover:text-white "
      }`}
    >
      {name}
    </Link>
  );
}
