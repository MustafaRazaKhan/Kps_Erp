"use client";

import { FaToggleOn, FaToggleOff, FaRegistered } from "react-icons/fa";

import Link from "next/link";
import { useEffect } from "react";
import { useUser } from "@/store/user/admin/context/user.context";
import PageLayout from "@/components/common/PageLayout";
import PageContent from "@/components/common/PageContent";
import { FiEdit2 } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import DataTableHeader from "@/components/common/DataTableHeader";
// import { useSearchParams } from "next/navigation";

const userColumns = [
  { label: "User" },
  { label: "Email" },
  { label: "Status" },
  { label: "Role" },
  { label: "Action" },
];

const rolePathMap: any = {
  student: "student",
  teacher: "teacher",
  class_teacher: "teacher",
  driver: "driver",
};

const roleColors: any = {
  admin: "bg-slate-100 text-slate-700",
  student: "bg-blue-100 text-blue-700",
  teacher: "bg-green-100 text-green-700",
  class_teacher: "bg-violet-100 text-violet-700",
  driver: "bg-amber-100 text-amber-700",
};

// const getInitials = (name: string) =>
//   name
//     ?.split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();

const heading = {
  name: "Users",
  subHeading: "Manage all users",
  href: "/dashboard/admin/user/user-register",
  btnHeading: "Add User",
  icon: <FaRegistered />,
};

const UserList = () => {
  // const searchParams = useSearchParams();

  // const page = Number(searchParams.get("page")) || 1;

  const { state, userList, handleUpdate } = useUser();
  // const {view} = useToggle()

  useEffect(() => {
    userList();
  }, []);

  return (
    <PageLayout>
      <PageHeader heading={heading} />
      <PageContent>
        <DataTable>
          <DataTableHeader columns={userColumns} />
          <tbody className="bg-white dark:bg-slate-900">
            {state?.userList?.map((item: any) => {
              const path = rolePathMap[item.role];

              return (
                <tr
                  key={item._id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  {/* USER */}
                  <td className="border px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-[#003366] font-semibold">
                        {/* {getInitials(item.name)} */}
                      </div>

                      <div>
                        <span className="font-semibold">{item.name}</span>
                        <p className="text-xs text-gray-500">System User</p>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="border px-6 py-4">
                    <span className="text-sm text-slate-600">{item.email}</span>
                  </td>

                  {/* STATUS */}
                  <td className="border px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ROLE */}
                  <td className="border px-6 py-4 text-center">
                    <span
                      className={`rounded px-3 py-1 text-sm font-medium uppercase ${roleColors[item.role]}`}
                    >
                      {item.role}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="border px-6 py-4">
                    <div className="flex justify-end gap-3">
                      {item.isActive && item.role == "student" && (
                        <Link
                          title="Create Profile"
                          href={`/admin/student/profile-create/${item._id}?role=${item.role}`}
                          className="text-[#003366] hover:text-blue-700"
                        >
                          <FiEdit2 />
                        </Link>
                      )}

                      <button
                        onClick={() => handleUpdate(item._id, item.isActive)}
                        title="Toggle Status"
                        className="text-slate-600 hover:text-slate-900"
                      >
                        {item.isActive ? (
                          <FaToggleOn className="text-xl text-green-500" />
                        ) : (
                          <FaToggleOff className="text-xl text-red-500" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </DataTable>

        {/* <H2 title="Total User" total={state.userList.length} /> */}
        {/* <SearchContainer
          onChange={() => console.log("firsr")}
          placeholder="Search For ....."
          title="User Filter"
        /> */}

        {/* TABLE */}

        {}

        {/* PAGINATION */}
      </PageContent>
    </PageLayout>
  );
};

export default UserList;
