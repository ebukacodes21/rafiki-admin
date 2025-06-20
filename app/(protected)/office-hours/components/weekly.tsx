"use client";
import React, { useState } from "react";
import ReactTimezoneSelect from "react-timezone-select";

// fetch firm business hours
const defaultHours = {
  Monday: { active: true, start: "09:00", end: "17:00" },
  Tuesday: { active: true, start: "09:00", end: "17:00" },
  Wednesday: { active: true, start: "09:00", end: "17:00" },
  Thursday: { active: true, start: "09:00", end: "17:00" },
  Friday: { active: true, start: "09:00", end: "17:00" },
  Saturday: { active: false, start: "09:00", end: "12:00" },
  Sunday: { active: false, start: "09:00", end: "12:00" },
};

const days = Object.keys(defaultHours) as Array<keyof typeof defaultHours>;

const WeeklyHours = () => {
  const [hours, setHours] = useState(defaultHours);
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const toggleDay = (day: keyof typeof defaultHours) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        active: !prev[day].active,
      },
    }));
  };

  const updateTime = (
    day: keyof typeof defaultHours,
    type: "start" | "end",
    value: string
  ) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value,
      },
    }));
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-1">Week Days</h2>
      <div className="space-y-4">
        {days.map((day) => (
          <div
            key={day}
            className="flex items-center justify-between gap-4 p-3 border rounded-md bg-white"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={hours[day].active}
                onChange={() => toggleDay(day)}
                className="accent-blue-600"
              />
              <span className="font-medium w-24">{day}</span>
            </div>

            {hours[day].active ? (
              <div className="flex gap-2">
                <input
                  type="time"
                  value={hours[day].start}
                  onChange={(e) => updateTime(day, "start", e.target.value)}
                  className="border px-2 py-1 rounded text-sm"
                />
                <span>to</span>
                <input
                  type="time"
                  value={hours[day].end}
                  onChange={(e) => updateTime(day, "end", e.target.value)}
                  className="border px-2 py-1 rounded text-sm"
                />
              </div>
            ) : (
              <span className="text-gray-400 text-sm">Unavailable</span>
            )}
          </div>
        ))}
      </div>

      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
        Save Weekly Hours
      </button>
    </div>
  );
};

export default WeeklyHours;
