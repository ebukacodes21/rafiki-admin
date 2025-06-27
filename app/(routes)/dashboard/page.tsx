"use client"
import React from "react";
import DashboardClient from "./components/client";
import { useRequireAuth } from "../hooks/useAuth";
import { ScaleIcon } from "@heroicons/react/24/outline";

const DashboardPage = () => {
  const loading = useRequireAuth();

  if (loading) {
    return <ScaleIcon className="h-5 w-5" />;
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DashboardClient />
      </div>
    </div>
  );
};

export default DashboardPage;