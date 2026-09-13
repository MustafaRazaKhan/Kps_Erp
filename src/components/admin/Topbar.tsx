"use client";

import { useEffect, useRef, useState } from "react";
// import { useToggle } from "@/store/toggledashboard/Toggledashboard";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

import { FiBell, FiSearch } from "react-icons/fi";
import { RiMenuFold3Fill, RiMenuUnfold3Fill } from "react-icons/ri";
import useSidebar from "@/store/common/context/toggle.sidebar.context";
import useTheme from "@/store/admin/context/theme.context";
import Dropdown from "../common/DropDown";

export default function Topbar() {
  const { isSidebarOpen, handleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  //   const { handleToggle,toggle } = useToggle();
  const { data: session } = useSession();

  const user = session?.user as any;
  const isAdmin = user?.role === "admin";

  // close on outside click

  return (
    <header className="w-full border-b border-gray-200 ">
      <div className="flex  items-center justify-between px-4 md:px-6 py-2.5">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSidebar}
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition"
            title="Toggle Sidebar"
          >
            {isSidebarOpen ? <RiMenuUnfold3Fill /> : <RiMenuFold3Fill />}
            {/* {/* <FaBars className="text-slate-700" size={15} /> */}
          </button>

          <div className="hidden sm:block leading-tight">
            <h1 className="text-sm font-semibold text-slate-900">Kps School</h1>
            <p className="text-xs text-slate-500">Control Center</p>
          </div>
        </div>

        {/* SEARCH (soft SaaS style) */}
        {/* <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <div className="relative w-full group">

            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600"
              size={18}
            />

            <input
              placeholder="Search students, classes..."
              className="w-full rounded-2xl bg-slate-100/70 py-2.5 pl-11 pr-4 text-sm outline-none
              focus:bg-white focus:ring-2 focus:ring-slate-200 transition"
            />

          </div>
        </div> */}

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <div title="Toggle Mode">
            <button
              type="button"
              onClick={toggleTheme}
              className={`relative flex h-7 w-14 items-center rounded-full transition-all duration-300 border-2 border-gray-300 ${
                theme ? "bg-slate-900" : "bg-white "
              }`}
            >
              <div
                className={`h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  theme ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          {/* NOTIFICATION */}
          <button className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition">
            <FiBell className="text-slate-700" size={18} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* PROFILE */}
          <Dropdown isNavbar={false} />
        </div>
      </div>
    </header>
  );
}
