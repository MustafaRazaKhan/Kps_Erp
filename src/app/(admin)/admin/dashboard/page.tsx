"use client";

import useEnquiry from "@/store/common/context/enquiry.context";
import React from "react";
import { FaQuestion } from "react-icons/fa";
import {
  FiUsers,
  FiBookOpen,
  FiDollarSign,
  FiTruck,
  FiGrid,
  FiArrowUpRight,
  FiUserPlus,
  FiClipboard,
  FiCalendar,
  FiAward,
  FiBell,
  FiCheckCircle,
} from "react-icons/fi";

const Page = () => {
  const {
    state: { totalEnquiries },
  } = useEnquiry();
  console.log(totalEnquiries);
  const dashboardStats = [
    {
      title: "Total Enquiries",
      value: totalEnquiries,
      // growth: "+12%",
      icon: <FaQuestion size={24} />,
      color: "from-rose-500 to-pink-500",
      bg: "bg-rose-50",
    },
    {
      title: "Total Students",
      value: "1,250",
      growth: "+12%",
      icon: <FiUsers size={24} />,
      color: "from-rose-500 to-pink-500",
      bg: "bg-rose-50",
    },
    {
      title: "Total Classes",
      value: "32",
      growth: "+4",
      icon: <FiGrid size={24} />,
      color: "from-orange-500 to-red-500",
      bg: "bg-orange-50",
    },
    {
      title: "Fee Collection",
      value: "₹12.45L",
      growth: "+18%",
      icon: <FiDollarSign size={24} />,
      color: "from-emerald-500 to-green-500",
      bg: "bg-emerald-50",
    },
    {
      title: "Library Books",
      value: "8,540",
      growth: "+240",
      icon: <FiBookOpen size={24} />,
      color: "from-indigo-500 to-violet-500",
      bg: "bg-indigo-50",
    },
    {
      title: "School Vehicles",
      value: "24",
      growth: "100%",
      icon: <FiTruck size={24} />,
      color: "from-sky-500 to-cyan-500",
      bg: "bg-sky-50",
    },
  ];

  const quickActions = [
    { title: "Add Student", icon: <FiUserPlus />, color: "bg-rose-500" },
    { title: "Take Attendance", icon: <FiClipboard />, color: "bg-indigo-500" },
    { title: "Fee Collection", icon: <FiDollarSign />, color: "bg-green-500" },
    { title: "Exam Schedule", icon: <FiCalendar />, color: "bg-orange-500" },
  ];

  const activities = [
    {
      title: "Admission Completed",
      name: "Ayesha Khan • Class VIII-A",
      time: "5 mins ago",
    },
    {
      title: "Fee Payment Received",
      name: "Mohammed Ali • ₹4,500",
      time: "20 mins ago",
    },
    {
      title: "Library Book Issued",
      name: "Rohan Sharma • Science Book",
      time: "1 hour ago",
    },
    {
      title: "Transport Assigned",
      name: "Bus No. 04 • Route A",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* ---------------- Hero ---------------- */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-red-500 p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-pink-300/20 blur-3xl"></div>

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-rose-100">
              Krishna Public School ERP
            </p>

            <h1 className="mt-2 text-4xl font-bold">Welcome Back, Admin 👋</h1>

            <p className="mt-3 max-w-xl text-rose-100">
              Manage students, staff, fees, transport, exams and school
              operations from one beautiful dashboard.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl">
            <p className="text-sm text-rose-100">Today's Attendance</p>

            <h2 className="mt-2 text-4xl font-bold">94%</h2>

            <p className="mt-2 text-sm text-rose-100">
              1,176 students present today.
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- Stat Cards ---------------- */}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {dashboardStats.map((item, index) => (
          <div
            key={index}
            className="group rounded-3xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div
                className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg`}
              >
                {item.icon}
              </div>
            </div>

            <div className="mt-5 text-sm text-slate-500 flex justify-between items-center">
              <div>{item.title}</div>
              <div className="bg-red-500 px-4 py-2 text-white rounded">
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- Quick Actions ---------------- */}

      <div className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Quick Actions</h2>

          <FiBell className="text-rose-500" size={22} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((item, index) => (
            <button
              key={index}
              className="group rounded-2xl bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`${item.color} mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-xl text-white`}
              >
                {item.icon}
              </div>

              <h3 className="font-semibold text-slate-800 group-hover:text-rose-600">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Manage school records instantly.
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- Middle Cards ---------------- */}

      <div className="mt-10 grid gap-5 xl:grid-cols-3">
        {/* Student Overview */}

        <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Student Overview
              </h3>

              <p className="text-sm text-slate-500">
                Overall student distribution.
              </p>
            </div>

            <FiUsers className="text-rose-500" size={24} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "Male Students",
                value: "720",
                percent: "58%",
                color: "bg-sky-500",
              },
              {
                label: "Female Students",
                value: "530",
                percent: "42%",
                color: "bg-pink-500",
              },
              {
                label: "New Admissions",
                value: "118",
                percent: "This Month",
                color: "bg-emerald-500",
              },
              {
                label: "Graduated Students",
                value: "94",
                percent: "Last Session",
                color: "bg-indigo-500",
              },
            ].map((card, index) => (
              <div key={index} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{card.label}</span>

                  <span
                    className={`${card.color} rounded-full px-2 py-1 text-xs text-white`}
                  >
                    {card.percent}
                  </span>
                </div>

                <h3 className="mt-3 text-3xl font-bold text-slate-800">
                  {card.value}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Card */}

        <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-lg">
          <FiDollarSign size={28} />

          <p className="mt-6 text-green-100">Total Fee Collection</p>

          <h2 className="mt-2 text-4xl font-bold">₹12,45,000</h2>

          <div className="mt-6 space-y-4">
            {[
              { label: "Collected Fees", value: "72%" },
              { label: "Pending Fees", value: "28%" },
              { label: "Scholarships", value: "₹1.2L" },
            ].map((item, i) => (
              <div key={i}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{item.label}</span>

                  <span>{item.value}</span>
                </div>

                <div className="h-2 rounded-full bg-white/20">
                  <div className="h-full w-[72%] rounded-full bg-white"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- Bottom Section ---------------- */}

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {/* School Performance */}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <FiAward className="text-yellow-500" size={24} />

            <h3 className="text-xl font-bold text-slate-800">
              School Performance
            </h3>
          </div>

          {[
            { title: "Attendance Rate", value: "94%" },
            { title: "Homework Submission", value: "89%" },
            { title: "Exam Completion", value: "76%" },
            { title: "Transport Availability", value: "100%" },
          ].map((item, index) => (
            <div key={index} className="mb-5">
              <div className="mb-2 flex justify-between text-sm">
                <span>{item.title}</span>

                <span className="font-semibold text-rose-500">
                  {item.value}
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500"
                  style={{ width: item.value }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">
              Recent Activities
            </h3>

            <FiBell className="text-rose-500" />
          </div>

          <div className="space-y-5">
            {activities.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border-b border-slate-100 pb-4 last:border-none"
              >
                <div className="rounded-full bg-green-100 p-2 text-green-600">
                  <FiCheckCircle />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-slate-700">{item.title}</h4>

                  <p className="text-sm text-slate-500">{item.name}</p>

                  <span className="text-xs text-slate-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- Footer Stats ---------------- */}

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Teachers",
            value: "86",
            icon: <FiUsers />,
            color: "text-indigo-500 bg-indigo-50",
          },
          {
            title: "Staff Members",
            value: "42",
            icon: <FiGrid />,
            color: "text-orange-500 bg-orange-50",
          },
          {
            title: "Library Issued Books",
            value: "1,148",
            icon: <FiBookOpen />,
            color: "text-emerald-500 bg-emerald-50",
          },
          {
            title: "Transport Routes",
            value: "12",
            icon: <FiTruck />,
            color: "text-sky-500 bg-sky-50",
          },
        ].map((item, index) => (
          <div key={index} className="rounded-3xl bg-white p-5 shadow-sm">
            <div
              className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl ${item.color}`}
            >
              {item.icon}
            </div>

            <h2 className="mt-5 text-3xl font-bold text-slate-800">
              {item.value}
            </h2>

            <p className="mt-1 text-sm text-slate-500">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
