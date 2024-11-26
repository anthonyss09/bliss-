interface props {
  cartCount: number;
  subTotal: number;
  total: number;
  tax: number;
}

export default function CartHeader({ subTotal, total, tax, cartCount }: props) {
  return (
    <header
      id="cart-header"
      className="w-[100%] px-4 pb-4 mb-4  bg-white z-[20] border-b-[#00000005] border-b-2 md:px-8 md:row-start-1 md:row-span-2 md:col-start-1"
    >
      <div
        id="cart-details"
        className="w-full overflow-hidden flex flex-col gap-[1px] md:h-[300px] md:justify-around"
      >
        <h1 className="mb-4 font-semibold text-lg   tracking-wide  sm:text-xl md:mb-8">
          Your shopping cart
        </h1>
        <span className="flex gap-[3px] mb-2">
          <p className="font-semibold text-sm sm:text-base">{cartCount}</p>
          <p className="font-regular text-sm sm:text-base text-black/50">
            Items in cart
          </p>
        </span>
        <div className="w-full flex justify-between">
          <p className="font-medium text-black/70 text-sm sm:text-base">
            Cart subtotal:
          </p>
          <p className="font-medium text-sm sm:text-base">
            ${Number(subTotal).toFixed(0)}
          </p>
        </div>
        <div className="w-full flex justify-between">
          <p className="font-medium text-black/70 text-sm sm:text-base">
            Estimated Delivery:
          </p>
          <p className="font-regular text-black/50 text-[12px] tracking-wide sm:text-sm">
            Calculated at checkout.
          </p>
        </div>
        <div className="w-full flex justify-between text-sm sm:text-base">
          <p className="font-medium text-black/70 text-sm sm:text-base">Tax:</p>
          <p className="font-medium text-sm sm:text-base">${tax}</p>
        </div>
        <div className="w-full flex justify-between mb-4 ">
          <p className="font-semibold sm:text-lg">Total:</p>
          <p className="font-semibold sm:text-lg">
            ${Number(total).toFixed(0)}
          </p>
        </div>
        <button className="h-12 w-full bg-[#2b9df090] hover:bg-[#2b9df0] hover:text-white font-semibold tracking-wide">
          Checkout
        </button>
      </div>
    </header>
  );
}
