"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import { useReactToPrint } from "react-to-print";

import {
  FiUser,
  FiBookOpen,
  FiUsers,
  FiMapPin,
  FiFileText,
  FiPrinter,
} from "react-icons/fi";
import { useStudent } from "@/store/admin/context/student.context";
import PageLayout from "@/components/common/PageLayout";
import PageContent from "@/components/common/PageContent";

const DetailCard = ({ label, value }: { label: string; value: any }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <p className="mb-1 text-xs font-semibold uppercase text-gray-500">
        {label}
      </p>

      <p className="break-words text-sm font-medium text-gray-900">
        {value || "-"}
      </p>
    </div>
  );
};

export default function StudentDetailPage() {
  const { state, studentDetail } = useStudent();

  const params = useParams();
  const id = params?.id as string;

  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      studentDetail(id);
    }
  }, [id]);

  const student = state?.studentDetail;

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${student?.firstName}-details`,
  });

  return (
    <PageLayout>
      <PageContent>
        {/* ================= BUTTON ================= */}

        <div className="mb-5 flex justify-end">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
          >
            <FiPrinter />
            Print PDF
          </button>
        </div>

        {/* ================= PRINT SECTION ================= */}

        <div ref={printRef} className="bg-white p-2 text-black">
          {/* <SchoolHeader /> */}

          {/* ================= PROFILE ================= */}

          <div className="mb-8 overflow-hidden rounded-3xl bg-black text-white">
            <div className="flex flex-col items-center gap-6 p-8 lg:flex-row">
              <img
                src={`/api/photo/student-photo/${student?._id}`}
                alt={student?.firstName}
                className="h-40 w-40 rounded-3xl border-4 border-white/20 object-cover"
              />

              <div className="flex-1">
                <h1 className="text-4xl font-bold">
                  {student?.firstName} {student?.lastName}
                </h1>

                <p className="mt-2 text-lg text-gray-300">
                  {student?.classId?.name} - {student?.classId?.section}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                    {student?.gender}
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                    {student?.bloodGroup}
                  </span>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      student?.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {student?.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= BASIC ================= */}

          <section className="mb-10">
            <div className="mb-5 flex items-center gap-2">
              <FiUser />
              <h2 className="text-2xl font-bold">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              <DetailCard label="SR No" value={student?.srNo} />

              <DetailCard label="Session" value={student?.session} />

              <DetailCard
                label="DOB"
                value={
                  student?.dob
                    ? new Date(student.dob).toLocaleDateString()
                    : "-"
                }
              />

              <DetailCard label="DOB In Words" value={student?.dobInWords} />

              <DetailCard label="Age" value={student?.age} />

              <DetailCard label="Religion" value={student?.religion} />

              <DetailCard label="Blood Group" value={student?.bloodGroup} />

              <DetailCard label="Mother Tongue" value={student?.motherTongue} />

              <DetailCard label="Home Town" value={student?.homeTown} />
            </div>
          </section>

          {/* ================= ACADEMIC ================= */}

          <section className="mb-10">
            <div className="mb-5 flex items-center gap-2">
              <FiBookOpen />
              <h2 className="text-2xl font-bold">Academic Details</h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              <DetailCard label="Class" value={student?.classId?.name} />

              <DetailCard label="Section" value={student?.classId?.section} />

              <DetailCard label="Last School" value={student?.lastSchoolName} />

              <DetailCard label="Last Result" value={student?.lastResult} />

              <DetailCard label="Percentage" value={student?.percentage} />

              <DetailCard label="CBSE" value={student?.isCbse} />
            </div>
          </section>

          {/* ================= PARENT ================= */}

          <section className="mb-10">
            <div className="mb-5 flex items-center gap-2">
              <FiUsers />
              <h2 className="text-2xl font-bold">Parent Details</h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              <DetailCard label="Father Name" value={student?.fatherName} />

              <DetailCard label="Mother Name" value={student?.motherName} />

              <DetailCard
                label="Father Mobile"
                value={student?.fatherMobileNumber}
              />

              <DetailCard
                label="Mother Mobile"
                value={student?.motherMobileNumber}
              />

              <DetailCard
                label="Father Occupation"
                value={student?.fatherOccupation}
              />

              <DetailCard
                label="Mother Occupation"
                value={student?.motherOccupation}
              />
            </div>
          </section>

          {/* ================= ADDRESS ================= */}

          <section className="mb-10">
            <div className="mb-5 flex items-center gap-2">
              <FiMapPin />
              <h2 className="text-2xl font-bold">Address Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <DetailCard
                label="Mother Address"
                value={student?.motherPermanentAddress}
              />

              <DetailCard
                label="Father Address"
                value={student?.fatherPermanentAddress}
              />

              <DetailCard
                label="Office Address"
                value={student?.officeAddress}
              />
            </div>
          </section>

          {/* ================= NOTES ================= */}

          <section className="pb-10">
            <div className="mb-5 flex items-center gap-2">
              <FiFileText />
              <h2 className="text-2xl font-bold">Notes</h2>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <p className="leading-7 text-gray-700">
                {student?.notes || "No Notes Available"}
              </p>
            </div>
          </section>
        </div>
      </PageContent>
    </PageLayout>
  );
}
