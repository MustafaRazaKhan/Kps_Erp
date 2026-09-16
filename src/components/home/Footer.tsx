"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-amber-100 bg-[#fffdf7]">
      {/* Soft decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-sky-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* School Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              {/* Logo */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-200 to-yellow-300 text-lg font-bold text-amber-800 shadow-sm shadow-amber-200/50">
                K
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-700">
                  Krishna Public School
                </h3>

                <p className="text-xs font-medium uppercase tracking-wider text-sky-600/80">
                  School ERP
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-6 text-slate-500">
              Empowering students, teachers, parents and administrators with a
              smarter and more connected school experience.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600/70 transition-all duration-300 hover:-translate-y-1 hover:bg-sky-100 hover:text-sky-700"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-700/70 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-100 hover:text-amber-800"
              >
                <FaInstagram size={14} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100 hover:text-slate-700"
              >
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-700">
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm">
              {[
                ["Home", "/"],
                ["About School", "/about"],
                ["Academics", "/academics"],
                ["Notice Board", "/notice"],
                ["Contact Us", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-500 transition-colors duration-200 hover:text-sky-700"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ERP Portal */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-700">
              ERP Portal
            </h4>

            <ul className="space-y-3 text-sm">
              {[
                ["Student Portal", "/student"],
                ["Parent Portal", "/parent"],
                ["Teacher Portal", "/teacher"],
                ["Attendance", "/attendance"],
                ["Examination & Results", "/results"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-500 transition-colors duration-200 hover:text-sky-700"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-700">
              Contact Us
            </h4>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700/70">
                  <FaMapMarkerAlt size={13} />
                </div>

                <p className="text-sm leading-5 text-slate-500">
                  Krishna Public School
                  <br />
                  School Campus, India
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600/70">
                  <FaPhoneAlt size={12} />
                </div>

                <a
                  href="tel:+910000000000"
                  className="text-sm text-slate-500 transition-colors hover:text-sky-700"
                >
                  +91 00000 00000
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700/70">
                  <FaEnvelope size={12} />
                </div>

                <a
                  href="mailto:info@school.com"
                  className="text-sm text-slate-500 transition-colors hover:text-sky-700"
                >
                  info@school.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-600">
              Krishna Public School
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs">
            <Link
              href="/privacy-policy"
              className="text-slate-400 transition-colors hover:text-sky-700"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-slate-400 transition-colors hover:text-sky-700"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/contact"
              className="text-slate-400 transition-colors hover:text-sky-700"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
