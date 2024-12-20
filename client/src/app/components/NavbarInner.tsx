import NavLink from "./NavLink";
import Image from "next/image";
import Logo from "./Logo";
import Link from "next/link";
import { selectCartData } from "../../lib/features/cart/cartSlice";
import { useAppSelector } from "../../lib/hooks";

export default function NavbarInner({
  sidebarDropped,
  toggleSidebar,
  toggleForm,
  formOpen,
}: {
  sidebarDropped: boolean;
  toggleSidebar: (bool: boolean) => void;
  toggleForm: (bool: boolean) => void;
  formOpen: boolean;
}) {
  const { cartCount } = useAppSelector(selectCartData);

  return (
    <div
      id="navbar-inner"
      className={`w-screen h-24 px-4 flex items-center justify-between relative sm:justify-center sm:flex-col gap-2 duration-500 ease-in-out ${
        sidebarDropped ? "" : ""
      }`}
    >
      {" "}
      <button
        onClick={() => {
          toggleSidebar(!sidebarDropped);
        }}
        className="z-20 bg-white"
      >
        <Image
          src="/assets/svgs/bars.svg"
          alt="menu bars"
          height={30}
          width={30}
          className=" sm:hidden"
        />
      </button>
      <Logo toggleSidebar={toggleSidebar} />
      <Link href="/cart" className="relative">
        <div className="h-[20px] w-[20px] absolute top-[-16px] left-[12px] font-bold sm:hidden bg-[#190b72] text-white text-xs grid place-items-center rounded-xl shadow-sm">
          {cartCount}
        </div>
        <Image
          src="/assets/svgs/cart.svg"
          alt="cart icon"
          height={28}
          width={28}
          className="sm:hidden"
        />
      </Link>
      <div className="hidden sm:flex mx-auto justify-center gap-8 align-center">
        <NavLink name="Home" path="/" />

        <NavLink name="Shop" path="/products/all-products" />
        <Link href="/cart" className="relative">
          <div className="h-[18px] w-[18px] absolute top-[-16px] left-[12px] font-semibold text-sm bg-[#190b72] text-white text-xs grid place-items-center rounded-xl shadow-sm">
            {cartCount}
          </div>
          <Image
            src="/assets/svgs/cart.svg"
            alt="cart icon"
            height={24}
            width={24}
          />
        </Link>

        <button
          onClick={() => {
            toggleForm(!formOpen);
          }}
          className={`duration-300 ease-in-out ${
            formOpen ? "rotate-[-360deg]" : ""
          }`}
        >
          <Image
            src="/assets/svgs/avatar.svg"
            alt="avatar"
            height={24}
            width={24}
          />
        </button>
        <NavLink name="About" path="/about" />
        <NavLink name="Contact" path="/contact" />
      </div>
    </div>
  );
}
