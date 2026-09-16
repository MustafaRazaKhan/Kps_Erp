"use client";

import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

import {
  FaArrowRight,
  FaBook,
  FaChartLine,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaCreditCard,
  FaGraduationCap,
  FaSchool,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";

const portals = [
  {
    title: "Student",
    description: "View academics, fees, attendance and school information.",
    icon: <FaUserGraduate />,
    href: "/student/dashboard",
  },
  {
    title: "Teacher",
    description:
      "Manage classes, attendance, students and academic activities.",
    icon: <FaChalkboardTeacher />,
    href: "/teacher/dashboard",
  },
  {
    title: "Administrator",
    description:
      "Manage school operations, students, staff and academic records.",
    icon: <FaSchool />,
    href: "/admin/dashboard",
  },
];

const modules = [
  {
    title: "Student Management",
    description: "Profiles, guardians and academic records.",
    icon: <FaUserGraduate />,
  },
  {
    title: "Attendance",
    description: "Daily student and staff attendance.",
    icon: <FaClipboardCheck />,
  },
  {
    title: "Academic Management",
    description: "Classes, subjects, examinations and results.",
    icon: <FaGraduationCap />,
  },
  {
    title: "Fee Management",
    description: "Payments, installments and fee records.",
    icon: <FaCreditCard />,
  },
  {
    title: "Library",
    description: "Books, issues, returns and library records.",
    icon: <FaBook />,
  },
  {
    title: "Reports",
    description: "Useful reports and insights for management.",
    icon: <FaChartLine />,
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fffdf5] text-stone-700">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden border-b border-[#f0e6c8]">
          {/* Soft cream decorations */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#fff1b8]/40 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#fff7dc]/70 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
            {/* LEFT */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ead9a5] bg-[#fff9e8] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#9a7620]">
                <span className="h-2 w-2 rounded-full bg-[#d6a93a]" />
                School Management System
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight text-stone-800 sm:text-5xl lg:text-6xl">
                Everything your school needs,
                <span className="block text-[#b88b22]">
                  in one simple platform.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-stone-500 sm:text-lg">
                A centralized School ERP designed to simplify student
                management, academics, attendance, fees, library and everyday
                school operations.
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#c59a32] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b58b27] hover:shadow-md"
                >
                  Login to ERP
                  <FaArrowRight size={12} />
                </Link>

                <Link
                  href="/student/dashboard"
                  className="rounded-xl border border-[#e8ddbf] bg-white px-6 py-3 text-sm font-semibold text-stone-600 shadow-sm transition hover:border-[#d9c27d] hover:bg-[#fff9e8] hover:text-[#9a7620]"
                >
                  Student Portal
                </Link>
              </div>

              {/* Statistics */}
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <div>
                  <p className="text-xl font-bold text-stone-800">1200+</p>
                  <p className="text-xs text-stone-400">Students</p>
                </div>

                <div className="h-8 w-px bg-[#eadfbe]" />

                <div>
                  <p className="text-xl font-bold text-stone-800">60+</p>
                  <p className="text-xs text-stone-400">Teachers</p>
                </div>

                <div className="h-8 w-px bg-[#eadfbe]" />

                <div>
                  <p className="text-xl font-bold text-stone-800">24/7</p>
                  <p className="text-xs text-stone-400">Access</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="rounded-3xl border border-[#eee3c8] bg-white p-2 shadow-[0_20px_60px_rgba(120,90,20,0.08)]">
                <Image
                  src="/hero.jpg"
                  alt="Krishna Public School"
                  width={900}
                  height={650}
                  priority
                  className="h-[330px] w-full rounded-2xl object-cover sm:h-[400px] lg:h-[470px]"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-5 left-5 rounded-2xl border border-[#eadfbe] bg-white px-5 py-4 shadow-lg sm:left-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff6d8] text-[#b58a28]">
                    <FaSchool size={15} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                      Krishna Public School
                    </p>

                    <p className="mt-1 text-sm font-bold text-stone-700">
                      Smart school management
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            PORTAL ACCESS
        ====================================================== */}

        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ad8323]">
                Portal Access
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-800">
                Choose your workspace
              </h2>

              <p className="mt-3 text-sm leading-6 text-stone-500">
                Access the tools and information relevant to your role in the
                school.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {portals.map((portal) => (
                <Link
                  key={portal.title}
                  href={portal.href}
                  className="group rounded-2xl border border-[#eee4ca] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#dec77f] hover:bg-[#fffdf5] hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff6d8] text-[#b58a28]">
                      {portal.icon}
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fffaf0] text-stone-300 transition group-hover:bg-[#fff3c4] group-hover:text-[#a77c20]">
                      <FaArrowRight size={11} />
                    </div>
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-stone-800">
                    {portal.title} Portal
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    {portal.description}
                  </p>

                  <p className="mt-5 text-xs font-bold text-[#a77c20]">
                    Open Portal →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            MODULES
        ====================================================== */}

        <section className="border-y border-[#f0e6c8] bg-[#fff9e9]/60 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ad8323]">
                School ERP
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-800">
                Everything in one place
              </h2>

              <p className="mt-3 text-sm leading-6 text-stone-500">
                Essential tools for managing academic and administrative
                activities.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((module, index) => (
                <div
                  key={module.title}
                  className="group rounded-2xl border border-[#eee4ca] bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#dec77f] hover:shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        index % 2 === 0
                          ? "bg-[#fff6d8] text-[#b58a28]"
                          : "bg-[#fff9e9] text-[#a77c20]"
                      }`}
                    >
                      {module.icon}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-stone-800">
                        {module.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-5 text-stone-500">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            DASHBOARD PREVIEW
        ====================================================== */}

        <section className="py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ad8323]">
                Simple Management
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-stone-800">
                A clearer view of your school.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-stone-500">
                Important school information is organized into simple dashboards
                so staff can quickly find what they need.
              </p>

              <div className="mt-7 grid max-w-md grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#eee4ca] bg-white p-4">
                  <FaUsers className="text-[#b58a28]" />

                  <p className="mt-3 text-xl font-bold text-stone-800">1200+</p>

                  <p className="mt-1 text-xs text-stone-400">Students</p>
                </div>

                <div className="rounded-xl border border-[#eee4ca] bg-white p-4">
                  <FaChalkboardTeacher className="text-[#b58a28]" />

                  <p className="mt-3 text-xl font-bold text-stone-800">60+</p>

                  <p className="mt-1 text-xs text-stone-400">Teachers</p>
                </div>

                <div className="rounded-xl border border-[#eee4ca] bg-white p-4">
                  <FaBook className="text-[#b58a28]" />

                  <p className="mt-3 text-xl font-bold text-stone-800">5K+</p>

                  <p className="mt-1 text-xs text-stone-400">Library Books</p>
                </div>

                <div className="rounded-xl border border-[#eee4ca] bg-white p-4">
                  <FaChartLine className="text-[#b58a28]" />

                  <p className="mt-3 text-xl font-bold text-stone-800">24/7</p>

                  <p className="mt-1 text-xs text-stone-400">Availability</p>
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="rounded-3xl border border-[#eadfbe] bg-[#fff9e9] p-4 sm:p-6">
              <div className="rounded-2xl border border-[#eee4ca] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#f2ead6] pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff6d8] text-[#b58a28]">
                      <FaSchool size={15} />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                        School ERP
                      </p>

                      <p className="text-sm font-bold text-stone-700">
                        Management Overview
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#f3f8e9] px-3 py-1 text-[10px] font-semibold text-[#6f8b35]">
                    Active
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-[#fffaf0] p-4">
                    <div className="flex items-center gap-3">
                      <FaUserGraduate className="text-[#b58a28]" />

                      <span className="text-sm font-medium text-stone-600">
                        Student Management
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-stone-400">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-[#fff9e9] p-4">
                    <div className="flex items-center gap-3">
                      <FaClipboardCheck className="text-[#a77c20]" />

                      <span className="text-sm font-medium text-stone-600">
                        Attendance
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-stone-400">
                      Updated
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-[#faf9f4] p-4">
                    <div className="flex items-center gap-3">
                      <FaCreditCard className="text-[#b58a28]" />

                      <span className="text-sm font-medium text-stone-600">
                        Fee Management
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-stone-400">
                      Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ====================================================== */}

        <section className="px-6 pb-16 lg:pb-20">
          <div className="mx-auto max-w-6xl rounded-3xl border border-[#eadfbe] bg-gradient-to-br from-[#fff8df] via-[#fffdf5] to-[#fff1c2]/50 px-7 py-12 text-center sm:px-12">
            <div className="mx-auto max-w-2xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#b58a28] shadow-sm">
                <FaSchool />
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-stone-800">
                Your school, organized in one place.
              </h2>

              <p className="mt-3 text-sm leading-6 text-stone-500">
                Login to access your School ERP dashboard and manage the
                activities relevant to your role.
              </p>

              <Link
                href="/login"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#c59a32] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b58b27] hover:shadow-md"
              >
                Login to ERP
                <FaArrowRight size={12} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
