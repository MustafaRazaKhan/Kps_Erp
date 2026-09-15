"use client";

import { useSession } from "next-auth/react";

import { FiBell, FiChevronDown } from "react-icons/fi";

import { RiMenuFold3Fill, RiMenuUnfold3Fill } from "react-icons/ri";

import useSidebar from "@/store/common/context/toggle.sidebar.context";
import useTheme from "@/store/admin/context/theme.context";
import Dropdown from "../common/DropDown";

export default function Topbar() {
  const { isSidebarOpen, handleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();

  const { data: session } = useSession();

  const user = session?.user as any;
  const isAdmin = user?.role === "admin";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-100/80 bg-[#fffdf7]/95 backdrop-blur">
      <div className="flex min-h-[64px] items-center justify-between px-3 py-2.5 sm:px-5 lg:px-6">
        {/* =====================================================
            LEFT
        ===================================================== */}

        <div className="flex items-center gap-3">
          {/* SIDEBAR BUTTON */}

          <button
            type="button"
            onClick={handleSidebar}
            title="Toggle Sidebar"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl
              border border-amber-100
              bg-amber-50/60
              text-amber-700
              transition-all duration-200
              hover:bg-amber-100/70
              hover:text-amber-800
              focus:outline-none
              focus:ring-2
              focus:ring-amber-200
            "
          >
            {isSidebarOpen ? (
              <RiMenuUnfold3Fill size={18} />
            ) : (
              <RiMenuFold3Fill size={18} />
            )}
          </button>

          {/* SCHOOL TITLE */}

          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-bold tracking-tight text-gray-900">
              Krishna Public School
            </p>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />

              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-400">
                Admin Center
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT
        ===================================================== */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* =================================================
              THEME TOGGLE
          ================================================== */}

          <button
            type="button"
            onClick={toggleTheme}
            title="Toggle Theme"
            className={`
              relative flex h-8 w-14 items-center
              rounded-full border
              transition-all duration-300
              focus:outline-none
              focus:ring-2
              focus:ring-amber-200

              ${
                theme
                  ? "border-slate-700 bg-slate-800"
                  : "border-amber-200 bg-amber-50"
              }
            `}
          >
            {/* Track decoration */}

            <span
              className={`
                absolute left-1.5 text-[9px] transition-opacity
                ${theme ? "opacity-0" : "text-amber-700 opacity-100"}
              `}
            >
              ☀
            </span>

            <span
              className={`
                absolute right-1.5 text-[9px] transition-opacity
                ${theme ? "text-slate-200 opacity-100" : "opacity-0"}
              `}
            >
              ☾
            </span>

            {/* Toggle Circle */}

            <span
              className={`
                relative z-10 flex h-5 w-5 items-center justify-center
                rounded-full bg-white
                shadow-sm
                transition-transform duration-300

                ${theme ? "translate-x-8" : "translate-x-1"}
              `}
            />
          </button>

          {/* =================================================
              NOTIFICATION
          ================================================== */}

          <button
            type="button"
            title="Notifications"
            className="
              relative flex h-9 w-9 items-center justify-center
              rounded-xl
              border border-slate-200
              bg-white/70
              text-slate-500
              transition-all duration-200
              hover:border-amber-200
              hover:bg-amber-50/60
              hover:text-amber-700
            "
          >
            <FiBell size={17} />

            {/* Notification Dot */}

            <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-red-400/80 ring-2 ring-white" />
          </button>

          {/* =================================================
              PROFILE
          ================================================== */}

          <div
            className="
              rounded-xl
              border border-amber-100/80
              bg-white/60
              transition
              hover:border-amber-200
              hover:bg-amber-50/40
            "
          >
            <Dropdown isNavbar={false} />
          </div>
        </div>
      </div>
    </header>
  );
}
