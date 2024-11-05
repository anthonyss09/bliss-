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
      className={`absolute top-[80px] z-[100] duration-150
       ${showAlert ? "left-[16px]" : "translate-x-[-100%]"}`}
    >
      {" "}
      <div
        className={`min-w-[320px] min-h-12  bg-white py-2 px-4 shadow-xl border-[2px] rounded-sm  flex shrink-0 items-center justify-center gap-4 rounded-sm  duration-0 border-[#0000010] ${
          alertType === "success" ? "border-[#0F7E7E50]" : ""
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

        <p className="font-medium text-sm text-black/70 max-w-[70vw] tracking-wide">
          {alertMessage}
        </p>
      </div>
    </div>
  );
}
