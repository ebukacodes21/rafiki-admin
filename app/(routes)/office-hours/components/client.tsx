"use client";
import React from "react";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Content from "./content";

const OfficeHoursClient = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Office Hours`}
          description="Manage your firm diary"
        />

      </div>
      <Separator />
      <Content />
    </>
  );
};

export default OfficeHoursClient;
