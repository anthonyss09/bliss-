export default function FormRow({
  name,
  id,
  onChange,
  value,
  inputType,
}: {
  name: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  inputType: string;
}) {
  return (
    <div>
      {" "}
      <label htmlFor={id} className="text-sm ml-2 tracking-wide">
        {name}
      </label>
      <div className="p-2 bg-[#00000005] grid items-center focus-within:shadow-sm">
        <input
          type={inputType}
          id={id}
          className="h-10 w-full border-2 border-[#2b9df040] pl-2 rounded-[48px] shadow-sm outline-[#2b9df0]"
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
}
