"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
//icons
import { GiEarthAfricaEurope } from "react-icons/gi";
import { MdCalendarToday, MdPerson, MdOutlineReviews, MdHomeFilled } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { IoIosDocument, IoIosTrendingUp, IoMdSettings } from "react-icons/io";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#f4f4f5] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/images/Logo.png"}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard Start --> */}
              <li>
                <Link
                  href="/"
                  className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#06377b] dark:hover:bg-meta-4 ${
                    pathname.includes("/") &&
                    "bg-white dark:bg-meta-4 text-[#06377b]"
                  }`}
                >
                  <MdHomeFilled />
                  Dashboard
                </Link>
              </li>
              {/* <!-- Menu Item Dashboard End --> */}

              {/* <!-- Menu Item tour --> */}
              <li>
                <Link
                  href="/tours"
                  className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#06377b] dark:hover:bg-meta-4 ${
                    pathname.includes("tour") &&
                    "bg-white dark:bg-meta-4 text-[#06377b]"
                  }`}
                >
                  <GiEarthAfricaEurope />
                  Tour
                </Link>
              </li>
              {/* <!-- Menu Item tour --> */}

              {/* <!-- Menu Item Bookings --> */}
              <li>
                <Link
                  href="/bookings"
                  className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#06377b] dark:hover:bg-meta-4 ${
                    pathname.includes("bookings") &&
                    "bg-white dark:bg-meta-4 text-[#06377b]"
                  }`}
                >
                  <MdCalendarToday />
                  Bookings
                </Link>
              </li>
              {/* <!-- Menu Item Bookings --> */}

              {/* <!-- Menu Item Vehicles --> */}
              <li>
                <Link
                  href="/vehicles"
                  className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#06377b] dark:hover:bg-meta-4 ${
                    pathname.includes("vehicles") &&
                    "bg-white dark:bg-meta-4 text-[#06377b]"
                  }`}
                >
                  <FaCar />
                  Vehicles
                </Link>
              </li>
              {/* <!-- Menu Item Vehicles --> */}

              {/* <!-- Menu Item Blogs --> */}
              <li>
                <Link
                  href="/blogs"
                  className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#06377b] dark:hover:bg-meta-44 ${
                    pathname.includes("blogs") &&
                    "bg-white dark:bg-meta-4 text-[#06377b]"
                  }`}
                >
                  <IoIosDocument />
                  Blogs
                </Link>
              </li>
              {/* <!-- Menu Item Blogs --> */}

              {/* <!-- Menu Item Reports --> */}
              <li>
                <Link
                  href="/reports"
                  className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#06377b] dark:hover:bg-meta-4 ${
                    pathname.includes("reports") &&
                    "bg-white dark:bg-meta-4 text-[#06377b]"
                  }`}
                >
                  <IoIosTrendingUp />
                  Reports
                </Link>
              </li>
              {/* <!-- Menu Item Reports --> */}

              {/* <!-- Menu Item Agents --> */}
              <li>
                <Link
                  href="/agents"
                  className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#06377b] dark:hover:bg-meta-4 ${
                    pathname.includes("agents") &&
                    "bg-white dark:bg-meta-4 text-[#06377b]"
                  }`}
                >
                  <MdPerson />
                  Agents
                </Link>
              </li>
              {/* <!-- Menu Item Agents --> */}

              {/* <!-- Menu Item Reviews --> */}
              <li>
                <Link
                  href="/reviews"
                  className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#06377b] dark:hover:bg-meta-4 ${
                    pathname.includes("reviews") &&
                    "bg-white dark:bg-meta-4 text-[#06377b]"
                  }`}
                >
                  <MdOutlineReviews />
                  Reviews
                </Link>
              </li>
              {/* <!-- Menu Item Reviews --> */}

              {/* <!-- Menu Item Settings --> */}
              <li>
                <Link
                  href="/settings"
                  className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#06377b] dark:hover:bg-meta-4 ${
                    pathname.includes("settings") &&
                    "bg-white dark:bg-meta-4 text-[#06377b]"
                  }`}
                >
                  <IoMdSettings />
                  Settings
                </Link>
              </li>
              {/* <!-- Menu Item Settings --> */}

              {/* 
                ===============================================================================
                =================== Aabove ones are the neccessory ones --
                =================== Below ones are the components that we needs to customize -- 
                =================== DELETE them after implementing the above code -- 
                 ==============================================================================
              */}


              {/* HERE */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
