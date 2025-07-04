"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm } from "@/redux/features/firm";
import ConsultationsContent from "./content";

const ConsultationsClient = () => {
  const firm = useAppSelector(selectCurrentFirm);
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title={`Consultations (${firm?.consultations?.length})`}
          description="View all Firm Consultations"
        />
      </div>
      <Separator className="my-4" />

     <ConsultationsContent /> 
    </div>
  );
};

export default ConsultationsClient;