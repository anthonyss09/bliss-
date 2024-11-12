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

  return (
    <Link
      href={`${path}`}
      className={`h-8 w-24 font-medium tracking-wide grid place-items-center ${
        pathname === `/${path}`
          ? "bg-[#3111f310] rounded-2xl font-semibold shadow-sm"
          : ""
      }`}
    >
      {name}
    </Link>
  );
}
