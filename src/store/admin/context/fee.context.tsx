"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";
// import { toast } from "react-toastify";

import { FeeContextType } from "../types/fee.type";
import feeReducer from "../reducer/fee.reducer";
import initialState from "../initialstate/fee.state";
import apiPOST from "@/services/api";
import { showToastSuccess } from "@/utils/Toast";

const FeeContext = createContext<FeeContextType | null>(null);

const FeeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(feeReducer, initialState);
  // Handle Normal Inputs
  // ==========================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    dispatch({
      type: "HANDLE_CHANGE",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  // ==========================
  // Handle Monthly Fee
  // ==========================
  const handleMonthlyFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "HANDLE_MONTHLY_FEE",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };
  const handleMonthSubmit = (
    e: React.SyntheticEvent,
    selectedClass: string,
  ) => {
    e.preventDefault();

    const existingClass = state.monthList.filter(
      (item) => item.selectedClass === selectedClass,
    );

    if (existingClass.length > 0) {
      alert("This class has already been added.");
      return;
    }

    const newObj = {
      selectedClass,
      monthFee: Number(state.monthlyObj.monthFee) || 0,
      busFee: Number(state.monthlyObj.busFee) || 0,
    };

    dispatch({
      type: "HANDLE_MONTHLY_SUBMIT",
      payload: newObj,
    });
  };

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
    feeGroup: any,
  ) => {
    e.preventDefault();
    const newData = {
      feeGroup: feeGroup,
      ...state.feeObj,
      monthList: state.monthList,
    };
    console.log(newData);
    const data = await apiPOST("/api/fee/fee-create", newData);
    // console.log(data);
    if (data.success) {
      showToastSuccess(data.message);
      dispatch({
        type: "RESET_MONTHLIST",
      });
    }
  };
  const feeList = async () => {
    try {
      const res = await fetch("/api/fee/fee-list");

      const data = await res.json();
      if (data.success) {
        showToastSuccess(data.message);
      }

      dispatch({
        type: "SET_FEE_LIST",
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Get Fee Structure By ID
  // ==========================
  const feeDetails = async (id: string) => {
    try {
      if (!id) {
        console.error("Fee ID is required");
        return;
      }

      const res = await fetch(`/api/fee/view-fee-detail/${id}`);

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error(data.message || "Fee Structure not found");
        return;
      }

      dispatch({
        type: "SET_FEE_DETAILS",
        payload: data.data,
      });

      return data.data;
    } catch (error) {
      console.error("Fee Details Error:", error);
    }
  };

  return (
    <FeeContext.Provider
      value={{
        state,
        handleChange,
        handleMonthlyFeeChange,
        handleSubmit,
        feeList,
        handleMonthSubmit,
        feeDetails,
      }}
    >
      {children}
    </FeeContext.Provider>
  );
};

const useFee = () => {
  const context = useContext(FeeContext);

  if (!context) {
    throw new Error("useFee must be used inside FeeProvider");
  }

  return context;
};

export { FeeProvider };
export default useFee;
