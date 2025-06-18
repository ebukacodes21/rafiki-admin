"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { useAppDispatch } from "@/redux/hooks/useSelectorHook";
import { logOut } from "@/redux/features/auth";
import { routes } from "@/constants";
import { apiCall } from "@/utils/helper";

const menuItems = [
  {
    title: "Dashboard",
    path: routes.DASHBOARD,
    icon: <MdOutlineDashboardCustomize size={20} />,
  },
  { title: "Tasks", path: routes.TASK, icon: <FaTasks size={20} /> },
  {
    title: "Online Firm",
    path: routes.ONLINE_FIRM,
    icon: <HiBuildingOffice2 size={20} />,
  },
];

const SideMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const logout = async () => {
    try {
      await apiCall("/api/logout", "GET");
      dispatch(logOut());
      router.push(routes.LOGIN);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="w-full h-full flex flex-col px-4 py-5 pb-6 text-gray-800">
      {/* Menu items */}
      <ul className="space-y-2 text-sm flex-grow">
        {menuItems.map(({ title, path, icon }) => {
          const isActive = pathname === path;

          return (
            <li key={title}>
              <Link
                href={path}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gray-100 text-primary font-semibold"
                    : "hover:bg-gray-50"
                }`}
              >
                {icon}
                <span>{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout button pinned at the bottom */}
      <div className="pt-6 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-2 w-full rounded-lg hover:bg-gray-50 font-semibold text-gray-600 transition-colors cursor-pointer"
        >
          <VscSignOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </nav>
  );
};

export default React.memo(SideMenu);
