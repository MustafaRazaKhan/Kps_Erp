"use client";

import { useState } from "react";
import { FaList, FaMoneyBillWave, FaSchool } from "react-icons/fa";

import Button from "@/components/common/Button";
import FormContainer from "@/components/common/FormContainer";
import InputField from "@/components/common/InputField";
import PageContent from "@/components/common/PageContent";
import PageHeader from "@/components/common/PageHeader";
import PageLayout from "@/components/common/PageLayout";
import useFee from "@/store/user/admin/context/fee.context";
import { FaIndianRupeeSign } from "react-icons/fa6";

const feeGroups = {
  "PNC-KG": ["pnc", "nc", "kg"],
  "I-V": ["i", "ii", "iii", "iv", "v"],
  "VI-VIII": ["vi", "vii", "viii"],
  "IX-XII": ["ix", "x", "xi", "xii"],
} as const;

const pageHeading = {
  name: "Create Fee Structure",
  subHeading: "Create monthly and one-time fee structure.",
  href: "/admin/fee/fee-list",
  btnHeading: "Fee Structure List",
  icon: <FaIndianRupeeSign />,
};

const FeeCreate = () => {
  const [feeGroup, setFeeGroup] = useState<keyof typeof feeGroups>("PNC-KG");
  const [selectedClass, setSelectedClass] = useState("");

  const {
    state,
    handleSubmit,
    handleMonthlyFeeChange,
    handleMonthSubmit,
    handleChange,
  } = useFee();

  const classes = feeGroups[feeGroup];

  const handleGroupChange = (group: keyof typeof feeGroups) => {
    setFeeGroup(group);
    setSelectedClass("");
  };

  return (
    <PageLayout>
      <PageHeader heading={pageHeading} />

      <PageContent>
        <FormContainer
          onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) =>
            handleSubmit(e, feeGroup)
          }
        >
          {/* ==================== FEE GROUP ==================== */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-gray-800">
              Select Fee Group
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.keys(feeGroups).map((group) => {
                const currentGroup = group as keyof typeof feeGroups;

                return (
                  <label
                    key={group}
                    className={` rounded-xl border p-4 transition ${
                      feeGroup === currentGroup
                        ? "border-rose-500 bg-rose-50"
                        : "border-gray-200 hover:border-rose-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="feeGroup"
                        value={group}
                        checked={feeGroup === currentGroup}
                        onChange={() => handleGroupChange(currentGroup)}
                        className="h-5 w-5 accent-rose-500"
                      />

                      <span className="font-medium text-gray-700">{group}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          {/* ==================== CLASS ==================== */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-gray-800">
              Select Class
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {classes.map((className) => (
                <label
                  key={className}
                  className={` rounded-xl border p-4 transition ${
                    selectedClass === className
                      ? "border-rose-500 bg-rose-50"
                      : "border-gray-200 hover:border-rose-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="class"
                      value={className}
                      checked={selectedClass === className}
                      onChange={() => setSelectedClass(className)}
                      className="h-5 w-5 accent-rose-500"
                    />

                    <span className="font-medium uppercase text-gray-700">
                      {className}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* ==================== MONTHLY FEE ==================== */}
          {selectedClass && (
            <section className="mt-6 rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Monthly Fee
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {feeGroup} /{" "}
                  <span className="font-semibold uppercase text-gray-700">
                    {selectedClass}
                  </span>
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {/* Monthly Fee */}
                <div>
                  <label
                    htmlFor="monthFee"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Monthly Fee
                  </label>

                  <input
                    id="monthFee"
                    name="monthFee"
                    type="number"
                    min="0"
                    value={state.monthlyObj.monthFee}
                    onChange={handleMonthlyFeeChange}
                    placeholder="Enter Monthly Fee"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                  />
                </div>

                {/* Bus Fee */}
                <div>
                  <label
                    htmlFor="busFee"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Bus Fee
                  </label>

                  <input
                    id="busFee"
                    name="busFee"
                    type="number"
                    min="0"
                    value={state.monthlyObj.busFee}
                    onChange={handleMonthlyFeeChange}
                    placeholder="Enter Bus Fee"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => handleMonthSubmit(e, selectedClass)}
                className="mt-5 rounded-xl bg-rose-500 px-8 py-3 font-medium text-white transition hover:bg-rose-600"
              >
                Add Class Fee
              </button>
            </section>
          )}

          {/* ==================== ADDED MONTHLY FEES ==================== */}
          {state?.monthList?.length > 0 && (
            <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              {/* Header */}
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Added Monthly Fees
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Review the monthly fees added for each class.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600">
                  {state.monthList.length}{" "}
                  {state.monthList.length === 1 ? "Class" : "Classes"}
                </span>
              </div>

              {/* Fee Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {state.monthList.map((fee, index) => {
                  const monthlyFee = Number(fee.monthFee) || 0;
                  const busFee = Number(fee.busFee) || 0;
                  const total = monthlyFee + busFee;

                  return (
                    <div
                      key={`${fee.selectedClass}-${index}`}
                      className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:border-rose-200 hover:bg-white hover:shadow-md"
                    >
                      {/* Card Header */}
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                            Class
                          </p>

                          <h3 className="mt-1 text-xl font-bold uppercase text-gray-800">
                            {fee.selectedClass}
                          </h3>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-sm font-bold text-rose-600">
                          {index + 1}
                        </div>
                      </div>

                      {/* Fee Details */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
                          <span className="text-sm text-gray-500">
                            Monthly Fee
                          </span>

                          <span className="font-semibold text-gray-800">
                            ₹{monthlyFee.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
                          <span className="text-sm text-gray-500">Bus Fee</span>

                          <span className="font-semibold text-gray-800">
                            ₹{busFee.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                        <span className="text-sm font-medium text-gray-500">
                          Total Monthly
                        </span>

                        <span className="text-lg font-bold text-rose-600">
                          ₹{total.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ==================== OTHER FEES ==================== */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Other Fees
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add one-time fees for this fee structure.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <InputField
                name="admissionFee"
                label="Admission Fee"
                icon={<FaMoneyBillWave />}
                type="number"
                placeholder="Enter Admission Fee"
                value={state.feeObj.admissionFee}
                onChange={handleChange}
              />

              <InputField
                name="registrationFee"
                label="Registration Fee"
                icon={<FaMoneyBillWave />}
                type="number"
                placeholder="Enter Registration Fee"
                value={state.feeObj.registrationFee}
                onChange={handleChange}
              />

              <InputField
                name="annualFee"
                label="Annual Fee"
                icon={<FaMoneyBillWave />}
                type="number"
                placeholder="Enter Annual Fee"
                value={state.feeObj.annualFee}
                onChange={handleChange}
              />

              <InputField
                name="examinationFee"
                label="Examination Fee"
                icon={<FaSchool />}
                type="number"
                placeholder="Enter Examination Fee"
                value={state.feeObj.examinationFee}
                onChange={handleChange}
              />

              <InputField
                name="securityFee"
                label="Security Fee"
                icon={<FaMoneyBillWave />}
                type="number"
                placeholder="Enter Security Fee"
                value={state.feeObj.securityFee}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* ==================== SAVE ==================== */}
          <div className="mt-6">
            <Button title="Create Fee" />
          </div>
        </FormContainer>
      </PageContent>
    </PageLayout>
  );
};

export default FeeCreate;
