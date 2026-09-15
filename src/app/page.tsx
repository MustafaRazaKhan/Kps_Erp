"use client";

import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaPhoneAlt,
  FaSchool,
  FaUsers,
} from "react-icons/fa";

const quickLinks = [
  {
    title: "Admissions",
    description: "Apply for admission and check admission information.",
    icon: <FaGraduationCap />,
    href: "/admission",
  },
  {
    title: "Academic",
    description: "Explore classes, curriculum and academic information.",
    icon: <FaBookOpen />,
    href: "/academic",
  },
  {
    title: "Faculty",
    description: "Meet our teachers and experienced academic team.",
    icon: <FaChalkboardTeacher />,
    href: "/faculty",
  },
  {
    title: "Contact School",
    description: "Get in touch with the school administration.",
    icon: <FaPhoneAlt />,
    href: "/contact",
  },
];

const facilities = [
  "Smart Classrooms",
  "Science Laboratories",
  "Computer Laboratory",
  "Library",
  "Sports Facilities",
  "School Transport",
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-white text-slate-800">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-20">
            {/* LEFT */}

            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600">
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                Admissions Open 2026–27
              </div>

              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Education that builds a{" "}
                <span className="text-pink-600">better future.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Welcome to Rose Valley Public School. We provide a structured,
                supportive and modern learning environment focused on academic
                excellence and the overall development of every student.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/admission"
                  className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
                >
                  Apply for Admission
                  <FaArrowRight size={12} />
                </Link>

                <Link
                  href="/about"
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600"
                >
                  About School
                </Link>
              </div>

              {/* BASIC SCHOOL INFO */}

              <div className="mt-10 grid max-w-lg grid-cols-3 border-y border-slate-200 py-5">
                <div>
                  <p className="text-2xl font-bold text-slate-900">1200+</p>
                  <p className="mt-1 text-xs text-slate-500">Students</p>
                </div>

                <div className="border-l border-slate-200 pl-5">
                  <p className="text-2xl font-bold text-slate-900">60+</p>
                  <p className="mt-1 text-xs text-slate-500">Teachers</p>
                </div>

                <div className="border-l border-slate-200 pl-5">
                  <p className="text-2xl font-bold text-slate-900">30+</p>
                  <p className="mt-1 text-xs text-slate-500">Years</p>
                </div>
              </div>
            </div>

            {/* IMAGE */}

            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                <Image
                  src="/hero.jpg"
                  alt="Rose Valley Public School"
                  width={800}
                  height={650}
                  priority
                  className="h-[420px] w-full rounded-xl object-cover lg:h-[500px]"
                />
              </div>

              <div className="absolute -bottom-5 left-5 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-lg">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  School Board
                </p>

                <p className="mt-1 text-lg font-bold text-pink-600">CBSE</p>
              </div>

              <div className="absolute -right-3 top-8 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-lg">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Academic Result
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">100%</p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            QUICK ACCESS
        ===================================================== */}

        <section className="border-b border-slate-200 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-pink-600">
                Quick Access
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                School Information
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Access important school information quickly.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-pink-200 hover:bg-pink-50/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-pink-50 text-pink-600">
                      {item.icon}
                    </div>

                    <FaArrowRight
                      className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-pink-500"
                      size={13}
                    />
                  </div>

                  <h3 className="mt-5 font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ABOUT
        ===================================================== */}

        <section className="bg-slate-50 py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
              <Image
                src="/about-school.jpg"
                alt="About Rose Valley Public School"
                width={700}
                height={550}
                className="h-[380px] w-full rounded-xl object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-pink-600">
                About Our School
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900">
                A focused environment for learning and growth.
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Rose Valley Public School is committed to providing quality
                education in a safe, disciplined and encouraging environment.
                Our academic approach combines strong fundamentals with
                practical learning, technology and extracurricular activities.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Experienced Faculty",
                  "Smart Classrooms",
                  "Modern Laboratories",
                  "Digital Library",
                  "Sports Facilities",
                  "Safe Transport",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-50 text-xs text-pink-600">
                      ✓
                    </span>

                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-pink-600 hover:text-pink-700"
              >
                Learn more about our school
                <FaArrowRight size={11} />
              </Link>
            </div>
          </div>
        </section>

        {/* =====================================================
            FACILITIES
        ===================================================== */}

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-pink-600">
                  Facilities
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  Built for better learning
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-slate-500">
                Our facilities support academics, creativity, physical
                development and everyday student life.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {facilities.map((facility, index) => (
                <div
                  key={facility}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-pink-200 hover:bg-pink-50/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-pink-600">
                    {index === 0 && <FaSchool />}
                    {index === 1 && <FaBookOpen />}
                    {index === 2 && <FaLaptopIcon />}
                    {index === 3 && <FaBookOpen />}
                    {index === 4 && <FaUsers />}
                    {index === 5 && <FaSchool />}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {facility}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Available for students
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            SCHOOL INFORMATION
        ===================================================== */}

        <section className="border-y border-slate-200 bg-slate-50 py-14">
          <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <FaCalendarAlt className="text-pink-600" size={20} />

              <h3 className="mt-4 font-semibold text-slate-900">
                Academic Session
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                2026–27 academic session is currently open.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <FaUsers className="text-pink-600" size={20} />

              <h3 className="mt-4 font-semibold text-slate-900">
                Student Community
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                A supportive learning environment for every student.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <FaSchool className="text-pink-600" size={20} />

              <h3 className="mt-4 font-semibold text-slate-900">
                School Campus
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Modern facilities designed for academics and activities.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            ADMISSION CTA
        ===================================================== */}

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-2xl bg-pink-600 px-7 py-12 text-center text-white sm:px-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-pink-100">
                Admissions 2026–27
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Start your child's journey with us.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-pink-100 sm:text-base">
                Get admission information, speak with our team and take the next
                step toward joining Rose Valley Public School.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="/admission"
                  className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-pink-600 transition hover:bg-pink-50"
                >
                  Apply Now
                </Link>

                <Link
                  href="/contact"
                  className="rounded-lg border border-pink-300 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-500"
                >
                  Contact School
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* Small reusable icon for the facilities section */

function FaLaptopIcon() {
  return <span className="text-sm">💻</span>;
}
