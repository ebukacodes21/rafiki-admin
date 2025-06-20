"use client";
import { selectCurrentUser } from "@/redux/features/auth";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import React from "react";

const DashboardPage = () => {
  const admin = useAppSelector(selectCurrentUser);
  console.log(admin, "dashboard");
  return (
    <div className="min-h-screen w-full px-6 py-10 bg-gray-50">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your Firm</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
