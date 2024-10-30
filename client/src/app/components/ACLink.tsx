import Link from "next/link";

export default function ACLink({ text, path }: { text: string; path: string }) {
  return (
    <Link href={path}>
      <li className="mx-8 text-sm text-md tracking-wide border-2 border-[#2b9df080] p-4 text-center rounded-[48px] hover:border-[#2b9df0] duration-300">
        {text}
      </li>
    </Link>
  );
}
