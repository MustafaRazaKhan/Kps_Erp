"use client";

import DataTable from "@/components/common/DataTable";
import DataTableHeader from "@/components/common/DataTableHeader";
import PageContent from "@/components/common/PageContent";
import PageHeader from "@/components/common/PageHeader";
import PageLayout from "@/components/common/PageLayout";
import school from "@/constants/tables/school.column";
import useSchool from "@/store/user/admin/context/school.context";
import { useEffect } from "react";
import { BiPencil } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";

import { FaPlus, FaSchool } from "react-icons/fa";

const heading = {
  name: "School List",
  subHeading: "Registered School Records",
  href: "/admin/school/school-create",
  btnHeading: "Add School",
  icon: <FaSchool />,
};

const SchoolList = () => {
  const { state, schoolList } = useSchool();
  useEffect(() => {
    schoolList();
  }, []);
  return (
    <PageLayout>
      <PageHeader heading={heading} />
      <PageContent>
        <DataTable>
          <DataTableHeader columns={school} />
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
            {state?.schoolList?.map((school: any) => (
              <tr
                key={school._id}
                className="transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                {/* School */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`/api/photo/school-photo/${school._id}`}
                      alt={school.name}
                      className="h-11 w-11 rounded-lg border border-slate-200 object-cover dark:border-slate-700"
                    />

                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white">
                        {school.name}
                      </p>

                      <p className="text-xs text-slate-500">School</p>
                    </div>
                  </div>
                </td>

                {/* Code */}
                <td className="px-6 py-4">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {school.code}
                  </span>
                </td>

                {/* Email */}
                <td className="px-6 py-4">
                  <p className="max-w-[220px]  text-sm text-slate-600 dark:text-slate-300">
                    {school.email}
                  </p>
                </td>

                {/* Contact */}
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {school.contact}
                  </p>
                </td>

                {/* Address */}
                <td className="px-6 py-4">
                  <p className="max-w-[250px]  text-sm text-slate-500 dark:text-slate-400">
                    {school.address}
                  </p>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800"
                      title="Edit School"
                    >
                      <BiPencil size={16} />
                    </button>

                    <button
                      // onClick={() => handleDelete(school._id)}
                      className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                      title="Delete School"
                    >
                      <BsTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </PageContent>
    </PageLayout>
  );
};

export default SchoolList;
