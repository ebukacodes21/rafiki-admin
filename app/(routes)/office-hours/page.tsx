"use client"
import React from "react";
import OfficeHoursClient from "./components/client";
import { useRequireAuth } from "../hooks/useAuth";

const OfficeHoursPage = () => {
  useRequireAuth()
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OfficeHoursClient />
      </div>
    </div>
  );
};

export default OfficeHoursPage;
