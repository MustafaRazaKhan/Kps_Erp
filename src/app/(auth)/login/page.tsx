"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiBookOpen,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import useAuth from "@/store/admin/context/auth.context";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const { state, handleLoginChange, handleLoginSubmit } = useAuth();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fffdf7]">
        {/* =====================================================
            LOGIN SECTION
        ====================================================== */}

        <section className="relative overflow-hidden border-b border-[#eadfbe]">
          {/* Soft Background */}
          <div className="absolute inset-0 bg-[#fffaf0]" />

          <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#f7df91]/25 blur-3xl" />

          <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#f3e4b5]/30 blur-3xl" />

          <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-2 lg:px-8">
            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <div className="hidden lg:block">
              <div className="max-w-xl">
                {/* Small Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#e4d39f] bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#9d7825] shadow-sm backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#c59a32]" />
                  School ERP
                </div>

                <h1 className="mt-7 text-5xl font-bold leading-[1.12] tracking-tight text-stone-800">
                  Everything your school needs,
                  <span className="block text-[#b58a28]">in one place.</span>
                </h1>

                <p className="mt-6 max-w-lg text-base leading-7 text-stone-500">
                  Access your school management portal and stay connected with
                  students, academics, attendance and everyday school
                  operations.
                </p>

                {/* Image */}
                <div className="relative mt-10 overflow-hidden rounded-3xl border border-[#e9dfc5] bg-white p-2 shadow-[0_20px_50px_rgba(100,80,30,0.08)]">
                  <div className="relative overflow-hidden rounded-2xl bg-[#fff7dc]">
                    <img
                      src="https://imgs.search.brave.com/YT6m4z3ctt_k1NQvhh6aGFHRFITafrVML0j5H7OMVlw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly92YXN5/ZXJwLmNvbS9hc3Nl/dHMtbmV3L2ltYWdl/cy9yZXRpYWwtZmVh/dHVyZXMtd2l0aC1k/ZXNrdG9wLndlYnA"
                      alt="School ERP Dashboard"
                      className="h-[270px] w-full object-cover object-center opacity-90"
                    />

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#fff7dc]/90 via-transparent to-transparent" />

                    {/* Image Caption */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff1c4] text-[#b58a28]">
                          <FiBookOpen size={16} />
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                            Krishna Public School
                          </p>

                          <p className="text-sm font-semibold text-stone-700">
                            School Management Portal
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-7 grid grid-cols-3 gap-3">
                  <FeatureCard
                    icon={<FiUsers />}
                    title="Students"
                    desc="Student records"
                  />

                  <FeatureCard
                    icon={<FiBookOpen />}
                    title="Academics"
                    desc="School activities"
                  />

                  <FeatureCard
                    icon={<FiShield />}
                    title="Secure"
                    desc="Protected access"
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                LOGIN CARD
            ================================================== */}

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <div className="rounded-3xl border border-[#e8ddbf] bg-white p-7 shadow-[0_25px_70px_rgba(100,80,30,0.09)] sm:p-9">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff4cf] text-[#b58a28]">
                      <FiBookOpen size={21} />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-stone-800">
                      Welcome Back
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-stone-400">
                      Sign in to access your school portal.
                    </p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-5">
                    {/* ROLE */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                        Select Role
                      </label>

                      <select
                        name="role"
                        value={state.loginObj.role}
                        onChange={handleLoginChange}
                        required
                        className="mt-2 w-full rounded-xl border border-[#e9dfc5] bg-[#fffdf7] px-4 py-3 text-sm text-stone-600 outline-none transition focus:border-[#d5b85f] focus:bg-white focus:ring-2 focus:ring-[#f5e9bd]"
                      >
                        <option value="">Select Role For Login</option>

                        <option value="admin">Admin</option>

                        <option value="teacher">Teacher</option>

                        <option value="student">Student</option>

                        <option value="class_teacher">Class Teacher</option>
                      </select>
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                        Email Address
                      </label>

                      <div className="relative mt-2">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />

                        <input
                          type="email"
                          name="email"
                          value={state.loginObj.email}
                          onChange={handleLoginChange}
                          placeholder="Enter your email"
                          required
                          className="w-full rounded-xl border border-[#e9dfc5] bg-[#fffdf7] py-3.5 pl-11 pr-4 text-sm text-stone-600 outline-none transition placeholder:text-stone-400 focus:border-[#d5b85f] focus:bg-white focus:ring-2 focus:ring-[#f5e9bd]"
                        />
                      </div>
                    </div>

                    {/* PASSWORD */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                        Password
                      </label>

                      <div className="relative mt-2">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />

                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={state.loginObj.password}
                          onChange={handleLoginChange}
                          placeholder="Enter your password"
                          required
                          className="w-full rounded-xl border border-[#e9dfc5] bg-[#fffdf7] py-3.5 pl-11 pr-12 text-sm text-stone-600 outline-none transition placeholder:text-stone-400 focus:border-[#d5b85f] focus:bg-white focus:ring-2 focus:ring-[#f5e9bd]"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 transition hover:text-[#b58a28]"
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </div>

                    {/* FORGOT PASSWORD */}
                    <div className="flex justify-end pt-1">
                      <Link
                        href="/contact"
                        className="text-xs font-medium text-[#a17b25] transition hover:text-[#80601b]"
                      >
                        Forgot Password? Contact Admin
                      </Link>
                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-[#c59a32] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#b58b27] hover:shadow-md active:scale-[0.99]"
                    >
                      Sign In
                    </button>
                  </form>

                  {/* Bottom Note */}
                  <div className="mt-7 border-t border-[#eee6d2] pt-6 text-center">
                    <p className="text-[11px] leading-5 text-stone-400">
                      Your account provides access according to your assigned
                      school role and permissions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-[#e9dfc5] bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff4cf] text-[#b58a28]">
        {icon}
      </div>

      <h3 className="mt-3 text-xs font-bold text-stone-700">{title}</h3>

      <p className="mt-1 text-[10px] text-stone-400">{desc}</p>
    </div>
  );
}
