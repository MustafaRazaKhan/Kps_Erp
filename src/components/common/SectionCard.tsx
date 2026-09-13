import React from "react";
import Row from "./Row";

const SectionCard = ({ icon, title, children }: any) => {
  return (
    <div className="shadow-sm p-2 rounded my-4">
      <div className="flex items-center gap-4">
        <div className="text-blue-800 text-2xl">{icon}</div>
        <div className="text-gray-800 text-2xl">{title}</div>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default SectionCard;
