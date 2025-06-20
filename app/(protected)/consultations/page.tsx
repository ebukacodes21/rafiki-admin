"use client";
import React, { useState } from "react";
import { Upcoming, Pending, Past } from "./components";

const tabs = ["Upcoming", "Pending", "Past"];

const ConsultationsPage = () => {
  const [active, setActive] = useState<string>("Upcoming");

  return (
    <div className="min-h-screen w-full px-6 py-10 bg-gray-50">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Consultations</h1>
          <p className="text-sm text-gray-500 mt-1">
            View all Firm Consultations
          </p>
        </div>
      </div>
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-10 mb-6 px-1 gap-4">
        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`pb-2 text-sm font-medium transition-colors duration-200 ${
                active === tab
                  ? "border-b-2 border-blue-600 text-blue-700"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white w-full shadow-xl px-5 py-8 rounded-md border border-gray-200 overflow-x-auto">
        {active === "Upcoming" && <Upcoming />}
        {active === "Pending" && <Pending />}
      </div>
    </div>
  );
};

export default ConsultationsPage;
