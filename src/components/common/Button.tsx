import React from "react";
import { FaPlus } from "react-icons/fa";

const Button = ({ title }: any) => {
  return (
    <div className="theme-bg inline-flex gap-4 py-3 px-8  mt-4 items-center text-white justify-center rounded">
      <FaPlus className="text-xl" />
      <button type="submit" className="w-full border-0">
        {title ? title : "Submit"}
      </button>
    </div>
  );
};

export default Button;
