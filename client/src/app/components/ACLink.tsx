import Link from "next/link";

export default function ACLink({
  text,
  path,
  toggleSidebar,
}: {
  text: string;
  path: string;
  toggleSidebar: (bool: boolean) => void;
}) {
  return (
    <Link
      href={path}
      onClick={() => {
        toggleSidebar(false);
      }}
    >
      <li className="mx-8 text-sm text-md tracking-wide rounded-[48px] hover:border-[#2b9df0] duration-300 text-black/70 font-medium">
        {text}
      </li>
    </Link>
  );
}
