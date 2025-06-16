"use client";

import React from "react";
import Link from "next/link";
import { FiEye } from "react-icons/fi";

const OnlineFirmEditor = () => {
  return (
    <div className="h-screen">
      {/* Top Bar */}
      <Link
        href={`${process.env.NEXT_PUBLIC_FIRM_URL}/684fefb3bdb5a1e63a51b532`}
        className="bg-gray-200 px-2 py-3 rounded-sm border text-sm font-semibold border-gray-300 inline-flex items-center gap-2"
        target="_blank"
      >
        <FiEye className="text-gray-700" />
        View Online Firm
      </Link>
    </div>
  );
};

export default OnlineFirmEditor;
