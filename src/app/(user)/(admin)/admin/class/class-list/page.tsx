"use client";

import { useEffect } from "react";
import Link from "next/link";

import {
  FiBookOpen,
  FiCalendar,
  FiChevronRight,
  FiEdit2,
  FiEye,
  FiGrid,
  FiUsers,
} from "react-icons/fi";
import { MdClass, MdOutlineClass, MdOutlineMeetingRoom } from "react-icons/md";
import { LuCassetteTape } from "react-icons/lu";
import { FaLayerGroup } from "react-icons/fa";

import useClass from "@/store/user/admin/context/class.context";
import useModal from "@/store/common/context/modal.context";

import PageLayout from "@/components/common/PageLayout";
import PageContent from "@/components/common/PageContent";
import PageHeader from "@/components/common/PageHeader";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import Row from "@/components/common/Row";
import InputField from "@/components/common/InputField";
import SectionCard from "@/components/common/SectionCard";
import FormContainer from "@/components/common/FormContainer";

export default function ClassList() {
  const { openModal, updateId } = useModal();

  const { state, classList, handleChange, handleUpdate } = useClass();

  useEffect(() => {
    classList();
  }, []);

  const classes = state?.classList || [];

  const activeClasses = classes.filter((item: any) => item.isActive);

  const totalSections = classes.reduce(
    (total: number, item: any) => total + 1,
    0,
  );

  const heading = {
    name: "Academic Classes",
    subHeading:
      "Manage classes, sections, students, attendance and academic operations.",
    href: "/dashboard/admin/class/class-register",
    btnHeading: "Create Class",
    icon: <LuCassetteTape />,
  };

  return (
    <PageLayout>
      <PageHeader heading={heading} />

      <PageContent>
        {/* =====================================================
            HERO / OVERVIEW
        ===================================================== */}

        <div className="relative mb-6 overflow-hidden rounded-2xl border border-[#003366]/10 bg-gradient-to-br from-[#003366] via-[#064477] to-[#0b5b8a] p-6 text-white shadow-sm">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-blue-300/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-blue-100">
                <MdOutlineClass size={20} />
                <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                  Academic Management
                </span>
              </div>

              <h2 className="text-2xl font-bold">Classes & Sections</h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                Your central workspace for managing class-wise students,
                attendance, academic records, schedules and other classroom
                operations.
              </p>
            </div>

            <Link
              href="/dashboard/admin/class/class-register"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#003366] shadow-sm transition hover:bg-blue-50"
            >
              <span>+ Create New Class</span>
              <FiChevronRight />
            </Link>
          </div>
        </div>

        {/* =====================================================
            QUICK STATISTICS
        ===================================================== */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<MdClass />}
            label="Total Classes"
            value={classes.length}
            description="Registered classes"
            color="blue"
          />

          <StatCard
            icon={<FiBookOpen />}
            label="Active Classes"
            value={activeClasses.length}
            description="Currently running"
            color="green"
          />

          <StatCard
            icon={<FiGrid />}
            label="Sections"
            value={totalSections}
            description="Academic sections"
            color="cream"
          />

          <StatCard
            icon={<FiUsers />}
            label="Student Management"
            value="Open"
            description="Class-wise students"
            color="navy"
          />
        </div>

        {/* =====================================================
            CLASS DIRECTORY
        ===================================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* HEADER */}

          <div className="border-b border-slate-200 bg-[#fafbfc] px-5 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
                  <FiGrid className="text-[#003366]" />
                  Class Directory
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Select a class to access its academic management modules.
                </p>
              </div>

              <div className="rounded-full border border-[#003366]/10 bg-[#003366]/5 px-3 py-1.5 text-xs font-semibold text-[#003366]">
                {classes.length} Classes
              </div>
            </div>
          </div>

          {/* DESKTOP TABLE */}

          {state.loading ? (
            <div className="p-10">
              <Loader />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="border-b border-slate-200 bg-slate-50/70">
                  <tr>
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Class
                    </th>

                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Section
                    </th>

                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Room
                    </th>

                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Class Operations
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {classes.length > 0 ? (
                    classes.map((item: any) => (
                      <tr
                        key={item._id}
                        className="group transition-colors hover:bg-[#003366]/[0.025]"
                      >
                        {/* CLASS */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#003366]/[0.07] text-[#003366]">
                              <MdClass size={19} />
                            </div>

                            <div>
                              <p className="font-bold uppercase text-slate-800">
                                {item.name}
                              </p>

                              <p className="mt-0.5 text-[11px] text-slate-400">
                                Academic Class
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* SECTION */}

                        <td className="px-5 py-4">
                          <span className="inline-flex min-w-9 items-center justify-center rounded-md border border-[#003366]/10 bg-[#003366]/[0.04] px-2.5 py-1 text-xs font-bold uppercase text-[#003366]">
                            {item.section || "-"}
                          </span>
                        </td>

                        {/* ROOM */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MdOutlineMeetingRoom
                              className="text-slate-400"
                              size={17}
                            />
                            Room {item.no || "-"}
                          </div>
                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-4">
                          <StatusBadge active={item.isActive} />
                        </td>

                        {/* OPERATIONS */}

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <ActionLink
                              href={`/admin/class/view-student-class-wise/${item._id}`}
                              icon={<FiUsers />}
                              label="Students"
                            />

                            <ActionLink
                              href={`/admin/class/view-student-class-wise/${item._id}`}
                              icon={<FiEye />}
                              label="View"
                            />

                            <button
                              type="button"
                              title="Edit Class"
                              onClick={() => openModal(item._id)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-50 hover:text-[#003366]"
                            >
                              <FiEdit2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-5 py-16 text-center">
                        <div className="mx-auto flex max-w-sm flex-col items-center">
                          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#003366]/5 text-[#003366]">
                            <MdClass size={26} />
                          </div>

                          <h3 className="font-semibold text-slate-800">
                            No classes found
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            Create your first academic class to start managing
                            students and classroom operations.
                          </p>

                          <Link
                            href="/dashboard/admin/class/class-register"
                            className="mt-5 rounded-lg bg-[#003366] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00284d]"
                          >
                            Create Class
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* =====================================================
            CLASS MANAGEMENT MODULES
        ===================================================== */}

        <div className="mt-6">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-800">
              Academic Operations
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Frequently used modules for class management.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ModuleCard
              icon={<FiUsers />}
              title="Students"
              description="View and manage students class-wise."
              href="/admin/student/student-list"
            />

            <ModuleCard
              icon={<FiCalendar />}
              title="Attendance"
              description="Manage daily class attendance."
              href="/admin/attendance"
            />

            <ModuleCard
              icon={<FiBookOpen />}
              title="Academic Records"
              description="Manage subjects and academic data."
              href="/admin/academic"
            />

            <ModuleCard
              icon={<MdOutlineMeetingRoom />}
              title="Classrooms"
              description="Manage rooms and classroom allocation."
              href="/admin/class/class-list"
            />
          </div>
        </div>
      </PageContent>

      {/* =====================================================
          EDIT CLASS MODAL
      ===================================================== */}

      <Modal title="Update Class">
        <FormContainer onSubmit={(e) => handleUpdate(e, updateId)}>
          {state.loading && <Loader />}

          <SectionCard title="Class Information" icon={<MdOutlineClass />}>
            <Row>
              <div className="flex-1/2">
                <label className="mb-2 block py-1 text-sm font-medium text-slate-700">
                  Select Class
                </label>

                <select
                  onChange={(e) => handleChange(e)}
                  name="name"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10"
                >
                  <option value="pnc">P.NC</option>
                  <option value="nc">N.C</option>
                  <option value="kg">K.G</option>
                  <option value="i">I</option>
                  <option value="ii">II</option>
                  <option value="iii">III</option>
                  <option value="iv">IV</option>
                  <option value="v">V</option>
                  <option value="vi">VI</option>
                  <option value="vii">VII</option>
                  <option value="viii">VIII</option>
                  <option value="ix">IX</option>
                  <option value="x">X</option>
                  <option value="xi">XI</option>
                  <option value="xii">XII</option>
                </select>
              </div>

              <div className="flex-1/2">
                <InputField
                  name="section"
                  label="Section"
                  value={state.classObj.section}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="A, B, C..."
                  icon={<FaLayerGroup />}
                />
              </div>
            </Row>

            <Row>
              <InputField
                label="Room Number"
                name="no"
                value={state.classObj.no}
                onChange={(e) => handleChange(e)}
                type="number"
                placeholder="Enter room number"
                icon={<MdOutlineMeetingRoom />}
              />
            </Row>

            <Button title="Update Class" />
          </SectionCard>
        </FormContainer>
      </Modal>
    </PageLayout>
  );
}

/* =============================================================
   STAT CARD
============================================================= */

function StatCard({
  icon,
  label,
  value,
  description,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
  color: "blue" | "green" | "cream" | "navy";
}) {
  const styles = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    cream: "bg-amber-50 text-amber-700",
    navy: "bg-[#003366]/5 text-[#003366]",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles[color]}`}
        >
          {icon}
        </div>

        <span className="text-xl font-bold text-slate-800">{value}</span>
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-700">{label}</p>

      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}

/* =============================================================
   STATUS BADGE
============================================================= */

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />

      {active ? "Active" : "Inactive"}
    </span>
  );
}

/* =============================================================
   TABLE ACTION
============================================================= */

function ActionLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      title={label}
      className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-slate-400 transition hover:bg-[#003366]/5 hover:text-[#003366]"
    >
      {icon}
      <span className="hidden xl:inline">{label}</span>
    </Link>
  );
}

/* =============================================================
   MODULE CARD
============================================================= */

function ModuleCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#003366]/20 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#003366]/[0.06] text-[#003366] transition group-hover:bg-[#003366] group-hover:text-white">
          {icon}
        </div>

        <FiChevronRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#003366]" />
      </div>

      <h4 className="mt-4 text-sm font-bold text-slate-800">{title}</h4>

      <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
    </Link>
  );
}
