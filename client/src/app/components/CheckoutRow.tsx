import { useEffect } from "react";
import { useAppSelector } from "../../lib/hooks";
import { selectCartData } from "../../lib/features/cart/cartSlice";

export default function CheckoutRow({ pathname }: { pathname: string }) {
  const {
    cartData: {
      cart: {
        cost: {
          totalAmount: { amount },
        },
      },
    },
  } = useAppSelector(selectCartData);
  function handleScroll(e: any) {
    const checkoutRow = document.getElementById("checkout-row");
    if (typeof window !== "undefined") {
      if (checkoutRow) {
        if (
          pathname === "/cart" &&
          window.scrollY > 300 &&
          window.innerWidth < 660
        ) {
          checkoutRow.style.height = "120px";
          checkoutRow.style.padding = "16px";
          checkoutRow.style.borderBottom = "1px solid #00000005";
        } else {
          checkoutRow.style.height = "0";
          checkoutRow.style.padding = "0";
          checkoutRow.style.borderBottom = "none";
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <div
      id="checkout-row"
      className={`h-0 overflow-hidden bg-white sm:px-8 ${
        pathname !== "/cart" ? "hidden" : ""
      }`}
    >
      {" "}
      <div className="w-full flex justify-between mb-4">
        <p className="font-semibold sm:text-lg">Total:</p>
        <p className="font-semibold sm:text-lg">${Number(amount).toFixed(0)}</p>
      </div>
      <button className="h-12 w-full bg-[#2b9df090] hover:bg-[#2b9df0] hover:text-white font-semibold tracking-wide">
        Checkout
      </button>
    </div>
  );
}
