"use client";
import React from "react";
import SettingsClient from "./components/client";
import { useRequireAuth } from "../hooks/useAuth";
import { ScaleIcon } from "@heroicons/react/24/solid";

const SettingsPage = () => {
  const loading = useRequireAuth();

  if (loading) {
    return <ScaleIcon className="h-5 w-5" />;
  }
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsClient />
      </div>
    </div>
  );
};

export default SettingsPage;
