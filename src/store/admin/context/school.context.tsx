"use client";

import { createContext, useContext, useReducer } from "react";
import { toast } from "react-toastify";

import { SchoolContextType, SchoolState } from "../types/school.type";
import initialState from "../initialstate/school.state";
import schoolReducer from "../reducer/school.reducer";

// Create School Context
const SchoolContext = createContext<SchoolContextType | null>(null);

const SchoolProvider = ({ children }: { children: React.ReactNode }) => {
  // Global state management using useReducer
  const [state, dispatch] = useReducer(schoolReducer, initialState);

  /**
   * Handle text input changes
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    dispatch({
      type: "HANDLE_CHANGE",
      payload: {
        name: name as keyof SchoolState["schoolObj"],
        value,
      },
    });
  };

  /**
   * Handle file input changes
   */
  const handleFileChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.files[0];

    dispatch({
      type: "HANDLE_FILE_CHANGE",
      payload: { name, value },
    });
  };

  /**
   * Register a new school
   */
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state.schoolObj);

    // Create FormData for file upload
    const formData = new FormData();

    formData.append("name", state.schoolObj.name);
    formData.append("code", state.schoolObj.code);
    formData.append("contact", state.schoolObj.contact);
    formData.append("email", state.schoolObj.email);
    formData.append("address", state.schoolObj.address);

    // Append image only if selected
    if (state.schoolObj.image) {
      formData.append("image", state.schoolObj.image);
    }

    // Send request to backend
    const res = await fetch("/api/admin/school/school-create", {
      method: "POST",
      body: formData,
      // Don't set Content-Type manually when using FormData
    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  /**
   * Fetch all schools
   */
  const schoolList = async () => {
    try {
      dispatch({ type: "SET_LOADING" });

      const res = await fetch("/api/school-list");
      const data = await res.json();
      console.log(data, "school");

      dispatch({
        type: "SET_SCHOOL",
        payload: data.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Delete a school
   */
  const handleDelete = async (id: any) => {
    if (!id) return;

    try {
      const payload = {
        deleteId: id,
      };

      // Send delete request
      const response = await fetch("/api/admin/school/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("School deleted successfully.");

      // Refresh school list
      schoolList();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete school.");
    }
  };

  return (
    <SchoolContext.Provider
      value={{
        state,
        handleFileChange,
        handleChange,
        handleSubmit,
        schoolList,
        handleDelete,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

/**
 * Custom hook to access School Context
 */
const useSchool = () => {
  const context = useContext(SchoolContext);

  if (!context) {
    throw new Error("useSchool must be used inside SchoolProvider");
  }

  return context;
};

export { SchoolProvider };
export default useSchool;
