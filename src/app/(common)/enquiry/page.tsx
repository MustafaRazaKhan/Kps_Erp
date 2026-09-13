"use client";
import Loader from "@/components/common/Loader";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import useEnquiry from "@/store/common/context/enquiry.context";
import React from "react";
import { FaBook, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

const Enquiry = () => {
  const { state, handleChange, handleSubmit } = useEnquiry();

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-white to-pink-50 py-2">
        <div className="mx-auto max-w-6xl px-4">
          {/* Heading */}
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full px-4 py-1 bg-theme text-sm font-medium text-white">
              Admission Enquiry
            </span>

            <h1 className="mt-5 text-4xl font-bold text-slate-900">
              Let's Start Your Child's Journey
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Fill in your details and our admission counsellor will contact you
              shortly.
            </p>
          </div>

          {/* Card */}
          <div className="overflow-hidden rounded bg-white shadow lg:grid lg:grid-cols-2">
            {/* Left */}
            <div
              className="flex flex-col justify-center p-10 text-white"
              style={{
                background: "linear-gradient(135deg,#ff0066,#ff4d94)",
              }}
            >
              <h2 className="text-3xl font-bold">Why Choose Us?</h2>

              <p className="mt-5 leading-8 text-white/90">
                We nurture students through quality education, experienced
                teachers and modern learning methods.
              </p>

              <div className="mt-10 space-y-5">
                <div>✔ Smart Classrooms</div>
                <div>✔ Experienced Faculty</div>
                <div>✔ Digital Learning</div>
                <div>✔ Sports & Activities</div>
                <div>✔ Safe Campus</div>
              </div>
            </div>

            {/* Right */}
            <div className="p-10">
              {state.loading && <Loader />}
              <h3 className="mb-8 text-2xl font-bold">Enquiry Form</h3>

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

                <textarea
                  name="message"
                  rows={4}
                  placeholder="Write your message..."
                  value={state.enquiryObj.message}
                  onChange={handleChange}
                  className="w-full rounded border border-slate-200 bg-slate-50 p-4 outline-none transition focus:border-[#ff0066] focus:ring-2 focus:ring-pink-200"
                />

                <button
                  type="submit"
                  className="w-full rounded py-4 theme-bg font-semibold text-white transition hover:scale-[1.02]"
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Enquiry;

function InputField({ icon, name, placeholder, onChange, value, type }: any) {
  return (
    <div className="flex items-center gap-5 border bg-slate-50 p-1 border-gray-100">
      <div className="secondary-text text-sm">{icon}</div>

      <input
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required
        className="w-full rounded bg-transparent  py-2 text-sm secondary-text outline-none"
      />
    </div>
  );
}
