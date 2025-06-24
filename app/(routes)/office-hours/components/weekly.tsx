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
import React, { FC, useState } from "react";
import { TimePicker } from "./timepicker";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { isBefore } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

type WeeklyProps = {
  timeZone: string;
  setTimeZone: (value: string) => void;
  zones: string[];
  weeklyHours: { day: string; open: string; close: string; active: boolean }[];
  updateTime: (id: number, field: "open" | "close", value: string) => void;
  markUnavailable: (value: number) => void;
  toggleDay: (id: number, value: boolean) => void;
   loading: boolean
  onSave: () => void
};

type DateOverrideBulkProps = {
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
     loading: boolean
   onSave: () => void
};

export const Weekly: FC<WeeklyProps> = ({
  timeZone,
  setTimeZone,
  zones,
  weeklyHours,
  updateTime,
  markUnavailable,
  toggleDay,
  loading,
  onSave
}) => {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Weekly Hours</CardTitle>
        <CardDescription>
          Set when you are available for consultations.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <div className="text-sm font-medium mb-2">Time Zone</div>
        <div className="w-full max-w-xs mb-4">
          <Select value={timeZone} onValueChange={setTimeZone}>
            <SelectTrigger className="w-full cursor-pointer">
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

        {weeklyHours.map(({ day, open, close, active }, idx) => (
          <div key={idx} className="flex justify-between items-center gap-2">
            <Label className="">{day}</Label>
            {active ? (
              <div className="flex items-center gap-2">
                <TimePicker
                  value={open}
                  onChange={(val) => updateTime(idx, "open", val)}
                  className="w-28"
                />
                <span>-</span>
                <TimePicker
                  value={close}
                  onChange={(val) => updateTime(idx, "close", val)}
                  className="w-28"
                />
              </div>
            ) : (
              <span className="text-sm text-muted-foreground italic ml-2">
                Unavailable
              </span>
            )}
            <Button
              size="icon"
              variant="ghost"
              onClick={() =>
                active ? markUnavailable(idx) : toggleDay(idx, true)
              }
              className="p-1 cursor-pointer"
            >
              {active ? (
                <XMarkIcon className="h-5 w-5 cursor-pointer" />
              ) : (
                <PlusIcon className="h-5 w-5 cursor-pointer" />
              )}
            </Button>
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex flex-col items-start">
        <p className="text-sm text-muted-foreground">
          Current time zone: {timeZone}
        </p>

        <div className="mt-5">
          <Button disabled={loading} className="cursor-pointer" onClick={onSave}>Save Changes</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export const DateOverrideBulk: FC<DateOverrideBulkProps> = ({
  selectedDates,
  setSelectedDates,
  applyBulkDateOverride,
  loading,
  onSave
}) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<{ open: string; close: string }>({
    open: "09:00",
    close: "17:00",
  });

  const handleApply = () => {
    applyBulkDateOverride(selectedDates, {
      isClosed,
      timeRange: isClosed ? undefined : timeRange,
    });
    onSave()
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Custom Schedule</CardTitle>
        <CardDescription>
          Configure availability for selected dates in your firm’s diary.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Calendar Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start cursor-pointer">
              <CalendarDaysIcon className="h-4 w-4 mr-2" />
              {selectedDates.length > 0
                ? (() => {
                    const sorted = [...selectedDates].sort(
                      (a, b) => a.getTime() - b.getTime()
                    );
                    const start = sorted[0];
                    const end = sorted[sorted.length - 1];

                    const isSameDay =
                      start.getDate() === end.getDate() &&
                      start.getMonth() === end.getMonth() &&
                      start.getFullYear() === end.getFullYear();

                    const sameMonth = start.getMonth() === end.getMonth();
                    const sameYear = start.getFullYear() === end.getFullYear();

                    const formatDate = (
                      date: Date,
                      opts?: Intl.DateTimeFormatOptions
                    ) =>
                      date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        ...(!sameYear ? { year: "numeric" } : {}),
                        ...opts,
                      });

                    if (isSameDay) {
                      return formatDate(start);
                    }

                    const startStr = formatDate(start);
                    const endStr = sameMonth
                      ? `${end.getDate()}`
                      : formatDate(end);

                    return `${startStr} – ${endStr}`;
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
            <Label className="text-sm">Availability</Label>
            {isClosed ? (
              <div className="flex items-center justify-between">
                <span className="text-sm italic text-muted-foreground">
                  Unavailable
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsClosed(false)}
                  aria-label="Mark available"
                  className="cursor-pointer"
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
                  className="w-28"
                />
                <span>-</span>
                <TimePicker
                  value={timeRange.close}
                  onChange={(val) =>
                    setTimeRange((prev) => ({ ...prev, close: val }))
                  }
                  className="w-28"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsClosed(true)}
                  aria-label="Mark unavailable"
                  className="cursor-pointer"
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>
            )}

            <Button
              onClick={handleApply}
              className="mt-2 cursor-pointer"
              disabled={selectedDates.length === 0 || loading}
            >
              Save changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
