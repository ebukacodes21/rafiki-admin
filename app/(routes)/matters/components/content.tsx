import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DocumentTextIcon,
  CalendarDaysIcon,
  UsersIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function MattersContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {/* Sidebar - Matter List */}
      <Card className="md:col-span-1">
        <CardContent className="p-4 space-y-2">
          <h2 className="text-xl font-semibold">Matters</h2>
          <Input placeholder="Search matters..." />
          <div className="space-y-1 overflow-auto max-h-96">
            {["ABC v XYZ", "John v State", "Divorce - Jane Doe"].map(
              (matter, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  {matter}
                </Button>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Panel - Matter Details */}
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
    </motion.div>
  );
}
