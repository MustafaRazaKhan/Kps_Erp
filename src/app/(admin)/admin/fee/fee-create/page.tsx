"use client";

import Button from "@/components/common/Button";
import FormContainer from "@/components/common/FormContainer";
import InputField from "@/components/common/InputField";
import PageContent from "@/components/common/PageContent";
import PageHeader from "@/components/common/PageHeader";
import PageLayout from "@/components/common/PageLayout";
import useFee from "@/store/admin/context/fee.context";
import { useState } from "react";

import { FaList, FaMoneyBillWave, FaSchool, FaBus } from "react-icons/fa";

/* ==========================================================
   Page Heading Configuration
========================================================== */

const heading = {
  name: "Create Fee Structure",
  subHeading: "Create monthly and one-time fee structure.",
  href: "/dashboard/admin/fee/fee-structure-list",
  btnHeading: "Fee Structure List",
  icon: <FaList />,
};

const FeeCreate = () => {
  /* ==========================================================
      Fee Groups
      Every school class belongs to one fee category.
  ========================================================== */

  const feeGroups = {
    "PNC-KG": ["pnc", "nc", "kg"],
    "I-V": ["i", "ii", "iii", "iv", "v"],
    "VI-VIII": ["vi", "vii", "viii"],
    "IX-XII": ["ix", "x", "xi", "xii"],
  } as const;

  type FeeCategory = keyof typeof feeGroups;

  /* ==========================================================
      Local UI State

      feeCategoryValue -> Selected Fee Group
      selectedClass    -> Selected Class
  ========================================================== */

  const [feeCategoryValue, setFeeCategoryValue] =
    useState<FeeCategory>("PNC-KG");

  const [selectedClass, setSelectedClass] = useState("");

  /* ==========================================================
      Fee Context
  ========================================================== */

  const {
    state,
    handleSubmit,
    handleMonthlyFeeChange,
    handleMonthSubmit,
    handleChange,
  } = useFee();

  return (
    <PageLayout>
      <PageHeader heading={heading} />

      <PageContent>
        {/* ======================================================
              Main Form
        ====================================================== */}

        <FormContainer
          onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) =>
            handleSubmit(e, feeCategoryValue)
          }
        >
          {/* ======================================================
                STEP 1
                Select Fee Group
          ====================================================== */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-800">
              Step 1 • Select Fee Group
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.keys(feeGroups).map((category) => (
                <label
                  key={category}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    feeCategoryValue === category
                      ? "border-rose-500 bg-rose-50"
                      : "border-gray-200 hover:border-rose-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="feeCategory"
                      value={category}
                      checked={feeCategoryValue === category}
                      onChange={(e) => {
                        setFeeCategoryValue(e.target.value as FeeCategory);

                        // Reset selected class whenever group changes
                        setSelectedClass("");
                      }}
                      className="h-5 w-5 accent-rose-500 uppercase"
                    />

                    <span className="font-medium text-gray-700">
                      {category}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* ======================================================
                STEP 2
                Select Class
          ====================================================== */}

          {feeCategoryValue && (
            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-800">
                Step 2 • Select Class
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {feeGroups[feeCategoryValue].map((cls) => (
                  <label
                    key={cls}
                    className={`cursor-pointer rounded-xl border p-4 transition-all uppercase ${
                      selectedClass === cls
                        ? "border-rose-500 bg-rose-50"
                        : "border-gray-200 hover:border-rose-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="className"
                        value={cls}
                        checked={selectedClass === cls}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="h-5 w-5 accent-rose-500"
                      />

                      <span className="font-medium">{cls}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================
                STEP 3
                Monthly Fee For Selected Class

                Example:
                Group  : PNC-KG
                Class  : NC

                Add:
                - Monthly Fee
                - Bus Fee

                Click "Add Fee"

                This creates one object and pushes it into
                state.monthList

                Example monthList

                [
                  {
                    className:"NC",
                    monthFee:1500,
                    busFee:500
                  }
                ]
          ====================================================== */}

          {selectedClass && (
            <div className="mt-8 rounded-2xl border border-rose-100 bg-white p-8 shadow-sm">
              <div className="mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Monthly Fee Details
                </h2>

                <p className="mt-1 text-gray-500">
                  {feeCategoryValue} /
                  <span className="font-semibold uppercase">
                    {" "}
                    {selectedClass}
                  </span>
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Monthly Fee */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Monthly Fee
                  </label>

                  <input
                    value={state.monthlyObj.monthFee}
                    onChange={handleMonthlyFeeChange}
                    name="monthFee"
                    type="number"
                    placeholder="₹ Enter Monthly Fee"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                  />
                </div>

                {/* Bus Fee */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Bus Fee
                  </label>

                  <input
                    value={state.monthlyObj.busFee}
                    onChange={handleMonthlyFeeChange}
                    name="busFee"
                    type="number"
                    placeholder="₹ Enter Bus Fee"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                  />
                </div>
              </div>

              {/* Add Monthly Fee Object */}

              <button
                className="my-4 rounded bg-red-500 px-8 py-2.5 text-white"
                onClick={(e) => handleMonthSubmit(e, selectedClass)}
              >
                Add Fee
              </button>
            </div>
          )}

          {/* ======================================================
                STEP 4
                Common Fees

                These fees are common for the entire fee group.

                Examples:
                Admission Fee
                Registration Fee
                Annual Fee
                Exam Fee
                Security Fee
          ====================================================== */}

          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-xl font-semibold text-gray-800">
              Fee Details
            </h3>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <InputField
                value={state.feeObj.admissionFee}
                onChange={(e) => handleChange(e)}
                name="admissionFee"
                label="Admission Fee"
                icon={<FaMoneyBillWave />}
                type="number"
                placeholder="Enter Admission Fee"
              />
              <InputField
                value={state.feeObj.registrationFee}
                onChange={(e) => handleChange(e)}
                name="registrationFee"
                label="Registration Fee"
                icon={<FaMoneyBillWave />}
                type="number"
                placeholder="Enter Registration Fee"
              />
              <InputField
                value={state.feeObj.annualFee}
                onChange={(e) => handleChange(e)}
                name="annualFee"
                label="Annual Fee"
                icon={<FaMoneyBillWave />}
                type="number"
                placeholder="Enter Annual Fee"
              />
              <InputField
                value={state.feeObj.examinationFee}
                onChange={(e) => handleChange(e)}
                name="examinationFee"
                label="Examination Fee"
                icon={<FaSchool />}
                type="number"
                placeholder="Enter Examination Fee"
              />

              <InputField
                value={state.feeObj.securityFee}
                onChange={(e) => handleChange(e)}
                name="securityFee"
                label="Security Fee"
                icon={<FaMoneyBillWave />}
                type="number"
                placeholder="Enter Security Fee"
              />
            </div>
          </div>

          {/* ======================================================
                Final Save Button
          ====================================================== */}

          <div className="mt-8">
            <Button />
          </div>
        </FormContainer>
      </PageContent>
    </PageLayout>
  );
};

export default FeeCreate;
