"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useAppDispatch } from "@/redux/hooks/useSelectorHook";
import { logOut } from "@/redux/features/auth";
import { routes } from "@/constants";
import { apiCall } from "@/utils/helper";
import {
  Squares2X2Icon,
  ScaleIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
  PowerIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";

const menuItems = [
  {
    title: "Dashboard",
    path: routes.DASHBOARD,
    icon: <Squares2X2Icon className="w-5 h-5" />,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Service Types",
    path: routes.SERVICE_TYPES,
    icon: <ScaleIcon className="w-5 h-5" />,
    color: "bg-teal-100 text-teal-600",
  },
  {
    title: "Consultations",
    path: routes.CONSULTATIONS, 
    icon: <BriefcaseIcon className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Office Hours",
    path: routes.OFFICER_HOURS, 
    icon: <CalendarDaysIcon className="w-5 h-5" />,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Clients",
    path: routes.CLIENTS,
    icon: <UsersIcon className="w-5 h-5" />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Law Firm",
    path: routes.LAW_FIRM,
    icon: <BuildingOffice2Icon className="w-5 h-5" />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Settings",
    path: routes.SETTINGS,
    icon: <Cog6ToothIcon className="w-5 h-5" />,
    color: "bg-pink-100 text-pink-600",
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
    <nav className="w-full h-full flex flex-col px-5 py-6 bg-white shadow-sm">
      <div className="flex items-center mb-6 px-2">
        <span className="text-xl font-bold text-blue-700">Rafiki</span>
      </div>
      <ul className="space-y-2 text-sm flex-grow">
        {menuItems.map(({ title, path, icon, color }) => {
          const isActive = pathname === path;

          return (
            <li key={title}>
              <Link
                href={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gray-100 "
                    : "hover:bg-gray-100"
                }`}
              >
                <div
                  className={`p-2 rounded-md text-lg ${
                    isActive ? `${color} bg-gray-100` : color
                  }`}
                >
                  {icon}
                </div>
                <span className="font-medium">{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="pt-6 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center cursor-pointer gap-3 px-4 py-2 w-full rounded-xl hover:bg-red-50 text-red-600 font-semibold transition-all"
        >
          <PowerIcon className="w-5 h-5 text-red-600" />
          <span>Log out</span>
        </button>
      </div>
    </nav>
  );
};

export default React.memo(SideMenu);
