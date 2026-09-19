"use client";

import { useTransport } from "@/store/user/admin/context/transport.context";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  FiTruck,
  FiUser,
  FiPhone,
  FiCreditCard,
  FiUsers,
  FiEye,
  FiEdit2,
  FiHash,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const TransPortList = () => {
  const { state, transportList } = useTransport();

  useEffect(() => {
    transportList();
  }, []);

  const transports = state.transportList || [];

  return (
    <div className="w-full">
      {/* =========================================================
HEADER
========================================================= */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FiTruck size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Transport
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Manage school vehicles, drivers and transport information
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-2.5">
          <FiTruck className="text-blue-500" size={17} />

          <span className="text-sm font-medium text-gray-500">
            Total Vehicles
          </span>

          <span className="font-bold text-blue-700">{transports.length}</span>
        </div>
      </div>

      {/* =========================================================
      SUMMARY
  ========================================================= */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Total Vehicles
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {transports.length}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100/70 text-blue-600">
              <FiTruck size={18} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Active
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {
                  transports.filter(
                    (item: any) => item.status?.toLowerCase() === "active",
                  ).length
                }
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100/70 text-emerald-600">
              <FiCheckCircle size={18} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Inactive
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {
                  transports.filter(
                    (item: any) => item.status?.toLowerCase() !== "active",
                  ).length
                }
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100/70 text-amber-600">
              <FiAlertCircle size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
      TABLE CARD
  ========================================================= */}
      <div className="overflow-hidden rounded-2xl border border-blue-100/70 bg-white shadow-sm">
        {/* TABLE TOP BAR */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-blue-50/60 to-amber-50/30 px-5 py-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900">
              Transport Vehicles
            </h2>

            <p className="mt-0.5 text-xs text-gray-400">
              Vehicle and driver records
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm ring-1 ring-blue-100">
            <FiTruck size={17} />
          </div>
        </div>

        <div className="">
          <table className="">
            {/* =====================================================
            TABLE HEADER
        ===================================================== */}
            <thead className="border-b border-blue-100/70 bg-blue-50/40">
              <tr>
                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Transport
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Vehicle
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Registration
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Capacity
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Driver
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Contact
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  License
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>

            {/* =====================================================
            TABLE BODY
        ===================================================== */}
            <tbody className="divide-y divide-gray-100">
              {transports.length > 0 ? (
                transports.map((transport: any, index: number) => {
                  const isActive = transport.status?.toLowerCase() === "active";

                  return (
                    <tr
                      key={transport._id}
                      className="group transition-colors hover:bg-blue-50/30"
                    >
                      {/* TRANSPORT */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
                            <FiTruck size={18} />
                          </div>

                          <div>
                            <p className="font-bold text-gray-800">
                              {transport.transportId || "-"}
                            </p>

                            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-400">
                              <FiHash size={10} />
                              {String(index + 1).padStart(3, "0")}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* VEHICLE */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold capitalize text-gray-800">
                            {transport.vehicleType || "-"}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            {transport.vehicleModel || "Model not available"}
                          </p>
                        </div>
                      </td>

                      {/* REGISTRATION */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-1.5 text-xs font-bold tracking-wide text-blue-700">
                          {transport.registrationNumber || "-"}
                        </span>
                      </td>

                      {/* CAPACITY */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                            <FiUsers size={14} />
                          </div>

                          <span>{transport.seatingCapacity || 0} Seats</span>
                        </div>
                      </td>

                      {/* DRIVER */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <FiUser size={14} />
                          </div>

                          <span className="font-medium text-gray-800">
                            {transport.name || "-"}
                          </span>
                        </div>
                      </td>

                      {/* PHONE */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FiPhone className="text-blue-400" size={14} />

                          {transport.phone || "-"}
                        </div>
                      </td>

                      {/* LICENSE */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FiCreditCard className="text-gray-400" size={14} />

                          {transport.licenseNumber || "-"}
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                              : "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isActive ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />

                          {transport.status || "Unknown"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/transport/view-details/${transport._id}`}
                            title="View transport details"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50/60 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                          >
                            <FiEye size={14} />
                          </Link>

                          <button
                            type="button"
                            title="Edit transport"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-100 bg-amber-50/60 text-amber-600 transition hover:bg-amber-500 hover:text-white"
                          >
                            <FiEdit2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-16 text-center">
                    <div className="mx-auto flex max-w-xs flex-col items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                        <FiTruck size={24} />
                      </div>

                      <h3 className="mt-4 font-semibold text-gray-800">
                        No transport records
                      </h3>

                      <p className="mt-1 text-sm text-gray-400">
                        There are currently no vehicles available in the
                        transport records.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TABLE FOOTER */}
        {transports.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-3">
            <p className="text-xs text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-600">
                {transports.length}
              </span>{" "}
              transport {transports.length === 1 ? "record" : "records"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransPortList;
