import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { logoutCustomer } from "../../lib/features/auth/authSlice";
import ACLink from "./ACLink";
import { selectAuthData } from "../../lib/features/auth/authSlice";

export default function ({ formOpen }: { formOpen: boolean }) {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector(selectAuthData);
  const name = customer.firstName;

  function handleLogout() {
    dispatch(logoutCustomer(null));
    localStorage.removeItem("blissCustomerAccessToken");
  }

  return (
    <aside
      className={`pb-24 mb-4 mt-8 left-0 absolute duration-500 ease-in-out bg-white flex flex-col z-[60] top-[216px] sm:pt-8 sm:pb-8 sm:top-[80px] sm:shadow-2xl sm:border-[2px] sm:border-[#3111f310] sm:rounded-2xl border-[#00000005] border-[4px] ${
        formOpen
          ? "h-[480px] overflow-y-scroll w-full sm:h-fit sm:w-[500px] translate-x-0 sm:ml-[50%] sm:translate-x-[-50%]  sm:fixed sm:overflow-auto"
          : "z-[-10] translate-x-[-500px]"
      }`}
    >
      <div>
        <h3 className="h-16 mx-4 px-4 bg-[#3111f310]  font-medium text-lg flex items-center sm:bg-[#3111f370] ">
          Account Center
        </h3>
        <p className="h-12 mx-4 pl-4 font-medium flex items-center tracking-wide">
          Welcome back {name}!
        </p>
        <p className="h-4 mx-4 pl-4 mb-8 font-regular flex items-center tracking-wide text-black/70 text-sm">
          Here are some suggested account actions.
        </p>
      </div>
      <ul className="flex flex-col gap-4">
        <ACLink text="Edit account details" path="#" />
        <ACLink text="Go to your cart" path="#" />
        <ACLink text="View previously purchased items" path="#" />
        <ACLink text="Contact customer support" path="#" />
        <li className="mx-8">
          <button
            onClick={handleLogout}
            className="h-12 w-[256px] w-full text-sm mt-4 font-semibold bg-[#3111f330] text-black tracking-wide text-black hover:bg-[#3111f370] hover:text-white"
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}
