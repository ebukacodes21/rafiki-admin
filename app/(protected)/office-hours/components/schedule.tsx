"use client";

import React, { useState } from "react";
import WeeklyHours from "./weekly";
import ReactTimezoneSelect from "react-timezone-select";
import DateSpecificHours from "./date";

const ScheduleSettings = () => {
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-1">Schedule</h1>
        <p className="text-sm text-gray-500">
          Manage your availability and working hours.
        </p>
      </div>

      {/* Working Hours */}
      <section className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800">
              Working Hours (Default)
            </h2>
            <p className="text-sm text-gray-500">
              Set when you&apos;re typically available for consultations.
            </p>
          </div>
          <div className="text-sm text-gray-600">
            Time Zone:
            <span className="ml-1 font-medium text-gray-800">
              {timezone.replace("_", " ")}
            </span>
          </div>
        </div>

        <ReactTimezoneSelect
          value={timezone}
          onChange={(tz) => setTimezone(typeof tz === "string" ? tz : tz.value)}
        />

        <WeeklyHours />
      </section>

      {/* Date-Specific Hours */}
      <section className="bg-white p-6 rounded-lg border shadow-sm">
        <DateSpecificHours />
      </section>

      {/* Event Types */}
      <section className="bg-white p-6 rounded-lg border shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-800">Event Types</h2>
          <p className="text-sm text-gray-500">
            You&apos;re currently active for 1 event type.
          </p>
        </div>
        <button className="mt-3 sm:mt-0 px-4 py-2 bg-gray-100 text-sm rounded-md hover:bg-gray-200 border">
          View/Edit Event Types
        </button>
      </section>

      {/* Save Button */}
      <div className="text-right">
        <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium shadow">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ScheduleSettings;
