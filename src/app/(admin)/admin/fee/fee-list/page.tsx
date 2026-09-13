"use client";

import { useEffect, useRef } from "react";
import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

import useFee from "@/store/admin/context/fee.context";

import School from "@/components/common/School";
import PageLayout from "@/components/common/PageLayout";
import PageContent from "@/components/common/PageContent";

const FeeList = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "School Fee Structure",
  });

  const { state, feeList } = useFee();

  useEffect(() => {
    feeList();
  }, []);

  return (
    <PageLayout>
      <PageContent>
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Fee Structure</h1>

            <p className="mt-1 text-sm text-slate-500">
              View and print the current school fee structure
            </p>
          </div>

          {/* Print Button */}
          <button
            type="button"
            onClick={reactToPrintFn}
            className="flex items-center gap-2 rounded-lg bg-[#003366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#00264d] active:scale-[0.98]"
          >
            <FaPrint size={14} />
            Print
          </button>
        </div>

        {/* =====================================================
            PRINTABLE AREA
        ===================================================== */}
        <div
          ref={contentRef}
          className="mx-auto w-full max-w-5xl rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          {state.feeList.map((item: any) => {
            /* -------------------------------------------------
               Calculate totals
            ------------------------------------------------- */
            const oneTimeTotal =
              Number(item.admissionFee || 0) +
              Number(item.annualFee || 0) +
              Number(item.registrationFee || 0) +
              Number(item.examinationFee || 0) +
              Number(item.securityFee || 0);

            const monthlyTotal = item.monthList.reduce(
              (total: number, fee: any) =>
                total + Number(fee.monthFee || 0) + Number(fee.busFee || 0),
              0,
            );

            const annualMonthlyTotal = item.monthList.reduce(
              (total: number, fee: any) =>
                total +
                (Number(fee.monthFee || 0) + Number(fee.busFee || 0)) * 12,
              0,
            );

            const grandTotal = oneTimeTotal + annualMonthlyTotal;

            return (
              <div key={item._id}>
                {/* =================================================
                    SCHOOL HEADER
                ================================================= */}
                <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
                  <School />

                  <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        Fee Structure
                      </p>

                      <h2 className="mt-1 text-xl font-bold text-slate-800">
                        Academic Fee Schedule
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">Fee Group</span>

                      <span className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-semibold text-[#003366]">
                        {item.feeCategoryValue}
                      </span>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    DOCUMENT CONTENT
                ================================================= */}
                <div className="space-y-8 px-6 py-6 sm:px-8">
                  {/* =================================================
                      ONE TIME FEES
                  ================================================= */}
                  <section>
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-800">
                          One-Time Fees
                        </h3>

                        <p className="text-xs text-slate-500">
                          Common charges applicable during admission / academic
                          session
                        </p>
                      </div>

                      <span className="text-sm font-semibold text-slate-600">
                        ₹{oneTimeTotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-slate-200">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                          <tr className="border-b border-slate-200">
                            <th className="px-4 py-3 text-left font-semibold text-slate-600">
                              Fee Type
                            </th>

                            <th className="px-4 py-3 text-right font-semibold text-slate-600">
                              Amount
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="px-4 py-3 text-slate-700">
                              Admission Fee
                            </td>

                            <td className="px-4 py-3 text-right font-medium text-slate-800">
                              ₹
                              {Number(item.admissionFee || 0).toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>

                          <tr>
                            <td className="px-4 py-3 text-slate-700">
                              Annual Fee
                            </td>

                            <td className="px-4 py-3 text-right font-medium text-slate-800">
                              ₹
                              {Number(item.annualFee || 0).toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>

                          <tr>
                            <td className="px-4 py-3 text-slate-700">
                              Registration Fee
                            </td>

                            <td className="px-4 py-3 text-right font-medium text-slate-800">
                              ₹
                              {Number(item.registrationFee || 0).toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>

                          <tr>
                            <td className="px-4 py-3 text-slate-700">
                              Examination Fee
                            </td>

                            <td className="px-4 py-3 text-right font-medium text-slate-800">
                              ₹
                              {Number(item.examinationFee || 0).toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>

                          <tr>
                            <td className="px-4 py-3 text-slate-700">
                              Security Fee
                            </td>

                            <td className="px-4 py-3 text-right font-medium text-slate-800">
                              ₹
                              {Number(item.securityFee || 0).toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>
                        </tbody>

                        <tfoot>
                          <tr className="border-t border-slate-200 bg-slate-50">
                            <td className="px-4 py-3 font-bold text-slate-800">
                              One-Time Total
                            </td>

                            <td className="px-4 py-3 text-right font-bold text-[#003366]">
                              ₹{oneTimeTotal.toLocaleString("en-IN")}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </section>

                  {/* =================================================
                      MONTHLY FEES
                  ================================================= */}
                  <section>
                    <div className="mb-3">
                      <h3 className="text-base font-bold text-slate-800">
                        Class-wise Monthly Fees
                      </h3>

                      <p className="text-xs text-slate-500">
                        Monthly tuition and transport charges by class
                      </p>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-slate-200">
                      <table className="w-full text-sm">
                        <thead className="bg-[#003366] text-white">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold">
                              #
                            </th>

                            <th className="px-4 py-3 text-left font-semibold">
                              Class
                            </th>

                            <th className="px-4 py-3 text-right font-semibold">
                              Monthly Fee
                            </th>

                            <th className="px-4 py-3 text-right font-semibold">
                              Bus Fee
                            </th>

                            <th className="px-4 py-3 text-right font-semibold">
                              Monthly Total
                            </th>

                            <th className="px-4 py-3 text-right font-semibold">
                              Annual Total
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                          {item.monthList.map((fee: any, index: number) => {
                            const monthlyFee = Number(fee.monthFee || 0);

                            const busFee = Number(fee.busFee || 0);

                            const total = monthlyFee + busFee;

                            const annualTotal = total * 12;

                            return (
                              <tr
                                key={index}
                                className="transition hover:bg-slate-50"
                              >
                                <td className="px-4 py-3 text-slate-400">
                                  {index + 1}
                                </td>

                                <td className="px-4 py-3 font-semibold text-slate-800">
                                  {fee.selectedClass}
                                </td>

                                <td className="px-4 py-3 text-right text-slate-700">
                                  ₹{monthlyFee.toLocaleString("en-IN")}
                                </td>

                                <td className="px-4 py-3 text-right text-slate-700">
                                  ₹{busFee.toLocaleString("en-IN")}
                                </td>

                                <td className="px-4 py-3 text-right font-semibold text-slate-800">
                                  ₹{total.toLocaleString("en-IN")}
                                </td>

                                <td className="px-4 py-3 text-right font-bold text-[#003366]">
                                  ₹{annualTotal.toLocaleString("en-IN")}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>

                        <tfoot>
                          <tr className="border-t border-slate-200 bg-slate-50">
                            <td
                              colSpan={4}
                              className="px-4 py-3 text-right font-bold text-slate-800"
                            >
                              Total
                            </td>

                            <td className="px-4 py-3 text-right font-bold text-slate-800">
                              ₹{monthlyTotal.toLocaleString("en-IN")}
                            </td>

                            <td className="px-4 py-3 text-right font-bold text-[#003366]">
                              ₹{annualMonthlyTotal.toLocaleString("en-IN")}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </section>

                  {/* =================================================
                      FEE SUMMARY
                  ================================================= */}
                  <section>
                    <div className="rounded-lg border border-slate-200 bg-slate-50">
                      <div className="border-b border-slate-200 px-5 py-3">
                        <h3 className="font-bold text-slate-800">
                          Fee Summary
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                        <div className="p-5">
                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            One-Time Fees
                          </p>

                          <p className="mt-1 text-lg font-bold text-slate-800">
                            ₹{oneTimeTotal.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <div className="p-5">
                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            Annual Monthly Fees
                          </p>

                          <p className="mt-1 text-lg font-bold text-slate-800">
                            ₹{annualMonthlyTotal.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <div className="bg-white p-5">
                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            Total Annual Fee
                          </p>

                          <p className="mt-1 text-xl font-bold text-[#003366]">
                            ₹{grandTotal.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* =================================================
                      FOOTER / SIGNATURE
                  ================================================= */}
                  <div className="flex items-end justify-between pt-12">
                    <div>
                      <p className="text-xs text-slate-400">
                        Official Fee Structure
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Generated from School ERP
                      </p>
                    </div>

                    <div className="w-52 text-center">
                      <div className="mb-2 border-t border-slate-400" />

                      <p className="text-sm font-semibold text-slate-700">
                        Principal Signature
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PageContent>

      {/* =====================================================
          PRINT STYLES
      ===================================================== */}
    </PageLayout>
  );
};

export default FeeList;
