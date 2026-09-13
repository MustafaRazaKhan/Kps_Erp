"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { toast } from "react-toastify";
import { StudentContextType } from "../types/student.type";
import studentReducer from "../reducer/student.reducer";
import initialState from "../initialstate/student.state";

const StudentContext = createContext<StudentContextType | null>(null);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);
  // const { updateId } = useModal();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    // console.log(e.target.value);
    dispatch({
      type: "HANDLE_CHANGE",
      payload: {
        name: e.target.name as any,
        value: e.target.value,
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    dispatch({
      type: "HANDLE_CHANGE",
      payload: {
        name: "photo",
        value: file,
      },
    });
  };

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
    id: string,
  ) => {
    e.preventDefault();
    // console.log("id?????", id);

    try {
      const form = state.studentObj;

      const formData = new FormData();

      // append all fields
      Object.entries(form).forEach(([key, value]) => {
        if (key === "photo" || key === "userId") return;

        formData.append(key, String(value));
      });

      // append file
      if (form.photo) {
        formData.append("photo", form.photo);
      }
      // console.log(state.studentObj);
      formData.append("userId", id);
      console.log(state.studentObj.busRoute);

      const res = await fetch("/api/admin/student/profile-create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      // console.log(data);

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      if (data.success) {
        toast.success("Student profile Create Successfully");
      }
      if (!data.success) {
        toast.error(data.message);
      }

      // optional reset
      // dispatch({ type: "RESET_FORM" });
    } catch (error: any) {
      console.error("SUBMIT ERROR:", error);
      alert(error.message || "Failed to register student");
    }
  };
  /* ================= GET ALL STUDENTS ================= */

  const studentList = async () => {
    try {
      // dispatch({ type: "SET_LOADING", payload: true });

      const res = await fetch("/api/admin/student/student-list");
      console.log(res);
      const data = await res.json();
      console.log(data, "student-list");

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch students");
      }

      dispatch({
        type: "SET_STUDENTS",
        payload: data?.data,
      });
    } catch (error: any) {
      console.error("FETCH ERROR:", error);
    } finally {
      // dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  const studentDetail = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/student/view-detail/${id}`);

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch student");
      }

      dispatch({
        type: "SET_SINGLE_STUDENT",
        payload: data.data,
      });
    } catch (error: any) {
      console.error("FETCH ERROR:", error);
    }
  };
  // const handleUpdate = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData();
  //     const form = state.studentObj;

  //     Object.entries(form).forEach(([key, value]) => {
  //       if (key === "photo") return;
  //       formData.append(key, String(value));
  //     });

  //     // file
  //     if (form.photo) {
  //       formData.append("photo", form.photo);
  //     }

  //     // IMPORTANT: send updateId if editing
  //     if (updateId) {
  //       formData.append("updateId", updateId);
  //     }

  //     const res = await fetch("/api/admin/student/update-student", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await res.json();

  //     if (!res.ok) throw new Error(data.message);

  //     if (data.success) {
  //       toast.success(data.message || "Success");
  //       getStudents();
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error: any) {
  //     console.error(error);
  //     toast.error(error.message || "Something went wrong");
  //   }
  // };
  // const filterStudents = (data: any) => {
  //   console.log("data", data);
  //   dispatch({
  //     type: "FILTER_STUDENT",
  //     payload: data,
  //   });
  // };
  // const getStudentsClassWise = async (id: any) => {
  //   try {
  //     const response = await fetch(`/api/admin/student/view-students/${id}`, {
  //       method: "GET",
  //     });

  //     const data = await response.json();

  //     console.log(data);

  //     if (data.success) {
  //       dispatch({
  //         type: "SET_STUDENTS_CLASS_WISE",
  //         payload: { data: data.students },
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <StudentContext.Provider
      value={{
        state,
        // getStudent,
        handleChange,
        handleFileChange,
        handleSubmit,
        studentList,
        studentDetail,
        // getStudents,
        // handleUpdate,
        // filterStudents,
        // getStudentsClassWise,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("StudentContext must be used inside StudentProvider");
  }

  return context;
};
