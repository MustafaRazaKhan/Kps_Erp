"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FiUser, FiLogOut, FiGrid } from "react-icons/fi";

export default function Dropdown({ isNavbar }: { isNavbar: boolean }) {
  const [open, setOpen] = useState(false);

  const { data: session, status } = useSession();
  console.log(session);

  // ⏳ Loading
  if (status === "loading") {
    return null;
  }

  // 🔐 Not Logged In
  if (!session) {
    return (
      <Link
        href="/login"
        className="px-4 py-2 rounded secondary-bg text-white text-sm"
      >
        Login
      </Link>
    );
  }

  const user = session?.user as any;

  const isAdmin = user?.role === "admin";
  const isClassTeacher = user?.role === "class_teacher";
  const isTeacher = user?.role === "teacher";
  const isLibrary = user?.role === "library";
  const isStudent = user?.role === "student";

  return (
    <div className="relative inline-block text-left">
      {/* TRIGGER */}

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-50 transition-all duration-200"
      >
        {/* Avatar */}
        <div className="h-10 w-10 rounded-full bg-[#ff0066] text-white flex items-center justify-center font-semibold uppercase shadow-sm">
          {user?.name?.charAt(0) || "U"}
        </div>

        {/* User Information */}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold text-gray-800 leading-5">
            Hi, {user?.name}
          </p>

          <p className="text-xs text-gray-500">{user?.role || "User"}</p>
        </div>

        {/* Arrow */}
        <FaArrowDown
          className={`text-gray-500 text-xs transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}

      {open && (
        <div className="absolute -right-3.5 mt-3 w-64 rounded bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-2 z-50">
          {/* USER SECTION */}

          <div className="flex items-center gap-3 p-2 rounded primary-bg mb-2">
            <div className="h-9 w-9 rounded-full secondary-bg text-white flex items-center justify-center">
              <FiUser />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-white capitalize truncate">
                {user?.name}
              </p>

              <p className="text-xs text-white truncate">{user?.email}</p>
            </div>
          </div>

          {/* MENU */}

          <div className="space-y-1">
            {isNavbar && (
              <Link
                href={
                  isAdmin
                    ? "/admin/dashboard"
                    : isClassTeacher
                      ? "/dashboard/class-teacher/class-teacher-dashboard"
                      : isStudent
                        ? "/student/dashboard"
                        : isTeacher
                          ? "/dashboard/teacher/teacher-dashboard"
                          : isLibrary
                            ? "/dashboard/library/library-dashboard"
                            : "#"
                }
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm secondary-text hover-text transition hover:bg-gray-100"
              >
                <FiGrid />

                {isAdmin
                  ? "Admin Dashboard"
                  : isClassTeacher
                    ? "Class Teacher Dashboard"
                    : isStudent
                      ? "Student Dashboard"
                      : isTeacher
                        ? "Teacher Dashboard"
                        : isLibrary
                          ? "Library Dashboard"
                          : "Dashboard"}
              </Link>
            )}
          </div>

          {/* LOGOUT */}

          <div className="mt-2">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 transition"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
