import React from "react";

const DataTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-auto text-center shadow p-1">
      <table className="min-w-full text-sm  text-center">{children}</table>
    </div>
  );
};

export default DataTable;
