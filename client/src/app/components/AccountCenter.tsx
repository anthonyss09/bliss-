import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { logoutCustomer } from "../../lib/features/auth/authSlice";
import ACLink from "./ACLink";
import { selectAuthData } from "../../lib/features/auth/authSlice";
import {
  setCartId,
  setCartData,
  setCartCount,
} from "../../lib/features/cart/cartSlice";
import Image from "next/image";

export default function AccountCenter({
  formOpen,
  toggleSidebar,
  toggleForm,
}: {
  formOpen: boolean;
  toggleSidebar: (bool: boolean) => void;
  toggleForm: (bool: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector(selectAuthData);
  const name = customer.firstName || "friend";

  function handleLogout() {
    localStorage.removeItem("blissCustomerAccessToken");
    localStorage.removeItem("blissCartId");
    dispatch(logoutCustomer());
    dispatch(setCartId("gid://shopify/Cart/null"));
    dispatch(
      setCartData({
        cart: {
          lines: { edges: [] },
          cost: { totalAmount: { amount: 0 }, subtotalAmount: { amount: 0 } },
        },
      })
    );
    dispatch(setCartCount(0));
  }

  return (
    <aside
      className={`pb-24 mb-4 mt-0 left-0 absolute duration-500 ease-in-out bg-white flex flex-col z-[60] top-[216px]  sm:pb-8 sm:top-[80px] sm:shadow-2xl sm:border-[2px] sm:border-[#3111f310]  ${
        formOpen
          ? "h-[480px] overflow-y-scroll w-full sm:h-fit sm:w-[500px] translate-x-0 sm:ml-[50%] sm:translate-x-[-50%]  sm:fixed sm:overflow-auto"
          : "z-[-10] translate-x-[-500px]"
      }`}
    >
      <button
        type="button"
        className="hidden h-12 w-12 bg-white z-[60] place-items-center sm:grid"
        onClick={() => {
          toggleForm(false);
        }}
      >
        {" "}
        <Image
          height={20}
          width={20}
          src="/assets/svgs/closeX.svg"
          alt="close button"
        />
      </button>
      <div>
        <h3 className="h-16 px-4 bg-[#3111f310]  font-medium text-lg flex items-center sm:bg-[#3111f370] sm:px-8">
          Account Center
        </h3>
        <p className="h-12 mx-4 pl-4 font-semibold flex items-center tracking-wide">
          Welcome back {name}!
        </p>
        <p className="h-12 mx-4 pl-4 font-medium flex items-center tracking-wide text-black text-sm bg-[#00000005] shadow-md">
          Account actions
        </p>
      </div>
      <ul className="flex flex-col  gap-4 my-8">
        <ACLink
          text="Edit account details"
          path="#"
          toggleSidebar={toggleSidebar}
        />
        <ACLink
          text="Go shopping"
          path="/products/all-products"
          toggleSidebar={toggleSidebar}
        />
        <ACLink
          text="Go to your cart"
          path="/cart"
          toggleSidebar={toggleSidebar}
        />
        <ACLink
          text="View previously purchased items"
          path="#"
          toggleSidebar={toggleSidebar}
        />
        <ACLink
          text="Contact customer support"
          path="/contact"
          toggleSidebar={toggleSidebar}
        />
        <li className="px-8">
          <button
            onClick={handleLogout}
            className="h-12 w-[256px] w-full text-sm font-semibold bg-[#3111f330] text-black tracking-wide text-black shadow-sm hover:bg-[#3111f370] hover:text-white"
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}
