"use client";
import React from "react";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Content from "./content";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const DocumentsClient = () => {
  const router = useRouter()
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Letterhead`}
          description="Manage your letters and writings"
        />

        <Button
          onClick={() => router.push(`/matters/new`)}
          className="cursor-pointer"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <Content />
    </>
  );
};

export default DocumentsClient;