"use client";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import useTheme from "@/store/admin/context/theme.context";
import useSidebar from "@/store/common/context/toggle.sidebar.context";
import React from "react";
import { BiSolidSchool } from "react-icons/bi";
import {
  FaQuestionCircle,
  FaUserGraduate,
  FaCheckCircle,
  FaBuilding,
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaCertificate,
  FaBus,
  FaEnvelopeOpenText,
  FaRupeeSign,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
} from "react-icons/fa";

import { PiStudent, PiUserListBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { LuCassetteTape } from "react-icons/lu";
import { MdBusAlert, MdDashboard, MdEmojiTransportation } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen } = useSidebar();
  const { theme } = useTheme();
  const navData = [
    {
      id: 0,
      name: "Dashboard",
      link: "/admin/dashboard",
      icon: <MdDashboard size={18} />,
    },
    {
      id: 1,
      name: "Enquiries List",
      link: "/admin/enquiry/enquiry-list",
      icon: <FaEnvelopeOpenText size={18} />,
    },
    {
      id: 2,
      name: "Add School",
      link: "/admin/school/school-create",
      icon: <FaBuilding size={18} />,
    },
    {
      id: 3,
      name: "School List",
      link: "/admin/school/school-list",
      icon: <BiSolidSchool size={18} />,
    },
    {
      id: 4,
      name: "Add Class",
      link: "/admin/class/class-create",
      icon: <SiGoogleclassroom size={18} />,
    },
    {
      id: 5,
      name: "Class List",
      link: "/admin/class/class-list",
      icon: <LuCassetteTape size={18} />,
    },
    {
      id: 6,
      name: "Add User",
      link: "/admin/user/user-create",
      icon: <FaUserGraduate size={18} />,
    },
    {
      id: 56,

      name: "Add Transport",
      link: "/admin/transport/create-transport",
      icon: <MdEmojiTransportation size={18} />,
    },
    {
      id: 57,

      name: "Transport List",
      link: "/admin/transport/transport-list",
      icon: <MdBusAlert size={18} />,
    },
    {
      id: 17,
      name: "Add Fee",
      link: "/admin/fee/fee-create",
      icon: <FaMoneyBillWave size={18} />,
    },
    {
      id: 18,
      name: "Fee Structure List",
      link: "/admin/fee/fee-list",
      icon: <FaFileInvoiceDollar size={18} />,
    },
    {
      id: 7,
      name: "User List",
      link: "/admin/user/user-list",
      icon: <PiUserListBold size={18} />,
    },

    {
      id: 8,
      name: "Student List",
      link: "/admin/student/student-list",
      icon: <PiStudent size={18} />,
    },
    {
      id: 9,
      name: "Teacher List",
      link: "/dashboard/admin/teacher/teacher-list",
      icon: <FaChalkboardTeacher size={18} />,
    },
    {
      id: 10,
      name: "Class Teacher List",
      link: "/dashboard/admin/teacher/class-teacher-list",
      icon: <FaChalkboardTeacher size={18} />,
    },
    {
      id: 11,
      name: "Certificates",
      link: "/dashboard/admin/tc/tc-register",
      icon: <FaCertificate size={18} />,
    },
  ];
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

export default AdminLayout;
