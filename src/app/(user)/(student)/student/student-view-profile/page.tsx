"use client";

import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  FiUser,
  FiBookOpen,
  FiUsers,
  FiMapPin,
  FiFileText,
  FiPrinter,
  FiPhone,
  FiCalendar,
  FiDroplet,
  FiHome,
  FiBriefcase,
  FiGlobe,
  FiHash,
  FiCheckCircle,
  FiUserCheck,
  FiDollarSign,
  FiShield,
  FiMap,
  FiCreditCard,
  FiLayers,
  FiHeart,
  FiBook,
  FiNavigation,
  FiClock,
  FiAward,
} from "react-icons/fi";

import { useSession } from "next-auth/react";
import PageLayout from "@/components/common/PageLayout";
import PageContent from "@/components/common/PageContent";
import { useStudentPortal } from "@/store/user/student/context/student-portal.context";

/* =========================================================
   SMALL INFO ITEM
========================================================= */

const Info = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: any;
}) => (
  <div className="flex gap-3">
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100/70 text-amber-700">
      {icon}
    </div>

    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-gray-800">
        {value || "-"}
      </p>
    </div>
  </div>
);

/* =========================================================
   SECTION TITLE
========================================================= */

const SectionTitle = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-6 flex items-center gap-3 border-b border-amber-100 pb-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100/70 text-amber-700">
      {icon}
    </div>

    <div>
      <h2 className="text-lg font-bold tracking-tight text-gray-900">
        {title}
      </h2>

      {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
    </div>
  </div>
);

/* =========================================================
   PAGE
========================================================= */

export default function StudentViewProfile() {
  const { data } = useSession();
  const { state, viewStudentDetail } = useStudentPortal();

  const id = (data?.user as any)?.id;
  const student = state?.studentProfile;

  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      viewStudentDetail(id);
    }
  }, [id]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${student?.firstName || "student"}-${
      student?.lastName || ""
    }-profile`,
  });

  const formatDate = (date: any) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (value: any) => {
    if (value === undefined || value === null || value === "") {
      return "-";
    }

    return `₹${Number(value).toLocaleString("en-IN")}`;
  };

  const isCbse =
    (student as any)?.isCbse === true ||
    (student as any)?.isCbse === "Yes" ||
    (student as any)?.isCbse === "yes";

  const personalInfo = [
    {
      label: "Gender",
      value: student?.gender,
      icon: <FiUser size={16} />,
    },
    {
      label: "Date of Birth",
      value: formatDate(student?.dob),
      icon: <FiCalendar size={16} />,
    },
    {
      label: "DOB In Words",
      value: student?.dobInWords,
      icon: <FiFileText size={16} />,
    },
    {
      label: "Blood Group",
      value: student?.bloodGroup,
      icon: <FiDroplet size={16} />,
    },
    {
      label: "Age",
      value: student?.age,
      icon: <FiClock size={16} />,
    },
    {
      label: "Religion",
      value: student?.religion,
      icon: <FiGlobe size={16} />,
    },
    {
      label: "Caste Category",
      value: student?.casteCategory,
      icon: <FiShield size={16} />,
    },
    {
      label: "Mother Tongue",
      value: student?.motherTongue,
      icon: <FiGlobe size={16} />,
    },
    {
      label: "Home Town",
      value: student?.homeTown,
      icon: <FiMapPin size={16} />,
    },
  ];

  const financialInfo = [
    {
      label: "Annual Family Income",
      value: formatCurrency(student?.annualIncome),
      icon: <FiDollarSign size={16} />,
    },
    {
      label: "Monthly Fee",
      value: formatCurrency(student?.totalMonthFee),
      icon: <FiCreditCard size={16} />,
    },
    {
      label: "Bus Fee",
      value: formatCurrency(student?.totalBusFee),
      icon: <FiNavigation size={16} />,
    },
    {
      label: "Annual Fee",
      value: formatCurrency(student?.totalYearFee),
      icon: <FiDollarSign size={16} />,
    },
  ];

  return (
    <PageLayout>
      <PageContent>
        {/* PRINT BUTTON */}

        <div className="mb-6 flex justify-end print:hidden">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded bg-gray-900 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-amber-600"
          >
            <FiPrinter size={18} />
            Print Profile
          </button>
        </div>

        {/* PROFILE */}

        <div
          ref={printRef}
          className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl print:max-w-none print:rounded-none print:shadow-none"
        >
          {/* HEADER */}

          <header className="border-b border-amber-200 bg-gradient-to-br from-[#fffdf5] via-[#fff8dc] to-[#f8f0d0] px-8 py-9 sm:px-12 print:px-8 print:py-7">
            <div>
              {/* SCHOOL */}

              <div className="mb-8 flex items-center justify-between border-b border-amber-200/60 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-600/10 text-amber-700">
                    <FiBookOpen size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
                      School ERP
                    </p>

                    <p className="text-sm font-semibold text-gray-700">
                      Student Official Profile
                    </p>
                  </div>
                </div>

                <div className="hidden text-right sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                    Academic Session
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-800">
                    {student?.session || "-"}
                  </p>
                </div>
              </div>

              {/* STUDENT */}

              <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
                <div className="shrink-0">
                  <div className="rounded-2xl bg-white/70 p-1.5 shadow-lg ring-1 ring-amber-200/70">
                    <img
                      src={`/api/photo/student-photo/${student?._id}`}
                      alt={student?.firstName || "Student"}
                      className="h-36 w-36 rounded-xl object-cover print:h-32 print:w-32"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl print:text-4xl">
                      {student?.firstName || "-"} {student?.lastName || ""}
                    </h1>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wider ${
                        student?.isActive
                          ? "bg-emerald-100/70 text-emerald-700"
                          : "bg-red-100/70 text-red-600"
                      }`}
                    >
                      <FiCheckCircle size={12} />
                      {student?.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </div>

                  <p className="mt-2 text-lg font-medium text-amber-700">
                    Student
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <FiBookOpen className="text-amber-700" size={16} />
                      {(student?.classId as any)?.name || "-"}
                    </span>

                    <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <FiHash className="text-amber-700" size={16} />
                      SR No: {student?.srNo || "-"}
                    </span>

                    <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <FiUsers className="text-amber-700" size={16} />
                      Section: {(student?.classId as any)?.section || "-"}
                    </span>

                    <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <FiCalendar className="text-amber-700" size={16} />
                      {student?.session || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* BODY */}

          <div className="grid grid-cols-1 lg:grid-cols-3 print:grid-cols-3">
            {/* SIDEBAR */}

            <aside className="bg-[#faf9f5] p-8 print:p-6">
              <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700">
                Personal Information
              </h3>

              <div className="space-y-5">
                {personalInfo.map((item) => (
                  <Info
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>

              {/* CONTACT */}

              <div className="mt-9">
                <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700">
                  Contact
                </h3>

                <div className="space-y-5">
                  <Info
                    icon={<FiPhone size={16} />}
                    label="Father Mobile"
                    value={student?.fatherMobileNumber}
                  />

                  <Info
                    icon={<FiPhone size={16} />}
                    label="Mother Mobile"
                    value={student?.motherMobileNumber}
                  />
                </div>
              </div>

              {/* GUARDIAN */}

              <div className="mt-9">
                <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700">
                  Local Guardian
                </h3>

                <div className="space-y-5">
                  <Info
                    icon={<FiUserCheck size={16} />}
                    label="Guardian Name"
                    value={student?.localGurdianName}
                  />

                  <Info
                    icon={<FiHome size={16} />}
                    label="Guardian Address"
                    value={student?.localGurdianAddress}
                  />
                </div>
              </div>
            </aside>

            {/* MAIN */}

            <main className="p-8 sm:p-10 lg:col-span-2 print:p-7">
              {/* PROFILE */}

              <section className="mb-10">
                <SectionTitle
                  icon={<FiUser size={19} />}
                  title="Profile"
                  subtitle="Student overview"
                />

                <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-6">
                  <p className="text-sm leading-8 text-gray-600">
                    <strong className="text-gray-900">
                      {student?.firstName} {student?.lastName}
                    </strong>{" "}
                    is currently studying in{" "}
                    <strong className="text-gray-900">
                      {(student?.classId as any)?.name || "-"}
                    </strong>{" "}
                    in Section{" "}
                    <strong className="text-gray-900">
                      {(student?.classId as any)?.section || "-"}
                    </strong>
                    . The student is enrolled for the{" "}
                    <strong className="text-gray-900">
                      {student?.session || "-"}
                    </strong>{" "}
                    academic session.
                  </p>
                </div>
              </section>

              {/* EDUCATION */}

              <section className="mb-10">
                <SectionTitle
                  icon={<FiBookOpen size={19} />}
                  title="Education"
                  subtitle="Academic background and previous school"
                />

                <div className="relative ml-3 border-l-2 border-amber-100 pl-7">
                  <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-white bg-amber-500" />

                  <h3 className="text-lg font-bold text-gray-900">
                    {(student?.classId as any)?.name || "Current Class"}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-amber-700">
                    Section {(student?.classId as any)?.section || "-"} •{" "}
                    {student?.session || "-"}
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Info
                      icon={<FiBook size={16} />}
                      label="Last School"
                      value={student?.lastSchoolName}
                    />

                    <Info
                      icon={<FiMapPin size={16} />}
                      label="School Address"
                      value={student?.lastSchoolAddress}
                    />

                    <Info
                      icon={<FiAward size={16} />}
                      label="Last Result"
                      value={student?.lastResult}
                    />

                    <Info
                      icon={<FiAward size={16} />}
                      label="Percentage"
                      value={student?.percentage}
                    />

                    <Info
                      icon={<FiCheckCircle size={16} />}
                      label="CBSE"
                      value={isCbse ? "Yes" : "No"}
                    />

                    <Info
                      icon={<FiLayers size={16} />}
                      label="Other Board"
                      value={student?.otherBoard}
                    />
                  </div>
                </div>
              </section>

              {/* FAMILY */}

              <section className="mb-10">
                <SectionTitle
                  icon={<FiUsers size={19} />}
                  title="Family Details"
                  subtitle="Parent information"
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* FATHER */}

                  <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100/70 text-amber-700">
                        <FiUserCheck size={19} />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                          Father
                        </p>

                        <p className="text-base font-bold text-gray-900">
                          {student?.fatherName || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Info
                        icon={<FiPhone size={15} />}
                        label="Mobile"
                        value={student?.fatherMobileNumber}
                      />

                      <Info
                        icon={<FiBriefcase size={15} />}
                        label="Occupation"
                        value={student?.fatherOccupation}
                      />

                      <Info
                        icon={<FiGlobe size={15} />}
                        label="Nationality"
                        value={student?.fatherNationality}
                      />

                      <Info
                        icon={<FiHome size={15} />}
                        label="Permanent Address"
                        value={student?.fatherPermanentAddress}
                      />
                    </div>
                  </div>

                  {/* MOTHER */}

                  <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100/70 text-rose-600">
                        <FiUserCheck size={19} />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                          Mother
                        </p>

                        <p className="text-base font-bold text-gray-900">
                          {student?.motherName || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Info
                        icon={<FiPhone size={15} />}
                        label="Mobile"
                        value={student?.motherMobileNumber}
                      />

                      <Info
                        icon={<FiBriefcase size={15} />}
                        label="Occupation"
                        value={student?.motherOccupation}
                      />

                      <Info
                        icon={<FiGlobe size={15} />}
                        label="Nationality"
                        value={student?.motherNationality}
                      />

                      <Info
                        icon={<FiHome size={15} />}
                        label="Permanent Address"
                        value={student?.motherPermanentAddress}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* OFFICE ADDRESS */}

              <section className="mb-10">
                <SectionTitle
                  icon={<FiMapPin size={19} />}
                  title="Office Address"
                  subtitle="Parent or guardian office information"
                />

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <Info
                    icon={<FiBriefcase size={18} />}
                    label="Office Address"
                    value={student?.officeAddress}
                  />
                </div>
              </section>

              {/* FINANCIAL */}

              <section className="mb-10">
                <SectionTitle
                  icon={<FiCreditCard size={19} />}
                  title="Financial Information"
                  subtitle="Fee and income details"
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {financialInfo.map((item) => (
                    <Info
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </div>
              </section>

              {/* SUBJECTS */}

              <section>
                <SectionTitle
                  icon={<FiBook size={19} />}
                  title="Subjects"
                  subtitle="Subjects selected by the student"
                />

                {student?.subjectOffered?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {student.subjectOffered.map(
                      (subject: any, index: number) => (
                        <span
                          key={index}
                          className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-800"
                        >
                          {typeof subject === "string"
                            ? subject
                            : subject?.name || "-"}
                        </span>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5 text-sm text-gray-400">
                    No subjects have been added.
                  </div>
                )}
              </section>
            </main>
          </div>

          {/* FOOTER */}

          <footer className="border-t border-amber-100 bg-[#faf9f5] px-8 py-5 print:px-6 print:py-4">
            <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-400">
                Student Official Profile
              </p>

              <p className="text-[10px] text-gray-400">
                Academic Session: {student?.session || "-"}
              </p>

              <p className="text-[10px] text-gray-400">
                Generated from School ERP
              </p>
            </div>
          </footer>
        </div>
      </PageContent>
    </PageLayout>
  );
}
