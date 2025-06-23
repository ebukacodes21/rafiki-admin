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
import { PlusIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";
import { TimePicker } from "./timepicker";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format, isBefore } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { DateSpecificHours } from "@/types/types";

type WeeklyProps = {
  timeZone: string;
  setTimeZone: (value: string) => void;
  weeklyHours: { day: string; start: string; end: string; active: boolean }[];
  updateTime: (id: number, field: "start" | "end", value: string) => void;
  markUnavailable: (value: number) => void;
  toggleDay: (id: number, value: boolean) => void;
};

export const Weekly: FC<WeeklyProps> = ({
  timeZone,
  setTimeZone,
  weeklyHours,
  updateTime,
  markUnavailable,
  toggleDay,
}) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Weekly Hours</CardTitle>
        <CardDescription>
          Set when you are available for consultations.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="text-sm font-medium mb-2">Time Zone</div>
        <div className="w-full max-w-xs mb-4">
          <Select value={timeZone} onValueChange={setTimeZone}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a time zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="(GMT+1:00) West Central Africa">
                (GMT+1:00) West Central Africa
              </SelectItem>
              <SelectItem value="(GMT) Greenwich Mean Time">
                (GMT) Greenwich Mean Time
              </SelectItem>
              <SelectItem value="(GMT+2:00) Central Africa">
                (GMT+2:00) Central Africa
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {weeklyHours.map(({ day, start, end, active }, idx) => (
          <div
            key={day}
            className="flex items-center justify-between rounded-md"
          >
            <div className="flex items-center gap-2">
              <Label className="w-24">{day}</Label>
              {active ? (
                <>
                  <TimePicker
                    value={start}
                    onChange={(val) => updateTime(idx, "start", val)}
                    className="w-28"
                  />
                  <span>-</span>
                  <TimePicker
                    value={end}
                    onChange={(val) => updateTime(idx, "end", val)}
                    className="w-28"
                  />
                </>
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
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">{timeZone}</p>
      </CardFooter>
    </Card>
  );
};

type DataOverrideProp = {
  showDatePicker: boolean;
  selectedDate: Date | undefined;
  setSelectedDate: (value: Date) => void;
  addDateOverride: (value: Date) => void;
  dateOverrides: DateSpecificHours[];
  updateDateOverrideTime: (
    date: string,
    field: "open" | "close",
    value: string
  ) => void;
  toggleDateOverrideClosed: (date: string) => void;
};

export const DateOverride: FC<DataOverrideProp> = ({
  showDatePicker,
  selectedDate,
  setSelectedDate,
  addDateOverride,
  dateOverrides,
  updateDateOverrideTime,
  toggleDateOverrideClosed,
}) => {
  return (
    <Card className="w-96">
      <CardHeader>
        <div className="space-y-2">
          <div className="space-y-1.5">
            <CardTitle>Date-Specific Hours</CardTitle>
            <CardDescription>Adjust hours for special dates.</CardDescription>
          </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" className="cursor-pointer">
                  Add Specific Date
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate ?? undefined}
                  onSelect={(date) => {
                    if (date && !isBefore(date, new Date())) {
                      setSelectedDate(date);
                      addDateOverride(date);
                    }
                  }}
                  disabled={(date) => isBefore(date, new Date())}
                />
              </PopoverContent>
            </Popover>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col">
        {dateOverrides.map((override) => (
          <div
            key={override.date}
            className="flex items-center justify-between gap-2 p-2"
          >
            <Label className="w-32 text-sm font-medium">
              {format(new Date(override.date), "MMM dd, yyyy")}
            </Label>

            {override.isClosed ? (
              <span className="text-sm italic text-muted-foreground">Unavailable</span>
            ) : (
              <>
                <TimePicker
                  value={override.timeRanges[0]?.open || ""}
                  onChange={(val) =>
                    updateDateOverrideTime(override.date, "open", val)
                  }
                  className="w-28"
                />
                <span>-</span>
                <TimePicker
                  value={override.timeRanges[0]?.close || ""}
                  onChange={(val) =>
                    updateDateOverrideTime(override.date, "close", val)
                  }
                  className="w-28"
                />
              </>
            )}

            <Button
              size="icon"
              variant="ghost"
              onClick={() => toggleDateOverrideClosed(override.date)}
              aria-label="Remove override"
              className="cursor-pointer"
            >
              <XMarkIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};