"use client";

import React from "react";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentUser } from "@/redux/features/auth";

const OnlineFirmEditor = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="min-h-screen w-full px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Online Firm</h1>
          <p className="text-sm text-gray-500 mt-1">
            Customize and manage your public-facing firm site.
          </p>
        </div>

        <Link
          href={`${process.env.NEXT_PUBLIC_FIRM_URL}/684fefb3bdb5a1e63a51b532`}
          className="px-4 py-2 rounded-md border text-sm font-medium border-gray-300 text-gray-700 hover:bg-white hover:shadow-sm transition"
          target="_blank"
        >
          <div className="flex items-center gap-2">
            <FiEye className="text-gray-700" />
            View Online Firm
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {/* Example Card */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Theme</h2>
          <p className="text-sm text-gray-500 mb-4">
            Choose or update your firm&apos;s theme.
          </p>
          <button className="text-sm text-blue-600 font-medium hover:underline">
            Customize theme →
          </button>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Content</h2>
          <p className="text-sm text-gray-500 mb-4">
            Update your firm&apos;s bio, contact info, and brand details.
          </p>
          <button className="text-sm text-blue-600 font-medium hover:underline">
            Edit content →
          </button>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Publish</h2>
          <p className="text-sm text-gray-500 mb-4">
            Control visibility and publishing options.
          </p>
          <button className="text-sm text-blue-600 font-medium hover:underline">
            Manage settings →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnlineFirmEditor;
