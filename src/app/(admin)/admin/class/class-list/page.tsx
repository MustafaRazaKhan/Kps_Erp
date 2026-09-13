"use client";

import { useEffect } from "react";
import Link from "next/link";

import { FaDoorOpen, FaLayerGroup, FaPlus, FaUserCheck } from "react-icons/fa";
import { FiEdit2, FiEye } from "react-icons/fi";
import { MdClass, MdOutlineClass } from "react-icons/md";

import useClass from "@/store/admin/context/class.context";

import PageLayout from "@/components/common/PageLayout";
import PageContent from "@/components/common/PageContent";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import DataTableHeader from "@/components/common/DataTableHeader";

import classColumns from "@/constants/tables/class.column";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import useModal from "@/store/common/context/modal.context";
import Button from "@/components/common/Button";
import Row from "@/components/common/Row";
import InputField from "@/components/common/InputField";
import SectionCard from "@/components/common/SectionCard";
import FormContainer from "@/components/common/FormContainer";
import { LuCassetteTape } from "react-icons/lu";

/* ============================================================
   CLASS LIST PAGE
   ------------------------------------------------------------
   Displays all academic classes registered in the school ERP.

   Available actions:
   - View class
   - Mark attendance
   - Edit class
============================================================ */

export default function ClassList() {
  const { openModal, updateId } = useModal();
  /* ==========================================================
     CLASS CONTEXT
     ----------------------------------------------------------
     state:
       Contains class list and other class-related state.

     classList:
       Fetches all classes from the backend.
  ========================================================== */

  const { state, classList, handleChange, handleUpdate } = useClass();

  /* ==========================================================
     FETCH CLASS LIST
     ----------------------------------------------------------
     Load classes when the page is mounted.
  ========================================================== */

  useEffect(() => {
    classList();
  }, []);

  /* ==========================================================
     PAGE HEADER CONFIGURATION
  ========================================================== */

  const heading = {
    name: "Classes List",
    subHeading: "Manage all academic classes",
    href: "/dashboard/admin/class/class-register",
    btnHeading: "Add Class",
    icon: <LuCassetteTape />,
  };

  return (
    <PageLayout>
      {/* ========================================================
          PAGE HEADER
          --------------------------------------------------------
          Shows page title, description and Add Class button.
      ======================================================== */}

      <PageHeader heading={heading} />

      {/* ========================================================
          PAGE CONTENT
      ======================================================== */}

      <PageContent>
        {/* ======================================================
            CLASS DATA TABLE
            ------------------------------------------------------
            Displays all registered classes.
        ====================================================== */}

        {state.loading ? (
          <Loader />
        ) : (
          <DataTable>
            {/* ----------------------------------------------------
              TABLE HEADER
              ----------------------------------------------------
              Column configuration comes from:
              constants/tables/class.column
          ---------------------------------------------------- */}

            <DataTableHeader columns={classColumns} />

            {/* ====================================================
              TABLE BODY
          ==================================================== */}

            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900">
              {/* --------------------------------------------------
                RENDER CLASS LIST

                Optional chaining prevents an error when the
                class list has not been loaded yet.
            -------------------------------------------------- */}

              {state?.classList?.map((item: any) => (
                <tr
                  key={item._id}
                  className="
                  transition-colors
                  duration-150
                  hover:bg-slate-50
                  dark:hover:bg-slate-800/40
                "
                >
                  {/* ==================================================
                    CLASS
                    --------------------------------------------------
                    Displays class name with a small class icon.
                ================================================== */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* Class Icon */}

                      <div
                        className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-100
                        text-[#003366]
                        dark:bg-slate-800
                      "
                      >
                        <MdClass size={17} />
                      </div>

                      {/* Class Information */}

                      <div>
                        <p className="font-semibold uppercase text-slate-800 dark:text-white">
                          {item.name}
                        </p>

                        <p className="text-xs text-slate-400">Academic Class</p>
                      </div>
                    </div>
                  </td>

                  {/* ==================================================
                    SECTION
                ================================================== */}

                  <td className="px-5 py-4">
                    <span
                      className="
                      inline-flex
                      min-w-8
                      items-center
                      justify-center
                      rounded-md
                      bg-slate-100
                      px-2.5
                      py-1
                      text-xs
                      font-semibold
                      uppercase
                      text-slate-700
                      dark:bg-slate-800
                      dark:text-slate-300
                    "
                    >
                      {item.section}
                    </span>
                  </td>

                  {/* ==================================================
                    ROOM
                ================================================== */}

                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      Room {item.no}
                    </span>
                  </td>

                  {/* ==================================================
                    STATUS
                    --------------------------------------------------
                    Displays whether the class is currently active.
                ================================================== */}

                  <td className="px-5 py-4">
                    <span
                      className={`
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      ${
                        item.isActive
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                      }
                    `}
                    >
                      {/* Status Indicator */}

                      <span
                        className={`
                        h-1.5
                        w-1.5
                        rounded-full
                        ${item.isActive ? "bg-emerald-500" : "bg-red-500"}
                      `}
                      />

                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ==================================================
                    ACTIONS
                    --------------------------------------------------
                    Available actions:
                    - View
                    - Attendance
                    - Edit
                ================================================== */}

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {/* =================================================
                        VIEW CLASS
                        -------------------------------------------------
                        Opens the class/student view page.
                    ================================================= */}

                      <Link
                        href={`/admin/class/view-student-class-wise/${item._id}`}
                        title="View Student Clas-Wise"
                        className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-md
                        text-slate-400
                        transition
                        hover:bg-slate-100
                        hover:text-[#003366]
                        dark:hover:bg-slate-800
                      "
                      >
                        <FiEye size={15} />
                      </Link>

                      {/* =================================================
                        EDIT CLASS
                        -------------------------------------------------
                        Connect this button to your modal/update flow.

                        Example:
                        onClick={() => openModal(item._id)}
                    ================================================= */}

                      <button
                        type="button"
                        title="Edit Class"
                        className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-md
                        text-slate-400
                        transition
                        hover:bg-slate-100
                        hover:text-blue-600
                        dark:hover:bg-slate-800
                      "
                        onClick={() => openModal(item._id)}
                      >
                        <FiEdit2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        )}
      </PageContent>

      {/* modal for class update */}
      <Modal title="Update Class">
        <FormContainer onSubmit={(e) => handleUpdate(e, updateId)}>
          {/* ====================================================
              LOADING STATE
              ----------------------------------------------------
              Shows the loader while the class is being submitted
              or an API request is in progress.
          ==================================================== */}

          {state.loading && <Loader />}

          {/* ====================================================
              CLASS PROFILE SECTION
              ----------------------------------------------------
              Contains the basic information required to create
              a class.
          ==================================================== */}

          <SectionCard title="Create Class Profile" icon={<MdOutlineClass />}>
            {/* ==================================================
                CLASS NAME + SECTION
                --------------------------------------------------
                First row contains:
                1. Class selection
                2. Section name
            ================================================== */}

            <Row>
              {/* =================================================
                  CLASS SELECTION
                  -------------------------------------------------
                  The administrator selects the class from the
                  predefined school classes.

                  Example:
                  P.NC → N.C → K.G → I → II → ... → XII
              ================================================= */}

              <div className="flex-1/2">
                <label className="mb-2 block py-1 text-sm font-medium text-gray-700">
                  Select Class
                </label>

                {/* ------------------------------------------------
                    CLASS DROPDOWN

                    The selected value is handled by handleChange()
                    from the class context.
                ------------------------------------------------ */}

                <select
                  onChange={(e) => handleChange(e)}
                  name="name"
                  className="w-full border py-2.5"
                >
                  {/* ------------------------------------------------
                      PRE-PRIMARY CLASSES
                  ------------------------------------------------ */}

                  <option value="pnc">P.NC</option>

                  <option value="nc">N.C</option>

                  <option value="kg">K.G</option>

                  {/* ------------------------------------------------
                      PRIMARY CLASSES
                  ------------------------------------------------ */}

                  <option value="i">I</option>

                  <option value="ii">II</option>

                  <option value="iii">III</option>

                  <option value="iv">IV</option>

                  <option value="V">V</option>

                  {/* ------------------------------------------------
                      MIDDLE SCHOOL CLASSES
                  ------------------------------------------------ */}

                  <option value="vi">VI</option>

                  <option value="vii">VII</option>

                  <option value="viii">VIII</option>

                  {/* ------------------------------------------------
                      SECONDARY CLASSES
                  ------------------------------------------------ */}

                  <option value="ix">IX</option>

                  <option value="x">X</option>

                  {/* ------------------------------------------------
                      SENIOR SECONDARY CLASSES
                  ------------------------------------------------ */}

                  <option value="xi">XI</option>

                  <option value="xii">XII</option>
                </select>
              </div>

              {/* =================================================
                  SECTION NAME
                  -------------------------------------------------
                  Stores the section of the selected class.

                  Example:
                  A
                  B
                  C
              ================================================= */}

              <div className="flex-1/2">
                <InputField
                  name="section"
                  label="Section Name"
                  value={state.classObj.section}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Enter Section name (A,B,C)"
                  icon={<FaLayerGroup />}
                />
              </div>
            </Row>

            {/* ==================================================
                ROOM NUMBER
                --------------------------------------------------
                Stores the classroom/room number assigned to
                the class.

                Example:
                Room 101
                Room 202
                Room 15
            ================================================== */}

            <Row>
              <InputField
                label="Room Number"
                name="no"
                value={state.classObj.no}
                onChange={(e) => handleChange(e)}
                type="number"
                placeholder="Enter room number"
                icon={<FaDoorOpen />}
              />
            </Row>

            {/* ==================================================
                SUBMIT BUTTON
                --------------------------------------------------
                Button submits the class creation form.

                FormContainer's onSubmit will trigger
                handleSubmit().
            ================================================== */}

            <Button title="Update Class" />
          </SectionCard>
        </FormContainer>
      </Modal>
    </PageLayout>
  );
}
