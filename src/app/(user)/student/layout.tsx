"use client";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import useTheme from "@/store/admin/context/theme.context";
import useSidebar from "@/store/common/context/toggle.sidebar.context";
import React from "react";
import { FaBook, FaRupeeSign } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
const navData = [
  {
    id: 0,
    name: "Dashboard",
    link: "/admin/dashboard",
    icon: <MdDashboard size={18} />,
  },
  {
    id: 1,
    name: "Fee Installments",
    link: "/student/add-new-fee-installment",
    icon: <FaRupeeSign size={18} />,
  },
  {
    id: 3,
    name: "Fee Installments List",
    link: "/student/fee-installment-list",
    icon: <FaRupeeSign size={18} />,
  },
  {
    id: 2,
    name: "Book Issue",
    link: "/student/add-new-book-issued",
    icon: <FaBook size={18} />,
  },
];

const StudentLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen } = useSidebar();
  const { theme } = useTheme();
  //   const toggle = true;
  return (
    <div
      className={`flex min-h-screen w-fulltransition-colors duration-1000 ease-in-out ${
        theme ? "bg-slate-900" : "bg-white"
      }`}
    >
      <Sidebar menuData={navData} />
      <div
        className={`${
          isSidebarOpen
            ? "w-full"
            : "w-[55%] sm:w-[50%] md:w-[75%] lg:w-[88%] xl:w-[88%] 2xl:w-[88%]"
        } transition-all duration-300 flex flex-col`}
      >
        <Topbar />

        <main className="flex-1 p-1">
          <div className="min-h-full  p-1">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
