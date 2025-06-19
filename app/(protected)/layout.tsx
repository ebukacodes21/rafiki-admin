"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidemenu from "@/components/sidemenu";
import Nav from "@/components/navbar";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { IoMdArrowDropdown } from "react-icons/io";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.section
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col bg-[#FAFAFA]"
    >
      <Nav />

      <div className="flex flex-1">
        <aside className="hidden lg:block bg-[#EBEBEB]">
          <Sidemenu />
        </aside>

        <main className="flex-1 px-3 py-3 w-full overflow-x-auto">
          {/* Header section */}
          <div className="flex justify-end mr-5">
            <div className="flex items-center gap-2">
              <div className="relative group">
                <div className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition">
                  <UserPlusIcon className="w-5 h-5 text-gray-800" />
                </div>

                {/* Tooltip */}
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                  Invite Lawyer
                </div>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                onClick={() => {
                  /* handle click here */
                  console.log("Clicked initials + arrow");
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 text-sm">
                  GO
                </div>
                <IoMdArrowDropdown className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="w-full mx-auto">{children}</div>
        </main>
      </div>
    </motion.section>
  );
};

export default Layout;
