"use client";

import { useEffect } from "react";
import Link from "next/link";

import {
  FiBookOpen,
  FiCalendar,
  FiCreditCard,
  FiDollarSign,
  FiFileText,
  FiHash,
  FiLayers,
  FiNavigation,
  FiShield,
  FiTruck,
} from "react-icons/fi";

import useFee from "@/store/user/admin/context/fee.context";

import School from "@/components/common/School";
import PageLayout from "@/components/common/PageLayout";
import PageContent from "@/components/common/PageContent";

const formatCurrency = (value: any) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const FeeList = () => {
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

        <div className="mb-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100/70 text-blue-700">
              <FiCreditCard size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                Fee Structure
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Academic fees, tuition and transport fee schedules
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            FEE CARDS
        ===================================================== */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
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
                className="group overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* =================================================
                    CARD HEADER
                ================================================== */}

                <div className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-[#fffdf7] via-[#fffaf0] to-blue-50/60 px-5 py-5">
                  {/* Decorative circles */}

                  <div className="absolute -right-12 -top-16 h-36 w-36 rounded-full bg-blue-200/15" />

                  <div className="absolute -bottom-20 right-12 h-40 w-40 rounded-full bg-amber-200/15" />

                  <div className="relative">
                    <School />

                    <div className="mt-4 border-t border-blue-100/70 pt-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <FiFileText size={14} className="text-blue-600" />

                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600/70">
                              Fee Structure
                            </p>
                          </div>

                          <h2 className="mt-1.5 text-lg font-bold text-slate-800">
                            Academic Fee Schedule
                          </h2>
                        </div>

                        <span className="shrink-0 rounded-full border border-blue-100 bg-blue-100/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                          {item.feeGroup || "General"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    CARD CONTENT
                ================================================== */}

                <div className="space-y-6 p-5">
                  {/* =================================================
                      ONE TIME FEES
                  ================================================== */}

                  <section>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100/60 text-amber-700">
                          <FiDollarSign size={17} />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-slate-800">
                            One-Time Fees
                          </h3>

                          <p className="text-[10px] text-slate-400">
                            Admission & academic charges
                          </p>
                        </div>
                      </div>

                      <span className="text-sm font-bold text-blue-700">
                        {formatCurrency(oneTimeTotal)}
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-200/80">
                      <table className="w-full text-xs">
                        <thead className="bg-blue-50/50">
                          <tr>
                            <th className="px-3 py-2.5 text-left font-semibold text-slate-500">
                              Fee Type
                            </th>

                            <th className="px-3 py-2.5 text-right font-semibold text-slate-500">
                              Amount
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                          <tr className="transition hover:bg-amber-50/30">
                            <td className="px-3 py-2.5 text-slate-600">
                              Admission Fee
                            </td>

                            <td className="px-3 py-2.5 text-right font-semibold text-slate-700">
                              {formatCurrency(item.admissionFee)}
                            </td>
                          </tr>

                          <tr className="transition hover:bg-amber-50/30">
                            <td className="px-3 py-2.5 text-slate-600">
                              Annual Fee
                            </td>

                            <td className="px-3 py-2.5 text-right font-semibold text-slate-700">
                              {formatCurrency(item.annualFee)}
                            </td>
                          </tr>

                          <tr className="transition hover:bg-amber-50/30">
                            <td className="px-3 py-2.5 text-slate-600">
                              Registration Fee
                            </td>

                            <td className="px-3 py-2.5 text-right font-semibold text-slate-700">
                              {formatCurrency(item.registrationFee)}
                            </td>
                          </tr>

                          <tr className="transition hover:bg-amber-50/30">
                            <td className="px-3 py-2.5 text-slate-600">
                              Examination Fee
                            </td>

                            <td className="px-3 py-2.5 text-right font-semibold text-slate-700">
                              {formatCurrency(item.examinationFee)}
                            </td>
                          </tr>

                          <tr className="transition hover:bg-amber-50/30">
                            <td className="px-3 py-2.5 text-slate-600">
                              Security Fee
                            </td>

                            <td className="px-3 py-2.5 text-right font-semibold text-slate-700">
                              {formatCurrency(item.securityFee)}
                            </td>
                          </tr>
                        </tbody>

                        <tfoot>
                          <tr className="border-t border-blue-100 bg-blue-50/40">
                            <td className="px-3 py-2.5 font-bold text-slate-800">
                              Total
                            </td>

                            <td className="px-3 py-2.5 text-right font-bold text-blue-700">
                              {formatCurrency(oneTimeTotal)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </section>

                  {/* =================================================
                      MONTHLY FEES
                  ================================================== */}

                  <section>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100/60 text-blue-700">
                        <FiCalendar size={17} />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-800">
                          Class-wise Monthly Fees
                        </h3>

                        <p className="text-[10px] text-slate-400">
                          Tuition and transport charges
                        </p>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200/80">
                      <table className="w-full min-w-[570px] text-xs">
                        <thead className="bg-blue-50/70">
                          <tr>
                            <th className="px-2 py-2.5 text-left font-bold text-blue-800/80">
                              #
                            </th>

                            <th className="px-2 py-2.5 text-left font-bold text-blue-800/80">
                              Class
                            </th>

                            <th className="px-2 py-2.5 text-right font-bold text-blue-800/80">
                              Monthly
                            </th>

                            <th className="px-2 py-2.5 text-right font-bold text-blue-800/80">
                              Bus
                            </th>

                            <th className="px-2 py-2.5 text-right font-bold text-blue-800/80">
                              Total
                            </th>

                            <th className="px-2 py-2.5 text-right font-bold text-blue-800/80">
                              Year
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                          {item.monthFeeList?.map((fee: any, index: number) => {
                            const monthlyFee = Number(fee.monthFee || 0);

                            const busFee = Number(fee.busFee || 0);

                            const total = monthlyFee + busFee;

                            return (
                              <tr
                                key={index}
                                className="transition hover:bg-blue-50/30"
                              >
                                <td className="px-2 py-2.5 text-slate-400">
                                  {index + 1}
                                </td>

                                <td className="px-2 py-2.5 font-bold uppercase text-slate-800">
                                  {fee.selectedClass}
                                </td>

                                <td className="px-2 py-2.5 text-right text-slate-600">
                                  {formatCurrency(monthlyFee)}
                                </td>

                                <td className="px-2 py-2.5 text-right text-slate-600">
                                  {formatCurrency(busFee)}
                                </td>

                                <td className="px-2 py-2.5 text-right">
                                  <span className="font-bold text-blue-700">
                                    {formatCurrency(total)}
                                  </span>

                                  <span className="ml-1 text-[9px] text-slate-400">
                                    /mo
                                  </span>
                                </td>

                                <td className="px-2 py-2.5 text-right">
                                  <span className="font-bold text-slate-700">
                                    {formatCurrency(total * 12)}
                                  </span>

                                  <span className="ml-1 text-[9px] text-slate-400">
                                    /yr
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* =================================================
                      QUICK SUMMARY
                  ================================================== */}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3">
                      <div className="flex items-center gap-2">
                        <FiLayers className="text-blue-600" size={14} />

                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Classes
                        </span>
                      </div>

                      <p className="mt-1 text-base font-bold text-slate-800">
                        {item.monthFeeList?.length || 0}
                      </p>
                    </div>

                    <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-3">
                      <div className="flex items-center gap-2">
                        <FiCreditCard className="text-amber-700" size={14} />

                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          One-Time Total
                        </span>
                      </div>

                      <p className="mt-1 text-base font-bold text-slate-800">
                        {formatCurrency(oneTimeTotal)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    FOOTER / ACTION
                ================================================== */}

                <div className="border-t border-slate-100 bg-slate-50/50 p-4">
                  <Link
                    href={`/admin/fee/admin-view-fee-detail/${item._id}`}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-2.5 text-sm font-semibold text-blue-700 transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <FiFileText size={16} />
                    View Fee Details
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {!state.feeList?.length && (
          <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/30 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100/60 text-blue-600">
              <FiFileText size={24} />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-800">
              No Fee Structure Found
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              There are currently no fee structures available.
            </p>
          </div>
        )}
      </PageContent>
    </PageLayout>
  );
};

export default FeeList;
