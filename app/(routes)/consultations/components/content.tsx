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
  const now = new Date();
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
    if (tab === "upcoming") {
      return consultations.filter((c) =>
        isAfter(new Date(c.scheduledFor), now)
      );
    } else if (tab === "past") {
      return consultations.filter((c) =>
        isBefore(new Date(c.scheduledFor), now)
      );
    } else if (tab === "range" && appliedRange?.from && appliedRange?.to) {
      const fromDate = startOfDay(appliedRange.from);
      const toDate = endOfDay(appliedRange.to);
      return consultations.filter((c) => {
        const date = new Date(c.scheduledFor);
        return date >= fromDate && date <= toDate;
      });
    }
    // for safety, no consultations when tab unknown
    return [];
  }, [consultations, tab, appliedRange, now]);

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
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>

            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <TabsTrigger value="range" onClick={() => setPopoverOpen(true)}>
                  Date Range
                </TabsTrigger>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Select Date Range</h3>
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
                    onClick={() => {
                      setTempRange(appliedRange); // revert changes
                      setPopoverOpen(false); // close popover
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    size="sm"
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
          </TabsList>

          <TabsContent value={tab}>
            {tab === "range" && appliedRange?.from && appliedRange?.to && (
              <span className="ml-2 mb-2 inline-block text-sm text-muted-foreground">
                {formatDateRange(appliedRange.from, appliedRange.to)}
              </span>
            )}

            <DataTable
              columns={columns}
              data={filteredConsultations}
              searchKey="scheduledFor"
            />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ConsultationsContent;
