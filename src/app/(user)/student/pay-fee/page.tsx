"use client";

import React from "react";

import FormContainer from "@/components/common/FormContainer";
import InputField from "@/components/common/InputField";
import PageContent from "@/components/common/PageContent";
import PageLayout from "@/components/common/PageLayout";
import Row from "@/components/common/Row";
import { useStudentPortal } from "@/store/user/student/context/student-portal.context";
import { useSession } from "next-auth/react";

const months = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];

const PayFee = () => {
  const { data } = useSession();
  console.log(data);
  const userId = (data?.user as any)?.id;
  const {
    state,
    handleFeePayChange,
    handleFeePayMonthChange,
    handleFeePaySubmit,
  } = useStudentPortal();

  const { feePayment } = state;

  return (
    <PageLayout>
      <PageContent>
        <FormContainer onSubmit={(e: any) => handleFeePaySubmit(e, userId)}>
          {/* =====================================================
              HEADER
          ====================================================== */}

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              Add Fee Installment
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Submit your fee payment details for admin verification.
            </p>
          </div>

          {/* =====================================================
              TRANSACTION INFORMATION
          ====================================================== */}

          <Row>
            <InputField
              name="transactionId"
              label="Transaction ID"
              value={feePayment.transactionId}
              onChange={handleFeePayChange}
              placeholder="Enter transaction ID"
              type="text"
              required
            />

            <InputField
              name="paymentDateTime"
              label="Payment Date & Time"
              value={feePayment.paymentDateTime}
              onChange={handleFeePayChange}
              type="datetime-local"
            />
          </Row>

          {/* =====================================================
              FEE TYPE
          ====================================================== */}

          <div className="mt-6">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Fee Type
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Tuition Fee */}

              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                  feePayment.feeType === "tuition"
                    ? "border-[#ff0066] bg-pink-50"
                    : "border-slate-200 bg-white hover:border-pink-200"
                }`}
              >
                <input
                  type="radio"
                  name="feeType"
                  value="tuition"
                  checked={feePayment.feeType === "tuition"}
                  onChange={handleFeePayChange}
                  className="h-4 w-4 accent-[#ff0066]"
                />

                <div>
                  <p className="font-semibold text-slate-800">Tuition Fee</p>

                  <p className="text-sm text-slate-500">Monthly academic fee</p>
                </div>
              </label>

              {/* Transport Fee */}

              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                  feePayment.feeType === "transport"
                    ? "border-[#ff0066] bg-pink-50"
                    : "border-slate-200 bg-white hover:border-pink-200"
                }`}
              >
                <input
                  type="radio"
                  name="feeType"
                  value="transport"
                  checked={feePayment.feeType === "transport"}
                  onChange={handleFeePayChange}
                  className="h-4 w-4 accent-[#ff0066]"
                />

                <div>
                  <p className="font-semibold text-slate-800">Transport Fee</p>

                  <p className="text-sm text-slate-500">
                    School transportation fee
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* =====================================================
              FEE MONTHS
          ====================================================== */}

          <div className="mt-6">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Select Fee Months
            </label>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {months.map((month) => {
                const selected = feePayment.feeMonths.includes(month);

                return (
                  <label
                    key={month}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      selected
                        ? "border-[#ff0066] bg-pink-50"
                        : "border-slate-200 bg-white hover:border-pink-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => handleFeePayMonthChange(month)}
                      className="h-4 w-4 accent-[#ff0066]"
                    />

                    <span className="text-sm font-medium text-slate-700">
                      {month}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              PAYMENT MODE
          ====================================================== */}

          <div className="mt-6">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Payment Mode
            </label>

            <div className="flex flex-wrap gap-4">
              {["upi", "bank_transfer", "cash"].map((mode) => (
                <label
                  key={mode}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="paymentMode"
                    value={mode}
                    checked={feePayment.paymentMode === mode}
                    onChange={handleFeePayChange}
                    className="h-4 w-4 accent-[#ff0066]"
                  />

                  <span className="text-sm capitalize text-slate-700">
                    {mode.replace("_", " ")}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* =====================================================
              SELECTED SUMMARY
          ====================================================== */}

          {feePayment.feeMonths.length > 0 && (
            <div className="mt-6 rounded-xl bg-pink-50 p-5">
              <p className="text-sm font-semibold text-slate-700">
                Selected Fee Period
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {feePayment.feeMonths.map((month) => (
                  <span
                    key={month}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#ff0066]"
                  >
                    {month}
                  </span>
                ))}
              </div>

              <div className="mt-4 border-t border-pink-200 pt-4">
                <p className="text-sm font-semibold text-slate-700">Fee Type</p>

                <span className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium capitalize text-slate-700">
                  {feePayment.feeType
                    ? feePayment.feeType.replace("_", " ")
                    : "Not selected"}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-700">
                  Payment Mode
                </p>

                <span className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium capitalize text-slate-700">
                  {feePayment.paymentMode
                    ? feePayment.paymentMode.replace("_", " ")
                    : "Not selected"}
                </span>
              </div>
            </div>
          )}

          {/* =====================================================
              REMARKS
          ====================================================== */}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Remarks
            </label>

            <textarea
              name="remarks"
              value={feePayment.remarks}
              onChange={handleFeePayChange}
              rows={4}
              placeholder="Any additional information..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#ff0066] focus:ring-2 focus:ring-pink-100"
            />
          </div>

          {/* =====================================================
              SUBMIT
          ====================================================== */}

          <button
            type="submit"
            disabled={state.loading}
            className="mt-8 rounded-xl bg-[#ff0066] px-7 py-3 font-semibold text-white transition hover:scale-[1.02] hover:bg-[#e6005c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state.loading ? "Submitting..." : "Submit Fee Payment"}
          </button>

          {/* =====================================================
              RESPONSE
          ====================================================== */}

          {state.error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {state.error}
            </p>
          )}

          {state.success && (
            <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
              {state.success}
            </p>
          )}
        </FormContainer>
      </PageContent>
    </PageLayout>
  );
};

export default PayFee;
