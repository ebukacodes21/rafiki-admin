import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const ServicePage = () => {
  return (
    <div className="min-h-screen w-full px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Service Types</h1>
          <p className="text-sm text-gray-500 mt-1">Create Services</p>
        </div>

        <Button className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium border-gray-300 text-gray-700 cursor-pointer bg-white hover:bg-white hover:shadow-sm transition">
          <PlusIcon className="w-4 h-4" />
          New Service Type
        </Button>
      </div>
    </div>
  );
};

export default ServicePage;
