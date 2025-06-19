"use client";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const tabs = ["Upcoming", "Pending", "Past"];

const AppointmentPage = () => {
  const [active, setActive] = useState<string>("Upcoming");

  return (
    <main className="w-full">
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

        {/* Create Appointment */}
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition">
          <PlusIcon className="w-4 h-4" />
          New Appointment
        </button>
      </div>

      {/* Content */}
      <div className="bg-white w-full shadow-xl px-5 py-8 rounded-md border border-gray-200 overflow-x-auto">
        {active === "Upcoming" && <p className="text-gray-700">Upcoming Appointments</p>}
        {active === "Pending" && <p className="text-gray-700">Pending Approvals</p>}
        {active === "Past" && <p className="text-gray-700">Past Consultations</p>}
      </div>
    </main>
  );
};

export default AppointmentPage;
