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
      href="#"
      className={`h-8 w-24 font-medium tracking-wide grid place-items-center ${
        pathname === `/${path}`
          ? "bg-[#2b9df0] text-white rounded-2xl font-semibold shadow-sm"
          : ""
      }`}
    >
      {name}
    </Link>
  );
}
