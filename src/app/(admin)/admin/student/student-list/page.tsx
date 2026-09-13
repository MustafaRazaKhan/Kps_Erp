"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { School } from "lucide-react";
import {
  FiBookOpen,
  FiCalendar,
  FiEdit2,
  FiEye,
  FiGrid,
  FiHash,
  FiList,
  FiPhone,
  FiSearch,
  FiShield,
  FiTrash2,
  FiUpload,
  FiUser,
  FiUsers,
  FiFilter,
  FiEdit,
} from "react-icons/fi";

import { FaPlus } from "react-icons/fa";
import PageLayout from "@/components/common/PageLayout";
import PageContent from "@/components/common/PageContent";
import PageHeader from "@/components/common/PageHeader";
import { useStudent } from "@/store/admin/context/student.context";
import useClass from "@/store/admin/context/class.context";
import student from "@/constants/tables/student.column";
import DataTable from "@/components/common/DataTable";
import DataTableHeader from "@/components/common/DataTableHeader";

const heading = {
  name: "Student List",
  subHeading: "Add and manage your student basic information.",
  href: "/dashboard/admin/user/user-list",
  btnHeading: "Student Register",
  icon: <FaPlus />,
};

export default function StudentListPage() {
  // const [view, setView] = useState("grid");

  const {
    state,
    studentList,
    // handleChange,
    // handleUpdate,
    // handleFileChange,
    // filterStudents,
  } = useStudent();

  // const {
  //   state: { classList },
  //   // getAllClass,
  // } = useClass();

  const formData = state.studentObj;
  useEffect(() => {
    studentList();
  }, []);

  return (
    <PageLayout>
      <PageHeader heading={heading} />
      <PageContent>
        {/* <H2 title="Total Students" total={state.studentList.length} /> */}

        <DataTable>
          <DataTableHeader columns={student} />
          <tbody className="bg-white dark:bg-slate-900">
            {state.studentList?.map((student: any, index: number) => (
              <tr
                key={student._id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                {/* PHOTO + NAME */}
                <td className="border px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`/api/photo/student-photo/${student._id}`}
                      alt={student.firstName}
                      className="h-10 w-10 rounded-full border object-cover"
                    />

                    <div>
                      <span className="font-semibold">
                        {student.firstName} {student.lastName}
                      </span>
                      <p className="text-xs text-gray-500">{student.gender}</p>
                    </div>
                  </div>
                </td>

                {/* SR NO */}
                <td className="border px-6 py-4">
                  {student.srNo || index + 1}
                </td>

                {/* CLASS */}
                <td className="border px-6 py-4">
                  <span className="rounded bg-indigo-50 px-3 py-1 text-sm text-indigo-700">
                    {student.classId?.name} - {student.classId?.section}
                  </span>
                </td>

                {/* GENDER */}
                <td className="border px-6 py-4">{student.gender}</td>

                {/* AGE */}
                <td className="border px-6 py-4">{student.age}</td>

                {/* FATHER */}
                <td className="border px-6 py-4">{student.fatherName}</td>

                {/* SESSION */}
                <td className="border px-6 py-4">{student.session || "-"}</td>

                {/* STATUS */}
                <td className="border px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      student.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {student.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* ACTION */}
                <td className="border px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <Link
                      title="View Profile"
                      href={`/admin/student/view-detail/${student._id}`}
                      className="text-[#003366] hover:text-blue-700"
                    >
                      <FiEye />
                    </Link>
                    <Link
                      title="create Transfer Certificate"
                      href={`/admin/student/view-detail/${student._id}`}
                      className="text-[#003366] hover:text-blue-700"
                    >
                      <FiEdit />
                    </Link>

                    {/* <button
                          onClick={() => openModal(student._id)}
                          className="text-amber-600 hover:text-amber-800"
                        >
                          <FiEdit2 />
                        </button> */}

                    <button className="text-red-600 hover:text-red-800">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>

        {/* ================= GRID VIEW ================= */}

        {/* ================= EMPTY ================= */}

        {state.studentList?.length === 0 && (
          <div className="p-6 text-center text-slate-500">
            No Students Found
          </div>
        )}

        {/* ================= MODAL ================= */}
      </PageContent>
    </PageLayout>
  );
}
