"use client";

import { FC, useState } from "react";
import {
  PhoneIcon,
  BriefcaseIcon,
  IdentificationIcon,
  AcademicCapIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import * as z from "zod";
import { AdminFormSchema } from "@/schema";
import { UseFormReturn } from "react-hook-form";
import { FileUpload } from "@/components/fileUploader";
import { fileUploader, formatError } from "@/utils/helper";
import toast from "react-hot-toast";

type FormType = z.infer<typeof AdminFormSchema>;

interface AdminDetailsStepProps {
  form: UseFormReturn<FormType>;
}

const requiredFields: (keyof FormType)[] = [
  "fullName",
  "phone",
  "position",
  "enrollNumber",
  "yearsOfExperience",
  "lawSchool",
  "document",
];

const AdminDetailsStep: FC<AdminDetailsStepProps> = ({ form }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const handleFileUpload = async (file: File | undefined) => {
    if (!file || isUploaded) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    const result = await fileUploader("/api/upload", formData);
    setLoading(false);

    if (result?.name === "AxiosError") {
      toast.error(formatError(result));
      return;
    }

    const fileUrl = result.fileUrl;
    form.setValue("document", fileUrl, { shouldValidate: true });
    toast.success("File uploaded successfully!");
    setIsUploaded(true); 
  };

  const {
    register,
    formState: { errors },
  } = form;

  const InputField = ({
    label,
    name,
    placeholder,
    Icon,
    type = "text",
    iconColor = "text-gray-400",
  }: {
    label: string;
    name: keyof FormType;
    placeholder: string;
    Icon: FC<any>;
    type?: string;
    iconColor?: string;
  }) => (
    <div className="space-y-1">
      <label className="text-sm text-gray-700 font-medium">
        {label}
        {requiredFields.includes(name) && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>
      <div
        className={`flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ${
          errors[name]
            ? "border-red-500 focus-within:ring-red-500"
            : "border-gray-300 focus-within:ring-black"
        }`}
      >
        <Icon className={`h-5 w-5 mr-2 ${iconColor}`} />
        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className="w-full border-none outline-none text-sm text-gray-800 placeholder-gray-400"
        />
      </div>
      {errors[name] && (
        <p className="text-xs text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-900">
        Admin (Lawyer) Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputField
          label="Full Name"
          name="fullName"
          placeholder="John Doe"
          Icon={UserIcon}
          iconColor="text-orange-600"
        />
        <InputField
          label="Phone Number"
          name="phone"
          placeholder="+254..."
          Icon={PhoneIcon}
          iconColor="text-green-600"
        />
        <InputField
          label="Position/Title"
          name="position"
          placeholder="Managing Partner"
          Icon={BriefcaseIcon}
          iconColor="text-blue-600"
        />
        <InputField
          label="Enrollment Number"
          name="enrollNumber"
          placeholder="SCN123456"
          Icon={IdentificationIcon}
          iconColor="text-amber-600"
        />
        <InputField
          label="Years of Experience"
          name="yearsOfExperience"
          placeholder="5"
          type="number"
          Icon={BriefcaseIcon}
          iconColor="text-purple-600"
        />
        <InputField
          label="Law School Attended"
          name="lawSchool"
          placeholder="University of Nairobi"
          Icon={AcademicCapIcon}
          iconColor="text-sky-600"
        />
      </div>

      {/* File Upload Field */}
      <FileUpload
        title={"Upload a qualifying document"}
        onChange={(file) => handleFileUpload(file)}
        isLoading={loading}
        disabled={isUploaded}
        message={
          isUploaded
            ? "Document uploaded successfully 🎉"
            : "Upload a qualifying document (Call to Bar Certificate, Practice Licence)"
        }
      />
    </div>
  );
};

export default AdminDetailsStep;
