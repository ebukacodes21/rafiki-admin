"use client";
import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Link from "next/link";
// import { useAppSelector } from "@/redux/hooks/useSelectorHook";
// import { selectCurrentUser } from "@/redux/features/auth";
import moment from "moment";
import { ImagePreviewModal } from "@/components/image-viewer"; 

const Nav = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

//   const user = useAppSelector(selectCurrentUser);
//   const currentDate = moment(user?.lastLogin).format("MMMM Do YYYY");
//   const userName = user ? `${user.firstName} ${user.lastName}` : "";

  function handleShowMobileMenu() {
    setShowMobileMenu((prev) => !prev);
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
    <nav className="bg-gray-900 border-b border-gray-200 top-0 left-0 w-full z-10 py-4 shadow-sm">
  <div className="flex justify-between items-center px-6">
    <div className="flex items-center">
      {showMobileMenu ? (
        <AiOutlineCloseCircle
          onClick={handleShowMobileMenu}
          className="text-gray-700 w-6 h-6 cursor-pointer lg:hidden"
        />
      ) : (
        <IoMdMenu
          onClick={handleShowMobileMenu}
          className="text-gray-700 w-6 h-6 cursor-pointer lg:hidden"
        />
      )}
      <Link href="/" className="text-white text-xl font-bold ml-4">
        Rafiki
      </Link>
    </div>

    <div className="flex items-center space-x-4">
      <p className="text-sm text-white">Welcome back, <span className="font-medium text-white">UserName</span></p>

      <div
        className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 hover:ring-2 hover:ring-gray-400"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</nav>


      <div className="relative">
        {/* {showMobileMenu && (
          <MobileMenu handleShowMobileMenu={handleShowMobileMenu} />
        )} */}

        <ImagePreviewModal
          imgUrl={"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};

export default Nav