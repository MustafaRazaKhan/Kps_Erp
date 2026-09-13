import React from "react";

const DataTableHeader = ({ columns }: any) => {
  return (
    <thead className="bg-slate-50 dark:bg-slate-900/60 sticky top-0 z-10">
      <tr className="border-b border-slate-200 dark:border-slate-700">
        {columns.map((column: any, index: number) => (
          <th
            key={index}
            className={`
              px-6 py-4
              text-left text-xs font-semibold uppercase tracking-wider
              text-slate-500 dark:text-slate-400
              whitespace-nowrap
              ${column.className || ""}
            `}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default DataTableHeader;
