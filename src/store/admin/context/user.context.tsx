"use client";

import { createContext, useContext, useReducer } from "react";
import { UserContextType, UserState } from "../types/user.type";
import userReducer from "../reducer/user.reducer";
import initialState from "../initialstate/user.state";
import apiPOST from "@/services/api";
import { showToastError, showToastSuccess } from "@/utils/Toast";

const UserContext = createContext<UserContextType | null>(null);
// ================= INITIAL STATE =================

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // HANDLE INPUT
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    dispatch({
      type: "HANDLE_CHANGE",
      payload: {
        name: name as keyof UserState["userObj"],
        value,
      },
    });
  };

  // CREATE USER
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //   dispatch({
      //     type: "SET_LOADING",
      //     payload: {
      //       loading: true,
      //       message: "Please wait...",
      //     },
      //   });
      // console.log(state.userObj.role)
      if (
        state.userObj.role == "Select Role" ||
        state.userObj.role == undefined
      ) {
        // toast.error("Role is Required");
        showToastError("Role is Required");
        return;
      }

      const data = await apiPOST("/api/admin/user/user-create", {
        ...state.userObj,
      });

      if (data.success) {
        showToastSuccess(data.message);
        // dispatch({
        //   type: "SET_SUCCESS",
        //   payload: {
        //     loading: false,
        //     message: "",
        //   },
        // });

        // toast.success(data.message);
      }
    } catch (error: any) {
      showToastError(error.message);
    }
  };

  // GET USERS (PAGINATION)
  const userList = async (page: number = 1) => {
    try {
      const res = await fetch(`/api/admin/user/user-list?page=${1}&limit=10`);

      const data = await res.json();
      // console.log(data);

      dispatch({
        type: "SET_USERS",
        payload: {
          //  users: UserListType[];
          //       totalDocs: number;
          //       limit: number;
          //       totalPages: number;
          //       page: number;
          //       counter: number;
          //       hasPrevPage: boolean;
          //       hasNextPage: boolean;
          //   totalDocs:0,
          // limit:10,
          // totalPages: 0,
          // page: 1,
          // counter:0,
          // hasPrevPage :false,
          // hasNextPage:false,
          userList: data.data,
          //   totalDocs: data.totalDocs,
          //   limit: data.limit,
          //   totalPages: data.totalPages,
          //   page: data.page,
          //   counter: data.counter,
          //   hasPrevPage: data.hasPrevPage,
          //   hasNextPage: data.hasNextPage,
          //   prevPage: data.prevPage,
          //   nextPage: data.nextPage,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  // update status
  const handleUpdate = async (id: any, status: any) => {
    try {
      const payload = {
        updateId: id,
        status: status ? "true" : "false",
      };
      console.log("first", payload);

      const res = await fetch("/api/admin/user/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      //   if (data.success) {
      //     toast.success(data.message);
      //     getAllUser();
      //   }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        state,
        handleChange,
        handleSubmit,
        userList,
        handleUpdate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// HOOK
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
};
