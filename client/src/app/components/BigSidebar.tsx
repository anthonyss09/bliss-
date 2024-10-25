import Image from "next/image";
import Logo from "./Logo";
import BsMainItem from "./BSMainItem";

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
  return (
    <aside
      id="big-sidebar"
      className={`h-[100vh] min-w-[256px] shadow-2xl bg-white duration-300 ease-in-out absolute top-0 z-40 ${
        sidebarDropped
          ? "translate-x-0 overflow-y-scroll"
          : "translate-x-[-100%]"
      } ${formOpen ? " w-screen" : "w-[212px]"}`}
    >
      <button
        className=" mt-4 mb-4  p-2 text-xl font-semibold bg-[#00000020]"
        onClick={() => {
          toggleSidebar(!sidebarDropped);
          toggleForm(false);
        }}
      >
        <Image
          height={20}
          width={20}
          src="/assets/svgs/closeX.svg"
          alt="arrow left"
        />
      </button>{" "}
      <div
        id="sidebar-header"
        className="h-20 flex justify-between items-center bg-[#bed3fb] bg-white border-t-2 border-t-[#00000005]"
      >
        <Logo />
        <div className="px-4 bg-white">
          {" "}
          <Image
            height={64}
            width={64}
            src="/assets/images/blissFlower.jpeg"
            alt="jasmine flower"
            className={`${formOpen ? "" : ""}`}
          />
        </div>
      </div>
      <div
        id="sidebar-taskbar"
        className={`h-24 w-full flex items-center justify-between border-t-2 border-t-[#00000005] bg-white`}
      >
        {" "}
        <button
          onClick={() => {
            toggleForm(!formOpen);
          }}
          className={`h-12 w-[128px] font-semibold text-left pl-4 text-white bg-[#3111f380] ${
            formOpen ? "bg-[#3111f380] " : ""
          }`}
        >
          Menu
        </button>
        <button
          onClick={() => {
            toggleForm(!formOpen);
          }}
          className={`w-[128px] h-12 flex items-center ${
            formOpen ? "justify-end pr-6" : "justify-end pr-6"
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
        className={`my-0 flex flex-col items-center gap-4 duration-300 ease-in-out ${
          formOpen ? "w-0 overflow-hidden" : ""
        }`}
      >
        <BsMainItem name="Home" path="" />
        <BsMainItem name="Shop" path="/shop" />
        <BsMainItem name="About" path="/about" />
        <BsMainItem name="Contact" path="/contact" />
      </ul>
    </aside>
  );
}
