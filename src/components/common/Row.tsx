import React from "react";

const Row = ({ children }: any) => {
  return (
    <div className="flex-wrap flex gap-1 sm:flex-nowrap md:flex-nowrap items-center">
      {children}
    </div>
  );
};

export default Row;
