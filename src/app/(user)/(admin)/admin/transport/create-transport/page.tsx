"use client";

import Button from "@/components/common/Button";
import FormContainer from "@/components/common/FormContainer";
import InputField from "@/components/common/InputField";
import PageContent from "@/components/common/PageContent";
import PageHeader from "@/components/common/PageHeader";
import PageLayout from "@/components/common/PageLayout";
import Row from "@/components/common/Row";
import { useTransport } from "@/store/user/admin/context/transport.context";
import { FaBus } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
const heading = {
  name: "Add New Transport",
  subHeading: "Add and manage Transpor list.",
  href: "/dashboard/admin/transport/transport-list",
  btnHeading: "Trasnport List",
  icon: <FaBus />,
};

const CreateTransport = () => {
  const { handleTransportChange, handleTransportSubmit, state } =
    useTransport();

  return (
    <PageLayout>
      <PageContent>
        <PageHeader heading={heading} />
        <FormContainer onSubmit={handleTransportSubmit}>
          {/* ================= VEHICLE INFORMATION ================= */}

          <Row>
            <InputField
              name="transportId"
              label="Transport Id"
              value={state.transportObj.transportId}
              onChange={handleTransportChange}
              type="text"
              placeholder="Enter transport number"
            />

            <InputField
              name="registrationNumber"
              label="Registration Number"
              value={state.transportObj.registrationNumber}
              onChange={handleTransportChange}
              type="text"
              placeholder="Enter registration number"
            />
          </Row>

          <Row>
            <InputField
              name="seatingCapacity"
              label="Seating Capacity"
              value={state.transportObj.seatingCapacity ?? ""}
              onChange={handleTransportChange}
              type="number"
              placeholder="Enter seating capacity"
            />
          </Row>

          <Row>
            <InputField
              name="vehicleType"
              label="Vehicle Type"
              value={state.transportObj.vehicleType}
              onChange={handleTransportChange}
            />
          </Row>

          {/* ================= DRIVER INFORMATION ================= */}
          <div>
            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Driver Information
            </h2>

            <Row>
              <InputField
                name="name"
                label="Driver Name"
                value={state.transportObj.name}
                onChange={handleTransportChange}
                type="text"
                placeholder="Enter driver name"
              />

              <InputField
                name="phone"
                label="Driver Phone"
                value={state.transportObj.phone}
                onChange={handleTransportChange}
                type="tel"
                placeholder="Enter phone number"
              />
            </Row>

            <Row>
              <InputField
                name="licenseNumber"
                label="License Number"
                value={state.transportObj.licenseNumber}
                onChange={handleTransportChange}
                type="text"
                placeholder="Enter license number"
              />
            </Row>
          </div>

          {/* ================= SUBMIT ================= */}
          <Button title="create tranport" />
        </FormContainer>
      </PageContent>
    </PageLayout>
  );
};

export default CreateTransport;
