"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Database, LucideLoader2, MoveUp, RefreshCcw } from "lucide-react";

const DocuPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [indexName, setIndexName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [filename, setFilename] = useState("");
  const [progress, setProgress] = useState(0);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [uploadedChunks, setUploadedChunks] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);

  const appendLog = (msg: string) => {
    setLogMessages((prev) => [...prev, msg].slice(-10)); // keep last 10 logs
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setProgress(0);
    setLogMessages([]);
    setFilename("");

    try {
      const res = await fetch("/api/updatedb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ indexName, namespace }),
      });

      if (!res.body) throw new Error("No response stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter(Boolean);

          for (const line of lines) {
            try {
              const data = JSON.parse(line);
              if (data.status) appendLog(`Status: ${data.status}`);
              if (data.file) setFilename(data.file);
              if (data.uploadedChunks !== undefined)
                setUploadedChunks(data.uploadedChunks);
              if (data.totalChunks !== undefined)
                setTotalChunks(data.totalChunks);

              if (
                data.uploadedChunks !== undefined &&
                data.totalChunks !== undefined
              ) {
                const percent = Math.round(
                  (data.uploadedChunks / data.totalChunks) * 100
                );
                setProgress(percent);
              }

              if (data.error) {
                appendLog(`Error: ${data.error}`);
                setIsUploading(false);
              }

              if (data.status === "complete") {
                appendLog("Upload complete!");
                setProgress(100);
                setIsUploading(false);
              }
            } catch {
              // Malformed line - ignore or log
              console.warn("Malformed JSON in stream line:", line);
            }
          }
        }
      }
    } catch (err: any) {
      appendLog(`Upload failed: ${err.message}`);
      setIsUploading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex w-full max-w-6xl flex-col gap-6 mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Update Knowledge</CardTitle>
            <CardDescription>Add new Documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 grid gap-4 border rounded-lg p-6">
                <div className="gap-4 relative">
                  <Button
                    className="absolute -right-4 -top-4"
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => setLogMessages([])}
                    aria-label="Clear Logs"
                  >
                    <RefreshCcw />
                  </Button>
                  <div className="space-y-1">
                    <Label>Log</Label>
                    <Textarea
                      readOnly
                      value={logMessages.join("\n")}
                      className="min-h-24 resize-none text-sm text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Index Name</Label>
                    <Input
                      onChange={(e) => setIndexName(e.target.value)}
                      placeholder="Index name"
                      disabled={isUploading}
                      value={indexName}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Namespace</Label>
                    <Input
                      onChange={(e) => setNamespace(e.target.value)}
                      placeholder="Namespace"
                      disabled={isUploading}
                      value={namespace}
                    />
                  </div>
                </div>
              </div>

              <Button
                variant={"outline"}
                className="w-full h-full cursor-pointer"
                onClick={handleUpload}
                disabled={isUploading || !indexName}
                aria-label="Start Upload"
              >
                <span className="flex flex-row items-center justify-center gap-2">
                  <Database size={50} className="text-red-900" />
                  <MoveUp className="text-red-900" />
                </span>
              </Button>
            </div>

            {isUploading && (
              <div className="mt-6">
                <Label>Current File:</Label>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-sm">
                    {filename || "Processing..."}
                  </span>
                  <Progress value={progress} className="flex-1" />
                  <LucideLoader2 className="animate-spin text-muted-foreground" />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Processed chunks: {uploadedChunks} / {totalChunks} (
                  {totalChunks - uploadedChunks} left)
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default DocuPage;
