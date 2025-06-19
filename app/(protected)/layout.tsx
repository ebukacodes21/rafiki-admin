"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidemenu from "@/components/sidemenu";
import Nav from "@/components/navbar";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { IoMdArrowDropdown } from "react-icons/io";
import { selectCurrentUser } from "@/redux/features/auth";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setIsMounted] = useState(false);
  const admin = useAppSelector(selectCurrentUser);
  useEffect(() => setIsMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.section
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col bg-[#FAFAFA]"
    >
      <div className="flex flex-1">
        <aside className="hidden lg:block bg-[#EBEBEB]">
          <Sidemenu />
        </aside>

        <main className="flex-1 px-3 py-3 w-full overflow-x-auto">
          {/* Header section */}
   
<Nav />
          <div className="w-full mx-auto">{children}</div>
        </main>
      </div>
    </motion.section>
  );
};

export default Layout;
