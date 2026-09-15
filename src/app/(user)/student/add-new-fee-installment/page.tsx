"use client";

import React, { useState } from "react";

import FormContainer from "@/components/common/FormContainer";
import InputField from "@/components/common/InputField";
import PageContent from "@/components/common/PageContent";
import PageLayout from "@/components/common/PageLayout";
import Row from "@/components/common/Row";

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

const AddNewFeeInstallMent = () => {
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const [feeTypes, setFeeTypes] = useState({
    tuition: true,
    transport: false,
  });

  const [formData, setFormData] = useState({
    transactionId: "",
    paymentDate: "",
    paymentMode: "upi",
    remarks: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonths((prev) => {
      if (prev.includes(month)) {
        return prev.filter((item) => item !== month);
      }

      return [...prev, month];
    });
  };

  const handleFeeTypeChange = (type: "tuition" | "transport") => {
    setFeeTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.transactionId.trim()) {
      alert("Please enter transaction ID");
      return;
    }

    if (selectedMonths.length === 0) {
      alert("Please select fee months");
      return;
    }

    if (!feeTypes.tuition && !feeTypes.transport) {
      alert("Please select at least one fee type");
      return;
    }

    const payload = {
      ...formData,

      months: selectedMonths,

      feeTypes: {
        tuition: feeTypes.tuition,
        transport: feeTypes.transport,
      },

      paymentDate: formData.paymentDate || new Date().toISOString(),
    };

    console.log("Fee Payment Payload:", payload);

    // API call will go here
  };

  return (
    <PageLayout>
      <PageContent>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900">
                Add Fee Installment
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Submit your fee payment details for admin verification.
              </p>
            </div>

            {/* Transaction Information */}
            <Row>
              <InputField
                name="transactionId"
                label="Transaction ID"
                value={formData.transactionId}
                onChange={handleChange}
                placeholder="Enter transaction ID"
                type="text"
              />

              <InputField
                name="paymentDate"
                label="Payment Date & Time"
                value={formData.paymentDate}
                onChange={handleChange}
                type="datetime-local"
              />
            </Row>

            {/* Fee Type */}
            <div className="mt-6">
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Fee Type
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Tuition Fee */}
                <label
                  className={`flex items-center gap-3 rounded-xl border p-4 transition ${
                    feeTypes.tuition
                      ? "border-[#ff0066] bg-pink-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={feeTypes.tuition}
                    onChange={() => handleFeeTypeChange("tuition")}
                    className="h-4 w-4 accent-[#ff0066]"
                  />

                  <div>
                    <p className="font-semibold text-slate-800">Tuition Fee</p>

                    <p className="text-sm text-slate-500">
                      Monthly academic fee
                    </p>
                  </div>
                </label>

                {/* Transport Fee */}
                <label
                  className={`flex  items-center gap-3 rounded-xl border p-4 transition ${
                    feeTypes.transport
                      ? "border-[#ff0066] bg-pink-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={feeTypes.transport}
                    onChange={() => handleFeeTypeChange("transport")}
                    className="h-4 w-4 accent-[#ff0066]"
                  />

                  <div>
                    <p className="font-semibold text-slate-800">
                      Transport Fee
                    </p>

                    <p className="text-sm text-slate-500">
                      School transportation fee
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Fee Months */}
            <div className="mt-6">
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Select Fee Months
              </label>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {months.map((month) => (
                  <label
                    key={month}
                    className={`flex  items-center gap-3 rounded-xl border p-4 transition ${
                      selectedMonths.includes(month)
                        ? "border-[#ff0066] bg-pink-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedMonths.includes(month)}
                      onChange={() => handleMonthChange(month)}
                      className="h-4 w-4 accent-[#ff0066]"
                    />

                    <span className="text-sm font-medium text-slate-700">
                      {month}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Mode */}
            <div className="mt-6">
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Payment Mode
              </label>

              <div className="flex flex-wrap gap-4">
                {["upi", "bank_transfer", "cash"].map((mode) => (
                  <label key={mode} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMode"
                      value={mode}
                      checked={formData.paymentMode === mode}
                      onChange={handleChange}
                      className="accent-[#ff0066]"
                    />

                    <span className="text-sm capitalize">
                      {mode.replace("_", " ")}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Selected Summary */}
            {selectedMonths.length > 0 && (
              <div className="mt-6 rounded-xl bg-pink-50 p-5">
                <p className="text-sm font-semibold text-slate-700">
                  Selected Fee Period
                </p>

                <p className="mt-2 text-sm text-[#ff0066]">
                  {selectedMonths.join(" • ")}
                </p>

                <div className="mt-4 border-t border-pink-200 pt-4">
                  <p className="text-sm font-semibold text-slate-700">
                    Fee Types
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {feeTypes.tuition && (
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700">
                        Tuition Fee
                      </span>
                    )}

                    {feeTypes.transport && (
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700">
                        Transport Fee
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Remarks */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Remarks
              </label>

              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows={4}
                placeholder="Any additional information..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#ff0066]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-8 rounded-xl bg-[#ff0066] px-7 py-3 font-semibold text-white transition hover:scale-105"
            >
              Submit Fee Payment
            </button>
          </form>
        </FormContainer>
      </PageContent>
    </PageLayout>
  );
};

export default AddNewFeeInstallMent;
