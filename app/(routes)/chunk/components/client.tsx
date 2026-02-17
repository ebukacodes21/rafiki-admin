"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";
import ChunkContent from "./content";

const ConsultationsClient = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title={`Chunk Documents`}
          description="Use the Isi Atu Engine to chunk and personalize your documents"
        />
      </div>
      <Separator className="my-4" />

     <ChunkContent /> 
    </div>
  );
};

export default ConsultationsClient;