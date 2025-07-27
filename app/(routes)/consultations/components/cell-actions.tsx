"use client";

import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { SiWhatsapp } from "react-icons/si"; 
import React from "react";

export const CellActions = () => {
  return (
    <div>
      <AlertModal
        isOpen={false}
        onClose={() => {}}
        onConfirm={() => {}}
        loading={false}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <EllipsisHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => {}}>
            <EnvelopeIcon className="mr-2 h-4 w-4" />
            Send Email Reminder
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => {}}>
            <SiWhatsapp className="mr-2 h-4 w-4 text-green-600" />
            Send WhatsApp Reminder
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => {}}>
            <CalendarDaysIcon className="mr-2 h-4 w-4" />
            Reschedule
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};