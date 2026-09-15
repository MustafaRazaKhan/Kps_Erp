"use client";

import { useEffect } from "react";

import PageContent from "@/components/common/PageContent";
import PageLayout from "@/components/common/PageLayout";
import useEnquiry from "@/store/common/context/enquiry.context";

import {
  FiUsers,
  FiBookOpen,
  FiDollarSign,
  FiTruck,
  FiGrid,
  FiUserPlus,
  FiClipboard,
  FiCalendar,
  FiAward,
  FiBell,
  FiCheckCircle,
  FiHelpCircle,
} from "react-icons/fi";

const Page = () => {
  const {
    state: { totalEnquiries },
  } = useEnquiry();

  const dashboardStats = [
    {
      title: "Total Enquiries",
      value: totalEnquiries || 0,
      icon: <FiHelpCircle size={19} />,
    },
    {
      title: "Total Students",
      value: "1,250",
      icon: <FiUsers size={19} />,
    },
    {
      title: "Total Classes",
      value: "32",
      icon: <FiGrid size={19} />,
    },
    {
      title: "Fee Collection",
      value: "₹12.45L",
      icon: <FiDollarSign size={19} />,
    },
    {
      title: "Library Books",
      value: "8,540",
      icon: <FiBookOpen size={19} />,
    },
    {
      title: "Transport Routes",
      value: "24",
      icon: <FiTruck size={19} />,
    },
  ];

  const studentOverview = [
    {
      label: "Male Students",
      value: "720",
      percentage: "58%",
    },
    {
      label: "Female Students",
      value: "530",
      percentage: "42%",
    },
    {
      label: "New Admissions",
      value: "118",
      percentage: "This Month",
    },
    {
      label: "Graduated Students",
      value: "94",
      percentage: "Last Session",
    },
  ];

  const activities = [
    {
      title: "Admission Completed",
      description: "Ayesha Khan • Class VIII-A",
      time: "5 mins ago",
      icon: <FiUserPlus size={16} />,
    },
    {
      title: "Fee Payment Received",
      description: "Mohammed Ali • ₹4,500",
      time: "20 mins ago",
      icon: <FiDollarSign size={16} />,
    },
    {
      title: "Library Book Issued",
      description: "Rohan Sharma • Science Book",
      time: "1 hour ago",
      icon: <FiBookOpen size={16} />,
    },
    {
      title: "Transport Assigned",
      description: "Bus No. 04 • Route A",
      time: "2 hours ago",
      icon: <FiTruck size={16} />,
    },
  ];

  return (
    <PageLayout>
      <PageContent>
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="relative mb-7 overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-r from-[#fffdf7] via-[#fff9e8] to-blue-50/60 px-7 py-7">
          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-200/15" />

          <div className="absolute -bottom-24 left-1/3 h-44 w-44 rounded-full bg-amber-200/15" />

          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-600">
              Krishna Public School ERP
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              Welcome Back, Admin
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage students, staff, fees, transport, examinations and
              day-to-day school operations from one place.
            </p>
          </div>
        </div>

        {/* =====================================================
            MAIN STATISTICS
        ===================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {dashboardStats.map((item, index) => (
            <div
              key={index}
              className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  {item.icon}
                </div>

                <span className="text-lg font-bold text-slate-800">
                  {item.value}
                </span>
              </div>

              <p className="mt-4 text-xs font-medium text-slate-500">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* =====================================================
            CONTENT GRID
        ===================================================== */}

        <div className="mt-7 grid gap-5 xl:grid-cols-3">
          {/* =================================================
              STUDENT OVERVIEW
          ================================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Student Overview
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Current student distribution
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FiUsers size={18} />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {studentOverview.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-100 bg-slate-50/60 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-slate-500">
                      {item.label}
                    </p>

                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-bold text-blue-600">
                      {item.percentage}
                    </span>
                  </div>

                  <p className="mt-3 text-2xl font-bold text-slate-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
              FEE COLLECTION
          ================================================== */}

          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-[#fffdf7] to-blue-50/70 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100/70 text-blue-700">
              <FiDollarSign size={19} />
            </div>

            <p className="mt-5 text-xs font-medium uppercase tracking-wide text-slate-400">
              Total Fee Collection
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-800">
              ₹12,45,000
            </h2>

            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-slate-500">Collected Fees</span>
                  <span className="font-semibold text-slate-700">72%</span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-blue-100">
                  <div className="h-full w-[72%] rounded-full bg-blue-600" />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-slate-500">Pending Fees</span>
                  <span className="font-semibold text-slate-700">28%</span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-amber-100">
                  <div className="h-full w-[28%] rounded-full bg-amber-500" />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200/70 pt-3">
                <span className="text-xs text-slate-500">Scholarships</span>

                <span className="text-sm font-bold text-slate-800">₹1.2L</span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            QUICK SUMMARY
        ===================================================== */}

        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Teachers",
              value: "86",
              icon: <FiUsers size={18} />,
            },
            {
              title: "Staff Members",
              value: "42",
              icon: <FiGrid size={18} />,
            },
            {
              title: "Library Issued Books",
              value: "1,148",
              icon: <FiBookOpen size={18} />,
            },
            {
              title: "Transport Routes",
              value: "12",
              icon: <FiTruck size={18} />,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50/80 text-amber-700">
                {item.icon}
              </div>

              <div>
                <p className="text-xl font-bold text-slate-800">{item.value}</p>

                <p className="text-xs text-slate-400">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* =====================================================
            RECENT ACTIVITY
        ===================================================== */}

        <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Latest school activities
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50/70 text-amber-700">
              <FiBell size={17} />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  {activity.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {activity.title}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-slate-400">
                    {activity.description}
                  </p>
                </div>

                <span className="shrink-0 text-[10px] text-slate-400">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default Page;
