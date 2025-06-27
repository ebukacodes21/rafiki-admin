"use client";
import React, { useState } from "react";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Content from "./content";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm } from "@/redux/features/firm";
import { apiCall, formatError } from "@/utils/helper";

const DashboardClient = () => {
  const firm = useAppSelector(selectCurrentFirm);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);

  const handleInviteLawyers = async () => {
    if (!emailInput) {
      toast.error("Enter atleast one email address");
      return;
    }
    const rawEmails = emailInput
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
    const invalids = rawEmails.filter((e) => e.split(" ").length > 1);

    if (invalids.length > 0) {
      toast.error(
        `The following entries seem invalid (possibly missing commas):\n\n${invalids.join(
          "\n"
        )}`
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidFormat = rawEmails.filter((email) => !emailRegex.test(email));

    if (invalidFormat.length > 0) {
      toast.error(
        `Invalid email format detected:\n\n${invalidFormat.join("\n")}`
      );
      return;
    }

    setIsLoading(true);
    const result = await apiCall("/api/invite-lawyer", "POST", {
      firmId: firm?.id,
      firmName: firm?.name,
      emails: rawEmails,
    });

    if (result.name === "AxiosError") {
      setIsLoading(false);
      setShowModal(false);
      setEmailInput("");
      toast.error(formatError(result));
      return;
    }

    toast.success(result.message);
    setShowModal(false);
    setEmailInput("");
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Dashboard`} description="Overview of your firm" />

        <Button className="cursor-pointer" onClick={() => setShowModal(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Invite Lawyers
        </Button>
      </div>
      <Separator />
      <Content />
      <Modal
        onClose={() => {}}
        isOpen={showModal}
        title="Invite Lawyers"
        description="Enter their email addresses separated by commas. Each lawyer will receive a secure access link via email, allowing them to log in and gain access to your firm’s dashboard"
      >
        <div className="space-y-4">
          <Textarea
            placeholder="Enter the email addresses of lawyers to invite, separated by commas."
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <Button
              className="cursor-pointer"
              variant="ghost"
              onClick={() => setShowModal(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              className="cursor-pointer"
              onClick={handleInviteLawyers}
            >
              Send Invites
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DashboardClient;
