"use client";

import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Link from "next/link";
import moment from "moment";
import { ImagePreviewModal } from "@/components/image-viewer";
// import { useAppSelector } from "@/redux/hooks/useSelectorHook";
// import { selectCurrentUser } from "@/redux/features/auth";

const Nav = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const user = { firstName: "Ada", lastName: "Lovelace", lastLogin: new Date() }; // mock
  const userName = `${user.firstName} ${user.lastName}`;
  const lastLogin = moment(user?.lastLogin).format("MMMM Do YYYY");

  const toggleMobileMenu = () => setShowMobileMenu((prev) => !prev);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <nav className="md:hidden bg-gradient-to-r from-gray-900 to-blue-900 text-white shadow-md w-full z-20 border-b border-blue-600">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left Section: Logo & Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile Toggle */}
            <div className="lg:hidden">
              {showMobileMenu ? (
                <AiOutlineCloseCircle
                  onClick={toggleMobileMenu}
                  className="w-6 h-6 text-white cursor-pointer hover:text-blue-300"
                />
              ) : (
                <IoMdMenu
                  onClick={toggleMobileMenu}
                  className="w-6 h-6 text-white cursor-pointer hover:text-blue-300"
                />
              )}
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-wide hover:text-blue-300 transition-colors">
                Rafiki
              </span>
            </Link>
          </div>

          {/* Right Section: User Info */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-right hidden sm:block">
              <p className="text-xs text-gray-300">Welcome back,</p>
              <p className="font-semibold">{userName}</p>
              <p className="text-xs text-gray-400">Last login: {lastLogin}</p>
            </div>

            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Image Modal */}
      <ImagePreviewModal
        imgUrl="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Nav;