"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./column";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm } from "@/redux/features/firm";
import { isAfter, isBefore } from "date-fns";
import { DateRange, OnSelectHandler } from "react-day-picker";

const ConsultationsContent = () => {
  const firm = useAppSelector(selectCurrentFirm);
  const consultations = firm?.consultations ?? [];

  const [tab, setTab] = useState<"upcoming" | "past" | "range">("upcoming");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange | undefined>(undefined);
  const [appliedRange, setAppliedRange] = useState<DateRange | undefined>(
    undefined
  );

  useEffect(() => {
    if (tab === "range") {
      const today = new Date();
      const startOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const todayRange = { from: startOfToday, to: startOfToday };
      setTempRange(todayRange);
      setAppliedRange(todayRange);
    }
  }, [tab]);

  const startOfDay = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  const endOfDay = (date: Date) =>
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999
    );

  const filteredConsultations = useMemo(() => {
    const now = new Date();
    if (tab === "upcoming") {
      const filtered = consultations.filter((c) =>
        isAfter(new Date(c.scheduledFor), now)
      );
      console.log("Filtered upcoming consultations:", filtered);
      return filtered;
    } else if (tab === "past") {
      const filtered = consultations.filter((c) =>
        isBefore(new Date(c.scheduledFor), now)
      );
      console.log("Filtered past consultations:", filtered);
      return filtered;
    } else if (tab === "range" && appliedRange?.from && appliedRange?.to) {
      const fromDate = startOfDay(appliedRange.from);
      const toDate = endOfDay(appliedRange.to);
      const filtered = consultations.filter((c) => {
        const date = new Date(c.scheduledFor);
        return date >= fromDate && date <= toDate;
      });
      console.log("Filtered range consultations:", filtered);
      return filtered;
    }
    // safety fallback
    return [];
  }, [consultations, tab, appliedRange]);

  const formatDateRange = (from?: Date, to?: Date) => {
    if (!from || !to) return "";
    const optionsDayMonth: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };
    const optionsFull: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    const isSameDay =
      from.getFullYear() === to.getFullYear() &&
      from.getMonth() === to.getMonth() &&
      from.getDate() === to.getDate();

    if (isSameDay) {
      return from.toLocaleDateString(undefined, optionsFull);
    } else {
      if (from.getFullYear() === to.getFullYear()) {
        return `${from.toLocaleDateString(
          undefined,
          optionsDayMonth
        )} – ${to.toLocaleDateString(undefined, optionsFull)}`;
      } else {
        return `${from.toLocaleDateString(
          undefined,
          optionsFull
        )} – ${to.toLocaleDateString(undefined, optionsFull)}`;
      }
    }
  };

  const handleSelect: OnSelectHandler<DateRange | undefined> = (selected) => {
    setTempRange(selected);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex w-full max-w-6xl flex-col gap-6 mx-auto mt-8">
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as typeof tab)}
        >
          <TabsList>
            <TabsTrigger className="cursor-pointer" value="upcoming">
              Upcoming
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="past">
              Past
            </TabsTrigger>

            <TabsTrigger className="cursor-pointer" value="range">
              <Popover
                open={tab === "range" && popoverOpen}
                onOpenChange={setPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <div
                    onClick={() => {
                      setTab("range"); // ensure the tab is selected
                      setPopoverOpen(true); // open the popover
                    }}
                  >
                    Date Range
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Scan by Date Range
                    </h3>
                  </div>

                  <Calendar
                    mode="range"
                    selected={tempRange}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                    initialFocus
                  />

                  <div className="flex justify-end gap-4 mt-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => {
                        setTempRange(appliedRange); // revert changes
                        setPopoverOpen(false); // close popover
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      size="sm"
                      className="cursor-pointer"
                      disabled={!tempRange?.from || !tempRange?.to}
                      onClick={() => {
                        if (tempRange?.from && tempRange?.to) {
                          setAppliedRange(tempRange); // apply new range
                          setPopoverOpen(false); // close popover
                        }
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={tab}>
            {tab === "range" && appliedRange?.from && appliedRange?.to && (
              <span className="ml-2 mb-2 inline-block text-sm text-muted-foreground">
                {formatDateRange(appliedRange.from, appliedRange.to)}
              </span>
            )}

            <DataTable columns={columns} data={filteredConsultations} />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ConsultationsContent;