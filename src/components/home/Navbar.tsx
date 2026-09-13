"use client";

import { useState } from "react";
// import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaSign } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Dropdown from "../common/DropDown";
// import Dropdown from "../dropdown/Dropdown";

export default function Navbar() {
  // Session
  const { data: session } = useSession();

  // Mobile Menu Toggle
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* NAVBAR */}
        <div className="flex items-center justify-between py-3">
          {/* LOGO */}
          <Link href="/" className="leading-tight">
            <h1 className="text-lg font-bold text-blue ">
              Krishna Public School
            </h1>

            <p className="text-[11px] secondary-text">Learn • Grow • Excel</p>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-5">
            <Link href="/" className="text-sm  hover-text transition">
              Home
            </Link>

            <Link href="/about" className="text-sm  hover-text transition">
              About
            </Link>

            <Link
              href="/enquiry"
              className="text-sm font-medium  hover-text transition"
            >
              Enquiry
            </Link>

            <Link href="/contact" className="text-sm  hover-text transition">
              Contact
            </Link>

            {/* LOGIN / USER */}
            {session?.user ? (
              <Dropdown isNavbar={true} />
            ) : (
              <Link
                href="/login"
                className="rounded primary-bg text-white px-5 py-2 text-sm hover:opacity-90 transition"
              >
                Login
              </Link>
            )}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl "
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden flex flex-col gap-2 pb-4">
            <Link
              href="/"
              className="px-3 py-2 text-sm  hover:bg-slate-100 rounded"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="px-3 py-2 text-sm  hover:bg-slate-100 rounded"
            >
              About
            </Link>

            <Link
              href="/admission"
              className="px-3 py-2 text-sm font-medium  hover:bg-slate-100 rounded"
            >
              Admissions
            </Link>

            <Link
              href="/contact"
              className="px-3 py-2 text-sm  hover:bg-slate-100 rounded"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 rounded btn-bg text-white   py-3 text-sm hover:opacity-45 transition"
            >
              <div>
                <FaSign />
              </div>
              <div>Login</div>
            </Link>

            {/* LOGIN / USER */}
            {session?.user ? (
              <Dropdown isNavbar={true} />
            ) : (
              <Link
                href="/login"
                className="rounded button-bg text-white px-4 py-2 text-sm w-fit hover:opacity-90 transition"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
