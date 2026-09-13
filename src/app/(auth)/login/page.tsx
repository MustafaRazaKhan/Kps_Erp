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

      <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200">
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          {/* LEFT */}
          <div className="relative hidden lg:flex bg-slate-900 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_40%)]" />

            {/* Image */}
            <img
              src="login.jpg"
              alt="Dashboard Preview"
              className="absolute top-1/2 left-1/2 w-[70%] -translate-x-1/2 -translate-y-1/2 opacity-80 pointer-events-none select-none drop-shadow-2xl"
            />

            {/* Optional Fade Overlay (makes text more readable) */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between p-14 text-white">
              <div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <FiBookOpen size={28} />
                </div>

                <h1 className="text-4xl font-bold leading-tight">
                  Smart School ERP System
                </h1>
                <p className="mt-4 text-slate-300 leading-7 max-w-lg">
                  Manage students, academics, attendance, and staff with a
                  powerful, secure, and beautifully designed dashboard.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <FeatureCard
                  icon={<FiUsers />}
                  title="Students"
                  desc="Full control of student records"
                />
                <FeatureCard
                  icon={<FiBookOpen />}
                  title="Academics"
                  desc="Manage classes & operations"
                />
                <FeatureCard
                  icon={<FiShield />}
                  title="Secure"
                  desc="Role-based protected system"
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
              <div className="rounded bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl p-8">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Welcome Back 👋
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Sign in to your account
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  {/* ROLE */}
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Select Role
                    </label>
                    <select
                      name="role"
                      value={state.loginObj.role}
                      onChange={handleLoginChange}
                      className="mt-1 w-full rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900/20 focus:bg-white outline-none"
                    >
                      <option>Select Role For Login</option>
                      <option value="admin">Admin</option>
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                      <option value="class_teacher">Class Teacher</option>
                    </select>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Email Address
                    </label>
                    <div className="relative mt-1">
                      <FiMail className="absolute left-4 top-3.5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={state.loginObj.email}
                        onChange={handleLoginChange}
                        placeholder="Enter your email"
                        className="w-full rounded border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-slate-900/20 focus:bg-white outline-none"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <div className="relative mt-1">
                      <FiLock className="absolute left-4 top-3.5 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={state.loginObj.password}
                        onChange={handleLoginChange}
                        placeholder="Enter your password"
                        className="w-full rounded border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm focus:ring-2 focus:ring-slate-900/20 focus:bg-white outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-700"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  {/* OPTIONS */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-600"></label>

                    <Link href="#" className="text-blue-500">
                      Forgot Password?/Contact To Admin
                    </Link>
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    className="w-full rounded bg-slate-900 py-3 text-sm font-medium text-white transition hover:bg-slate-800 flex items-center justify-center gap-2"
                  >
                    SignIn
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
      <div className="mb-2 text-white">{icon}</div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-slate-300">{desc}</p>
    </div>
  );
}
