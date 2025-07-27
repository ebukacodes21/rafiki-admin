"use client";

import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  UserPlusIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MobileMenu } from "./mobile-menu";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentUser } from "@/redux/features/auth";
import MainNav from "./nav";

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
    <div className="border-b">
      <div className="flex h-16 items-center px-4 justify-between">
        {/* Left section: Logo */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold italic">Rafiki</h1>
          <MainNav className="hidden lg:flex" />
        </div>

        {/* Right section: Mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="lg:hidden">
            {showMobileMenu ? (
              <XMarkIcon
                onClick={handleShowMobileMenu}
                className="w-8 h-8 cursor-pointer"
              />
            ) : (
              <Bars3Icon
                onClick={handleShowMobileMenu}
                className="w-8 h-8 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden z-50 relative">
          <MobileMenu handleShowMobileMenu={handleShowMobileMenu} />
        </div>
      )}
    </div>
  );
};

export default Nav;