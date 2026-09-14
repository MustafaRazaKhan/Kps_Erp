"use client";

import { useEffect } from "react";

import useFee from "@/store/admin/context/fee.context";

import School from "@/components/common/School";
import PageLayout from "@/components/common/PageLayout";
import PageContent from "@/components/common/PageContent";

const ViewFeeList = () => {
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
        <h1 className="text-2xl font-bold text-slate-800">Fee Structure</h1>

        {/* =====================================================
            PRINTABLE AREA
        ===================================================== */}
        <div className="flex flex-wrap gap-4">
          {state.feeList.map((item: any) => {
            const oneTimeTotal =
              Number(item.admissionFee || 0) +
              Number(item.annualFee || 0) +
              Number(item.registrationFee || 0) +
              Number(item.examinationFee || 0) +
              Number(item.securityFee || 0);

            return (
              <div
                key={item._id}
                className="w-full overflow-hidden rounded border border-slate-200 bg-white shadow-sm md:w-[calc(50%-8px)] xl:w-[calc(33.333%-11px)]"
              >
                {/* Header */}
                <div className="border-b border-slate-200 p-4">
                  <School />

                  <div className="mt-3 border-t border-slate-100 pt-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Fee Structure
                        </p>

                        <h2 className="mt-1 text-lg font-bold text-slate-800">
                          Academic Fee Schedule
                        </h2>
                      </div>

                      <span className="shrink-0 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-[#003366]">
                        {item.feeCategoryValue}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-5 p-4">
                  {/* One-Time Fees */}
                  <section>
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">
                          One-Time Fees
                        </h3>

                        <p className="text-[10px] text-slate-500">
                          Admission & academic charges
                        </p>
                      </div>

                      <span className="text-sm font-bold text-[#003366]">
                        ₹{oneTimeTotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-slate-200">
                      <table className="w-full text-xs">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-3 py-2 text-left font-semibold text-slate-600">
                              Fee Type
                            </th>

                            <th className="px-3 py-2 text-right font-semibold text-slate-600">
                              Amount
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="px-3 py-2 text-slate-600">
                              Admission Fee
                            </td>

                            <td className="px-3 py-2 text-right font-medium">
                              ₹
                              {Number(item.admissionFee || 0).toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>

                          <tr>
                            <td className="px-3 py-2 text-slate-600">
                              Annual Fee
                            </td>

                            <td className="px-3 py-2 text-right font-medium">
                              ₹
                              {Number(item.annualFee || 0).toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>

                          <tr>
                            <td className="px-3 py-2 text-slate-600">
                              Registration Fee
                            </td>

                            <td className="px-3 py-2 text-right font-medium">
                              ₹
                              {Number(item.registrationFee || 0).toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>

                          <tr>
                            <td className="px-3 py-2 text-slate-600">
                              Examination Fee
                            </td>

                            <td className="px-3 py-2 text-right font-medium">
                              ₹
                              {Number(item.examinationFee || 0).toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>

                          <tr>
                            <td className="px-3 py-2 text-slate-600">
                              Security Fee
                            </td>

                            <td className="px-3 py-2 text-right font-medium">
                              ₹
                              {Number(item.securityFee || 0).toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>
                        </tbody>

                        <tfoot>
                          <tr className="border-t bg-slate-50">
                            <td className="px-3 py-2 font-bold text-slate-800">
                              Total
                            </td>

                            <td className="px-3 py-2 text-right font-bold text-[#003366]">
                              ₹{oneTimeTotal.toLocaleString("en-IN")}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </section>

                  {/* Monthly Fees */}
                  <section>
                    <div className="mb-2">
                      <h3 className="text-sm font-bold text-slate-800">
                        Class-wise Monthly Fees
                      </h3>

                      <p className="text-[10px] text-slate-500">
                        Tuition and transport charges
                      </p>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-slate-200">
                      <table className="w-full text-xs">
                        <thead className="bg-[#003366] text-white">
                          <tr>
                            <th className="px-2 py-2 text-left">#</th>
                            <th className="px-2 py-2 text-left">Class</th>
                            <th className="px-2 py-2 text-right">Monthly</th>
                            <th className="px-2 py-2 text-right">Bus</th>
                            <th className="px-2 py-2 text-right">Total</th>
                            <th className="px-2 py-2 text-right">Total year</th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                          {item.monthFeeList.map((fee: any, index: number) => {
                            const monthlyFee = Number(fee.monthFee || 0);
                            const busFee = Number(fee.busFee || 0);
                            const total = monthlyFee + busFee;

                            return (
                              <tr key={index} className="hover:bg-slate-50">
                                <td className="px-2 py-2 text-slate-400">
                                  {index + 1}
                                </td>

                                <td className="px-2 py-2 font-semibold uppercase text-slate-800">
                                  {fee.selectedClass}
                                </td>

                                <td className="px-2 py-2 text-right">
                                  ₹{monthlyFee.toLocaleString("en-IN")}
                                </td>

                                <td className="px-2 py-2 text-right">
                                  ₹{busFee.toLocaleString("en-IN")}
                                </td>

                                <td className="px-2 py-2 text-right font-bold text-[#003366]">
                                  ₹{total.toLocaleString("en-IN")}/Per month
                                </td>
                                <td className="px-2 py-2 text-right font-bold text-[#003366]">
                                  ₹{(total * 12).toLocaleString("en-IN")}/Per
                                  Year
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </section>
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

export default ViewFeeList;
