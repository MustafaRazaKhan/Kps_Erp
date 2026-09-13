import React from "react";

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) => {
  return (
    <div className="flex-1/2 mt-1.5">
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200 focus:bg-white"
      >
        <option value="">Select {label}</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
