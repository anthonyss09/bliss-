import Image from "next/image";

export default function Alert({
  alertMessage,
  showAlert,
  alertType,
}: {
  alertMessage: string;
  showAlert: boolean;
  alertType: string;
}) {
  return (
    <div
      className={`fixed  top-[80px] z-[100] duration-150 
       ${
         showAlert
           ? "left-1/2 translate-x-[-50%] md:left-[16px] md:translate-x-0"
           : "translate-x-[-100%]"
       }`}
    >
      {" "}
      <div
        className={`min-w-[320px] min-h-12  bg-white py-2 px-4 shadow-xl border-[2px] rounded-md  flex shrink-0 items-center justify-center gap-4 duration-0 border-[#0000010] ${
          alertType === "success" ? "border-[#2b9df0]" : ""
        } ${alertType === "danger" ? "border-[#9747ff50]" : ""}
        `}
      >
        {alertType === "success" && (
          <div className="h-[18px] w-[20px] relative">
            {" "}
            <Image
              src="/assets/svgs/alertSuccess.svg"
              alt="success icon"
              fill
            />
          </div>
        )}
        {alertType === "danger" && (
          <div className="h-[18px] w-[20px] relative">
            <Image src="/assets/svgs/alertDanger.svg" alt="alarm" fill />
          </div>
        )}

        <p className="font-medium text-sm text-[#190b72] max-w-[70vw] tracking-wide">
          {alertMessage}
        </p>
      </div>
    </div>
  );
}
