"use client";

import useSidebar from "@/store/common/context/toggle.sidebar.context";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ menuData }: any) => {
  const pathname = usePathname();
  const { isSidebarOpen } = useSidebar();

  return (
    <aside
      className={`
        ${
          isSidebarOpen
            ? "w-0"
            : "w-[45%] sm:w-[50%] md:w-[25%] lg:w-[14%] xl:w-[13%] 2xl:w-[12%]"
        }
        relative shrink-0 overflow-hidden
        border-r border-[#e9dfc7]
        bg-[#fffdf8]
        transition-all duration-300
      `}
    >
      <div className="flex h-full min-h-0 flex-col">
        {/* =====================================================
            BRAND
        ====================================================== */}

        <div className="border-b border-[#eee6d2] bg-[#fffaf0] px-3 py-5">
          <div className="flex items-center gap-2.5">
            {/* Logo */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#eadfbe] bg-white shadow-sm">
              <img
                src="/hero.jpg"
                alt="Krishna Public School"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Brand */}
            <div className="min-w-0 leading-tight">
              <h2 className=" text-sm font-bold text-stone-800">
                Krishna Public
              </h2>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#aa8127]">
                School ERP
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <div className="mb-3 px-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-stone-400">
              Main Menu
            </p>
          </div>

          <div className="space-y-1">
            {menuData.map((item: any) => {
              const isActive =
                pathname === item.link ||
                (item.link !== "/" && pathname.startsWith(`${item.link}/`));

              return (
                <Link
                  key={item.id}
                  href={item.link}
                  title={item.name}
                  className={`
                    group relative flex items-center gap-2.5
                    rounded-xl px-2 py-2
                    text-xs font-medium
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-[#f8edc9] text-[#8f6d20] shadow-sm"
                        : "text-stone-500 hover:bg-[#fff8e7] hover:text-stone-800"
                    }
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#c49a35]" />
                  )}

                  {/* Icon */}
                  <span
                    className={`
                      flex h-8 w-8 shrink-0 items-center
                      justify-center rounded-lg
                      transition-all duration-200

                      ${
                        isActive
                          ? "bg-white text-[#b3882d] shadow-sm"
                          : "text-stone-400 group-hover:bg-white group-hover:text-[#b3882d]"
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  {/* Label */}
                  <span className="min-w-0 flex-1 ">{item.name}</span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="mr-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c49a35]" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* =====================================================
            SYSTEM STATUS
        ====================================================== */}

        <div className="border-t border-[#eee6d2] bg-[#fffaf0] px-2.5 py-3">
          <div className="rounded-xl border border-[#eadfbe] bg-white px-3 py-2.5 shadow-sm">
            <div className="flex items-center gap-2.5">
              {/* Status Icon */}
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#fff5d4]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500/80" />
                </span>
              </div>

              {/* Status */}
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-stone-700">
                  System Online
                </p>

                <p className="mt-0.5  text-[9px] text-stone-400">School ERP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
