"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidemenu from "@/components/sidemenu";
import Nav from "@/components/navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!mounted) return null
  return (
    <motion.section
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col bg-[#F4F0EE]"
    >
      <Nav />

      <div className="flex flex-1">
      <aside className="hidden lg:block bg-[#EBEBEB]">
        <Sidemenu />
      </aside>

      <main className="flex-1 px-3 py-6 w-full overflow-x-auto">
        <div className="w-full mx-auto">{children}</div>
      </main>
      </div>

      {/* <footer className="text-gray-900 bg-gray-100 flex justify-end px-5 py-6 w-full">
        © {new Date().getFullYear()} Rafiki. All rights reserved.
      </footer> */}
    </motion.section>
  );
};

export default Layout;