import Image from "next/image";
import FooterLink from "./FooterLink";

export default function Footer() {
  return (
    <footer className="mx-4 pb-16">
      <ul className="mb-4 md:ml-24 border-black/4 border-t-0">
        <FooterLink name="Home" path="" />
        <FooterLink name="Shop" path="shop" />
        <FooterLink name="About" path="about" />
        <FooterLink name="Contact" path="contact" />
      </ul>
      <div className="flex gap-4 mb-4 pl-4  md:justify-center">
        <Image
          src="/assets/svgs/instagram.svg"
          alt="instagram icon"
          height={30}
          width={30}
        />
        <Image
          src="/assets/svgs/facebook.svg"
          alt="facebook icon"
          height={30}
          width={30}
        />
        <Image src="/assets/svgs/x.svg" alt="x icon" height={30} width={30} />
      </div>
      <div className="pl-4">
        <p className="font-light text-xs md:text-center">
          Copyright @ 2024 bliss+
        </p>
        <p className="font-light text-xs text-black/40 md:text-center">
          All rights reserved
        </p>
      </div>
    </footer>
  );
}
