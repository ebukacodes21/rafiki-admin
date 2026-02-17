"use client"
import React from "react";
import ChunkClient from "./components/client";
import { useRequireAuth } from "../hooks/useAuth";

const ChunkPage = () => {
  useRequireAuth()
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ChunkClient />
      </div>
    </div>
  );
};

export default ChunkPage;