"use client";
import Link from "next/link";
import { FaArrowUp } from "react-icons/fa";

const PageHeader = ({ heading }: any) => {
  return (
    <div className="mb-6 px-4 md:px-6">
      {/* Top Row */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* LEFT */}
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-800 text-white text-2xl">
            {heading.icon || <FaArrowUp size={14} />}
          </div>

          {/* Text */}
          <div className="leading-tight">
            <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
              {heading.name}
            </h2>
            <p className="text-sm text-slate-500 mt-1">{heading.subHeading}</p>
          </div>
        </div>

        {/* RIGHT */}
        <Link
          href={heading.href}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-slate-900 active:scale-95"
        >
          {heading.icon || <FaArrowUp size={12} />}
          {heading.btnHeading}
        </Link>
      </div>

      {/* Divider (very SaaS touch) */}
      {/* <div className="mt-4 h-px w-full bg-slate-200/70" /> */}
    </div>
  );
};

export default PageHeader;
