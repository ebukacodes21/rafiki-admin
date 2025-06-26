"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDaysIcon,
  DocumentTextIcon,
  EyeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useRequireAuth } from "../../hooks/useAuth";

const AddNewMatterPage = () => {
  useRequireAuth();
  return (
    <div className="flex w-full max-w-6xl flex-col gap-6 mx-auto mt-8">
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
    </div>
  );
};

export default AddNewMatterPage;
