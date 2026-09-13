"use client";

import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

export default function About() {
  return (
    <div className="bg-white primary-text">
      <Navbar />

      {/* HERO */}
      <section className="primary-bg py-24 sm:py-32 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex rounded border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            About Us
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight sm:text-6xl">
            Shaping Bright Futures at
            <span className="block">Rose Valley Public School</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/80">
            We are committed to nurturing academic excellence, strong values,
            discipline, and holistic growth.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] primary-text">
            Who We Are
          </span>

          <h2 className="mt-4 text-4xl font-bold primary-text">
            Excellence in Education & Character
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 secondary-text">
            At Rose Valley Public School, we believe education extends beyond
            textbooks.
          </p>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
          <div className="bg-white p-10 border rounded-3xl shadow-sm">
            <div className="text-3xl">✨</div>

            <h3 className="mt-6 text-2xl font-semibold primary-text">
              Our Vision
            </h3>

            <p className="mt-4 leading-7 secondary-text">
              To inspire globally minded individuals with strong values.
            </p>
          </div>

          <div className="bg-white p-10 border rounded-3xl shadow-sm">
            <div className="text-3xl">🌱</div>

            <h3 className="mt-6 text-2xl font-semibold primary-text">
              Our Mission
            </h3>

            <p className="mt-4 leading-7 secondary-text">
              To provide a safe and inspiring environment for students.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPAL MESSAGE */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] primary-text">
            Leadership Message
          </span>

          <h2 className="mt-4 text-4xl font-bold primary-text">
            Principal’s Message
          </h2>

          <div className="mt-10 rounded-3xl border bg-gray-50 p-10 sm:p-14">
            <p className="text-xl italic leading-9 secondary-text">
              “Education is about shaping character and building future
              leaders.”
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
