"use client";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
// import { CategoryColumn, columns } from "./column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import Content from "./content";

type ConsultationsClientProp = {
  data: [];
};

const ConsultationsClient: FC<ConsultationsClientProp> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

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

export default ConsultationsClient;
