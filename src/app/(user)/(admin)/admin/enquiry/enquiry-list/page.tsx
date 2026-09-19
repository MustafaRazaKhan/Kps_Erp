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

import { BiPencil } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";

import { FaEnvelope, FaEnvelopeOpenText, FaPhone } from "react-icons/fa";

const heading = {
  name: "Enquiry List",
  subHeading:
    "View, manage and follow up with enquiries received by the school.",
  href: "/dashboard/admin/school/school-list",
  btnHeading: "Add Enquiry",
  icon: <FaEnvelopeOpenText />,
};

const EnquiryList = () => {
  const { state, handleUpdate, setComment, handleDelete } = useEnquiry();

  const { openModal, updateId } = useModal();

  return (
    <PageLayout>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader heading={heading} />

      <PageContent>
        {/* =====================================================
            TABLE
        ===================================================== */}

        {state.loading ? (
          <Loader />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-amber-100/80 bg-white shadow-sm">
            {/* =================================================
                TABLE TOP STRIP
            ================================================== */}

            <div className="border-b border-amber-100/70 bg-gradient-to-r from-[#fffdf7] via-[#fff9e8] to-blue-50/40 px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
                    Admission Management
                  </p>

                  <h2 className="mt-1 text-base font-bold text-slate-800">
                    School Enquiries
                  </h2>
                </div>

                <div className="rounded-xl border border-amber-100 bg-white/70 px-3 py-2">
                  <p className="text-[10px] font-medium text-slate-400">
                    Total Enquiries
                  </p>

                  <p className="mt-0.5 text-lg font-bold text-slate-800">
                    {state?.enquiryList?.length || 0}
                  </p>
                </div>
              </div>
            </div>

            <DataTable>
              <DataTableHeader columns={enquiry} />

              <tbody className="divide-y divide-slate-100 bg-white">
                {state?.enquiryList?.map((item, index) => {
                  const status = item.status?.toString().toLowerCase() || "";

                  const isCompleted =
                    status.includes("complete") ||
                    status.includes("closed") ||
                    status.includes("done");

                  const isPending =
                    status.includes("pending") || status.includes("new");

                  return (
                    <tr
                      key={item._id}
                      className="
                          group
                          transition-colors
                          hover:bg-amber-50/30
                        "
                    >
                      {/* =================================================
                            NAME
                        ================================================== */}

                      <td className="px-1 py-1">
                        <div className="flex items-center gap-3">
                          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100/80 to-blue-50 text-sm font-bold text-amber-700 ring-1 ring-amber-100">
                            {item.name?.charAt(0)?.toUpperCase() || "?"}

                            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500/70" />
                          </div>

                          <div className="min-w-0">
                            <p className=" text-sm font-semibold text-slate-800">
                              {item.name || "-"}
                            </p>

                            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                              ENQ-
                              {String(index + 1).padStart(4, "0")}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* =================================================
                            CONTACT
                        ================================================== */}

                      <td className="px-5 py-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                              <FaEnvelope size={10} />
                            </span>

                            <span className="max-w-[180px] ">
                              {item.email || "-"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-50 text-amber-700">
                              <FaPhone size={10} />
                            </span>

                            <span>{item.phone || "-"}</span>
                          </div>
                        </div>
                      </td>

                      {/* =================================================
                            SUBJECT
                        ================================================== */}

                      <td className="px-5 py-4">
                        <span className="inline-flex max-w-[180px] items-center gap-1.5  rounded-lg border border-blue-100 bg-blue-50/60 px-2.5 py-1.5 text-xs font-semibold text-blue-700">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" />

                          <span className="">{item.subject || "-"}</span>
                        </span>
                      </td>

                      {/* =================================================
                            MESSAGE
                        ================================================== */}

                      <td className="max-w-[260px] px-5 py-4">
                        <p
                          className=" text-xs leading-5 text-slate-500"
                          title={item.message}
                        >
                          {item.message || "-"}
                        </p>
                      </td>

                      {/* =================================================
                            DATE
                        ================================================== */}

                      <td className="px-5 py-4">
                        <div className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />

                          <span className="text-[11px] font-medium text-slate-500">
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleDateString(
                                  "en-IN",
                                )
                              : "-"}
                          </span>
                        </div>
                      </td>

                      {/* =================================================
                            STATUS
                        ================================================== */}

                      <td className="px-5 py-4">
                        <span
                          className={`
                              inline-flex items-center gap-1.5
                              rounded-full
                              border
                              px-2.5 py-1
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-wide

                              ${
                                isCompleted
                                  ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                                  : isPending
                                    ? "border-amber-100 bg-amber-50 text-amber-700"
                                    : "border-blue-100 bg-blue-50 text-blue-700"
                              }
                            `}
                        >
                          <span
                            className={`
                                h-1.5 w-1.5 rounded-full

                                ${
                                  isCompleted
                                    ? "bg-emerald-500/70"
                                    : isPending
                                      ? "bg-amber-500/70"
                                      : "bg-blue-500/70"
                                }
                              `}
                          />

                          {item.status || "New"}
                        </span>
                      </td>

                      {/* =================================================
                            COMMENT
                        ================================================== */}

                      <td className="max-w-[180px] px-5 py-4">
                        {item.comment ? (
                          <p
                            title={item.comment}
                            className=" text-xs text-slate-500"
                          >
                            {item.comment}
                          </p>
                        ) : (
                          <span className="text-xs text-slate-300">
                            No comment
                          </span>
                        )}
                      </td>

                      {/* =================================================
                            ACTIONS
                        ================================================== */}

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* EDIT */}

                          <button
                            type="button"
                            title="Edit enquiry"
                            onClick={() => openModal(item._id)}
                            className="
                                flex h-8 w-8 items-center justify-center
                                rounded-lg
                                border border-blue-100
                                bg-blue-50/50
                                text-blue-600
                                transition
                                hover:bg-blue-100
                                hover:text-blue-700
                              "
                          >
                            <BiPencil size={15} />
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            title="Delete enquiry"
                            onClick={() => handleDelete(item._id)}
                            className="
                                flex h-8 w-8 items-center justify-center
                                rounded-lg
                                border border-red-100
                                bg-red-50/40
                                text-red-500
                                transition
                                hover:bg-red-100
                                hover:text-red-600
                              "
                          >
                            <BsTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {/* =================================================
                      EMPTY STATE
                  ================================================== */}

                {!state?.enquiryList?.length && (
                  <tr>
                    <td
                      colSpan={enquiry.length}
                      className="px-6 py-16 text-center"
                    >
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                          <FaEnvelopeOpenText size={19} />
                        </div>

                        <h3 className="mt-4 text-sm font-bold text-slate-800">
                          No enquiries found
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          New school enquiries will appear here once they are
                          received.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </DataTable>
          </div>
        )}
      </PageContent>

      {/* =====================================================
          COMMENT MODAL
      ===================================================== */}

      <Modal title="Update Enquiry">
        <form className="space-y-5" onSubmit={(e) => handleUpdate(e, updateId)}>
          {/* MODAL INTRO */}

          <div className="rounded-xl border border-amber-100 bg-gradient-to-r from-[#fffdf7] to-amber-50/50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100/70 text-amber-700">
                <FaEnvelopeOpenText size={15} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Enquiry Follow-up
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Add a comment or note about the current enquiry status.
                </p>
              </div>
            </div>
          </div>

          {/* COMMENT */}

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Enquiry Comment
            </label>

            <textarea
              rows={5}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a follow-up note or comment..."
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                leading-6
                text-slate-700
                outline-none
                transition
                placeholder:text-slate-300
                focus:border-amber-300
                focus:ring-4
                focus:ring-amber-50
              "
            />
          </div>

          {/* BUTTON */}

          <div className="flex justify-end border-t border-slate-100 pt-4">
            <button
              type="submit"
              className="
                inline-flex items-center gap-2
                rounded-xl
                bg-amber-600
                px-5 py-2.5
                text-sm font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-amber-700
                hover:shadow
                focus:outline-none
                focus:ring-2
                focus:ring-amber-200
                focus:ring-offset-2
              "
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
