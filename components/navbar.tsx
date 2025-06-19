"use client";

import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";
import { UserPlusIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MobileMenu } from "./mobile-menu";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentUser } from "@/redux/features/auth";

const Nav = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const admin = useAppSelector(selectCurrentUser);

  const handleShowMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div className="flex justify-end mr-5">
        <div className="flex justify-between items-center gap-2">
          {/* Mobile toggle */}
          <div className="lg:hidden">
            {showMobileMenu ? (
              <XMarkIcon
                onClick={handleShowMobileMenu}
                className="text-gray-700 w-8 h-8 cursor-pointer"
              />
            ) : (
              <Bars3Icon
                onClick={handleShowMobileMenu}
                className="text-gray-700 w-8 h-8 cursor-pointer"
              />
            )}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            {/* Invite Lawyer Tooltip */}
            <div className="relative group">
              <div className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition">
                <UserPlusIcon className="w-5 h-5 text-gray-800" />
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Invite Lawyer
              </div>
            </div>

            {/* User initials + dropdown */}
            <button
              type="button"
              className="flex items-center gap-1 cursor-pointer focus:outline-none"
              onClick={() => console.log("Clicked initials + arrow")}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 text-sm font-semibold uppercase">
                {admin?.fullName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <IoMdArrowDropdown className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {showMobileMenu && (
        <div className="relative z-50">
          <MobileMenu handleShowMobileMenu={handleShowMobileMenu} />
        </div>
      )}
    </>
  );
};

export default Nav;
