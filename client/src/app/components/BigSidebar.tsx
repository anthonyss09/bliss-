import Image from "next/image";
import Logo from "./Logo";
import BsMainItem from "./BSMainItem";
import Link from "next/link";
import { selectCartData } from "../../lib/features/cart/cartSlice";
import { useAppSelector } from "../../lib/hooks";

export default function BigSidebar({
  sidebarDropped,
  toggleSidebar,
  toggleForm,
  formOpen,
}: {
  sidebarDropped: boolean;
  toggleSidebar: (bool: boolean) => void;
  formOpen: boolean;
  toggleForm: (bool: boolean) => void;
}) {
  const { cartCount } = useAppSelector(selectCartData);
  return (
    <aside
      id="big-sidebar"
      className={`h-[100vh] min-w-[256px] shadow-2xl bg-white duration-300 ease-in-out absolute top-0 z-40 ${
        sidebarDropped ? "translate-x-0 " : "translate-x-[-100%]"
      } ${formOpen ? " w-screen" : "w-[212px]"}`}
    >
      <button
        className=" mt-4  p-2 text-xl font-semibold bg-[#00000010] hover:bg-[#00000020]"
        onClick={() => {
          toggleSidebar(!sidebarDropped);
          toggleForm(false);
        }}
      >
        <Image
          height={20}
          width={20}
          src="/assets/svgs/closeX.svg"
          alt="close button"
        />
      </button>{" "}
      <div
        id="sidebar-header"
        className={`h-20 p-4 flex items-center bg-[#bed3fb] bg-white border-t-2 border-t-[#00000005] ${
          formOpen ? "justify-between" : "justify-center"
        }`}
      >
        {formOpen && (
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
        )}
        <div>
          {" "}
          <Logo toggleSidebar={toggleSidebar} />
        </div>
        {formOpen && (
          <Link href="/cart">
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
        )}
      </div>
      <div
        id="sidebar-taskbar"
        className={`w-full flex items-center mb-12 justify-between border-t-2 border-b-2 border-[#00000005] bg-white`}
      >
        {" "}
        <button
          onClick={() => {
            toggleForm(!formOpen);
          }}
          className={`h-16 w-[128px] font-semibold text-center text-white tracking-wide duration-500 ${
            formOpen ? "bg-[#3111f3]" : "bg-[#3111f3]"
          }`}
        >
          Menu
        </button>
        <button
          onClick={() => {
            toggleForm(!formOpen);
          }}
          className={`w-[128px] h-12 flex items-center ${
            formOpen ? "justify-end pr-4" : "justify-end pr-6"
          }`}
        >
          <Image
            src="/assets/svgs/avatar.svg"
            alt="avatar"
            height={32}
            width={32}
            className={`duration-300 ${formOpen ? "rotate-[360deg]" : ""}`}
          />
        </button>
      </div>
      <ul
        className={`flex flex-col items-center justify-center gap-8 duration-300 ease-in-out  px-4 ${
          formOpen ? "w-0 overflow-hidden" : ""
        }`}
      >
        <BsMainItem name="Home" path="/" toggleSidebar={toggleSidebar} />
        <BsMainItem
          name="Shop"
          path="/products/all-products"
          toggleSidebar={toggleSidebar}
        />
        <BsMainItem name="About" path="/about" toggleSidebar={toggleSidebar} />
        <BsMainItem
          name="Contact"
          path="/contact"
          toggleSidebar={toggleSidebar}
        />
      </ul>
    </aside>
  );
}
