import React from "react";
import { FaSearch } from "react-icons/fa";
import { FiFilter, FiGrid, FiList } from "react-icons/fi";

const SearchBar = ({ title, onChange, placeholder, children }: any) => {
  const { view, handleView } = useToggle();
  return (
    <div className="py-4 shadow border border-gray-50 px-1  mb-2">
      <h5
        className="p-2 text-2xl text-blue-500"
        style={{ fontFamily: "cursive" }}
      >
        {title}
      </h5>

      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 border border-gray-400 rounded flex items-center px-2">
          <FaSearch />
          <input
            type="text"
            onChange={onChange}
            placeholder={placeholder}
            className=" w-full rounded border-none bg-transparent px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        <div className="flex lg:flex-row md:flex-nowrap flex-wrap flex-1 justify-end gap-3">
          {children && children}
          <div className="flex items-center gap-2">
            {/* FILTER BUTTON */}

            <button className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-md text-sm hover:bg-slate-50 transition">
              <FiFilter size={15} />
              Apply View
            </button>

            {/* GRID VIEW */}

            <button
              onClick={() => handleView("grid")}
              className={`h-10 w-10 rounded-md flex items-center justify-center transition ${
                view === "grid"
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <FiGrid size={17} />
            </button>

            {/* LIST VIEW */}

            <button
              onClick={() => handleView("list")}
              className={`h-10 w-10 rounded-md flex items-center justify-center transition ${
                view === "list"
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <FiList size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
