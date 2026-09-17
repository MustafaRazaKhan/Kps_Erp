"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

import initialState from "../initialstate/transport.state";
import transportReducer from "../reducer/transport.reducer";

import { TransportContextType, TransportType } from "../types/transport.type";
import apiPOST, { apiGET } from "@/services/api";
import { showToastError, showToastSuccess } from "@/utils/Toast";

const TransportContext = createContext<TransportContextType | null>(null);

export const TransportProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(transportReducer, initialState);

  // ========================================
  // HANDLE TRANSPORT CHANGE
  // ========================================

  const handleTransportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    dispatch({
      type: "HANDLE_TRANSPORT_CHANGE",

      payload: {
        name: name as keyof TransportType,

        value:
          type === "number" ? (value === "" ? null : Number(value)) : value,
      },
    });
  };

  // ========================================
  // GET ALL TRANSPORTS
  // ========================================

  const transportList = async () => {
    try {
      const data = await apiGET("/api/admin/transport/transport-list");
      dispatch({
        type: "TRANSPORT_LIST",
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    transportList();
  }, []);

  // ========================================
  // CREATE TRANSPORT
  // ========================================

  const handleTransportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await apiPOST("/api/admin/transport/create-transport", {
        ...state.transportObj,
      });
      if (data.success) {
        showToastSuccess(data.message);
      }
      // console.log("Transport Data:", data);
    } catch (error: any) {
      showToastError(error.message);
      console.log(error);
    }
  };

  return (
    <TransportContext.Provider
      value={{
        state,
        handleTransportSubmit,
        handleTransportChange,
        transportList,
      }}
    >
      {children}
    </TransportContext.Provider>
  );
};

// ========================================
// CUSTOM HOOK
// ========================================

export const useTransport = () => {
  const context = useContext(TransportContext);

  if (!context) {
    throw new Error("useTransport must be used inside TransportProvider");
  }

  return context;
};
