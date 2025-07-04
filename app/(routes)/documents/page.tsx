"use client"
import React from "react";
import DocumentsClient from "./components/client";
import { useRequireAuth } from "../hooks/useAuth";

const DocumentsPage = () => {
  useRequireAuth()
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DocumentsClient />
      </div>
    </div>
  );
};

export default DocumentsPage;