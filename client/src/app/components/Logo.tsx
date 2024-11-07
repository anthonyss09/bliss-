import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" id="logo" className="flex h-8 items-center z-20 p-4">
      <p className="text-[28px]">bliss</p>
      <p className="text-[32px] text-[#3111F3] font-medium">+</p>
    </Link>
  );
}
