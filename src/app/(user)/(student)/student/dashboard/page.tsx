"use client";

import React from "react";
import {
  FiAward,
  FiBook,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiDollarSign,
  FiFileText,
  FiMapPin,
  FiUser,
  FiUsers,
  FiAlertCircle,
  FiArrowUpRight,
} from "react-icons/fi";

import PageLayout from "@/components/common/PageLayout";
import PageContent from "@/components/common/PageContent";

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  icon,
  title,
  value,
  subtitle,
  color = "amber",
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color?: "amber" | "green" | "blue" | "rose";
}) => {
  const styles = {
    amber: {
      icon: "bg-amber-100/70 text-amber-700",
      value: "text-amber-700",
    },
    green: {
      icon: "bg-emerald-100/70 text-emerald-700",
      value: "text-emerald-700",
    },
    blue: {
      icon: "bg-blue-100/70 text-blue-700",
      value: "text-blue-700",
    },
    rose: {
      icon: "bg-rose-100/70 text-rose-600",
      value: "text-rose-600",
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles[color].icon}`}
        >
          {icon}
        </div>

        <FiArrowUpRight className="text-gray-300" size={18} />
      </div>

      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
        {title}
      </p>

      <p className={`mt-1 text-2xl font-extrabold ${styles[color].value}`}>
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
    </div>
  );
};

/* =========================================================
   SECTION TITLE
========================================================= */

const SectionTitle = ({
  icon,
  title,
  subtitle,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) => {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100/70 text-amber-700">
          {icon}
        </div>

        <div>
          <h2 className="text-lg font-bold tracking-tight text-gray-900">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>
          )}
        </div>
      </div>

      {action}
    </div>
  );
};

/* =========================================================
   QUICK ACTION
========================================================= */

const QuickAction = ({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-amber-200 hover:bg-amber-50/40"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100/70 text-amber-700 transition group-hover:bg-amber-600 group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-gray-900">{title}</p>
        <p className="mt-0.5 text-xs text-gray-400">{description}</p>
      </div>

      <FiChevronRight
        size={17}
        className="shrink-0 text-gray-300 transition group-hover:text-amber-600"
      />
    </a>
  );
};

/* =========================================================
   PAYMENT ROW
========================================================= */

const PaymentRow = ({
  title,
  date,
  amount,
  status,
}: {
  title: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending";
}) => {
  const isPaid = status === "Paid";

  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-4 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            isPaid
              ? "bg-emerald-50 text-emerald-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          <FiCreditCard size={16} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-800">
            {title}
          </p>

          <p className="mt-0.5 text-xs text-gray-400">{date}</p>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-bold text-gray-900">{amount}</p>

        <span
          className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
            isPaid
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          <FiCheckCircle size={10} />
          {status}
        </span>
      </div>
    </div>
  );
};

/* =========================================================
   BOOK ROW
========================================================= */

const BookRow = ({
  title,
  author,
  dueDate,
  status,
}: {
  title: string;
  author: string;
  dueDate: string;
  status: "Issued" | "Overdue";
}) => {
  const isOverdue = status === "Overdue";

  return (
    <div className="flex items-center gap-4 border-b border-gray-100 py-4 last:border-b-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
        <FiBook size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-gray-800">{title}</p>

        <p className="mt-0.5 truncate text-xs text-gray-400">{author}</p>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
          Due Date
        </p>

        <p
          className={`mt-1 text-xs font-semibold ${
            isOverdue ? "text-rose-600" : "text-gray-700"
          }`}
        >
          {dueDate}
        </p>
      </div>

      <span
        className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
          isOverdue ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-700"
        }`}
      >
        {status}
      </span>
    </div>
  );
};

/* =========================================================
   PAGE
========================================================= */

const Page = () => {
  /*
    Replace these demo values with your actual student data
    from useStudent() when you connect the dashboard API.
  */

  const student = {
    firstName: "Student",
    lastName: "",
    className: "Class 10",
    section: "A",
    srNo: "1024",
    session: "2025-26",
    isActive: true,
    photo: null,
  };

  return (
    <PageLayout>
      <PageContent>
        <div className="mx-auto max-w-7xl space-y-7">
          {/* =================================================
              WELCOME HEADER
          ================================================== */}

          <section className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-[#fffdf5] via-[#fff8dc] to-[#f8f0d0] px-6 py-7 shadow-sm sm:px-8">
            {/* Decorative shapes */}

            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-amber-200/20" />

            <div className="absolute -bottom-28 right-40 h-64 w-64 rounded-full bg-yellow-200/15" />

            <div className="absolute left-1/3 top-0 h-32 w-32 rounded-full bg-white/50 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                {/* Photo */}

                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-amber-200">
                  {student.photo ? (
                    <img
                      src={student.photo}
                      alt={student.firstName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FiUser size={28} className="text-amber-600" />
                  )}
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
                    Student Dashboard
                  </p>

                  <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    Welcome, {student.firstName}
                    {student.lastName ? ` ${student.lastName}` : ""}
                  </h1>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <FiBookOpen size={13} className="text-amber-700" />
                      {student.className}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FiUsers size={13} className="text-amber-700" />
                      Section {student.section}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FiFileText size={13} className="text-amber-700" />
                      SR No. {student.srNo}
                    </span>
                  </div>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  <FiCheckCircle size={12} />
                  {student.isActive ? "Active Student" : "Inactive"}
                </span>

                <p className="mt-2 text-xs font-medium text-gray-400">
                  Academic Session
                </p>

                <p className="text-sm font-bold text-gray-800">
                  {student.session}
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              STAT CARDS
          ================================================== */}

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<FiDollarSign size={20} />}
              title="Fee Due"
              value="₹12,500"
              subtitle="Amount currently payable"
              color="amber"
            />

            <StatCard
              icon={<FiCreditCard size={20} />}
              title="Total Paid"
              value="₹45,000"
              subtitle="Paid this academic session"
              color="green"
            />

            <StatCard
              icon={<FiBook size={20} />}
              title="Books Issued"
              value="4"
              subtitle="Currently with you"
              color="blue"
            />

            <StatCard
              icon={<FiAward size={20} />}
              title="Attendance"
              value="92%"
              subtitle="Current attendance"
              color="rose"
            />
          </section>

          {/* =================================================
              MAIN GRID
          ================================================== */}

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
            {/* =================================================
                LEFT / MAIN COLUMN
            ================================================== */}

            <div className="space-y-7 lg:col-span-2">
              {/* RECENT PAYMENTS */}

              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  icon={<FiCreditCard size={19} />}
                  title="Recent Payments"
                  subtitle="Your latest fee transactions"
                  action={
                    <a
                      href="/student/fee-installment-list"
                      className="hidden items-center gap-1 text-xs font-bold text-amber-700 transition hover:text-amber-800 sm:flex"
                    >
                      View All
                      <FiChevronRight size={14} />
                    </a>
                  }
                />

                <div>
                  <PaymentRow
                    title="September Fee Installment"
                    date="15 September 2025"
                    amount="₹5,000"
                    status="Paid"
                  />

                  <PaymentRow
                    title="August Fee Installment"
                    date="15 August 2025"
                    amount="₹5,000"
                    status="Paid"
                  />

                  <PaymentRow
                    title="July Fee Installment"
                    date="15 July 2025"
                    amount="₹5,000"
                    status="Paid"
                  />

                  <PaymentRow
                    title="June Fee Installment"
                    date="15 June 2025"
                    amount="₹5,000"
                    status="Paid"
                  />
                </div>

                <a
                  href="/student/fee-installment-list"
                  className="mt-4 flex items-center justify-center gap-1 rounded-xl bg-amber-50 py-3 text-xs font-bold text-amber-700 transition hover:bg-amber-100 sm:hidden"
                >
                  View Payment History
                  <FiChevronRight size={14} />
                </a>
              </section>

              {/* ISSUED BOOKS */}

              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  icon={<FiBookOpen size={19} />}
                  title="Issued Books"
                  subtitle="Books currently issued to you"
                  action={
                    <a
                      href="/student/add-new-book-issued"
                      className="hidden items-center gap-1 text-xs font-bold text-amber-700 transition hover:text-amber-800 sm:flex"
                    >
                      Library
                      <FiChevronRight size={14} />
                    </a>
                  }
                />

                <div>
                  <BookRow
                    title="Mathematics - Class 10"
                    author="R. D. Sharma"
                    dueDate="25 Sep 2025"
                    status="Issued"
                  />

                  <BookRow
                    title="Science - Class 10"
                    author="NCERT"
                    dueDate="20 Sep 2025"
                    status="Issued"
                  />

                  <BookRow
                    title="English Literature"
                    author="NCERT"
                    dueDate="18 Sep 2025"
                    status="Issued"
                  />

                  <BookRow
                    title="Social Science"
                    author="NCERT"
                    dueDate="10 Sep 2025"
                    status="Overdue"
                  />
                </div>
              </section>

              {/* ACADEMIC OVERVIEW */}

              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  icon={<FiAward size={19} />}
                  title="Academic Overview"
                  subtitle="Your current academic information"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-[#faf9f5] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100/70 text-amber-700">
                        <FiBookOpen size={16} />
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                          Current Class
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-800">
                          {student.className}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#faf9f5] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100/70 text-amber-700">
                        <FiUsers size={16} />
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                          Section
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-800">
                          Section {student.section}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#faf9f5] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100/70 text-amber-700">
                        <FiCalendar size={16} />
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                          Academic Session
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-800">
                          {student.session}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#faf9f5] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100/70 text-amber-700">
                        <FiCheckCircle size={16} />
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                          Student Status
                        </p>

                        <p className="mt-1 text-sm font-bold text-emerald-700">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* =================================================
                RIGHT COLUMN
            ================================================== */}

            <aside className="space-y-7">
              {/* QUICK ACTIONS */}

              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  icon={<FiArrowUpRight size={19} />}
                  title="Quick Actions"
                  subtitle="Common student activities"
                />

                <div className="space-y-3">
                  <QuickAction
                    icon={<FiCreditCard size={17} />}
                    title="Pay Fee"
                    description="Make a fee installment payment"
                    href="/student/add-new-fee-installment"
                  />

                  <QuickAction
                    icon={<FiFileText size={17} />}
                    title="Payment History"
                    description="View previous payments"
                    href="/student/fee-installment-list"
                  />

                  <QuickAction
                    icon={<FiUser size={17} />}
                    title="My Profile"
                    description="View your profile details"
                    href="/student/student-view-profile"
                  />

                  <QuickAction
                    icon={<FiBook size={17} />}
                    title="Issue a Book"
                    description="Request a library book"
                    href="/student/add-new-book-issued"
                  />

                  <QuickAction
                    icon={<FiDollarSign size={17} />}
                    title="Fee Details"
                    description="View complete fee information"
                    href="/student/view-fee-list"
                  />
                </div>
              </section>

              {/* FEE SUMMARY */}

              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  icon={<FiDollarSign size={19} />}
                  title="Fee Summary"
                  subtitle="Current academic session"
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Annual Fee</span>

                    <span className="text-sm font-bold text-gray-800">
                      ₹60,000
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Bus Fee</span>

                    <span className="text-sm font-bold text-gray-800">
                      ₹12,000
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-800">
                        Total Payable
                      </span>

                      <span className="text-lg font-extrabold text-amber-700">
                        ₹72,000
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-amber-50/70 p-4">
                    <div className="flex items-start gap-3">
                      <FiAlertCircle
                        className="mt-0.5 shrink-0 text-amber-600"
                        size={17}
                      />

                      <div>
                        <p className="text-xs font-bold text-amber-800">
                          Outstanding Amount
                        </p>

                        <p className="mt-1 text-xl font-extrabold text-amber-700">
                          ₹12,500
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-amber-700/70">
                          Please complete your pending fee payment.
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="/student/add-new-fee-installment"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-xs font-bold text-white transition hover:bg-amber-600"
                  >
                    Pay Now
                    <FiArrowUpRight size={14} />
                  </a>
                </div>
              </section>

              {/* UPCOMING */}

              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  icon={<FiCalendar size={19} />}
                  title="Upcoming"
                  subtitle="Important dates"
                />

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                      <span className="text-[8px] font-bold uppercase">
                        Sep
                      </span>

                      <span className="text-sm font-extrabold">20</span>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        Fee Payment Due
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Monthly installment
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                      <span className="text-[8px] font-bold uppercase">
                        Sep
                      </span>

                      <span className="text-sm font-extrabold">25</span>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        Book Return
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Mathematics - Class 10
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* CONTACT / HELP */}

              <section className="rounded-2xl border border-amber-100 bg-amber-50/50 p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <FiUsers size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Need Help?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Contact your school administration for help with fees,
                      library books, or profile information.
                    </p>
                  </div>
                </div>
              </section>
            </aside>
          </div>

          {/* =================================================
              FOOTER
          ================================================== */}

          <footer className="border-t border-amber-100 pt-5">
            <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-400">
                Student Dashboard
              </p>

              <p className="text-[10px] text-gray-400">
                Academic Session: {student.session}
              </p>

              <p className="text-[10px] text-gray-400">School ERP</p>
            </div>
          </footer>
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default Page;
