"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  EyeIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRequireAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { toast } from "react-hot-toast";

const MatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  practiceArea: z.string().optional(),
  documents: z.array(z.string()).optional(),
  events: z.array(z.string()).optional(),
  parties: z.array(z.string()).optional(),
});

type MatterFormType = z.infer<typeof MatterSchema>;

export default function AddNewMatterPage() {
  useRequireAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MatterFormType>({
    resolver: zodResolver(MatterSchema),
    defaultValues: {
      title: "",
      description: "",
      practiceArea: "",
      documents: [],
      events: [],
      parties: [],
    },
  });

  const [tab, setTab] = useState("overview");

  const onSubmit = (data: MatterFormType) => {
    // Simulate submission
    console.log("Submitted Matter:", data);
    toast.success("Matter submitted successfully");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-6xl flex-col gap-6 mx-auto mt-8"
    >
     <Card className="md:col-span-2">
        <CardContent className="p-4">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger
                className="cursor-pointer flex items-center"
                value="overview"
              >
                <EyeIcon className="w-5 h-5 mr-1 text-sky-500" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer flex items-center"
                value="documents"
              >
                <DocumentTextIcon className="w-5 h-5 mr-1 text-indigo-500" />
                Documents
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer flex items-center"
                value="calendar"
              >
                <CalendarDaysIcon className="w-5 h-5 mr-1 text-emerald-500" />
                Calendar
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer flex items-center"
                value="parties"
              >
                <UsersIcon className="w-5 h-5 mr-1 text-violet-500" />
                Parties
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="space-y-2">
                <Input
                  placeholder="Matter Title"
                  defaultValue="ABC Ltd v XYZ Ltd"
                />
                <Textarea
                  placeholder="Matter Description"
                  defaultValue="Breach of contract case involving supply agreement."
                />
                <Input
                  placeholder="Practice Area"
                  defaultValue="Commercial Law"
                />
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <div className="space-y-2">
                <Button variant="outline">Upload Document</Button>
                <ul className="list-disc pl-5">
                  <li>Contract.pdf</li>
                  <li>ClaimForm.docx</li>
                </ul>
              </div>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <div className="space-y-2">
                <Button variant="outline">Add Event</Button>
                <ul className="list-disc pl-5">
                  <li>Pre-trial Conference - 12 July 2025</li>
                  <li>Hearing - 25 August 2025</li>
                </ul>
              </div>
            </TabsContent>

            {/* Parties Tab */}
            <TabsContent value="parties">
              <div className="space-y-2">
                <Button variant="outline">Add Party</Button>
                <ul className="list-disc pl-5">
                  <li>Client: ABC Ltd (Plaintiff)</li>
                  <li>Defendant: XYZ Ltd</li>
                  <li>Opposing Counsel: Barr. Jane Smith</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </form>
  );
}
