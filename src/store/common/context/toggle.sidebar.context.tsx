"use client";
import { useContext, useState, createContext } from "react";
import { ToggleSidebarType } from "../types/toggle.sidebar.types";

const ToggleSidebar = createContext<ToggleSidebarType | null>(null);

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [view, setView] = useState("list");

  const handleSidebar = () => {
    // console.log("clicked");
    setIsSidebarOpen((prev) => !prev);
  };
  const handleView = (type: any) => {
    setView(type);
  };

  return (
    <ToggleSidebar.Provider
      value={{ isSidebarOpen, handleSidebar, handleView, view }}
    >
      {children}
    </ToggleSidebar.Provider>
  );
};

const useSidebar = () => {
  const context = useContext(ToggleSidebar);

  if (!context) {
    throw new Error("Error: Sidebar must be used inside SidebarProvider");
  }

  return context;
};
export default useSidebar;

export { SidebarProvider };
