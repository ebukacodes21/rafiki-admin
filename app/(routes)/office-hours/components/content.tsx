"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm } from "@/redux/features/firm";
import { useState, useEffect } from "react";
import { format, isBefore, isSameDay } from "date-fns";
import { DateSpecificHours } from "@/types/types";
import { DateOverride, Weekly } from "./weekly";
import CalendarSettings from "./calendar";
import { Button } from "@/components/ui/button";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AvailabilityTabs() {
  const firm = useAppSelector(selectCurrentFirm);
  const [timeZone, setTimeZone] = useState("(GMT+1:00) West Central Africa");
  const [weeklyHours, setWeeklyHours] = useState(
    weekdays.map((day) => ({
      day,
      start: "",
      end: "",
      active: false,
    }))
  );

  const [dateOverrides, setDateOverrides] = useState<DateSpecificHours[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  console.log(firm?.dateOverrides)

  // Load from firm on mount
  useEffect(() => {
    if (firm?.weeklyHours) {
      setWeeklyHours(
        weekdays.map((day) => {
          const key = day.toLowerCase();
          const entry = firm.weeklyHours[key]?.[0];
          return {
            day,
            start: entry?.open ?? "",
            end: entry?.close ?? "",
            active: !!entry,
          };
        })
      );
    }

    if (firm?.dateOverrides) {
      setDateOverrides(firm.dateOverrides);
    }
  }, [firm]);

  const toggleDay = (index: number, value: boolean) => {
    setWeeklyHours((prev) => {
      const updated = [...prev];
      updated[index].active = value;
      return updated;
    });
  };

  const updateTime = (index: number, field: "start" | "end", value: string) => {
    setWeeklyHours((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const markUnavailable = (index: number) => {
    setWeeklyHours((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], active: false, start: "", end: "" };
      return updated;
    });
  };

  const addDateOverride = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (dateOverrides.some((d) => d.date === dateStr)) return;

    setDateOverrides((prev) => [
      ...prev,
      {
        date: dateStr,
        timeRanges: [{ open: "09:00", close: "17:00" }],
        isClosed: false,
      },
    ]);
    setShowDatePicker(false);
    setSelectedDate(null);
  };

  const updateDateOverrideTime = (
    dateStr: string,
    field: "open" | "close",
    value: string
  ) => {
    setDateOverrides((prev) =>
      prev.map((override) =>
        override.date === dateStr
          ? {
              ...override,
              timeRanges: override.timeRanges.map((range) => ({
                ...range,
                [field]: value,
              })),
            }
          : override
      )
    );
  };

  const toggleDateOverrideClosed = (dateStr: string) => {
     setDateOverrides((prev) => prev.filter((o) => o.date !== dateStr));
  };

  return (
    <div className="flex w-full max-w-6xl flex-col gap-6 mx-auto mt-8">
      <Tabs defaultValue="availability">
        <TabsList>
          <TabsTrigger value="availability" className="cursor-pointer">Schedule</TabsTrigger>
          <TabsTrigger value="settings" className="cursor-pointer">Diary Settings</TabsTrigger>
        </TabsList>

        <TabsContent
          value="availability"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Weekly Hours Card */}
          <Weekly
            timeZone={timeZone}
            setTimeZone={setTimeZone}
            weeklyHours={weeklyHours}
            updateTime={updateTime}
            markUnavailable={markUnavailable}
            toggleDay={toggleDay}
          />

          {/* Date-Specific Hours Card */}
          <DateOverride
            showDatePicker={showDatePicker}
            selectedDate={selectedDate!}
            setSelectedDate={setSelectedDate}
            addDateOverride={addDateOverride}
            dateOverrides={dateOverrides}
            updateDateOverrideTime={updateDateOverrideTime}
            toggleDateOverrideClosed={toggleDateOverrideClosed}
          />
        </TabsContent>

        <TabsContent value="settings">
            <CalendarSettings />
        </TabsContent>
      </Tabs>

      <Button className="w-52 cursor-pointer">Save Changes</Button>
    </div>
  );
}
