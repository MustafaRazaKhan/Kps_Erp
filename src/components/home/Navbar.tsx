"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FiMenu, FiX, FiLogIn } from "react-icons/fi";

import Dropdown from "../common/DropDown";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Enquiry",
    href: "/enquiry",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#eee5cd] bg-[#fffdf7]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            DESKTOP / MAIN NAVBAR
        ====================================================== */}

        <div className="flex h-[72px] items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3"
          >
            {/* Logo Mark */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8d9a9] bg-gradient-to-br from-[#fff3c4] to-[#f7dfa0] text-sm font-bold text-[#8f6d20] shadow-sm transition-transform duration-200 group-hover:scale-105">
              K
            </div>

            {/* School Name */}
            <div className="leading-tight">
              <h1 className="text-[15px] font-bold tracking-tight text-stone-800 sm:text-base">
                Krishna Public School
              </h1>

              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#a18132]">
                Learn • Grow • Excel
              </p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3.5 py-2 text-sm font-medium text-stone-500 transition-all duration-200 hover:bg-[#fff8e5] hover:text-[#8f6d20]"
              >
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="mx-3 h-7 w-px bg-[#eee5cd]" />

            {/* LOGIN / USER */}
            {session?.user ? (
              <Dropdown isNavbar={true} />
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-[#c59a32] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#b58b27] hover:shadow-md"
              >
                <FiLogIn size={15} />
                Login
              </Link>
            )}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#eadfbe] bg-white text-stone-600 transition-all duration-200 hover:bg-[#fff8e5] hover:text-[#8f6d20] md:hidden"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* =====================================================
            MOBILE MENU
        ====================================================== */}

        {open && (
          <div className="border-t border-[#f0e7d1] pb-4 pt-3 md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-stone-600 transition-colors hover:bg-[#fff8e5] hover:text-[#8f6d20]"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile User / Login */}
              <div className="mt-2 border-t border-[#f0e7d1] pt-3">
                {session?.user ? (
                  <div className="px-1">
                    <Dropdown isNavbar={true} />
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#c59a32] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#b58b27]"
                  >
                    <FiLogIn size={16} />
                    Login to ERP
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
