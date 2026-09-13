"use client";

import DataTable from "@/components/common/DataTable";
import DataTableHeader from "@/components/common/DataTableHeader";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import PageContent from "@/components/common/PageContent";
import PageHeader from "@/components/common/PageHeader";
import PageLayout from "@/components/common/PageLayout";

import enquiry from "@/constants/tables/enquiry.columns";

import useEnquiry from "@/store/common/context/enquiry.context";
import useModal from "@/store/common/context/modal.context";

import { BiPencil, BiQuestionMark } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import {
  FaEnvelope,
  FaEnvelopeOpenText,
  FaPhone,
  FaQuestionCircle,
} from "react-icons/fa";

/* ============================================================
   PAGE HEADER CONFIGURATION
   ------------------------------------------------------------
   This object is passed to the common PageHeader component.
   It controls:
   - Page title
   - Page description
   - Add button text
   - Add button URL
   - Header icon
============================================================ */

const heading = {
  name: "Enquiry List",
  subHeading: "Add and manage your school’s basic Enquiries.",
  href: "/dashboard/admin/school/school-list",
  btnHeading: "Add Enquiry",
  icon: <FaEnvelopeOpenText />,
};

/* ============================================================
   ENQUIRY LIST COMPONENT
============================================================ */

const EnquiryList = () => {
  /* ------------------------------------------------------------
     ENQUIRY CONTEXT
     ------------------------------------------------------------
     state:
       Contains enquiry list and other enquiry-related state.

     handleUpdate:
       Handles updating enquiry information/comment.

     setComment:
       Updates the comment entered inside the modal.

     handleDelete:
       Deletes an enquiry using its ID.
  ------------------------------------------------------------ */

  const { state, handleUpdate, setComment, handleDelete } = useEnquiry();

  /* ------------------------------------------------------------
     MODAL CONTEXT
     ------------------------------------------------------------
     openModal:
       Opens the modal and stores the selected enquiry ID.

     updateId:
       Contains the ID of the enquiry currently being edited.
  ------------------------------------------------------------ */

  const { openModal, updateId } = useModal();

  return (
    <PageLayout>
      {/* ========================================================
          PAGE HEADER
          --------------------------------------------------------
          Displays the page title, description and Add Enquiry
          button.
      ======================================================== */}

      <PageHeader heading={heading} />

      {/* ========================================================
          MAIN PAGE CONTENT
      ======================================================== */}

      <PageContent>
        {state.loading ? (
          <Loader />
        ) : (
          <DataTable>
            {/* ----------------------------------------------------
              TABLE HEADER
              ----------------------------------------------------
              The columns are coming from:
              @/constants/tables/enquiry.columns
          ---------------------------------------------------- */}

            <DataTableHeader columns={enquiry} />

            {/* ====================================================
              TABLE BODY
          ==================================================== */}

            <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
              {/* --------------------------------------------------
                LOOP THROUGH ALL ENQUIRIES

                state.enquiryList contains the enquiries
                retrieved from the database/API.
            -------------------------------------------------- */}

              {state?.enquiryList?.map((item, index) => (
                <tr
                  key={item._id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  {/* ==================================================
                    NAME COLUMN
                    --------------------------------------------------
                    Shows:
                    - Student/person name
                    - First letter as avatar
                    - Generated enquiry number
                ================================================== */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* ------------------------------------------------
                        USER AVATAR
                        Displays the first character of the name.
                    ------------------------------------------------ */}

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700 dark:bg-slate-700 dark:text-white">
                        {item.name?.charAt(0)?.toUpperCase()}
                      </div>

                      {/* ------------------------------------------------
                        NAME + ENQUIRY NUMBER
                    ------------------------------------------------ */}

                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {item.name}
                        </p>

                        {/* Generate enquiry number like:
                          ENQ-0001
                          ENQ-0002
                          ENQ-0003
                      */}

                        <p className="text-xs text-slate-500">
                          ENQ-{String(index + 1).padStart(4, "0")}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ==================================================
                    CONTACT COLUMN
                    --------------------------------------------------
                    Displays email and phone number.
                ================================================== */}

                  <td className="px-6 py-4">
                    <div className="space-y-1 text-sm">
                      {/* ------------------------------------------------
                        EMAIL
                    ------------------------------------------------ */}

                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <FaEnvelope className="text-slate-400" size={12} />

                        <span className="max-w-[180px] truncate">
                          {item.email}
                        </span>
                      </div>

                      {/* ------------------------------------------------
                        PHONE
                    ------------------------------------------------ */}

                      <div className="flex items-center gap-2 text-slate-500">
                        <FaPhone className="text-slate-400" size={12} />

                        {item.phone}
                      </div>
                    </div>
                  </td>

                  {/* ==================================================
                    SUBJECT COLUMN
                ================================================== */}

                  <td className="px-6 py-4">
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {item.subject}
                    </span>
                  </td>

                  {/* ==================================================
                    MESSAGE COLUMN
                    --------------------------------------------------
                    Long messages are truncated to keep the table
                    clean.
                ================================================== */}

                  <td className="max-w-70 px-6 py-4">
                    <p className="truncate text-sm text-slate-600 dark:text-slate-400">
                      {item.message}
                    </p>
                  </td>

                  {/* ==================================================
                    DATE COLUMN
                    --------------------------------------------------
                    Converts createdAt into Indian date format.

                    Example:
                    03/09/2026
                ================================================== */}

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />

                      {new Date((item as any).createdAt).toLocaleDateString(
                        "en-IN",
                      )}
                    </span>
                  </td>

                  {/* ==================================================
                    STATUS COLUMN
                    --------------------------------------------------
                    Displays the current enquiry status.
                ================================================== */}

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {item.status}
                  </td>

                  {/* ==================================================
                    COMMENT COLUMN
                    --------------------------------------------------
                    If an enquiry has a comment, display it.
                    Otherwise display "-".
                ================================================== */}

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {item.comment ? item.comment : "-"}
                  </td>

                  {/* ==================================================
                    ACTIONS COLUMN
                    --------------------------------------------------
                    Contains:
                    - Edit button
                    - Delete button
                ================================================== */}

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {/* ------------------------------------------------
                        EDIT / COMMENT BUTTON

                        Clicking this:
                        1. Opens the modal
                        2. Stores the enquiry ID in updateId
                    ------------------------------------------------ */}

                      <button
                        onClick={() => openModal(item._id)}
                        className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-800"
                      >
                        <BiPencil size={15} />
                      </button>

                      {/* ------------------------------------------------
                        DELETE BUTTON

                        Passes the enquiry ID to handleDelete().
                    ------------------------------------------------ */}

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-red-600 dark:hover:bg-slate-800"
                      >
                        <BsTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        )}
        {/* ======================================================
            ENQUIRY DATA TABLE
            ------------------------------------------------------
            Displays all enquiries in a tabular format.
        ====================================================== */}
      </PageContent>

      {/* ==========================================================
          UPDATE / COMMENT MODAL
          ----------------------------------------------------------
          This modal opens when the user clicks the edit button.

          The selected enquiry ID is stored in:
          updateId
      ========================================================== */}

      <Modal title="Comment For Status Of Enquiry">
        {/* --------------------------------------------------------
            UPDATE FORM
            --------------------------------------------------------
            When the form is submitted:

            handleUpdate(e, updateId)

            is called.

            updateId tells the backend which enquiry should
            be updated.
        -------------------------------------------------------- */}

        <form className="space-y-5" onSubmit={(e) => handleUpdate(e, updateId)}>
          {/* ======================================================
              COMMENT FIELD
          ====================================================== */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Any Comment Related To Enquiry
            </label>

            {/* ----------------------------------------------------
                COMMENT TEXTAREA

                setComment() updates the comment in context/state.

                The value prop is currently commented out.
                Ideally, if your context contains comment state,
                you should use:

                value={comment}
            ---------------------------------------------------- */}

            <textarea
              rows={5}
              // value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              className="w-full resize-none rounded border border-slate-200 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
            />
          </div>

          {/* ======================================================
              FORM SUBMIT BUTTON
          ====================================================== */}

          <div className="flex justify-end">
            <button
              type="submit"
              className="primary-bg rounded px-4 py-2 text-white"
            >
              Save Comment
            </button>
          </div>
        </form>
      </Modal>
    </PageLayout>
  );
};

export default EnquiryList;
