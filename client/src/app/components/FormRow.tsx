export default function FormRow({ name, id }: { name: string; id: string }) {
  return (
    <div>
      {" "}
      <label htmlFor={id} className="text-sm ml-2 tracking-wide">
        {name}
      </label>
      <div className="p-2 bg-[#00000005] grid items-center ">
        <input
          id={id}
          className="h-10 w-full border-2 border-[#2b9df060] pl-2 rounded-[48px] shadow-sm"
        />
      </div>
    </div>
  );
}
