import { useState } from "react";
import FormRow from "./FormRow";
import Image from "next/image";
import {
  useRegisterCustomerMutation,
  useCreatCustomerTokenMutation,
} from "../../lib/features/auth/authSlice";
import handleLogin from "../utils/handlers/handleLogin";
import { useAppDispatch } from "../../lib/hooks";

export default function LoginForm({
  formOpen,
  toggleForm,
}: {
  formOpen: boolean;
  toggleForm: (bool: boolean) => void;
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");

  const disptach = useAppDispatch();

  const [registerCustomer] = useRegisterCustomerMutation();
  const [createCustomerToken] = useCreatCustomerTokenMutation();

  function toggleLogin() {
    setIsLogin(!isLogin);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    if (id == "password") {
      setPassword(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "firstName") {
      setFirstName(value);
    }
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin({
      createCustomerToken,
      registerCustomer,
      email: email,
      password: password,
      firstName: firstName,
      isLogin,
    });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={`pb-8 mb-4 mt-8 left-0 absolute duration-500 ease-in-out bg-white flex flex-col z-[60] top-[216px] sm:top-[96px] sm:shadow-xl sm:border-[2px] sm:border-[#3111f310] sm:rounded-2xl ${
        formOpen
          ? "h-[440px] overflow-y-scroll w-full sm:h-fit sm:w-[500px] translate-x-0 sm:ml-[50%] sm:translate-x-[-50%]  sm:fixed sm:overflow-auto"
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
        {!isLogin && (
          <FormRow
            name="Name"
            id="firstName"
            onChange={handleInputChange}
            value={firstName}
          />
        )}
        <FormRow
          name="Email"
          id="email"
          onChange={handleInputChange}
          value={email}
        />
        <FormRow
          name="Password"
          id="password"
          onChange={handleInputChange}
          value={password}
        />
      </div>
      <div className="">
        {" "}
        <button className="h-12 w-[320px] bg-[#3111f330] text-black font-medium tracking-wide shadow-lg sm:w-[352px] hover:bg-[#3111f370] hover:text-white">
          {isLogin ? "Login" : "Register"}
        </button>
      </div>
    </form>
  );
}
