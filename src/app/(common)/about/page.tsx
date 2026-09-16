"use client";

import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fffdf7] text-stone-700">
      {/* =====================================================
          PAGE BACKGROUND IMAGE
      ====================================================== */}

      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/about-bg.jpg')",
        }}
      />

      {/* Warm overlay over background image */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#fffdf7]/90" />

      <Navbar />

      <main>
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative border-b border-[#eadfbe] bg-[#fff9e8]/80">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-24 lg:py-28">
            <span className="inline-flex items-center rounded-full border border-[#e4d39f] bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#9b7623] shadow-sm backdrop-blur">
              About Our School
            </span>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-stone-800 sm:text-5xl lg:text-6xl">
              Shaping Bright Futures
              <span className="mt-2 block text-[#b58a28]">
                Through Education
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-stone-500 sm:text-lg">
              At Krishna Public School, we believe education is not only about
              academic success, but also about developing confidence, character,
              curiosity and a strong sense of responsibility.
            </p>
          </div>
        </section>

        {/* =====================================================
            WHO WE ARE
        ====================================================== */}

        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a17b25]">
              Who We Are
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
              Excellence in Education & Character
            </h2>

            <div className="mx-auto mt-7 max-w-3xl rounded-3xl border border-[#eadfbe] bg-white/80 p-7 shadow-sm backdrop-blur-sm sm:p-10">
              <p className="text-base leading-8 text-stone-500">
                At Krishna Public School, we believe education extends beyond
                textbooks and examinations. Our aim is to create an environment
                where every student feels encouraged to learn, explore,
                participate and grow.
              </p>

              <p className="mt-5 text-base leading-8 text-stone-500">
                Through dedicated teachers, meaningful learning experiences and
                a supportive school community, we strive to help students build
                the knowledge, skills and values they need for the future.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            VISION & MISSION
        ====================================================== */}

        <section className="border-y border-[#eadfbe] bg-[#fff9e8]/70 py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a17b25]">
                Our Foundation
              </p>

              <h2 className="mt-3 text-3xl font-bold text-stone-800 sm:text-4xl">
                Vision & Mission
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {/* Vision */}
              <div className="group rounded-3xl border border-[#eadfbe] bg-white/90 p-8 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff3c4] text-2xl">
                  ✨
                </div>

                <h3 className="mt-6 text-2xl font-bold text-stone-800">
                  Our Vision
                </h3>

                <p className="mt-4 leading-7 text-stone-500">
                  To inspire students to become confident, responsible and
                  globally minded individuals who are prepared to contribute
                  positively to society.
                </p>
              </div>

              {/* Mission */}
              <div className="group rounded-3xl border border-[#eadfbe] bg-white/90 p-8 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff3c4] text-2xl">
                  🌱
                </div>

                <h3 className="mt-6 text-2xl font-bold text-stone-800">
                  Our Mission
                </h3>

                <p className="mt-4 leading-7 text-stone-500">
                  To provide a safe, inclusive and inspiring learning
                  environment where students can develop academically, socially
                  and personally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            PRINCIPAL MESSAGE
        ====================================================== */}

        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a17b25]">
                Leadership
              </p>

              <h2 className="mt-3 text-3xl font-bold text-stone-800 sm:text-4xl">
                Principal's Message
              </h2>
            </div>

            <div className="relative mt-10 overflow-hidden rounded-3xl border border-[#eadfbe] bg-white/85 p-8 shadow-sm backdrop-blur sm:p-12">
              {/* Decorative quote */}
              <div className="absolute -right-3 -top-8 select-none text-[160px] font-serif leading-none text-[#fff0bd]">
                "
              </div>

              <div className="relative">
                <div className="mb-7 h-1 w-12 rounded-full bg-[#c59a32]" />

                <p className="text-lg italic leading-8 text-stone-500 sm:text-xl sm:leading-9">
                  “Education is about shaping character, encouraging curiosity
                  and building the confidence to face the future.”
                </p>

                <div className="mt-8">
                  <p className="text-sm font-bold text-stone-800">Principal</p>

                  <p className="mt-1 text-xs text-[#a17b25]">
                    Krishna Public School
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            VALUES
        ====================================================== */}

        <section className="border-t border-[#eadfbe] bg-[#fff9e8]/60 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a17b25]">
                What We Believe In
              </p>

              <h2 className="mt-3 text-3xl font-bold text-stone-800 sm:text-4xl">
                Values That Guide Us
              </h2>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "01",
                  "Discipline",
                  "Building responsibility and good habits.",
                ],
                [
                  "02",
                  "Knowledge",
                  "Encouraging curiosity and lifelong learning.",
                ],
                [
                  "03",
                  "Character",
                  "Developing honesty, respect and integrity.",
                ],
                [
                  "04",
                  "Growth",
                  "Supporting every student's individual journey.",
                ],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-[#eadfbe] bg-white/90 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-xs font-bold text-[#c59a32]">
                    {number}
                  </span>

                  <h3 className="mt-4 text-base font-bold text-stone-800">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
