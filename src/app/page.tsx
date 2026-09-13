"use client";

import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

import {
  FaGraduationCap,
  FaBookOpen,
  FaUsers,
  FaSchool,
  FaArrowRight,
  FaLaptopCode,
} from "react-icons/fa";

export default function Home() {
  const features = [
    {
      icon: <FaGraduationCap size={28} />,
      title: "Quality Education",
      desc: "Experienced teachers with modern teaching methods.",
    },
    {
      icon: <FaBookOpen size={28} />,
      title: "CBSE Curriculum",
      desc: "Strong academic foundation with practical learning.",
    },
    {
      icon: <FaUsers size={28} />,
      title: "Expert Faculty",
      desc: "Dedicated teachers helping every child succeed.",
    },
    {
      icon: <FaSchool size={28} />,
      title: "Modern Campus",
      desc: "Smart classrooms, labs and library.",
    },
    {
      icon: <FaLaptopCode size={28} />,
      title: "Digital Learning",
      desc: "Technology-enabled education for future leaders.",
    },
    {
      icon: <FaGraduationCap size={28} />,
      title: "Overall Development",
      desc: "Sports, arts, leadership and personality growth.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-pink-50 to-white">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-pink-200 blur-[130px]" />

        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-pink-100 blur-[150px]" />

        <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2">
          <div>
            <span
              className="rounded-full px-4 py-2 text-sm font-semibold text-white"
              style={{ background: "#ff0066" }}
            >
              Admissions Open 2026-27
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight text-slate-900 lg:text-7xl">
              Building
              <span style={{ color: "#ff0066" }}> Future </span>
              Leaders Through Education.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
              Rose Valley Public School provides world-class education,
              experienced faculty, modern classrooms and holistic development
              that prepares every student for tomorrow.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/admission"
                className="rounded-xl px-7 py-4 font-semibold text-white transition hover:scale-105"
                style={{ background: "#ff0066" }}
              >
                Apply Now
              </Link>

              <Link
                href="/about"
                className="rounded-xl border border-slate-300 px-7 py-4 font-semibold hover:bg-slate-100"
              >
                Explore School
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-5">
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h2
                  className="text-3xl font-black"
                  style={{ color: "#ff0066" }}
                >
                  1200+
                </h2>

                <p className="mt-2 text-sm text-slate-500">Students</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h2
                  className="text-3xl font-black"
                  style={{ color: "#ff0066" }}
                >
                  60+
                </h2>

                <p className="mt-2 text-sm text-slate-500">Teachers</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h2
                  className="text-3xl font-black"
                  style={{ color: "#ff0066" }}
                >
                  30+
                </h2>

                <p className="mt-2 text-sm text-slate-500">Years</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="./hero.jpg"
              alt="School"
              width={700}
              height={700}
              className="rounded-[40px] shadow-2xl"
            />

            <div className="absolute -bottom-6 -left-6 rounded-3xl bg-white p-5 shadow-xl">
              <h3 className="text-3xl font-black" style={{ color: "#ff0066" }}>
                100%
              </h3>

              <p className="text-sm text-slate-500">Board Result</p>
            </div>

            <div className="absolute -top-6 -right-6 rounded-3xl bg-white p-5 shadow-xl">
              <h3 className="text-3xl font-black" style={{ color: "#ff0066" }}>
                CBSE
              </h3>

              <p className="text-sm text-slate-500">Affiliated</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-black text-slate-900">
              Why Choose Us
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              We provide an inspiring environment where every child learns,
              grows and succeeds.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((item, index) => (
              <div
                key={index}
                className="group rounded-3xl border border-slate-200 bg-white p-8 transition duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl text-white transition group-hover:scale-110"
                  style={{ background: "#ff0066" }}
                >
                  {item.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold">{item.title}</h3>

                <p className="mt-3 leading-7 text-slate-500">{item.desc}</p>

                <button
                  className="mt-6 flex items-center gap-2 font-semibold"
                  style={{ color: "#ff0066" }}
                >
                  Learn More
                  <FaArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SCHOOL */}

      <section className="bg-pink-50 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <div>
            <Image
              src="/about-school.jpg"
              alt="About School"
              width={700}
              height={550}
              className="rounded-[32px] shadow-xl"
            />
          </div>

          <div>
            <span
              className="rounded-full px-4 py-2 text-sm font-semibold text-white"
              style={{ background: "#ff0066" }}
            >
              About Our School
            </span>

            <h2 className="mt-6 text-4xl font-black text-slate-900">
              Excellence in Education Since 1995
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Rose Valley Public School is committed to providing quality
              education that nurtures knowledge, creativity and character. Our
              experienced teachers and modern facilities create an environment
              where every child can achieve their highest potential.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                "Smart Classrooms",
                "Science Labs",
                "Computer Labs",
                "Digital Library",
                "Sports Campus",
                "Experienced Faculty",
              ].map((item) => (
                <div key={item} className="rounded-xl bg-white p-4 shadow-sm">
                  <span
                    className="mr-2 text-lg font-bold"
                    style={{ color: "#ff0066" }}
                  >
                    ✓
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["1200+", "Students"],
              ["60+", "Teachers"],
              ["30+", "Years"],
              ["100%", "Board Result"],
            ].map(([number, title]) => (
              <div
                key={title}
                className="rounded-3xl border bg-white p-10 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <h2
                  className="text-5xl font-black"
                  style={{ color: "#ff0066" }}
                >
                  {number}
                </h2>

                <p className="mt-3 text-slate-500">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES */}

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-black">World-Class Facilities</h2>

            <p className="mt-4 text-slate-500">
              Everything students need for academic and personal growth.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Digital Classrooms",
              "Science Laboratory",
              "Computer Laboratory",
              "Library",
              "Sports Complex",
              "Transportation",
            ].map((facility) => (
              <div
                key={facility}
                className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl text-white"
                  style={{ background: "#ff0066" }}
                >
                  🏫
                </div>

                <h3 className="text-xl font-bold">{facility}</h3>

                <p className="mt-3 text-slate-500">
                  Modern infrastructure designed to enhance learning and
                  development.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-black">Campus Gallery</h2>

            <p className="mt-4 text-slate-500">
              A glimpse of our vibrant school life.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Image
                key={item}
                src={`/gallery${item}.jpg`}
                alt=""
                width={400}
                height={300}
                className="h-72 w-full rounded-3xl object-cover transition duration-500 hover:scale-105"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION CTA */}

      <section
        className="py-24 text-center text-white"
        style={{
          background: "linear-gradient(135deg,#ff0066,#ff4d94)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-5xl font-black">Admissions Open</h2>

          <p className="mt-6 text-lg text-white/90">
            Give your child the best learning experience with experienced
            teachers, modern infrastructure and a caring environment.
          </p>

          <div className="mt-10 flex justify-center gap-5">
            <Link
              href="/admission"
              className="rounded-xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
            >
              Apply Now
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-black"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
