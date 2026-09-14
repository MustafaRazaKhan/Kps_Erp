"use client";

import { useEffect, useState } from "react";

// import { LayoutPanelTop } from "lucide-react";
import { FiUser, FiUpload, FiHash, FiCalendar, FiShield } from "react-icons/fi";
import { useParams } from "next/navigation";
import { useStudent } from "@/store/admin/context/student.context";
import useClass from "@/store/admin/context/class.context";
import PageLayout from "@/components/common/PageLayout";
import PageContent from "@/components/common/PageContent";
import PageHeader from "@/components/common/PageHeader";
import FormContainer from "@/components/common/FormContainer";
import { FaPersonArrowDownToLine, FaPhotoFilm } from "react-icons/fa6";
import InputField from "@/components/common/InputField";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import SectionCard from "@/components/common/SectionCard";
import Row from "@/components/common/Row";
import { TbDetails } from "react-icons/tb";
import { FaBus, FaRupeeSign, FaSchool } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { RiParentFill } from "react-icons/ri";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { useTransport } from "@/store/admin/context/transport.context";

/* ================= HEADING ================= */

const heading = {
  name: "Create Student Profile",
  subHeading: "Add and manage student details.",
  href: "/dashboard/admin/student/student-list",
  btnHeading: "Student List",
  icon: <PiStudent />,
};

/* ================= COMPONENT ================= */

const ProfileCreate = () => {
  const [transport, setTransport] = useState("");
  const {
    state: { transportList },
  } = useTransport();
  const {
    state: { studentObj },
    handleChange,
    handleFileChange,
    handleSubmit,
  } = useStudent();

  const params = useParams();
  const id = params?.id as string;
  // console.log(params);

  const { state, classList } = useClass();

  useEffect(() => {
    classList();
  }, []);

  const formData = studentObj;
  console.log(formData.feeGroup);
  // console.log(transport);

  return (
    <PageLayout>
      <PageHeader heading={heading} />
      <PageContent>
        <FormContainer onSubmit={(e) => handleSubmit(e, id)}>
          {/* ================= STUDENT INFO ================= */}

          {/* general details */}

          <SectionCard title="General Details" icon={<TbDetails />}>
            {/* first section row of sr no and session */}
            <Row>
              <InputField
                name="srNo"
                label="SR No"
                icon={<FiHash />}
                value={formData.srNo}
                onChange={handleChange}
                type="number"
              />
              <Select
                name="session"
                label="Session"
                value={formData.session}
                onChange={handleChange}
                options={["2026-27", "2027-28", "2028-29"]}
              />
              <div className=" flex-1/2 flex flex-col mt-1">
                <label className="mb-1.5 block text-sm font-medium text-slate-700 mt-1">
                  Class & Section
                </label>

                <select
                  name="classId"
                  value={formData.classId}
                  onChange={handleChange}
                  className="border border-gray-200 w-full px-2 py-2 rounded"
                >
                  <option value="">Class & Section</option>

                  {state.classList.map((curEle) => (
                    <option key={curEle._id} value={curEle._id}>
                      {curEle.name} - {curEle.section}
                    </option>
                  ))}
                </select>
              </div>
            </Row>
            <Row>
              <InputField
                name="firstName"
                label="First Name"
                icon={<FiUser />}
                value={formData.firstName}
                onChange={handleChange}
              />
            </Row>
          </SectionCard>

          {/* stdeunt details section */}

          <SectionCard icon={<PiStudent />} title="Student Details">
            {/* frist row start */}
            <Row>
              <InputField
                name="firstName"
                label="First Name"
                icon={<FiUser />}
                value={formData.firstName}
                onChange={handleChange}
              />
              <InputField
                name="lastName"
                label="Last Name"
                icon={<FiUser />}
                value={formData.lastName}
                onChange={handleChange}
              />
              <InputField
                name="dob"
                label="Date of Birth"
                type="date"
                icon={<FiCalendar />}
                value={formData.dob}
                onChange={handleChange}
              />
            </Row>
            {/* first row end */}

            {/* second row start */}
            <Row>
              <Select
                name="gender"
                label="Gender"
                value={formData.gender}
                onChange={handleChange}
                options={["Male", "Female", "Other"]}
              />
              <InputField
                name="dobInWords"
                label="DOB In Words"
                value={formData.dobInWords}
                onChange={handleChange}
              />
              <InputField
                name="dob"
                label="Date of Birth"
                type="date"
                icon={<FiCalendar />}
                value={formData.dob}
                onChange={handleChange}
              />
            </Row>

            {/* second row end */}

            <Row>
              <InputField
                name="age"
                label="Age"
                value={formData.age}
                onChange={handleChange}
              />

              <Select
                name="bloodGroup"
                label="Blood Group"
                value={formData.bloodGroup}
                onChange={handleChange}
                options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
              />

              <InputField
                name="religion"
                label="Religion"
                icon={<FiShield />}
                value={formData.religion}
                onChange={handleChange}
              />
            </Row>
          </SectionCard>

          {/* personal details */}
          <SectionCard
            icon={<FaPersonArrowDownToLine />}
            title="Personal Details"
          >
            <Row>
              <InputField
                name="casteCategory"
                label="Caste Category"
                icon={<FiShield />}
                value={formData.casteCategory}
                onChange={handleChange}
              />

              <InputField
                name="motherTongue"
                label="Mother Tongue"
                value={formData.motherTongue}
                onChange={handleChange}
              />

              <InputField
                name="homeTown"
                label="Home Town"
                value={formData.homeTown}
                onChange={handleChange}
              />
            </Row>
          </SectionCard>

          {/* fouth section start school detail */}

          <SectionCard icon={<FaSchool />} title="Last School Details">
            <Row>
              <InputField
                name="lastSchoolName"
                label="Last School Name"
                value={formData.lastSchoolName}
                onChange={handleChange}
              />

              <InputField
                name="lastSchoolAddress"
                label="Last School Address"
                value={formData.lastSchoolAddress}
                onChange={handleChange}
              />

              <Select
                name="isCbse"
                label="CBSE"
                value={formData.isCbse}
                onChange={handleChange}
                options={["Yes", "No"]}
              />

              <InputField
                name="otherBoard"
                label="Other Board"
                value={formData.otherBoard}
                onChange={handleChange}
              />
            </Row>

            <Row>
              <InputField
                name="lastResult"
                label="Last Result"
                value={formData.lastResult}
                onChange={handleChange}
              />

              <InputField
                name="percentage"
                label="Percentage"
                value={formData.percentage}
                onChange={handleChange}
              />
            </Row>
          </SectionCard>
          {/* paren details */}
          <SectionCard title="Parent Details" icon={<RiParentFill />}>
            <Row>
              <InputField
                name="fatherName"
                label="Father Name"
                value={formData.fatherName}
                onChange={handleChange}
              />

              <InputField
                name="motherName"
                label="Mother Name"
                value={formData.motherName}
                onChange={handleChange}
              />
            </Row>
            <Row>
              <InputField
                name="fatherOccupation"
                label="Father Occupation"
                value={formData.fatherOccupation}
                onChange={handleChange}
              />

              <InputField
                name="motherOccupation"
                label="Mother Occupation"
                value={formData.motherOccupation}
                onChange={handleChange}
              />
            </Row>
            <Row>
              <InputField
                name="fatherNationality"
                label="Father Nationality"
                value={formData.fatherNationality}
                onChange={handleChange}
              />

              <InputField
                name="motherNationality"
                label="Mother Nationality"
                value={formData.motherNationality}
                onChange={handleChange}
              />
            </Row>

            <Row>
              <InputField
                name="annualIncome"
                label="Annual Income"
                value={formData.annualIncome}
                onChange={handleChange}
              />
              {/* </SectionCard> */}

              {/* ================= ADDRESS ================= */}

              {/* <SectionCard title="Address Details" icon={<FiPhone size={18} />}> */}

              <InputField
                name="localGurdianName"
                label="Local Guardian Name"
                value={formData.localGurdianName}
                onChange={handleChange}
              />
            </Row>
          </SectionCard>
          {/* contact details section */}
          <SectionCard
            title="Contact Details"
            icon={<MdOutlinePermContactCalendar />}
          >
            <Row>
              <InputField
                name="fatherMobileNumber"
                label="Father Mobile Number"
                value={formData.fatherMobileNumber}
                onChange={handleChange}
              />
              <InputField
                name="motherMobileNumber"
                label="Mother Mobile Number"
                value={formData.motherMobileNumber}
                onChange={handleChange}
              />
              <InputField
                name="fatherPermanentAddress"
                label="Father Permanent Address"
                value={formData.fatherPermanentAddress}
                onChange={handleChange}
              />
            </Row>
            <Row>
              <InputField
                name="motherPermanentAddress"
                label="Mother Permanent Address"
                value={formData.motherPermanentAddress}
                onChange={handleChange}
              />

              <InputField
                name="officeAddress"
                label="Office Address"
                value={formData.officeAddress}
                onChange={handleChange}
              />

              <InputField
                name="localGurdianAddress"
                label="Local Guardian Address"
                value={formData.localGurdianAddress}
                onChange={handleChange}
              />
            </Row>
          </SectionCard>

          {/* fee details section */}

          <SectionCard title="Fee Details" icon={<FaRupeeSign />}>
            <Row>
              <Select
                name="feeGroup"
                label="Fee Group"
                value={formData.feeGroup}
                onChange={handleChange}
                options={["PNC-KG", "I-V", "VI-VIII", "IX-XII"]}
              />
            </Row>
          </SectionCard>

          {/* </SectionCard> */}

          {/* transport detail section */}

          {/* ================= PHOTO + NOTES ================= */}
          <SectionCard title="TransPort Required" icon={<FaBus />}>
            <Row>
              <div className="w-full">
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Transportation Required?
                </label>

                <div
                  className="flex flex-wrap lg:flex-nowrap md:flex-nowrap
                 sm:flex-nowrap gap-4"
                >
                  {/* YES */}
                  <label
                    htmlFor="transport-yes"
                    className="flex flex-1/2 cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-rose-400 hover:bg-rose-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                        🚌
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">Yes</p>
                        <p className="text-xs text-gray-500">
                          Student requires transport
                        </p>
                      </div>
                    </div>

                    <input
                      type="radio"
                      name="transport"
                      id="transport-yes"
                      value="yes"
                      onChange={(e: any) => setTransport(e.target.value)}
                      className="h-5 w-5 accent-rose-500"
                    />
                  </label>

                  {/* NO */}
                  <label
                    htmlFor="transport-no"
                    className="flex flex-1/2 cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-rose-400 hover:bg-rose-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                        🚶
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">No</p>
                        <p className="text-xs text-gray-500">
                          Student does not require transport
                        </p>
                      </div>
                    </div>

                    <input
                      type="radio"
                      name="transport"
                      id="transport-no"
                      value="no"
                      onChange={(e: any) => setTransport(e.target.value)}
                      className="h-5 w-5 accent-rose-500"
                    />
                  </label>
                </div>
              </div>
            </Row>

            <Row>
              {transport === "yes" && (
                <div className="mt-5 w-full">
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    {/* Label */}
                    <label
                      htmlFor="busRoute"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
                        🚌
                      </span>

                      <span>
                        Select Bus
                        <sup className="ml-1 text-red-500">*</sup>
                      </span>
                    </label>

                    {/* Helper Text */}
                    <p className="mb-3 text-xs text-gray-500">
                      Select the bus number assigned to this student.
                    </p>

                    {/* Select */}
                    <div className="relative">
                      <select
                        id="busRoute"
                        name="busRoute"
                        onChange={handleChange}
                        defaultValue=""
                        className="w-full appearance-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 pr-10 text-sm font-medium text-gray-700 outline-none transition focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-100"
                      >
                        <option value="" disabled>
                          Select Bus Number
                        </option>

                        {transportList.map((bus) => (
                          <option key={bus._id} value={bus._id}>
                            {bus.transportId} — {bus.registrationNumber}
                          </option>
                        ))}
                      </select>

                      {/* Dropdown Arrow */}
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        ▼
                      </div>
                    </div>

                    {/* Selected Bus Info */}
                    <p className="mt-2 text-xs text-gray-400">
                      Example: BUS-01 — UP25AB1234
                    </p>
                  </div>
                </div>
              )}
            </Row>
          </SectionCard>

          <SectionCard title="Photo & Note Detail" icon={<FaPhotoFilm />}>
            <Row>
              <div className="flex-1/2">
                <div className="mb-4 flex items-center gap-2">
                  <FiUpload size={18} />

                  <h2 className="text-lg font-semibold">
                    Upload Student Photo
                  </h2>
                </div>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-slate-400 hover:bg-slate-100">
                  <FiUpload className="mb-3 text-slate-500" size={28} />

                  <p className="text-sm font-medium text-slate-700">
                    Click to upload photo
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    JPG, PNG up to 2MB
                  </p>
                  <input
                    accept="image/*"
                    type="file"
                    name="photo"
                    className="w-full bg-transparent px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                    // className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                {/* {formData.photo && (
                <p className="mt-3 text-sm text-slate-600">
                  Selected File:
                  <span className="font-medium ml-1">
                    {formData.photo.name}
                  </span>
                </p>
              )} */}
              </div>
              <div className="flex-1/2">
                <h2 className="mb-3 font-semibold">Any Notes</h2>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  rows={6}
                />
              </div>
            </Row>
          </SectionCard>

          {/* ================= BUTTON ================= */}

          {/* <ActionBtn /> */}
          <Button />
        </FormContainer>
      </PageContent>
    </PageLayout>
  );
};

export default ProfileCreate;
