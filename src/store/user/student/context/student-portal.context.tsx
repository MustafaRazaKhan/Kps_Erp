"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import { toast } from "react-toastify";

import studentPortalReducer from "../reducer/student-portal.reducer";

import {
  FeePayment,
  StudentPortalContextType,
} from "../types/student-portal.type";
import initialState from "../initilastate/student-portal.state";

const StudentPortalContext = createContext<StudentPortalContextType | null>(
  null,
);

export const StudentPortalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(studentPortalReducer, initialState);

  /* =====================================================
     HANDLE FEE INPUT CHANGE
  ====================================================== */

  const handleFeePayChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    dispatch({
      type: "HANDLE_FEE_PAY_CHANGE",
      payload: {
        name: e.target.name as keyof FeePayment,
        value: e.target.value,
      },
    });
  };

  /* =====================================================
     HANDLE FEE MONTH
  ====================================================== */

  const handleFeePayMonthChange = (month: string) => {
    dispatch({
      type: "HANDLE_FEE_PAY_MONTH_CHANGE",
      payload: month,
    });
  };

  /* =====================================================
     SUBMIT FEE PAYMENT
  ====================================================== */

  const handleFeePaySubmit = async (e: any, userId: string) => {
    e.preventDefault();
    try {
      dispatch({
        type: "SET_SUBMITTING",
        payload: true,
      });

      dispatch({
        type: "SET_SUCCESS",
        payload: null,
      });

      const form = state.feePayment;

      if (!form.transactionId.trim()) {
        throw new Error("Transaction ID is required");
      }

      if (!form.paymentDateTime) {
        throw new Error("Payment date and time is required");
      }

      if (!form.feeType) {
        throw new Error("Please select fee type");
      }

      if (!form.feeMonths.length) {
        throw new Error("Please select at least one fee month");
      }

      if (!form.paymentMode) {
        throw new Error("Please select payment mode");
      }

      const res = await fetch("/api/student/payfee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          transactionId: form.transactionId,
          paymentDateTime: form.paymentDateTime,
          feeType: form.feeType,
          feeMonths: form.feeMonths,
          paymentMode: form.paymentMode,
          remarks: form.remarks,
          amount: form.amount,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit fee payment");
      }

      dispatch({
        type: "SET_SUCCESS",
        payload: data.message || "Fee payment submitted successfully",
      });

      toast.success(data.message || "Fee payment submitted successfully");

      dispatch({
        type: "RESET_FEE_FORM",
      });
    } catch (error: any) {
      console.error("SUBMIT FEE PAYMENT ERROR:", error);

      toast.error(error.message || "Failed to submit fee payment");
    } finally {
      dispatch({
        type: "SET_SUBMITTING",
        payload: false,
      });
    }
  };

  /* =====================================================
     GET FEE PAYMENTS
  ====================================================== */

  const getFeePaymentList = async (userId: string) => {
    try {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });

      if (!userId) {
        throw new Error("Student ID is required");
      }

      const res = await fetch(`/api/student/fee/list/${userId}`);

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch fee payments");
      }

      dispatch({
        type: "SET_FEE_PAY_LIST",
        payload: data.data || [],
      });
    } catch (error: any) {
      console.error("GET FEE PAYMENTS ERROR:", error);
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  };

  /* =====================================================
     RESET
  ====================================================== */

  const resetFeeForm = () => {
    dispatch({
      type: "RESET_FEE_FORM",
    });
  };

  return (
    <StudentPortalContext.Provider
      value={{
        state,

        handleFeePayChange,
        handleFeePayMonthChange,

        handleFeePaySubmit,
        getFeePaymentList,

        resetFeeForm,
      }}
    >
      {children}
    </StudentPortalContext.Provider>
  );
};

/* =========================================================
   HOOK
========================================================= */

export const useStudentPortal = () => {
  const context = useContext(StudentPortalContext);

  if (!context) {
    throw new Error(
      "useStudentPortal must be used inside StudentPortalProvider",
    );
  }

  return context;
};
