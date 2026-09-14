"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import useFee from "@/store/admin/context/fee.context";

import School from "@/components/common/School";
import PageLayout from "@/components/common/PageLayout";
import PageContent from "@/components/common/PageContent";

const FeeDetails = () => {
  const params = useParams();
  const id = params.id as string;

  const { state, feeDetails } = useFee();

  useEffect(() => {
    if (id) {
      feeDetails(id);
    }
  }, [id]);

  const fee = state.feeDetails;

  if (state.loading) {
    return (
      <PageLayout>
        <PageContent>
          <div className="py-10 text-center text-sm text-slate-500">
            Loading fee details...
          </div>
        </PageContent>
      </PageLayout>
    );
  }

  if (!fee) {
    return (
      <PageLayout>
        <PageContent>
          <div className="py-10 text-center text-red-500">
            Fee structure not found.
          </div>
        </PageContent>
      </PageLayout>
    );
  }

  const oneTimeTotal =
    Number(fee.admissionFee || 0) +
    Number(fee.annualFee || 0) +
    Number(fee.registrationFee || 0) +
    Number(fee.examinationFee || 0) +
    Number(fee.securityFee || 0);

  return (
    <PageLayout>
      <PageContent>
        {/* Print Button */}
        <div className="mb-4 flex justify-end print:hidden">
          <button
            onClick={() => window.print()}
            className="rounded bg-[#003366] px-4 py-2 text-sm font-semibold text-white"
          >
            Print Fee Structure
          </button>
        </div>

        {/* ================= PRINT DOCUMENT ================= */}
        <div className="fee-document mx-auto w-full bg-white text-slate-800">
          {/* ================= SCHOOL HEADER ================= */}
          <div className="border-b-2 border-[#003366] px-4 py-3">
            <School />
          </div>

          {/* ================= TITLE ================= */}
          <div className="flex items-center justify-between border-b border-slate-300 px-4 py-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Fee Structure
              </p>

              <h1 className="text-xl font-bold text-[#003366]">
                Academic Fee Schedule
              </h1>
            </div>

            <div className="border border-[#003366] px-3 py-1 text-sm font-bold text-[#003366]">
              {fee.feeCategoryValue}
            </div>
          </div>

          {/* ================= ONE TIME FEES ================= */}
          <section className="px-4 pt-4">
            <div className="mb-2 flex items-end justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#003366]">
                  1. One-Time Fees
                </h2>

                <p className="text-[10px] text-slate-500">
                  Admission & academic charges
                </p>
              </div>

              <span className="text-sm font-bold text-[#003366]">
                ₹{oneTimeTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-3 py-2 text-left">
                    Fee Type
                  </th>

                  <th className="border border-slate-300 px-3 py-2 text-right">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border border-slate-300 px-3 py-1.5">
                    Admission Fee
                  </td>

                  <td className="border border-slate-300 px-3 py-1.5 text-right">
                    ₹{Number(fee.admissionFee || 0).toLocaleString("en-IN")}
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-300 px-3 py-1.5">
                    Annual Fee
                  </td>

                  <td className="border border-slate-300 px-3 py-1.5 text-right">
                    ₹{Number(fee.annualFee || 0).toLocaleString("en-IN")}
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-300 px-3 py-1.5">
                    Registration Fee
                  </td>

                  <td className="border border-slate-300 px-3 py-1.5 text-right">
                    ₹{Number(fee.registrationFee || 0).toLocaleString("en-IN")}
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-300 px-3 py-1.5">
                    Examination Fee
                  </td>

                  <td className="border border-slate-300 px-3 py-1.5 text-right">
                    ₹{Number(fee.examinationFee || 0).toLocaleString("en-IN")}
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-300 px-3 py-1.5">
                    Security Fee
                  </td>

                  <td className="border border-slate-300 px-3 py-1.5 text-right">
                    ₹{Number(fee.securityFee || 0).toLocaleString("en-IN")}
                  </td>
                </tr>

                <tr className="bg-slate-100 font-bold">
                  <td className="border border-slate-300 px-3 py-2">
                    Total One-Time Fees
                  </td>

                  <td className="border border-slate-300 px-3 py-2 text-right text-[#003366]">
                    ₹{oneTimeTotal.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* ================= MONTHLY FEES ================= */}
          <section className="px-4 pt-5">
            <div className="mb-2">
              <h2 className="text-sm font-bold text-[#003366]">
                2. Class-wise Monthly Fees
              </h2>

              <p className="text-[10px] text-slate-500">
                Tuition and transport charges
              </p>
            </div>

            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#003366] text-white">
                  <th className="border border-[#003366] px-2 py-2">#</th>

                  <th className="border border-[#003366] px-2 py-2 text-left">
                    Class
                  </th>

                  <th className="border border-[#003366] px-2 py-2 text-right">
                    Monthly
                  </th>

                  <th className="border border-[#003366] px-2 py-2 text-right">
                    Bus
                  </th>

                  <th className="border border-[#003366] px-2 py-2 text-right">
                    Monthly Total
                  </th>

                  <th className="border border-[#003366] px-2 py-2 text-right">
                    Annual Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {fee.monthFeeList?.map((item: any, index: number) => {
                  const monthly = Number(item.monthFee || 0);
                  const bus = Number(item.busFee || 0);
                  const total = monthly + bus;

                  return (
                    <tr key={item._id || index}>
                      <td className="border border-slate-300 px-2 py-1.5 text-center">
                        {index + 1}
                      </td>

                      <td className="border border-slate-300 px-2 py-1.5 font-semibold uppercase">
                        {item.selectedClass}
                      </td>

                      <td className="border border-slate-300 px-2 py-1.5 text-right">
                        ₹{monthly.toLocaleString("en-IN")}
                      </td>

                      <td className="border border-slate-300 px-2 py-1.5 text-right">
                        ₹{bus.toLocaleString("en-IN")}
                      </td>

                      <td className="border border-slate-300 px-2 py-1.5 text-right font-semibold">
                        ₹{total.toLocaleString("en-IN")}
                      </td>

                      <td className="border border-slate-300 px-2 py-1.5 text-right font-semibold">
                        ₹{(total * 12).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          {/* ================= SIGNATURE ================= */}
          <div className="mt-12 grid grid-cols-2 px-8 pb-8">
            <div>
              <div className="w-40 border-t border-slate-400 pt-1 text-center text-xs">
                Date
              </div>
            </div>

            <div>
              <div className="ml-auto w-48 border-t border-slate-400 pt-1 text-center text-xs font-semibold">
                Principal Signature
              </div>
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="border-t border-slate-200 py-2 text-center text-[9px] text-slate-400">
            This is a computer-generated fee structure document.
          </div>
        </div>
      </PageContent>

      {/* ================= PRINT CSS ================= */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }

          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .fee-document {
            width: 100% !important;
            border: 0 !important;
            box-shadow: none !important;
          }

          table {
            page-break-inside: auto;
          }

          tr {
            page-break-inside: avoid;
          }

          section {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </PageLayout>
  );
};

export default FeeDetails;
