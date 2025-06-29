"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm, setFirm } from "@/redux/features/firm";
import { useState, useEffect, useMemo, useCallback } from "react";
import { isSameDay } from "date-fns";
import { DateSpecificHours } from "@/types/types";
import { Availability } from "./availability";
import CalendarSettings from "./calendar";
import { useRouter, useSearchParams } from "next/navigation";
import {
  apiCall,
  convertWeeklyHoursToPayload,
  debounce,
  formatError,
} from "@/utils/helper";
import toast from "react-hot-toast";
const orderedDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function AvailabilityTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "availability";
  const firm = useAppSelector(selectCurrentFirm);
  const [loading, setLoading] = useState<boolean>(false);
  const [zones, setZones] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [dateOverrides, setDateOverrides] = useState<DateSpecificHours[]>([]);
  const [timeZone, setTimeZone] = useState<string>(() => {
    if (typeof Intl !== "undefined" && Intl.DateTimeFormat) {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    return "UTC";
  });
  const dispatch = useAppDispatch();
  const [weeklyHours, setWeeklyHours] = useState(() => {
    if (!firm?.weeklyHours) return [];
    return orderedDays.map((day) => {
      const ranges = firm.weeklyHours[day] || [];
      const firstRange = ranges[0];
      return {
        day,
        open: firstRange?.open ?? "",
        close: firstRange?.close ?? "",
        active: Boolean(firstRange?.open) && Boolean(firstRange?.close),
      };
    });
  });

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (typeof Intl.supportedValuesOf === "function") {
      setZones(Intl.supportedValuesOf("timeZone"));
    } else {
      setZones([
        "Africa/Lagos",
        "Europe/London",
        "America/New_York",
        "Asia/Tokyo",
      ]);
    }
  }, []);

  // Load from firm on mount
  useEffect(() => {
    if (!firm?.weeklyHours) return;

    setWeeklyHours(
      orderedDays.map((day) => {
        const ranges = firm.weeklyHours[day] || [];
        const firstRange = ranges[0];
        return {
          day,
          open: firstRange?.open ?? "",
          close: firstRange?.close ?? "",
          active: Boolean(firstRange?.open) && Boolean(firstRange?.close),
        };
      })
    );
  }, [firm]);

  const toggleDay = (index: number, value: boolean) => {
    setWeeklyHours((prev) => {
      const updated = [...prev];
      updated[index].active = value;
      return updated;
    });
  };

  const updateTime = (
    index: number,
    field: "open" | "close",
    value: string
  ) => {
    setWeeklyHours((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const markUnavailable = (index: number) => {
    setWeeklyHours((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        active: false,
        open: "",
        close: "",
      };
      return updated;
    });
  };

  const applyBulkDateOverride = (
    dates: Date[],
    override: {
      isClosed: boolean;
      timeRange?: {
        open: string;
        close: string;
      };
    }
  ) => {
    setDateOverrides((prev) => {
      const updated = [...prev];

      dates.forEach((date) => {
        const existingIndex = updated.findIndex((d) =>
          isSameDay(new Date(d.date), date)
        );
        const overrideEntry: DateSpecificHours = {
          date: date.toISOString(),
          isClosed: override.isClosed,
          timeRanges:
            override.isClosed || !override.timeRange
              ? []
              : [
                  {
                    open: override.timeRange.open,
                    close: override.timeRange.close,
                  },
                ],
        };

        if (existingIndex !== -1) {
          updated[existingIndex] = overrideEntry;
        } else {
          updated.push(overrideEntry);
        }
      });

      return updated;
    });
  };

  const handleSave = useCallback(async () => {
    if (!firm?.id) return;
    setLoading(true);
    const result = await apiCall("/api/update-availability", "PUT", {
      firmId: firm.id,
      timeZone,
      weeklyHours: convertWeeklyHoursToPayload(weeklyHours),
      dateOverrides,
    });

    if (result.name === "AxiosError") {
      setLoading(false);
      toast.error(formatError(result));
      return;
    }

    toast.success(result.message);
    dispatch(setFirm(result.data));
    setLoading(false);
  }, [firm?.id, timeZone, weeklyHours, dateOverrides, dispatch]);

  const debouncedSave = useMemo(() => debounce(handleSave, 1000), [handleSave]);

  return (
    <div className="flex w-full max-w-6xl flex-col gap-6 mx-auto mt-8">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="availability" className="cursor-pointer">
            Schedule
          </TabsTrigger>
          <TabsTrigger value="settings" className="cursor-pointer">
            Diary Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="availability">
          <Availability
            timeZone={timeZone}
            setTimeZone={setTimeZone}
            zones={zones}
            weeklyHours={weeklyHours}
            updateTime={updateTime}
            markUnavailable={markUnavailable}
            toggleDay={toggleDay}
            loading={loading}
            onSave={debouncedSave}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            applyBulkDateOverride={applyBulkDateOverride}
          />
        </TabsContent>

        <TabsContent value="settings">
          <CalendarSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
