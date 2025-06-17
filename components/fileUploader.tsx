import { FC } from "react";
import { ClipLoader } from "react-spinners";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";

export const FileUpload: FC<{
  title: string;
  onChange: (file: File) => void;
  isLoading: boolean;
  disabled: boolean;
  message?: string
}> = ({ title, onChange, isLoading, message, disabled }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
        <DocumentArrowUpIcon className="h-5 w-5 text-blue-500" />
        {title}
        <span className="text-red-500">*</span>
      </label>

      <div
        className={`flex items-center border rounded-md px-3 py-2 transition 
          ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${isLoading ? "border-gray-300" : "border-gray-300 hover:border-gray-500 focus-within:border-gray-500"}`}
      >
        <input
          type="file"
          accept=".pdf, .docx, image/jpeg, image/png"
          className="w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
          disabled={isLoading || disabled}
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : undefined;
            if (file) {
              onChange(file);
            }
          }}
        />
        
      </div>
            <p className="text-sm">{message}</p>

      {isLoading && (
        <div className="flex items-center text-sm text-gray-600 gap-2">
          <ClipLoader loading={isLoading} color="black" size={18} />
          <span>Uploading file...</span>
        </div>
      )}
    </div>
  );
};
