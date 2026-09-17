"use client";
import React, { createContext, useContext, useReducer } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LoginContext, LoginState } from "../types/auth.type";
import AuthReducer from "../reducer/auth.reducer";

const initialState: LoginState = {
  isLoading: {
    loading: false,
    message: "",
  },
  loginObj: {
    role: "",
    email: "",
    password: "",
  },
  userObj: {
    userName: "",
    emaiL: "",
    photo: null,
  },
};

export const AuthContext = createContext<LoginContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const router = useRouter();

  const handleLoginChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    dispatch({
      type: "HANDLE_LOGIN_CHANGE",
      payload: {
        name: e.target.name as any,
        value: e.target.value,
      },
    });
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({
      type: "SET_LOADING",
      payload: {
        loading: true,
        message: "Logging in...",
      },
    });

    try {
      const res = await signIn("credentials", {
        email: state.loginObj.email,
        password: state.loginObj.password,
        role: state.loginObj.role,
        redirect: false,
      });

      // ✅ Correct check
      if (!res?.ok) {
        toast.error(res?.error || "Invalid credentials");

        dispatch({
          type: "SET_LOADING",
          payload: {
            loading: false,
            message: res?.error || "Login failed",
          },
        });

        return;
      }

      // ✅ SUCCESS → DO NOT fetch session here
      dispatch({
        type: "SET_SUCCESS",
        payload: {
          loading: false,
          message: "Login successful",
        },
      });

      // 👉 Just redirect to a common route
      router.push("/redirect");
    } catch (error) {
      dispatch({
        type: "SET_LOADING",
        payload: {
          loading: false,
          message: "Something went wrong",
        },
      });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        state,
        handleLoginChange,
        handleLoginSubmit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("error while contexting");
  }
  return context;
};

export default useAuth;
