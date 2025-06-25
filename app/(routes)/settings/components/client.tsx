"use client";
import AlertModal from "@/components/modals/alert-modal";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import Content from "./content";

const SettingsClient = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage Firm Account Preferences" />
      </div>
      <Separator />
      <Content />
    </>
  );
};

export default SettingsClient;
