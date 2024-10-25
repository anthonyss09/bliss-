import { useState } from "react";
import FormRow from "./FormRow";
import Image from "next/image";

export default function LoginForm({
  formOpen,
  toggleForm,
}: {
  formOpen: boolean;
  toggleForm: (bool: boolean) => void;
}) {
  const [isLogin, setIsLogin] = useState(true);

  function toggleLogin() {
    setIsLogin(!isLogin);
  }
  return (
    <form
      className={`pb-8 mb-4 mt-8 left-0 absolute duration-500 ease-in-out bg-white flex flex-col z-[60] top-[216px] sm:top-[96px] sm:shadow-xl sm:border-[1px] sm:border-[#00000005] sm:rounded-xl ${
        formOpen
          ? "h-[440px] overflow-y-scroll w-full sm:h-fit sm:w-[400px] translate-x-0 sm:ml-[50%] sm:translate-x-[-50%]  sm:fixed sm:overflow-auto"
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

      <div
        id="form-login-header"
        className="mb-4 py-4 px-6 flex items-center justify-between gap-2 bg-[#3111f310] duration-500"
      >
        <p className="text-[16px] font-medium text-black ">
          {isLogin ? "Don't have an account yet?" : "Already have an account?"}
        </p>

        <button onClick={toggleLogin} type="button">
          <p className="h-[32px] w-[92px] text-[20px] text-sm font-semibold text-[#2B9DF0] text-white  bg-[#2b9df0]  grid items-center">
            {isLogin ? "Register" : "Login"}
          </p>
        </button>
      </div>

      <div
        id="form-login-body"
        className={`mx-4 mb-8 flex flex-col justify-center border-[#00000010] ${
          !isLogin ? "" : ""
        }`}
      >
        <h3 className="text-[22px] font-medium mb-2 ml-2 tracking-wide">
          {isLogin ? "Login" : "Register"}
        </h3>
        {!isLogin && <FormRow name="Name" id="name" />}
        <FormRow name="Email" id="email" />
        <FormRow name="Password" id="password" />
      </div>
      <div className="">
        {" "}
        <button className="h-12 w-[256px] bg-[#3111f3] text-white font-medium tracking-wide shadow-lg">
          {isLogin ? "Login" : "Register"}
        </button>
      </div>
    </form>
  );
}
