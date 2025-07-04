import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDaysIcon, PlusIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { isBefore } from "date-fns";
import React, { FC, useState } from "react";
import { TimePicker } from "./timepicker";

type AvailabilityProps = {
  timeZone: string;
  setTimeZone: (value: string) => void;
  zones: string[];
  weeklyHours: { day: string; open: string; close: string; active: boolean }[];
  updateTime: (id: number, field: "open" | "close", value: string) => void;
  markUnavailable: (value: number) => void;
  toggleDay: (id: number, value: boolean) => void;
  loading: boolean;
  onSave: () => void;
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
  applyBulkDateOverride: (
    dates: Date[],
    override: {
      isClosed: boolean;
      timeRange?: {
        open: string;
        close: string;
      };
    }
  ) => void;
};

export const Availability: FC<AvailabilityProps> = ({
  timeZone,
  setTimeZone,
  zones,
  weeklyHours,
  updateTime,
  markUnavailable,
  toggleDay,
  loading,
  onSave,
  selectedDates,
  setSelectedDates,
  applyBulkDateOverride,
}) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<{ open: string; close: string }>({
    open: "09:00",
    close: "17:00",
  });

  const handleApplyOverride = () => {
    applyBulkDateOverride(selectedDates, {
      isClosed,
      timeRange: isClosed ? undefined : timeRange,
    });
    onSave();
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Availability Settings</CardTitle>
        <CardDescription>
          Define your standard weekly hours and customize availability for selected dates.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8 flex items-start flex-col md:flex-row justify-between">
        {/* Weekly Hours Section */}
        <section className="space-y-4">
          <Label className="text-sm font-medium">Time Zone</Label>
          <div className="w-full">
            <Select value={timeZone} onValueChange={setTimeZone}>
              <SelectTrigger className="">
                <SelectValue placeholder="Choose time zone" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-auto">
                {zones.map((tz) => {
                  const now = new Date();
                  const offset = new Intl.DateTimeFormat("en-US", {
                    timeZone: tz,
                    timeZoneName: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(now);
                  return (
                    <SelectItem key={tz} value={tz}>
                      {offset} — {tz}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 flex flex-col mx-auto">
            {weeklyHours.map(({ day, open, close, active }, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-1"
              >
                <div className="font-medium text-sm">{day}</div>
                {active ? (
                  <div className="flex items-center gap-1.5">
                    <TimePicker
                      value={open}
                      onChange={(val) => updateTime(idx, "open", val)}
                      className="w-20"
                    />
                    <span>-</span>
                    <TimePicker
                      value={close}
                      onChange={(val) => updateTime(idx, "close", val)}
                      className="w-20"
                    />
                  </div>
                ) : (
                  <div className="italic text-sm text-muted-foreground">
                    Unavailable
                  </div>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  className="cursor-pointer"
                  onClick={() =>
                    active ? markUnavailable(idx) : toggleDay(idx, true)
                  }
                >
                  {active ? (
                    <XMarkIcon className="h-5 w-5" />
                  ) : (
                    <PlusIcon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Date Overrides Section */}
        <section className="space-y-1">
          <Label className="text-md font-medium">Custom Date Settings</Label>
          <p className="text-sm">
            Select particular dates to customize availability
          </p>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start cursor-pointer">
                <CalendarDaysIcon className="h-4 w-4 mr-2 text-pink-500" />
                {selectedDates.length > 0
                  ? (() => {
                      const sorted = [...selectedDates].sort(
                        (a, b) => a.getTime() - b.getTime()
                      );
                      const start = sorted[0];
                      const end = sorted[sorted.length - 1];

                      const sameDay =
                        start.toDateString() === end.toDateString();

                      const formatDate = (date: Date) =>
                        date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });

                      return sameDay
                        ? formatDate(start)
                        : `${formatDate(start)} – ${formatDate(end)}`;
                    })()
                  : "Select date(s)"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={(dates) => setSelectedDates(dates ?? [])}
                disabled={(date) => isBefore(date, new Date())}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>

          {selectedDates.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm">Override Time</Label>
              {isClosed ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm italic text-muted-foreground">
                    Marked as unavailable
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsClosed(false)}
                  >
                    <PlusIcon className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <TimePicker
                    value={timeRange.open}
                    onChange={(val) =>
                      setTimeRange((prev) => ({ ...prev, open: val }))
                    }
                    className="w-24"
                  />
                  <span>-</span>
                  <TimePicker
                    value={timeRange.close}
                    onChange={(val) =>
                      setTimeRange((prev) => ({ ...prev, close: val }))
                    }
                    className="w-24"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsClosed(true)}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </Button>
                </div>
              )}
              <Button
                onClick={handleApplyOverride}
                className="mt-2 cursor-pointer"
                disabled={loading}
              >
                Apply to Selected Dates
              </Button>
            </div>
          )}
        </section>
      </CardContent>

      <CardFooter className="justify-start">
        <Button disabled={loading} onClick={onSave} className="cursor-pointer">
          Save All Changes
        </Button>
      </CardFooter>
    </Card>
  );
};
