"use client";

import { createContext, useContext, useReducer } from "react";

import transportReducer from "@/reducer/transport/transportReducer";
import { transportInitialState } from "@/initialState/transport/transportInitialState";
import { TRANSPORT_ACTIONS } from "@/types/transport/transportType";

const TransportContext = createContext(null);

export const TransportProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(transportReducer, transportInitialState);

  // ========================================
  // GET ALL TRANSPORTS
  // ========================================

  const getTransports = async () => {
    dispatch({
      type: TRANSPORT_ACTIONS.GET_TRANSPORTS_REQUEST,
    });

    try {
      const response = await fetch("/api/transport");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch transports");
      }

      dispatch({
        type: TRANSPORT_ACTIONS.GET_TRANSPORTS_SUCCESS,
        payload: data.data,
      });

      return data;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch transports";

      dispatch({
        type: TRANSPORT_ACTIONS.GET_TRANSPORTS_FAILURE,
        payload: message,
      });

      throw error;
    }
  };

  // ========================================
  // CREATE TRANSPORT
  // ========================================

  const createTransport = async (transportData) => {
    dispatch({
      type: TRANSPORT_ACTIONS.CREATE_TRANSPORT_REQUEST,
    });

    try {
      const response = await fetch("/api/transport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transportData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create transport");
      }

      dispatch({
        type: TRANSPORT_ACTIONS.CREATE_TRANSPORT_SUCCESS,
        payload: data.data,
      });

      return data;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create transport";

      dispatch({
        type: TRANSPORT_ACTIONS.CREATE_TRANSPORT_FAILURE,
        payload: message,
      });

      throw error;
    }
  };

  // ========================================
  // SET TRANSPORT
  // ========================================

  const setTransport = (transport) => {
    dispatch({
      type: TRANSPORT_ACTIONS.SET_TRANSPORT,
      payload: transport,
    });
  };

  // ========================================
  // CLEAR TRANSPORT
  // ========================================

  const clearTransport = () => {
    dispatch({
      type: TRANSPORT_ACTIONS.CLEAR_TRANSPORT,
    });
  };

  // ========================================
  // CLEAR ERROR
  // ========================================

  const clearError = () => {
    dispatch({
      type: TRANSPORT_ACTIONS.CLEAR_ERROR,
    });
  };

  return (
    <TransportContext.Provider
      value={{
        state,

        // API functions
        getTransports,
        createTransport,

        // State functions
        setTransport,
        clearTransport,
        clearError,
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
