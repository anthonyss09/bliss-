import NavLink from "./NavLink";
import Image from "next/image";
import Logo from "./Logo";

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
      <Logo />
      <button>
        {" "}
        <Image
          src="/assets/svgs/cart.svg"
          alt="cart icon"
          height={32}
          width={32}
          className="sm:hidden"
        />
      </button>
      <div className="hidden sm:flex mx-auto justify-center gap-8">
        <NavLink name="Home" path="" />

        <NavLink name="Shop" path="products/all-products" />
        <Image
          src="/assets/svgs/cart.svg"
          alt="cart icon"
          height={24}
          width={24}
        />
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
