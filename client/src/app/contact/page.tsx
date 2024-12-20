"use client";
import FormRow from "../components/FormRow";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import handleContactMessage from "../utils/handlers/handleContact";
import Spinner from "../components/Spinner";
import { clearAlert, showAlert } from "../../lib/features/alerts/alertsSlice";
import { useAppDispatch } from "../../lib/hooks";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { id, value } = e.target;
    if (id === "email-contact") {
      setEmail(value);
      console.log(email);
    }
    if (id === "message-contact") {
      setMessage(value);
      console.log(message);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    await handleContactMessage({ email, message })
      .then(() => {
        dispatch(
          showAlert({ alertMessage: "Message sent!", alertType: "success" })
        );
        setTimeout(() => {
          setEmail("");
          setMessage("");
          dispatch(clearAlert());
        }, 3000);
      })
      .catch((error) => {
        dispatch(
          showAlert({ alertMessage: error.message, alertType: "danger" })
        );
        setTimeout(() => {
          dispatch(clearAlert());
        }, 3000);
      });
    setIsLoading(false);
  }

  return (
    <div className="min-h-[70vh] mt-24 border-b-[#00000005] border-b-4 mb-4 sm:mt-32 md:grid md:grid-cols-2 md:grid-rows-2 md:mt-36">
      {isLoading && <Spinner />}

      <header className="mx-4 sm:w-full sm:px-12 md:row-start-1 md:pl-8 md:w-[400px]">
        <p className="mb-8 text-sm font-medium sm:text-sm tracking-wide sm:font-light">
          <Link
            href="/"
            className="duration-300 hover:text-[#00000080] hover:font-semibold"
          >
            Home
          </Link>{" "}
          / Contact
        </p>

        <h3 className="text-base  mb-4 font-light  text-[#190b72]">
          We&apos;re looking forward to hearing from you!
        </h3>
        <div className="h-12 w-full bg-[#0f7e7e20] mb-12 rounded-[48px]">
          {" "}
          <Image
            src="/assets/images/basil.png"
            alt="basil"
            height={125}
            width={125}
          />
        </div>
      </header>

      <main className="md:col-start-2 md:row-start-1 md:row-span-2 md:my-auto">
        <form className=" pt-4 bg-[#00000005]  md:mr-8" onSubmit={handleSubmit}>
          <div className="mx-4">
            {" "}
            <FormRow
              name="Email"
              id="email-contact"
              inputType="email"
              onChange={handleInputChange}
              value={email}
            />
          </div>

          <div className="mx-4 mb-4 mt-4">
            {" "}
            <label
              htmlFor="message-contact"
              className="text-sm ml-2 tracking-wide"
            >
              Message
            </label>
            <div className="p-2  grid items-center focus-within:shadow-sm">
              <textarea
                id="message-contact"
                className="w-full border-2 border-[#2b9df040] pl-2  shadow-sm outline-[#2b9df0] rounded-[4px] resize-none"
                rows={5}
                onChange={handleInputChange}
                value={message}
              />
            </div>
          </div>
          <div className="w-full p-4 px-6 md:px-0 bg-white">
            {" "}
            <button className="h-12 w-full bg-[#3111f330] tracking-wide font-medium rounded-sm hover:bg-[#3111f370] hover:text-white">
              Send
            </button>
          </div>
        </form>
      </main>
      <div className="w-0 h-0 overflow-hidden sm:w-full sm:h-[200px]">
        {" "}
        <Image
          src="/assets/images/blissBottles.jpeg"
          alt="bliss bottles"
          height={200}
          width={300}
          className="mx-auto md:col-start-1 md:row-start-2"
        />
      </div>
    </div>
  );
}
