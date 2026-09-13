"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";
// import { toast } from "react-toastify";

import { FeeContextType } from "../types/fee.type";
import feeReducer from "../reducer/fee.reducer";
import initialState from "../initialstate/fee.state";
import apiPOST from "@/services/api";

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
  const handleMonthSubmit = (e: any, selectedClass: any) => {
    e.preventDefault();

    const newObj = {
      selectedClass,
      monthFee: Number(state.monthlyObj.monthFee),
      busFee: Number(state.monthlyObj.busFee),
    };
    dispatch({
      type: "HANDLE_MONTHLY_SUBMIT",
      payload: newObj,
    });
    // console.log(state.monthList);
  };

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
    feeCategoryValue: any,
  ) => {
    e.preventDefault();
    const newData = {
      feeCategoryValue: feeCategoryValue,
      ...state.feeObj,
      monthList: state.monthList,
    };
    console.log(newData);
    const data = await apiPOST("/api/fee/fee-create", newData);
    console.log(data);
  };
  const feeList = async () => {
    try {
      const res = await fetch("/api/fee/fee-list");

      const data = await res.json();

      dispatch({
        type: "SET_FEE_LIST",
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Updated monthList:", state.monthList);
  }, [state.monthList]);

  return (
    <FeeContext.Provider
      value={{
        state,
        handleChange,
        handleMonthlyFeeChange,
        handleSubmit,
        feeList,
        handleMonthSubmit,
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
