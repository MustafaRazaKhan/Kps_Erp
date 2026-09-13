"use client";

import FormContainer from "@/components/common/FormContainer";
import InputField from "@/components/common/InputField";
import PageContent from "@/components/common/PageContent";
import PageLayout from "@/components/common/PageLayout";
import Row from "@/components/common/Row";
import { useTransport } from "@/store/admin/context/transport.context";

const CreateTransport = () => {
  const { handleTransportChange, handleTransportSubmit, state } =
    useTransport();

  return (
    <PageLayout>
      <PageContent>
        <FormContainer onSubmit={handleTransportSubmit}>
          {/* ================= VEHICLE INFORMATION ================= */}
          <div>
            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Vehicle Information
            </h2>

            <div className="space-y-5">
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
            </div>
          </div>

          {/* ================= DRIVER INFORMATION ================= */}
          <div>
            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Driver Information
            </h2>

            <div className="space-y-5">
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
          </div>

          {/* ================= SUBMIT ================= */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-pink-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-pink-700"
            >
              Create Transport
            </button>
          </div>
        </FormContainer>
      </PageContent>
    </PageLayout>
  );
};

export default CreateTransport;
