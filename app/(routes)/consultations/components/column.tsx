"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellActions } from "./cell-actions";
import { format } from "date-fns";

export type Consultation = {
  id?: string;
  firmID: string;
  clientID: string;
  status: string;
  paymentRef: string;
  bookedAt: string;
  scheduledFor: string;
  duration: number;
  completedAt?: string;
  cancelledAt?: string;
  notes?: string;
};

export const columns: ColumnDef<Consultation>[] = [
  {
    accessorKey: "scheduledFor",
    header: "Scheduled For",
    cell: ({ row }) => {
      const value = row.original.scheduledFor;
      return format(new Date(value), "PPP p"); 
    },
  },
  {
    accessorKey: "bookedAt",
    header: "Date",
    cell: ({ row }) => {
      const value = row.original.bookedAt;
      return format(new Date(value), "PPP p");
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellActions data={row.original} />,
  // },
];