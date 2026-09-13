"use client";

/* ============================================================
   REACT CONTEXT + REDUCER
   ------------------------------------------------------------
   createContext → Creates the Class Context.
   useContext   → Allows components to access the context.
   useReducer   → Manages class-related state.
============================================================ */

import { createContext, useContext, useReducer } from "react";

/* ============================================================
   TOAST / NOTIFICATION
============================================================ */

import { toast } from "react-toastify";

/* ============================================================
   CLASS TYPES
   ------------------------------------------------------------
   ClassContextType:
     Defines what values/functions are exposed through context.

   ClassState:
     Defines the structure of the class state.
============================================================ */

import { ClassContextType, ClassState } from "../types/class.type";

/* ============================================================
   REDUCER + INITIAL STATE
   ------------------------------------------------------------
   classReducer:
     Handles all state changes.

   initialState:
     Provides the default state when the provider starts.
============================================================ */

import classReducer from "../reducer/class.reducer";
import initialState from "../initialstate/class.state";

/* ============================================================
   API SERVICES
   ------------------------------------------------------------
   apiPOST:
     Used for POST API requests.

   apiGET:
     Used for GET API requests.
============================================================ */

import apiPOST, { apiGET } from "@/services/api";

/* ============================================================
   TOAST UTILITIES
   ------------------------------------------------------------
   Centralized toast functions used throughout the application.
============================================================ */

import { showToastError, showToastSuccess } from "@/utils/Toast";
import useModal from "@/store/common/context/modal.context";

/* ============================================================
   CLASS CONTEXT
   ------------------------------------------------------------
   Initially the context value is null.

   Components must use the useClass() hook to access this
   context.
============================================================ */

const ClassContext = createContext<ClassContextType | null>(null);

/* ============================================================
   CLASS PROVIDER
   ------------------------------------------------------------
   This provider contains all class-related:
   - State
   - Form handling
   - API requests
   - Class list
   - Update functionality

   Wrap your class pages/components with this provider so they
   can access the class state and functions.
============================================================ */

export const ClassProvider = ({ children }: { children: React.ReactNode }) => {
  const { closeModal } = useModal();
  /* ------------------------------------------------------------
     REDUCER STATE
     ------------------------------------------------------------
     state:
       Contains classObj, classList, loading, etc.

     dispatch:
       Sends actions to classReducer to update the state.
  ------------------------------------------------------------ */

  const [state, dispatch] = useReducer(classReducer, initialState);

  /* ============================================================
     HANDLE FORM CHANGE
     ------------------------------------------------------------
     Handles changes from:
     - <input>
     - <select>

     Example:
       name = "section"
       value = "A"

     The value is then sent to the reducer.
  ============================================================ */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    /* ----------------------------------------------------------
       Get field name and value from the form element.
    ---------------------------------------------------------- */

    const { name, value } = e.target;

    /* ----------------------------------------------------------
       Send the changed value to the reducer.

       "no" represents the room number and should be stored
       as a Number instead of a String.
    ---------------------------------------------------------- */

    dispatch({
      type: "HANDLE_CHANGE",

      payload: {
        /* Tell TypeScript that name belongs to classObj */
        name: name as keyof ClassState["classObj"],

        /* Convert room number from string to number */
        value: name === "no" ? Number(value) : value,
      },
    });
  };

  /* ============================================================
     HANDLE CLASS CREATE / FORM SUBMIT
     ------------------------------------------------------------
     Sends the class information to the backend API.
  ============================================================ */

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ): Promise<void> => {
    /* ----------------------------------------------------------
       Prevent the browser from refreshing the page when the
       form is submitted.
    ---------------------------------------------------------- */

    e.preventDefault();

    try {
      /* --------------------------------------------------------
         Start loading state.

         The UI can use:
         state.loading

         to display a Loader component.
      -------------------------------------------------------- */

      dispatch({
        type: "SET_LOADING",
      });

      /* --------------------------------------------------------
         CREATE CLASS API REQUEST

         Sends classObj to:

         POST /api/admin/class/class-create
      -------------------------------------------------------- */

      const data = await apiPOST("/api/admin/class/class-create", {
        ...state.classObj,
      });

      /* --------------------------------------------------------
         SUCCESS RESPONSE

         If the backend successfully creates the class:
         - Show success message.
         - Update reducer state.
      -------------------------------------------------------- */

      if (data.success) {
        showToastSuccess(data.message);

        dispatch({
          type: "SET_SUCCESS",
        });
      }
    } catch (error: any) {
      /* --------------------------------------------------------
         ERROR HANDLING

         If API request fails, display the error message.
      -------------------------------------------------------- */

      console.log(error);

      showToastError(error.message);
    }
  };

  /* ============================================================
     GET CLASS LIST
     ------------------------------------------------------------
     Retrieves all classes from the backend and stores them in
     the context state.
  ============================================================ */

  const classList = async () => {
    try {
      /* --------------------------------------------------------
         GET ALL CLASSES

         GET /api/admin/class/class-list
        
      -------------------------------------------------------- */

      dispatch({
        type: "SET_LOADING",
      });

      const data = await apiGET("/api/admin/class/class-list");

      /* --------------------------------------------------------
         STORE CLASSES IN REDUCER

         data.data contains the classes returned by the API.
      -------------------------------------------------------- */

      dispatch({
        type: "SET_CLASS_LIST",
        payload: data.data,
      });
      dispatch({
        type: "SET_SUCCESS",
      });
    } catch (error) {
      /* --------------------------------------------------------
         Handle class-list API errors.
      -------------------------------------------------------- */

      console.error(error);
    }
  };

  /* ============================================================
     HANDLE CLASS UPDATE
     ------------------------------------------------------------
     Updates an existing class.

     id:
       ID of the class that should be updated.

     state.classObj:
       Contains the new class information.
  ============================================================ */

  const handleUpdate = async (e: any, id: any) => {
    /* ----------------------------------------------------------
       Prevent default form submission behaviour.
    ---------------------------------------------------------- */

    e.preventDefault();

    /* ----------------------------------------------------------
       CREATE UPDATE PAYLOAD

       Combine:
       - Current form values
       - ID of the class being updated

       The backend can use updateId to identify which class
       should be modified.
    ---------------------------------------------------------- */

    const payload = {
      ...state.classObj,
    };

    /* ----------------------------------------------------------
       UPDATE CLASS API REQUEST

       Sends the update request to the backend.

       Currently this uses POST:
       POST /api/admin/classes/update
    ---------------------------------------------------------- */

    const res = await fetch(`/api/admin/class/update-class/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });

    /* ----------------------------------------------------------
       CONVERT API RESPONSE INTO JSON
    ---------------------------------------------------------- */

    const data = await res.json();

    /* ----------------------------------------------------------
       SUCCESS RESPONSE

       If update succeeds:
       - Show success notification.
       - Refresh class list.
    ---------------------------------------------------------- */

    if (data.success) {
      toast.success(data.message);
      closeModal();
      classList();

      /* --------------------------------------------------------
         If your Modal context is added later, you can close
         the modal here.

         Example:
         closeModal();
      -------------------------------------------------------- */

      // closeModal();

      /* --------------------------------------------------------
         Refresh class list so the updated class immediately
         appears in the table.
      -------------------------------------------------------- */

      classList();
    }

    /* ----------------------------------------------------------
       ERROR RESPONSE

       If API returns success: false, display the error message.
    ---------------------------------------------------------- */

    if (!data.success) {
      /* --------------------------------------------------------
         NOTE:
         This should ideally be toast.error(), not toast.success(),
         because the operation failed.
      -------------------------------------------------------- */

      toast.error(data.message);
    }
  };

  /* ============================================================
     CONTEXT PROVIDER
     ------------------------------------------------------------
     Exposes the following values to all child components:

     state
       → Class state

     handleChange
       → Form field handler

     handleSubmit
       → Create class

     classList
       → Fetch all classes

     handleUpdate
       → Update existing class
  ============================================================ */

  const viewStudentListClassWise = async (id) => {
    try {
      const response = await fetch(
        `/api/admin/class/view-student-class-wise/${id}`,
      );

      const data = await response.json();

      if (data.success) {
        dispatch({
          type: "VIEW_STUDENT_LIST_CLASS_WISE",
          payload: data.students,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ClassContext.Provider
      value={{
        handleChange,
        state,
        handleSubmit,
        classList,
        handleUpdate,
        viewStudentListClassWise,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

/* ============================================================
   USE CLASS CUSTOM HOOK
   ------------------------------------------------------------
   Instead of writing:

   useContext(ClassContext)

   in every component, we can simply write:

   const { state } = useClass();

   This also protects us from accidentally using the hook
   outside ClassProvider.
============================================================ */

const useClass = () => {
  const context = useContext(ClassContext);

  /* ------------------------------------------------------------
     Make sure useClass() is used inside ClassProvider.
  ------------------------------------------------------------ */

  if (!context) {
    throw new Error("useClass must be used inside ClassProvider");
  }

  return context;
};

/* ============================================================
   EXPORT CUSTOM HOOK
============================================================ */

export default useClass;
