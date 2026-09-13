"use client";
import useSidebar from "@/store/common/context/toggle.sidebar.context";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ menuData }: any) => {
  const pathname = usePathname();
  const { isSidebarOpen } = useSidebar();

  return (
    <aside
      className={`${
        isSidebarOpen
          ? "w-0"
          : "w-[45%] sm:w-[50%] md:w-[25%] lg:w-[12%] xl:w-[12%] 2xl:w-[12%]"
      }  border-r border-slate-200/60 transition-all duration-300 overflow-hidden  `}
    >
      <div className="h-full flex flex-col">
        {/* Logo Section */}
        <div className="px-2 py-4.5 border-b border-slate-200/60 flex items-center gap-2">
          <img
            src="/hero.jpg"
            alt="admin-logo"
            className="w-10 h-10 rounded object-cover "
          />
          <div className="leading-tight">
            <h2 className="text-sm font-semibold ">ERP System</h2>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-1 py-2 space-y-.5">
          {menuData.map((item: any) => {
            const isActive = pathname === item.link;

            return (
              <Link
                key={item.id}
                href={item.link}
                className={`  group flex items-center gap-6 rounded px-2 py-3 text-sm transition-all duration-200 ${
                  isActive
                    ? "  border border-gray-200"
                    : " hover:bg-slate-200/60 hover:text-slate-900"
                }`}
                title={`${item.name}`}
              >
                {/* Icon */}
                <span
                  className={`text-[18px] transition ${isActive ? "" : ""}`}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span className="truncate">{item.name}</span>

                {/* Active Indicator */}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-black"></span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
