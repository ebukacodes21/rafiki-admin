"use client";

import { FC, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { AdminFormSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/fileUploader";
import { fileUploader, formatError } from "@/utils/helper";
import toast from "react-hot-toast";
import { countryList } from "@/constants";

import {
  PhoneIcon,
  BriefcaseIcon,
  IdentificationIcon,
  AcademicCapIcon,
  UserIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

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
  "country",
];

const fieldGroups: Array<
  Array<{
    label: string;
    name: keyof FormType;
    placeholder: string;
    Icon: FC<any>;
    type?: string;
    iconColor?: string;
  }>
> = [
  [
    {
      label: "Full Name",
      name: "fullName",
      placeholder: "John Doe",
      Icon: UserIcon,
      iconColor: "text-orange-600",
    },
    {
      label: "Phone Number",
      name: "phone",
      placeholder: "+254...",
      Icon: PhoneIcon,
      iconColor: "text-green-600",
    },
  ],
  [
    {
      label: "Position/Title",
      name: "position",
      placeholder: "Managing Partner",
      Icon: BriefcaseIcon,
      iconColor: "text-blue-600",
    },
    {
      label: "Enrollment Number",
      name: "enrollNumber",
      placeholder: "SCN123456",
      Icon: IdentificationIcon,
      iconColor: "text-amber-600",
    },
  ],
  [
    {
      label: "Years of Experience",
      name: "yearsOfExperience",
      placeholder: "5",
      type: "number",
      Icon: BriefcaseIcon,
      iconColor: "text-purple-600",
    },
    {
      label: "Law School Attended",
      name: "lawSchool",
      placeholder: "University of Nairobi",
      Icon: AcademicCapIcon,
      iconColor: "text-sky-600",
    },
  ],
];

const AdminDetailsStep: FC<AdminDetailsStepProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form;
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [currentStep, setCurrentStep] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, fieldGroups.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleFileUpload = async (file: File | undefined) => {
    if (!file || isUploaded) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    const result = await fileUploader("/api/upload", formData);
    setUploading(false);

    if (result?.name === "AxiosError") {
      toast.error(formatError(result));
      return;
    }

    form.setValue("document", result.fileUrl, { shouldValidate: true });
    toast.success("Document uploaded successfully!");
    setIsUploaded(true);
  };

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch("https://ip-api.io/api/v1/ip");
        const data = await response.json();
        if (data.location.country) {
          setSelectedCountry(data.location.country);
        }
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };

    fetchCountry();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      form.setValue("country", selectedCountry);
    }
  }, [selectedCountry, form]);

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
  }) => {
    const error = errors[name];
    const isRequired = requiredFields.includes(name);

    return (
      <div className="space-y-1">
        <Label className="text-sm font-medium">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
        <div
          className={`flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ${
            error
              ? "border-red-500 focus-within:ring-red-500"
              : "border-gray-300 focus-within:ring-black"
          }`}
        >
          <Icon className={`h-5 w-5 mr-2 ${iconColor}`} />
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className="w-full border-none outline-none text-sm placeholder:text-gray-400"
          />
        </div>
        {error && (
          <p className="text-xs text-red-600">{error.message as string}</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {currentStep < fieldGroups.length ? (
          fieldGroups[currentStep].map((field) => (
            <InputField key={field.name} {...field} />
          ))
        ) : (
          <>
            <div className="space-y-1 col-span-2">
              <div className="flex items-center gap-1">
                <GlobeAltIcon className="h-5 w-5 text-blue-600"/>
              <Label className="text-sm font-medium">
                Country <span className="text-red-500">*</span>
              </Label>
              </div>
              <Select
                value={selectedCountry}
                onValueChange={(value) => {
                  setSelectedCountry(value);
                  form.setValue("country", value, { shouldValidate: true });
                }}
              >
                <SelectTrigger className="rounded-md border border-gray-300 px-4 py-2 bg-white cursor-pointer">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countryList.map((country) => (
                    <SelectItem key={country.id} value={country.name}>
                      <div className="flex items-center gap-2 justify-start">
                        <Image
                          src={`data:image/png;base64,${country.flag}`}
                          alt={country.name}
                          width={20}
                          height={15}
                          className="rounded-sm"
                        />
                        <span>{country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-xs text-red-600">
                  {errors.country.message as string}
                </p>
              )}
            </div>

            <div className="col-span-2 space-y-4">
              <Label className="text-sm font-medium">
                Upload Document <span className="text-red-500">*</span>
              </Label>
              <FileUpload
                title="Upload Practice Licence or Bar Certificate"
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
        )}
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="text-sm cursor-pointer hover:underline disabled:opacity-50"
        >
          ← Back
        </button>

        <p className="text-xs">
          Step {currentStep + 1} of {fieldGroups.length + 1}
        </p>

        <button
          type="button"
          onClick={nextStep}
          disabled={currentStep === fieldGroups.length}
          className="text-sm cursor-pointer font-medium underline"
        >
          {currentStep === fieldGroups.length - 1 ? "Upload →" : "Next →"}
        </button>
      </div>
    </div>
  );
};

export default AdminDetailsStep;
