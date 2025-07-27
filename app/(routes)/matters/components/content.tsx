"use client";

import { useState, useMemo } from "react";
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
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm } from "@/redux/features/firm";
import { useRouter } from "next/navigation";
import { routes } from "@/constants";
import { apiCall } from "@/utils/helper";
import toast from "react-hot-toast";

export default function MattersContent() {
  const router = useRouter();
  const firm = useAppSelector(selectCurrentFirm);
  const matters = firm?.matters || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMatter, setSelectedMatter] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const filteredMatters = useMemo(() => {
    return matters.filter((matter) =>
      matter.parties?.some(
        (party: any) =>
          party.role === "Client" &&
          party.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [matters, searchTerm]);

  const current =
    selectedMatter !== null ? filteredMatters[selectedMatter] : null;

  const handleDelete = async () => {
    setLoading(true);
    const result = await apiCall(
      `/api/delete-matter?matterId=${current?.id}`,
      "GET"
    );
    if (result.name === "AxiosError") {
      setLoading(false);
      toast.error(result.message);
      return;
    }

    router.refresh();
    toast.success(result.message);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex w-full max-w-6xl gap-6 mx-auto mt-8">
        {/* Sidebar */}
        <Card className="w-72">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Matters</h2>
            <Input
              placeholder="Search by client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="space-y-1 overflow-auto max-h-96">
              {filteredMatters.map((matter, i) => (
                <Button
                  key={i}
                  variant={selectedMatter === i ? "default" : "ghost"}
                  className="w-full justify-start cursor-pointer"
                  onClick={() => setSelectedMatter(i)}
                >
                  {matter.title}
                </Button>
              ))}
              {filteredMatters.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No matches found.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Panel */}
        <Card className="flex-1">
          <CardContent className="p-4">
            {current ? (
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger
                    value="overview"
                    className="flex items-center cursor-pointer"
                  >
                    <EyeIcon className="w-5 h-5 mr-1 text-sky-500" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="documents"
                    className="flex items-center cursor-pointer"
                  >
                    <DocumentTextIcon className="w-5 h-5 mr-1 text-indigo-500" />
                    Documents
                  </TabsTrigger>
                  <TabsTrigger
                    value="calendar"
                    className="flex items-center cursor-pointer"
                  >
                    <CalendarDaysIcon className="w-5 h-5 mr-1 text-emerald-500" />
                    Calendar
                  </TabsTrigger>
                  <TabsTrigger
                    value="parties"
                    className="flex items-center cursor-pointer"
                  >
                    <UsersIcon className="w-5 h-5 mr-1 text-violet-500" />
                    Parties
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-2">
                    <Input value={current.title} readOnly />
                    <Textarea value={current.description} readOnly />
                    <Input value={current.area} readOnly />
                  </div>
                </TabsContent>

                <TabsContent value="documents">
                  <div className="space-y-2">
                    <ul className="list-disc pl-5">
                      {current.documents?.length > 0 ? (
                        current.documents.map((doc: string, i: number) => (
                          <li key={i}>{doc}</li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground">
                          No documents
                        </li>
                      )}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="calendar">
                  <div className="space-y-2">
                    <ul className="list-disc pl-5">
                      {current.events?.length > 0 ? (
                        current.events.map((event: any, i: number) => (
                          <li key={i}>
                            {event.name} -{" "}
                            {new Date(event.date).toLocaleDateString()}
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground">
                          No events
                        </li>
                      )}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="parties">
                  <div className="space-y-2">
                    <ul className="list-disc pl-5">
                      {current.parties?.map((party: any, i: number) => (
                        <li key={i}>
                          {party.role}: {party.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                {current && (
                  <div className="flex space-x-2">
                    <Button
                      className="mt-4 w-52 cursor-pointer"
                      onClick={handleDelete}
                      disabled={loading}
                      variant={"ghost"}
                    >
                      Delete Matter
                    </Button>
                    <Button
                      className="mt-4 w-52 cursor-pointer"
                      disabled={loading}
                      onClick={() =>
                        router.push(`${routes.MATTERS}/${current.id}`)
                      }
                    >
                      Edit Matter
                    </Button>
                  </div>
                )}
              </Tabs>
            ) : (
              <div>
                {matters.length > 0 ? (
                  <p className="text-muted-foreground text-sm">
                    Select a matter to view details.
                  </p>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No Matters Created yet
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
