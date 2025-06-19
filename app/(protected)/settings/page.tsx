"use client";
import React, { useState } from "react";

const tabs = ["Account Settings", "Integrations", "Avaliability"];

const SettingsPage = () => {
  const [active, setActive] = useState<string>("Account Settings");

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
      </div>

      {/* Content */}
      <div className="bg-white w-full shadow-xl px-5 py-8 rounded-md border border-gray-200 overflow-x-auto">
        {active === "Account Settings" && <p className="text-gray-700">Account Settings</p>}
        {active === "Integrations" && <p className="text-gray-700">Integrations</p>}
        {active === "Avaliability" && <p className="text-gray-700">Avaliability</p>}
      </div>
    </main>
  );
};

export default SettingsPage;
