"use client";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { EnquiryContextType, EnquiryObj } from "../types/enquiry.types";
import initialState from "../initialstate/enquiry.state";
import enquiryReducer from "../reducer/enquiry.reducer";
import { apiGET, apiPOST } from "@/services/api";
import { showToastError, showToastSuccess } from "@/utils/Toast";
import useModal from "./modal.context";

// Create Context
const EnquiryContext = createContext<EnquiryContextType | null>(null);

// Provider Component
const EnquiryProvider = ({ children }: { children: React.ReactNode }) => {
  const [comment, setComment] = useState("");
  // Reducer State
  const [state, dispatch] = useReducer(enquiryReducer, initialState);
  const { closeModal } = useModal();

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    dispatch({
      type: "HANDLE_CHANGE",
      payload: {
        name: name as keyof EnquiryObj,
        value,
      },
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch({
        type: "SET_LOADING",
      });

      // console.log(state.enquiryObj);
      const data = await apiPOST("/api/enquiry", {
        ...state.enquiryObj,
      });
      //   console.log(data);
      if (data.success) {
        showToastSuccess(data.message);
        dispatch({
          type: "SET_SUCCESS",
        });
        dispatch({
          type: "ENQUIRY_RESET",
        });
      }
    } catch (error: any) {
      // console.log(error.message);
      showToastError(error.message);
    } finally {
      dispatch({
        type: "SET_SUCCESS",
      });
    }
  };
  const enquiryList = async () => {
    try {
      dispatch({
        type: "SET_LOADING",
      });

      // console.log(state.enquiryObj);
      const data = await apiGET("/api/enquiry");
      // console.log(data);
      if (data.success) {
        dispatch({
          type: "SET_ENQUIRIES",
          payload: {
            data: data.data,
            totalEnquiries: data.totalEnquiries,
          },
        });
        dispatch({
          type: "SET_SUCCESS",
        });
      }
    } catch (error: any) {
      // console.log(error.message);
      showToastError(error.message);
    } finally {
      dispatch({
        type: "SET_SUCCESS",
      });
    }
  };
  useEffect(() => {
    enquiryList();
  }, []);

  const handleUpdate = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    console.log("ID:", id);
    console.log("clicked");

    try {
      const res = await fetch(`/api/enquiry/update-enquiry/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });

      const data = await res.json();

      console.log("Response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to update enquiry");
      }

      // console.log("Enquiry updated successfully");
      if (data.success) {
        showToastSuccess(data.message);
        closeModal();
        enquiryList();
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDelete = async (id: any) => {
    console.log(id);
    const res = await fetch(`/api/enquiry/delete-enquiry/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.success) {
      showToastSuccess(data.message);
      enquiryList();
    }
  };
  return (
    <EnquiryContext.Provider
      value={{
        state,
        handleChange,
        handleSubmit,
        handleUpdate,
        setComment,
        handleDelete,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

// Custom Hook
const useEnquiry = () => {
  const context = useContext(EnquiryContext);

  if (!context) {
    throw new Error("useEnquiry must be used inside EnquiryProvider");
  }

  return context;
};

export { EnquiryProvider };
export default useEnquiry;
