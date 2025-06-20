"use client";

import { useState } from "react";
import { format, isBefore, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { XMarkIcon } from "@heroicons/react/24/outline";

type CustomDay = {
  date: Date;
  active: boolean;
  start: string;
  end: string;
};

export default function DateSpecificHours() {
  const [customDays, setCustomDays] = useState<CustomDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const addDate = () => {
    if (
      selectedDate &&
      !customDays.some(
        (d) =>
          format(d.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      )
    ) {
      setCustomDays((prev) => [
        ...prev,
        { date: selectedDate, active: true, start: "09:00", end: "17:00" },
      ]);
    }
  };

  const updateDay = (
    dateStr: string,
    field: "active" | "start" | "end",
    val: any
  ) =>
    setCustomDays((prev) =>
      prev.map((d) =>
        format(d.date, "yyyy-MM-dd") === dateStr ? { ...d, [field]: val } : d
      )
    );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Date‑Specific Hours</h3>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {selectedDate ? format(selectedDate, "PPP") : "Pick Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => isBefore(date, new Date())} 
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>

        <Button onClick={addDate} disabled={!selectedDate}>
          Add Date
        </Button>

        {selectedDate && (
          <Button
            variant="ghost"
            className="text-sm text-gray-600 hover:text-red-600"
            onClick={() => setSelectedDate(undefined)}
          >
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {customDays.map((day) => {
          const key = format(day.date, "yyyy-MM-dd");
          return (
            <div
              key={key}
              className="flex flex-wrap items-center justify-between gap-4 p-4 border rounded-md bg-white shadow-sm"
            >
              {/* Left side: Date + time display */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <span className="text-sm font-medium text-gray-800 w-48">
                  {format(day.date, "EEEE, MMM d")}
                </span>
                {day.active ? (
                  <span className="text-sm text-gray-600">
                    {format(parse(day.start, "HH:mm", new Date()), "hh:mm a")}{" "}
                    to {format(parse(day.end, "HH:mm", new Date()), "hh:mm a")}
                  </span>
                ) : (
                  <span className="text-sm text-gray-400 italic">
                    Unavailable
                  </span>
                )}
              </div>

              {/* Right side: Time inputs + checkbox + remove button */}
              <div className="flex gap-3 items-center">
                <input
                  type="time"
                  value={day.start}
                  onChange={(e) => updateDay(key, "start", e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                />
                <span className="text-sm">to</span>
                <input
                  type="time"
                  value={day.end}
                  onChange={(e) => updateDay(key, "end", e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                />

                <input
                  type="checkbox"
                  checked={day.active}
                  onChange={(e) => updateDay(key, "active", e.target.checked)}
                  className="accent-blue-600"
                  title="Available?"
                />

                <button
  onClick={() =>
    setCustomDays((prev) =>
      prev.filter((d) => format(d.date, "yyyy-MM-dd") !== key)
    )
  }
  className="text-red-500 hover:text-red-700 ml-2 p-1 rounded"
  title="Remove date"
  aria-label="Remove date"
>
  <XMarkIcon className="h-5 w-5" />
</button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
