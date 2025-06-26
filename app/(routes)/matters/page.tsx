"use client"
import React from "react";
import MattersClient from "./components/client";
import { useRequireAuth } from "../hooks/useAuth";

const MattersPage = () => {
  useRequireAuth()
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MattersClient />
      </div>
    </div>
  );
};

export default MattersPage;
