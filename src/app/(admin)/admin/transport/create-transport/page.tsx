"use client";

import React, { useState } from "react";
import FormContainer from "@/components/common/FormContainer";
import InputField from "@/components/common/InputField";
import PageContent from "@/components/common/PageContent";
import PageLayout from "@/components/common/PageLayout";
import Row from "@/components/common/Row";

const CreateTransport = () => {
  const [formData, setFormData] = useState({
    // Vehicle Information
    transportNumber: "",
    vehicleType: "bus",
    registrationNumber: "",
    vehicleModel: "",
    manufacturer: "",
    manufacturingYear: "",
    seatingCapacity: "",

    // Driver Information
    driver: {
      name: "",
      phone: "",
      licenseNumber: "",
      licenseExpiryDate: "",
      address: "",
      joiningDate: "",
    },

    // Status
    status: "active",
    isActive: true,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDriverChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      driver: {
        ...prev.driver,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Basic validation
      if (
        !formData.transportNumber ||
        !formData.registrationNumber ||
        !formData.seatingCapacity
      ) {
        alert("Please fill all required vehicle fields");
        return;
      }

      if (
        !formData.driver.name ||
        !formData.driver.phone ||
        !formData.driver.licenseNumber
      ) {
        alert("Please fill all required driver fields");
        return;
      }

      const payload = {
        ...formData,

        manufacturingYear: formData.manufacturingYear
          ? Number(formData.manufacturingYear)
          : undefined,

        seatingCapacity: formData.seatingCapacity
          ? Number(formData.seatingCapacity)
          : undefined,
      };

      console.log("Transport Data:", payload);

      const response = await fetch("/api/admin/transport/create-transport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to create transport");
      }

      console.log("Transport Created:", result);

      alert("Transport created successfully");

      // Reset form
      setFormData({
        transportNumber: "",
        vehicleType: "bus",
        registrationNumber: "",
        vehicleModel: "",
        manufacturer: "",
        manufacturingYear: "",
        seatingCapacity: "",

        driver: {
          name: "",
          phone: "",
          licenseNumber: "",
          licenseExpiryDate: "",
          address: "",
          joiningDate: "",
        },

        status: "active",
        isActive: true,
      });
    } catch (error: any) {
      console.error("Create Transport Error:", error);

      alert(error.message || "Something went wrong");
    }
  };
  return (
    <PageLayout>
      <PageContent>
        <FormContainer onSubmit={handleSubmit}>
          {/* ================= VEHICLE INFORMATION ================= */}
          <div>
            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Vehicle Information
            </h2>

            <div className="space-y-5">
              <Row>
                <InputField
                  name="transportNumber"
                  label="Transport Number"
                  value={formData.transportNumber}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter transport number"
                />

                <InputField
                  name="registrationNumber"
                  label="Registration Number"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter registration number"
                />
              </Row>

              <Row>
                <InputField
                  name="vehicleModel"
                  label="Vehicle Model"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter vehicle model"
                />

                <InputField
                  name="manufacturer"
                  label="Manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter manufacturer"
                />
              </Row>

              <Row>
                <InputField
                  name="manufacturingYear"
                  label="Manufacturing Year"
                  value={formData.manufacturingYear}
                  onChange={handleChange}
                  type="number"
                  placeholder="e.g. 2022"
                />

                <InputField
                  name="seatingCapacity"
                  label="Seating Capacity"
                  value={formData.seatingCapacity}
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter seating capacity"
                />
              </Row>

              <Row>
                <InputField
                  name="vehicleType"
                  label="Vehicle Type"
                  value={formData.vehicleType}
                  onChange={handleChange}
                />

                <InputField
                  name="status"
                  label="Status"
                  value={formData.status}
                  onChange={handleChange}
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
                  value={formData.driver.name}
                  onChange={handleDriverChange}
                  type="text"
                  placeholder="Enter driver name"
                />

                <InputField
                  name="phone"
                  label="Driver Phone"
                  value={formData.driver.phone}
                  onChange={handleDriverChange}
                  type="tel"
                  placeholder="Enter phone number"
                />
              </Row>

              <Row>
                <InputField
                  name="licenseNumber"
                  label="License Number"
                  value={formData.driver.licenseNumber}
                  onChange={handleDriverChange}
                  type="text"
                  placeholder="Enter license number"
                />

                <InputField
                  name="licenseExpiryDate"
                  label="License Expiry Date"
                  value={formData.driver.licenseExpiryDate}
                  onChange={handleDriverChange}
                  type="date"
                />
              </Row>

              <Row>
                <InputField
                  name="joiningDate"
                  label="Joining Date"
                  value={formData.driver.joiningDate}
                  onChange={handleDriverChange}
                  type="date"
                />

                <InputField
                  name="address"
                  label="Driver Address"
                  value={formData.driver.address}
                  onChange={handleDriverChange}
                  type="text"
                  placeholder="Enter driver address"
                />
              </Row>
            </div>
          </div>

          {/* ================= ACTIVE STATUS ================= */}
          <div>
            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Transport Status
            </h2>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                className="h-4 w-4"
              />

              <span className="text-sm font-medium text-gray-700">
                Transport is Active
              </span>
            </label>
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
