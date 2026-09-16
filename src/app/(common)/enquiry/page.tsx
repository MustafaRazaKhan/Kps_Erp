"use client";

import Loader from "@/components/common/Loader";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import useEnquiry from "@/store/common/context/enquiry.context";

import React from "react";
import {
  FaBook,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaArrowRight,
  FaSchool,
  FaCheck,
} from "react-icons/fa";

const Enquiry = () => {
  const { state, handleChange, handleSubmit } = useEnquiry();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fffdf7] text-stone-700">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden border-b border-[#eee5cd] bg-[#fff9e9]">
          {/* Decorative shapes */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#ffe9a8]/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#fff1c2]/40 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-6 py-14 text-center lg:py-16">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ead9a9] bg-white text-[#b58a28] shadow-sm">
              <FaSchool size={18} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#a17b25]">
              Admission Enquiry
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl lg:text-5xl">
              Begin Your Child's Journey
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-stone-500 sm:text-base">
              Tell us a little about your enquiry and our admission team will
              get in touch with you shortly.
            </p>
          </div>
        </section>

        {/* =====================================================
            FORM SECTION
        ====================================================== */}

        <section className="px-6 py-12 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid overflow-hidden rounded-3xl border border-[#eadfbe] bg-white shadow-[0_20px_60px_rgba(100,80,30,0.07)] lg:grid-cols-[0.85fr_1.15fr]">
              {/* =================================================
                  LEFT INFORMATION PANEL
              ================================================== */}

              <div className="relative overflow-hidden bg-[#fff7dc] p-8 sm:p-10 lg:p-12">
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#f7df91]/30 blur-3xl" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#b58a28] shadow-sm">
                    <FaSchool />
                  </div>

                  <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-[#a17b25]">
                    Krishna Public School
                  </p>

                  <h2 className="mt-3 text-2xl font-bold leading-tight text-stone-800 sm:text-3xl">
                    A place to learn,
                    <br />
                    grow and excel.
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-stone-500">
                    We provide a supportive learning environment where students
                    can develop academically, socially and personally.
                  </p>

                  {/* Benefits */}
                  <div className="mt-8 space-y-4">
                    <Benefit text="Smart and engaging classrooms" />

                    <Benefit text="Experienced and dedicated faculty" />

                    <Benefit text="Modern learning methods" />

                    <Benefit text="Sports and extracurricular activities" />

                    <Benefit text="Safe and supportive campus" />
                  </div>

                  {/* Small note */}
                  <div className="mt-10 rounded-2xl border border-[#ead9a9] bg-white/70 p-4">
                    <p className="text-xs leading-5 text-stone-500">
                      Have questions about admissions, classes or school
                      facilities? Submit the form and our team will help you
                      with the information you need.
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  FORM
              ================================================== */}

              <div className="relative p-7 sm:p-10 lg:p-12">
                {state.loading && <Loader />}

                <div className="mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a17b25]">
                    Get In Touch
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-stone-800">
                    Admission Enquiry
                  </h3>

                  <p className="mt-2 text-sm text-stone-400">
                    Please provide your details below.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <InputField
                    icon={<FaUser />}
                    name="name"
                    placeholder="Full Name"
                    value={state.enquiryObj.name}
                    onChange={handleChange}
                    type="text"
                  />

                  <InputField
                    icon={<FaEnvelope />}
                    name="email"
                    placeholder="Email Address"
                    value={state.enquiryObj.email}
                    onChange={handleChange}
                    type="email"
                  />

                  <InputField
                    icon={<FaPhone />}
                    name="phone"
                    placeholder="Phone Number"
                    value={state.enquiryObj.phone}
                    onChange={handleChange}
                    type="tel"
                  />

                  <InputField
                    icon={<FaBook />}
                    name="subject"
                    placeholder="Subject"
                    value={state.enquiryObj.subject}
                    onChange={handleChange}
                    type="text"
                  />

                  {/* Message */}
                  <div className="rounded-xl border border-[#e9dfc5] bg-[#fffdf7] p-1 transition-all duration-200 focus-within:border-[#d8bd6d] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#f6e9bc]">
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Write your message..."
                      value={state.enquiryObj.message}
                      onChange={handleChange}
                      required
                      className="w-full resize-none bg-transparent px-4 py-3 text-sm text-stone-600 outline-none placeholder:text-stone-400"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#c59a32] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#b58b27] hover:shadow-md"
                  >
                    Submit Enquiry
                    <FaArrowRight
                      size={12}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>

                  <p className="text-center text-[11px] leading-5 text-stone-400">
                    Our admission team will review your enquiry and contact you
                    using the information provided.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Enquiry;

/* =========================================================
   BENEFIT
========================================================= */

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#b58a28] shadow-sm">
        <FaCheck size={10} />
      </div>

      <p className="text-sm font-medium text-stone-600">{text}</p>
    </div>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  icon,
  name,
  placeholder,
  onChange,
  value,
  type,
}: {
  icon: React.ReactNode;
  name: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  type: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#e9dfc5] bg-[#fffdf7] p-1 transition-all duration-200 focus-within:border-[#d8bd6d] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#f6e9bc]">
      <div className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fff5d2] text-[#b58a28]">
        {icon}
      </div>

      <input
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required
        className="w-full bg-transparent px-2 py-2.5 text-sm text-stone-600 outline-none placeholder:text-stone-400"
      />
    </div>
  );
}
