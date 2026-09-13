"use client";

import { useTransport } from "@/store/admin/context/transport.context";
import React, { useEffect } from "react";

const TransPortList = () => {
  const { state, transportList } = useTransport();

  useEffect(() => {
    transportList();
  }, []);

  console.log(state.transportList);

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Transport List
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all school transport vehicles and drivers
          </p>
        </div>

        <div className="rounded-lg bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600">
          Total: {state.transportList?.length || 0}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            {/* TABLE HEADER */}
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Transport ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Vehicle
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Registration
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Capacity
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Driver
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Phone
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  License
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-gray-100">
              {state.transportList?.length > 0 ? (
                state.transportList.map((transport: any) => (
                  <tr
                    key={transport._id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* TRANSPORT ID */}
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-800">
                        {transport.transportId}
                      </span>
                    </td>

                    {/* VEHICLE */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium capitalize text-gray-800">
                          {transport.vehicleType}
                        </p>

                        <p className="text-xs text-gray-500">
                          {transport.vehicleModel || "No model"}
                        </p>
                      </div>
                    </td>

                    {/* REGISTRATION */}
                    <td className="px-6 py-4">
                      <span className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                        {transport.registrationNumber}
                      </span>
                    </td>

                    {/* CAPACITY */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">
                        {transport.seatingCapacity} Seats
                      </span>
                    </td>

                    {/* DRIVER */}
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-800">
                        {transport.name}
                      </span>
                    </td>

                    {/* PHONE */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {transport.phone}
                      </span>
                    </td>

                    {/* LICENSE */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {transport.licenseNumber}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          transport.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {transport.status}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          className="rounded-md bg-pink-50 px-3 py-1.5 text-xs font-medium text-pink-600 transition hover:bg-pink-100"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No transport records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransPortList;
