"use client";

import React, { useEffect, useState } from "react";

type Student = {
  _id: string;
  name?: string;
  email?: string;
  userId?: string;
  totalYearFee?: number;
  remainingFee?: number;
};

type FeePayment = {
  _id: string;
  studentId: Student;
  transactionId: string;
  paymentDateTime: string;
  feeType: string;
  feeMonths: string[];
  paymentMode: string;
  totalYearFee: number;
  amount: number;
  remarks?: string;
  status: "pending" | "approved" | "rejected";
  approvedAt?: string;
  rejectedAt?: string;
  adminRemarks?: string;
  createdAt: string;
};

const FeePaymentHistoryList = () => {
  const [payments, setPayments] = useState<FeePayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Payment ID currently being updated
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/fee/fee-payment-history", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch fee payments");
      }

      setPayments(result.data || []);
    } catch (error: any) {
      console.error("FETCH FEE PAYMENTS ERROR:", error);

      setError(
        error?.message || "Something went wrong while fetching payments.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // =====================================================
  // UPDATE PAYMENT STATUS
  // =====================================================

  const updatePaymentStatus = async (
    paymentId: string,
    status: "approved" | "rejected",
  ) => {
    const message =
      status === "approved"
        ? "Are you sure you want to approve this payment?"
        : "Are you sure you want to reject this payment?";

    const confirmed = window.confirm(message);

    if (!confirmed) {
      return;
    }

    try {
      setUpdatingId(paymentId);

      const response = await fetch(`/api/admin/fee-payments/${paymentId}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || `Failed to ${status} payment`);
      }

      // =================================================
      // UPDATE LOCAL STATE
      // =================================================

      setPayments((previousPayments) =>
        previousPayments.map((payment) =>
          payment._id === paymentId
            ? {
                ...payment,
                status,
                approvedAt:
                  status === "approved"
                    ? new Date().toISOString()
                    : payment.approvedAt,
                rejectedAt:
                  status === "rejected"
                    ? new Date().toISOString()
                    : payment.rejectedAt,
              }
            : payment,
        ),
      );

      // =================================================
      // OPTIONAL:
      // Fetch again so student remainingFee and all
      // server-side data are completely up-to-date.
      // =================================================

      await fetchPayments();

      alert(
        status === "approved"
          ? "Payment approved successfully."
          : "Payment rejected successfully.",
      );
    } catch (error: any) {
      console.error("UPDATE PAYMENT ERROR:", error);

      alert(error?.message || "Something went wrong while updating payment.");
    } finally {
      setUpdatingId(null);
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // =====================================================
  // FORMAT AMOUNT
  // =====================================================

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  // =====================================================
  // STATUS COLOR
  // =====================================================

  const getStatusClass = (status: FeePayment["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-gray-500">Loading fee payments...</div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-600">{error}</p>

        <button
          type="button"
          onClick={fetchPayments}
          className="mt-3 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="w-full">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Fee Payment History
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Total payments: {payments.length}
          </p>
        </div>

        <button
          type="button"
          onClick={fetchPayments}
          disabled={loading}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {/* ================================================= */}
      {/* EMPTY STATE */}
      {/* ================================================= */}

      {payments.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
          <p className="text-gray-500">No fee payments found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-5 py-4 font-semibold text-gray-700">
                    Student
                  </th>

                  <th className="px-5 py-4 font-semibold text-gray-700">
                    Transaction
                  </th>

                  <th className="px-5 py-4 font-semibold text-gray-700">
                    Fee Type
                  </th>

                  <th className="px-5 py-4 font-semibold text-gray-700">
                    Months
                  </th>

                  <th className="px-5 py-4 font-semibold text-gray-700">
                    Payment Mode
                  </th>

                  <th className="px-5 py-4 font-semibold text-gray-700">
                    Amount
                  </th>

                  <th className="px-5 py-4 font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="px-5 py-4 font-semibold text-gray-700">
                    Payment Date
                  </th>

                  <th className="px-5 py-4 font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {payments.map((payment) => {
                  const isUpdating = updatingId === payment._id;

                  return (
                    <tr key={payment._id} className="hover:bg-gray-50">
                      {/* ================================= */}
                      {/* STUDENT */}
                      {/* ================================= */}

                      <td className="px-5 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {payment.studentId?.name || "Unknown Student"}
                          </p>

                          <p className="text-xs text-gray-500">
                            {payment.studentId?.email ||
                              payment.studentId?.userId ||
                              "-"}
                          </p>
                        </div>
                      </td>

                      {/* ================================= */}
                      {/* TRANSACTION */}
                      {/* ================================= */}

                      <td className="px-5 py-4">
                        <span className="font-mono text-xs text-gray-700">
                          {payment.transactionId}
                        </span>
                      </td>

                      {/* ================================= */}
                      {/* FEE TYPE */}
                      {/* ================================= */}

                      <td className="px-5 py-4">
                        <span className="capitalize text-gray-700">
                          {payment.feeType}
                        </span>
                      </td>

                      {/* ================================= */}
                      {/* MONTHS */}
                      {/* ================================= */}

                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1">
                          {payment.feeMonths?.length ? (
                            payment.feeMonths.map((month) => (
                              <span
                                key={month}
                                className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
                              >
                                {month}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </td>

                      {/* ================================= */}
                      {/* PAYMENT MODE */}
                      {/* ================================= */}

                      <td className="px-5 py-4">
                        <span className="capitalize text-gray-700">
                          {payment.paymentMode}
                        </span>
                      </td>

                      {/* ================================= */}
                      {/* AMOUNT */}
                      {/* ================================= */}

                      <td className="px-5 py-4">
                        <span className="font-semibold text-gray-900">
                          {formatAmount(payment.amount)}
                        </span>
                      </td>

                      {/* ================================= */}
                      {/* STATUS */}
                      {/* ================================= */}

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusClass(
                            payment.status,
                          )}`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      {/* ================================= */}
                      {/* DATE */}
                      {/* ================================= */}

                      <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                        {formatDate(payment.paymentDateTime)}
                      </td>

                      {/* ================================= */}
                      {/* ACTION */}
                      {/* ================================= */}

                      <td className="px-5 py-4">
                        {payment.status === "pending" ? (
                          <div className="flex items-center gap-2">
                            {/* APPROVE */}

                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() =>
                                updatePaymentStatus(payment._id, "approved")
                              }
                              className="rounded-md bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isUpdating ? "Updating..." : "Approve"}
                            </button>

                            {/* REJECT */}

                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() =>
                                updatePaymentStatus(payment._id, "rejected")
                              }
                              className="rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isUpdating ? "Updating..." : "Reject"}
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            No action
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeePaymentHistoryList;
