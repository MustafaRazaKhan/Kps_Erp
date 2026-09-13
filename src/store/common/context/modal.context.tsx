"use client";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext<any | null>(null);

export const ModalProvider = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const openModal = (id: any) => {
    // console.log("open",id)
    setOpen(true);
    setUpdateId(id);
  };
  const closeModal = () => {
    setOpen(false);
    setUpdateId("");
  };
  return (
    <ModalContext.Provider
      value={{ open, setOpen, updateId, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Model Context is Required");
  }
  return context;
};

export default useModal;
