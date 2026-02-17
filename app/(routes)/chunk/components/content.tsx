"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/fileUploader";
import { fileUploader, formatError } from "@/utils/helper";
import toast from "react-hot-toast";


const ChunkContent = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file: File | undefined) => {
    if (!file || isUploaded) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    const result = await fileUploader("/api/upload", formData);
    setUploading(false);
    if (result?.name === "AxiosError") {
      toast.error(formatError(result));
      console.log(result);
      return;
    }

    toast.success("Document uploaded successfully!");
    setIsUploaded(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <>
          <div className="col-span-2 space-y-4">
            <Label className="text-sm font-medium">
              Upload Document 
            </Label>
            <FileUpload
              title=""
              onChange={handleFileUpload}
              isLoading={uploading}
              disabled={isUploaded}
              message={
                isUploaded
                  ? "✅ Document uploaded successfully!"
                  : "Upload a valid document (PDF, PNG, etc.)"
              }
            />
          </div>
        </>
      </div>
    </div>
  );
};

export default ChunkContent;
