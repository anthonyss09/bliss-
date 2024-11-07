"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FooterLink({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  const pathname = usePathname();
  return (
    <li
      className={`py-4 pl-4 border-black/4 border-b-0 md:border-0 ${
        pathname === `${path}` ? "bg-[#3111f310] " : ""
      }`}
    >
      <Link href={`${path}`} className="font-medium text-lg">
        {name}
      </Link>
    </li>
  );
}
