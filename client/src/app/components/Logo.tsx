import Image from "next/image";

export default function Logo() {
  return (
    <div id="logo" className="flex h-8 items-center z-20 p-4">
      <p className="text-[28px]">bliss</p>
      <p className="text-[32px] text-[#3111F3] font-medium">+</p>
    </div>
  );
}
