"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import {
  FaUserGraduate,
  FaPhone,
  FaMapMarkerAlt,
  FaSchool,
  FaBus,
  FaMoneyBillWave,
  FaUserTie,
} from "react-icons/fa";

import useClass from "@/store/user/admin/context/class.context";
import PageLayout from "@/components/common/PageLayout";
import PageContent from "@/components/common/PageContent";
import PageHeader from "@/components/common/PageHeader";
import Loader from "@/components/common/Loader";

const Page = () => {
  const { id } = useParams();

  const { state, viewStudentListClassWise } = useClass();

  useEffect(() => {
    if (id) {
      viewStudentListClassWise(id);
    }
  }, [id]);

  const students = state?.studentListClassWise || [];

  const heading = {
    name: "Class Students",
    subHeading: "View all students enrolled in this class",
    href: "/admin/class",
    btnHeading: "",
    icon: <FaUserGraduate />,
  };

  return (
    <PageLayout>
      <PageHeader heading={heading} />

      <PageContent>
        {state.loading ? (
          <Loader />
        ) : students.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <FaUserGraduate className="mx-auto mb-3 text-4xl text-slate-300" />

            <h2 className="text-lg font-semibold text-slate-700 dark:text-white">
              No Students Found
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              There are no students registered in this class.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {students.map((student: any) => (
              <StudentCard key={student._id} student={student} />
            ))}
          </div>
        )}
      </PageContent>
    </PageLayout>
  );
};

const StudentCard = ({ student }: { student: any }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* =====================================================
          STUDENT HEADER
      ====================================================== */}

      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-800/40">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#003366] text-xl font-bold text-white">
            {/* {student.firstName?.charAt(0)}
            {student.lastName?.charAt(0)} */}
            <img
              src={`/api/photo/student-photo/${student._id}`}
              alt=""
              className="w-14 h-14 rounded-full"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold uppercase text-slate-800 dark:text-white">
              {student.firstName} {student.lastName}
            </h2>

            <p className="text-sm text-slate-500">Student No: {student.srNo}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            Session: {student.session}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              student.isActive
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
            }`}
          >
            {student.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="space-y-8 p-6">
        {/* =====================================================
            PERSONAL INFORMATION
        ====================================================== */}

        <Section title="Personal Information" icon={<FaUserGraduate />}>
          <Info label="First Name" value={student.firstName} />
          <Info label="Last Name" value={student.lastName} />
          <Info label="Gender" value={student.gender} />
          <Info label="Date of Birth" value={formatDate(student.dob)} />
          <Info label="DOB In Words" value={student.dobInWords} />
          <Info label="Age" value={student.age} />
          <Info label="Blood Group" value={student.bloodGroup} />
          <Info label="Religion" value={student.religion} />
          <Info label="Caste Category" value={student.casteCategory} />
          <Info label="Mother Tongue" value={student.motherTongue} />
          <Info label="Home Town" value={student.homeTown} />
        </Section>

        {/* =====================================================
            PARENT INFORMATION
        ====================================================== */}

        <Section title="Parent Information" icon={<FaUserTie />}>
          <Info label="Father Name" value={student.fatherName} />
          <Info label="Father Nationality" value={student.fatherNationality} />
          <Info label="Father Occupation" value={student.fatherOccupation} />
          <Info label="Father Mobile" value={student.fatherMobileNumber} />
          <Info
            label="Father Permanent Address"
            value={student.fatherPermanentAddress}
          />

          <Info label="Mother Name" value={student.motherName} />
          <Info label="Mother Nationality" value={student.motherNationality} />
          <Info label="Mother Occupation" value={student.motherOccupation} />
          <Info label="Mother Mobile" value={student.motherMobileNumber} />
          <Info
            label="Mother Permanent Address"
            value={student.motherPermanentAddress}
          />
        </Section>

        {/* =====================================================
            GUARDIAN INFORMATION
        ====================================================== */}

        <Section title="Local Guardian Information" icon={<FaUserTie />}>
          <Info label="Guardian Name" value={student.localGurdianName} />

          <Info label="Guardian Address" value={student.localGurdianAddress} />
        </Section>

        {/* =====================================================
            SCHOOL INFORMATION
        ====================================================== */}

        <Section title="Previous School Information" icon={<FaSchool />}>
          <Info label="Last School Name" value={student.lastSchoolName} />

          <Info label="Last School Address" value={student.lastSchoolAddress} />

          <Info label="CBSE" value={student.isCbse} />

          <Info label="Other Board" value={student.otherBoard} />

          <Info label="Last Result" value={student.lastResult} />

          <Info label="Percentage" value={student.percentage} />
        </Section>

        {/* =====================================================
            OFFICE / CONTACT INFORMATION
        ====================================================== */}

        <Section title="Contact & Office Information" icon={<FaPhone />}>
          <Info label="Office Address" value={student.officeAddress} />

          <Info
            label="Annual Income"
            value={`₹ ${student.annualIncome?.toLocaleString("en-IN")}`}
          />
        </Section>

        {/* =====================================================
            SUBJECT INFORMATION
        ====================================================== */}

        <Section title="Subjects Offered" icon={<FaSchool />}>
          {student.subjectOffered?.length > 0 ? (
            <div className="col-span-full flex flex-wrap gap-2">
              {student.subjectOffered.map((subject: any, index: number) => (
                <span
                  key={index}
                  className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {typeof subject === "object" ? subject.name : subject}
                </span>
              ))}
            </div>
          ) : (
            <p className="col-span-full text-sm text-slate-400">
              No subjects offered.
            </p>
          )}
        </Section>

        {/* =====================================================
            FEE INFORMATION
        ====================================================== */}

        <Section title="Fee Information" icon={<FaMoneyBillWave />}>
          <Info
            label="Monthly Fee"
            value={`₹ ${student.totalMonthFee?.toLocaleString("en-IN")}`}
          />

          <Info
            label="Bus Fee"
            value={`₹ ${student.totalBusFee?.toLocaleString("en-IN")}`}
          />

          <Info
            label="Total Fee"
            value={`₹ ${student.totalFee?.toLocaleString("en-IN")}`}
          />
        </Section>

        {/* =====================================================
            TRANSPORT
        ====================================================== */}

        <Section title="Transport Information" icon={<FaBus />}>
          <Info
            label="Bus Fee"
            value={`₹ ${student.totalBusFee?.toLocaleString("en-IN")}`}
          />
        </Section>

        {/* =====================================================
            ADDRESS
        ====================================================== */}

        <Section title="Address Information" icon={<FaMapMarkerAlt />}>
          <Info
            label="Mother Permanent Address"
            value={student.motherPermanentAddress}
          />

          <Info
            label="Father Permanent Address"
            value={student.fatherPermanentAddress}
          />

          <Info
            label="Local Guardian Address"
            value={student.localGurdianAddress}
          />

          <Info label="Office Address" value={student.officeAddress} />
        </Section>

        {/* =====================================================
            NOTES
        ====================================================== */}

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">
            Notes
          </h3>

          <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {student.notes || "No notes available."}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =============================================================
   SECTION COMPONENT
============================================================= */

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
        <span className="text-[#003366] dark:text-blue-400">{icon}</span>

        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </section>
  );
};

/* =============================================================
   INFO COMPONENT
============================================================= */

const Info = ({ label, value }: { label: string; value: any }) => {
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="break-words text-sm font-medium text-slate-700 dark:text-slate-300">
        {value || "-"}
      </p>
    </div>
  );
};

/* =============================================================
   DATE FORMATTER
============================================================= */

const formatDate = (date: any) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default Page;
