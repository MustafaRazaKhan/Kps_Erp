"use client";

import useSidebar from "@/store/common/context/toggle.sidebar.context";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ menuData }: any) => {
  const pathname = usePathname();
  const { isSidebarOpen } = useSidebar();
  // className={`${
  //       isSidebarOpen
  //         ? "w-0"
  //         : "w-[45%] sm:w-[50%] md:w-[25%] lg:w-[12%] xl:w-[12%] 2xl:w-[12%]"
  //     }  border-r border-slate-200/60 transition-all duration-300 overflow-hidden  `}

  return (
    <aside
      className={`
        ${
          isSidebarOpen
            ? "w-0"
            : "w-[45%] sm:w-[50%] md:w-[25%] lg:w-[12%] xl:w-[12%] 2xl:w-[12%]"
        }
        relative shrink-0
        overflow-hidden
        border-r border-amber-100
        bg-[#faf9f5]
        transition-all duration-300
      `}
    >
      <div className="flex h-full min-h-0 flex-col">
        {/* =====================================================
            BRAND
        ===================================================== */}

        <div className="border-b border-amber-100 bg-gradient-to-br from-[#fffdf5] via-[#fff8dc] to-[#f8f0d0] px-3 py-[22px]">
          <div className="flex items-center gap-2.5">
            {/* Logo */}

            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/70 shadow-sm ring-1 ring-amber-200/70">
              <img
                src="/hero.jpg"
                alt="admin-logo"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Brand */}

            <div className="min-w-0 leading-tight">
              <h2 className="truncate text-sm font-bold text-gray-900">
                ERP System
              </h2>

              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-700">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <div className="mb-3 px-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Main Menu
            </p>
          </div>

          <div className="space-y-1">
            {menuData.map((item: any) => {
              const isActive = pathname === item.link;

              return (
                <Link
                  key={item.id}
                  href={item.link}
                  title={item.name}
                  className={`
                    group relative flex items-center gap-3
                    rounded-xl px-2.5 py-2.5
                    text-xs font-medium
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-amber-100/60 text-amber-800"
                        : "text-slate-500 hover:bg-amber-50/60 hover:text-slate-800"
                    }
                  `}
                >
                  {/* =================================================
                      ACTIVE INDICATOR
                  ================================================== */}

                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-amber-600" />
                  )}

                  {/* =================================================
                      ICON
                  ================================================== */}

                  <span
                    className={`
                      flex h-8 w-8 shrink-0
                      items-center justify-center
                      rounded-lg
                      transition-all duration-200

                      ${
                        isActive
                          ? "bg-amber-100/70 text-amber-700"
                          : "text-slate-400 group-hover:bg-amber-100/50 group-hover:text-amber-700"
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  {/* =================================================
                      LABEL
                  ================================================== */}

                  <span className="min-w-0 flex-1 truncate">{item.name}</span>

                  {/* =================================================
                      ACTIVE DOT
                  ================================================== */}

                  {isActive && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600/70" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="border-t border-amber-100 bg-white/30 px-2.5 py-3">
          <div className="rounded-xl border border-amber-100/70 bg-amber-50/40 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100/70">
                <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-gray-700">
                  System Online
                </p>

                <p className="truncate text-[9px] text-gray-400">School ERP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
