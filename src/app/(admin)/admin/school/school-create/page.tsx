"use client";
import Button from "@/components/common/Button";
import FormContainer from "@/components/common/FormContainer";
import InputField from "@/components/common/InputField";
import PageContent from "@/components/common/PageContent";
import PageHeader from "@/components/common/PageHeader";
import PageLayout from "@/components/common/PageLayout";
import Row from "@/components/common/Row";
import SectionCard from "@/components/common/SectionCard";
import useSchool from "@/store/admin/context/school.context";
import React from "react";
import {
  FaEnvelope,
  FaIdCard,
  FaImage,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPlus,
  FaSchool,
} from "react-icons/fa";
const heading = {
  name: "Register School",
  subHeading: "Add and manage your school’s basic Enquiries.",
  href: "/dashboard/admin/school/school-list",
  btnHeading: "School List",
  icon: <FaSchool />,
};

const SchoolCreate = () => {
  const { state, handleChange, handleFileChange, handleSubmit } = useSchool();
  return (
    <PageLayout>
      <PageHeader heading={heading} />
      <PageContent>
        <FormContainer onSubmit={handleSubmit}>
          <SectionCard title="Create School Profile" icon={<FaSchool />}>
            <Row>
              <InputField
                name="name"
                value={state.schoolObj.name}
                type="text"
                placeholder="Enter the School Name"
                onChange={(e: any) => handleChange(e)}
                icon={<FaSchool />}
                label="School Name"
              />
              <InputField
                name="code"
                value={state.schoolObj.code}
                type="number"
                placeholder="Enter the  Affiliation Code"
                onChange={(e) => handleChange(e)}
                icon={<FaIdCard />}
                label=" Affiliation Code"
              />
            </Row>
            <Row>
              <InputField
                name="email"
                value={state.schoolObj.email}
                type="email"
                placeholder="Enter the Email Address"
                onChange={(e) => handleChange(e)}
                icon={<FaEnvelope />}
                label=" Email Address"
              />
              <InputField
                name="code"
                value={state.schoolObj.code}
                type="number"
                placeholder="Enter the  Affiliation Code"
                onChange={(e) => handleChange(e)}
                icon={<FaIdCard />}
                label=" Affiliation Code"
              />
            </Row>
            <Row>
              <InputField
                name="contact"
                value={state.schoolObj.contact}
                type="tel"
                placeholder="Enter the Contact Number"
                onChange={(e) => handleChange(e)}
                icon={<FaPhoneAlt />}
                label="Contact Number"
              />
              <InputField
                name="address"
                value={state.schoolObj.address}
                type="text"
                placeholder="Enter the  Address"
                onChange={(e) => handleChange(e)}
                icon={<FaMapMarkerAlt />}
                label="Address"
              />
            </Row>
            <Row>
              <div className="flex-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Upload School Image
                </label>

                <label className="flex items-center gap-2 w-full px-3 py-3 bg-white border rounded cursor-pointer focus-within:ring-1 focus-within:ring-gray-400">
                  <FaImage className="text-gray-400 text-sm" />

                  <span className="text-sm text-gray-600 truncate">
                    {state.schoolObj.image?.name || "Upload school image"}
                  </span>

                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </Row>
            <Button />
          </SectionCard>
        </FormContainer>
      </PageContent>
    </PageLayout>
  );
};

export default SchoolCreate;

{
  /* first  */
}
