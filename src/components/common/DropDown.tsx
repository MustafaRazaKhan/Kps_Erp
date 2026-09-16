"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiUser, FiLogOut, FiGrid } from "react-icons/fi";

const dashboardRoutes: Record<string, string> = {
  admin: "/admin/dashboard",
  class_teacher: "/dashboard/class-teacher/class-teacher-dashboard",
  teacher: "/dashboard/teacher/teacher-dashboard",
  library: "/dashboard/library/library-dashboard",
  student: "/student/dashboard",
};

const roleLabels: Record<string, string> = {
  admin: "Administrator",
  class_teacher: "Class Teacher",
  teacher: "Teacher",
  library: "Library",
  student: "Student",
};

export default function Dropdown({ isNavbar }: { isNavbar: boolean }) {
  const [open, setOpen] = useState(false);

  const { data: session, status } = useSession();

  // Loading
  if (status === "loading") {
    return null;
  }

  // Not logged in
  if (!session) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center rounded-xl border border-[#e8ddbf] bg-[#fff9e8] px-4 py-2 text-sm font-semibold text-[#8f6d20] shadow-sm transition-all duration-200 hover:border-[#d9c27d] hover:bg-[#fff3c4]"
      >
        Login
      </Link>
    );
  }

  const user = session.user as {
    name?: string | null;
    email?: string | null;
    role?: string;
  };

  const role = user?.role || "user";
  const dashboard = dashboardRoutes[role];

  const displayName = user?.name || "User";
  const initial = displayName.charAt(0).toUpperCase();
  const roleName = roleLabels[role] || "User";

  return (
    <div className="relative inline-block text-left">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="group flex items-center gap-2 rounded-2xl border border-transparent px-2 py-1.5 transition-all duration-200 hover:border-[#eee4ca] hover:bg-[#fffaf0]"
      >
        {/* Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8d9a9] bg-gradient-to-br from-[#fff3bd] to-[#f7dfa0] text-sm font-bold uppercase text-[#8f6d20] shadow-sm">
          {initial}
        </div>

        {/* User information */}
        <div className="hidden max-w-[150px] text-left sm:block">
          <p className="truncate text-sm font-semibold leading-5 text-stone-700">
            Hi, {displayName}
          </p>

          <p className="truncate text-xs text-stone-400">{roleName}</p>
        </div>

        {/* Arrow */}
        <FaChevronDown
          size={10}
          className={`ml-1 text-stone-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Mobile/desktop backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-[#eadfbe] bg-white shadow-[0_18px_50px_rgba(90,70,20,0.12)]">
            {/* User Header */}
            <div className="border-b border-[#f0e7d0] bg-[#fffaf0] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e8d9a9] bg-[#fff3c4] text-sm font-bold uppercase text-[#8f6d20]">
                  {initial}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold capitalize text-stone-700">
                    {displayName}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-stone-400">
                    {user?.email || "No email available"}
                  </p>

                  <span className="mt-2 inline-flex rounded-full bg-[#fff0bd] px-2.5 py-1 text-[10px] font-semibold text-[#92701f]">
                    {roleName}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="p-2">
              {isNavbar && dashboard && (
                <Link
                  href={dashboard}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-600 transition-all duration-200 hover:bg-[#fff9e8] hover:text-[#8f6d20]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff6d8] text-[#b58a28] transition-colors group-hover:bg-[#ffefb7]">
                    <FiGrid size={15} />
                  </span>

                  <span className="flex-1">
                    {role === "admin"
                      ? "Admin Dashboard"
                      : role === "class_teacher"
                        ? "Class Teacher Dashboard"
                        : role === "student"
                          ? "Student Dashboard"
                          : role === "teacher"
                            ? "Teacher Dashboard"
                            : role === "library"
                              ? "Library Dashboard"
                              : "Dashboard"}
                  </span>

                  <span className="text-xs text-stone-300 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              )}

              {/* Divider */}
              <div className="my-2 h-px bg-[#f2ead6]" />

              {/* Logout */}
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-50 text-stone-400 transition-colors group-hover:bg-red-100 group-hover:text-red-500">
                  <FiLogOut size={15} />
                </span>

                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
