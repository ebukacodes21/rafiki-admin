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
  BuildingOffice2Icon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

type HandleShowMobileMenu = {
  handleShowMobileMenu: () => void;
};

interface MenuItem {
  title: string;
  path?: string;
  icon: JSX.Element;
}

const menu: MenuItem[] = [
  {
    title: "Dashboard",
    path: routes.DASHBOARD,
    icon: <Squares2X2Icon className="w-5 h-5" />,
  },
  {
    title: "Consultations",
    path: routes.CONSULTATIONS,
    icon: <BriefcaseIcon className="w-5 h-5" />,
  },
  {
    title: "Office Hours",
    path: routes.OFFICER_HOURS,
    icon: <CalendarDaysIcon className="w-5 h-5" />,
  },
  // {
  //   title: "Clients",
  //   path: routes.CLIENTS,
  //   icon: <UsersIcon className="w-5 h-5" />,
  // },
  // {
  //   title: "Law Firm",
  //   path: routes.LAW_FIRM,
  //   icon: <BuildingOffice2Icon className="w-5 h-5" />,
  // },
  {
    title: "Settings",
    path: routes.SETTINGS,
    icon: <Cog6ToothIcon className="w-5 h-5" />,
  },
  {
    title: "Log out",
    icon: <ArrowRightOnRectangleIcon className="w-5 h-5" />,
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
      className="fixed top-0 left-0 w-64 h-full z-50 backdrop-blur-md bg-transparent"
      ref={ref}
    >
      <div className="px-5 py-5">
        <div className="flex items-center mb-6 px-2">
          <span className="text-xl font-bold">Rafiki</span>
        </div>
        <ul className="space-y-2 text-[16px] font-medium">
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
                  <div className="p-2 rounded-md bg-black text-white flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-black">{item.title}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
};