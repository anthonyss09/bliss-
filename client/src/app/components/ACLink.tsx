import Link from "next/link";

export default function ACLink({ text, path }: { text: string; path: string }) {
  return (
    <Link href={path}>
      <li className="mx-8 text-sm text-md tracking-wide rounded-[48px] hover:border-[#2b9df0] duration-300 text-[#2b9df0] font-medium">
        {text}
      </li>
    </Link>
  );
}
