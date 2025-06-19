"use client";
import React, { JSX } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useClickOutside } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/redux/hooks/useSelectorHook";
import { logOut } from "@/redux/features/auth";
import { routes } from "@/constants";
import axios from "axios";
import {
  Squares2X2Icon,
  ClipboardDocumentCheckIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

type HandleShowMobileMenu = {
  handleShowMobileMenu: () => void;
};

interface MenuItem {
  title: string;
  path?: string;
  icon: JSX.Element;
  color: string;
}

const menu: MenuItem[] = [
  {
    title: "Dashboard",
    path: routes.DASHBOARD,
    icon: <Squares2X2Icon className="w-5 h-5" />,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Tasks",
    path: routes.TASK,
    icon: <ClipboardDocumentCheckIcon className="w-5 h-5" />,
    color: "bg-teal-100 text-teal-600",
  },
  {
    title: "Online Firm",
    path: routes.ONLINE_FIRM,
    icon: <BuildingOffice2Icon className="w-5 h-5" />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Appointments",
    path: routes.APPOINTMENTS,
    icon: <CalendarDaysIcon className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Clients",
    path: routes.CLIENTS,
    icon: <UsersIcon className="w-5 h-5" />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Settings",
    path: routes.SETTINGS,
    icon: <Cog6ToothIcon className="w-5 h-5" />,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Log out",
    icon: <ArrowRightOnRectangleIcon className="w-5 h-5" />,
    color: "bg-red-100 text-red-700",
  },
];

export const MobileMenu = ({ handleShowMobileMenu }: HandleShowMobileMenu) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const ref = useClickOutside(() => handleShowMobileMenu());

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      dispatch(logOut());
      router.push(routes.LOGIN);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (item: MenuItem) => {
    if (item.title === "Log out") {
      logout();
    } else {
      router.push(item.path!);
      handleShowMobileMenu();
    }
  };

  return (
    <motion.div
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      transition={{ type: "tween", ease: "linear", duration: 0.3 }}
      className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg"
      ref={ref}
    >
      <div className="px-5 py-5">
          <div className="flex items-center mb-6 px-2">
        <span className="text-xl font-bold text-blue-700">Rafiki</span>
      </div>
        <ul className="space-y-4 text-[16px] font-medium">
          {menu.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.title}>
                <div
                  onClick={() => handleClick(item)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`p-2 rounded-md ${item.color} flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-gray-800">{item.title}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
};
