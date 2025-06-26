import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import { FirmFormSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import {
  BuildingOfficeIcon,
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { CalendarIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

type FormType = z.infer<typeof FirmFormSchema>;

interface FirmDetailsStepProps {
  form: UseFormReturn<FormType>;
}

const requiredFields: (keyof FormType)[] = [
  "firmName",
  "location",
  "email",
  "phone",
  "founded",
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
      label: "Firm Name",
      name: "firmName",
      placeholder: "Rafiki Legal Group",
      Icon: BuildingOfficeIcon,
      iconColor: "text-indigo-500",
    },
    {
      label: "Tagline",
      name: "tagline",
      placeholder: "Justice, simplified.",
      Icon: ChatBubbleBottomCenterTextIcon,
      iconColor: "text-gray-500",
    },
  ],
  [
    {
      label: "Website",
      name: "website",
      placeholder: "https://yourfirm.com",
      Icon: GlobeAltIcon,
      iconColor: "text-blue-500",
    },
    {
      label: "Location",
      name: "location",
      placeholder: "Nairobi, Kenya",
      Icon: MapPinIcon,
      iconColor: "text-red-500",
    },
  ],
  [
    {
      label: "Email",
      name: "email",
      placeholder: "contact@rafiki.legal",
      Icon: EnvelopeIcon,
      iconColor: "text-yellow-500",
    },
    {
      label: "Phone",
      name: "phone",
      placeholder: "+254 712 345678",
      Icon: PhoneIcon,
      iconColor: "text-green-500",
    },
  ],
  [
    {
      label: "Date Founded",
      name: "founded",
      placeholder: "2021-04-15",
      Icon: CalendarIcon,
      type: "date",
      iconColor: "text-purple-500",
    },
    {
      label: "Instagram",
      name: "instagram",
      placeholder: "https://instagram.com/yourfirm",
      Icon: FaInstagram,
      iconColor: "text-pink-500",
    },
  ],
  [
    {
      label: "X (Twitter)",
      name: "x",
      placeholder: "https://x.com/yourfirm",
      Icon: FaTwitter,
      iconColor: "text-blue-400",
    },
    {
      label: "Facebook",
      name: "facebook",
      placeholder: "https://facebook.com/yourfirm",
      Icon: FaFacebook,
      iconColor: "text-blue-700",
    },
  ],
];

const FirmDetailsStep: FC<FirmDetailsStepProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < fieldGroups.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

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
    const isRequired = requiredFields.includes(name);
    const error = errors[name];

    if (type === "date") {
      const dateValue = watch(name);
      const selectedDate = dateValue ? new Date(dateValue) : undefined;

      return (
        <div className="space-y-1">
          <Label className="text-sm font-medium text-gray-700">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "w-full flex items-center px-3 py-2 border rounded-md text-left text-sm",
                  error ? "border-red-500" : "border-gray-300"
                )}
              >
                <Icon className={`h-5 w-5 mr-2 ${iconColor}`} />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span className="text-gray-400">{placeholder}</span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (!date) return;
                  const localDate = date.toLocaleDateString("en-CA");
                  setValue(name, localDate);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {error && (
            <p className="text-xs text-red-600">{error.message as string}</p>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-1">
        <Label className="text-sm font-medium">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
        <div
          className={`flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ${
            error ? "border-red-500" : "focus-within:ring-black"
          }`}
        >
          <Icon className={`h-5 w-5 mr-2 ${iconColor}`} />
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className="w-full border-none outline-none text-md placeholder:text-gray-400"
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
        {fieldGroups[currentStep].map((field) => (
          <InputField key={field.name} {...field} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="text-sm cursor-pointer hover:underline disabled:opacity-50"
        >
          ← Back
        </button>

        <p className="text-xs">
          Step {currentStep + 1} of {fieldGroups.length}
        </p>

        <button
          type="button"
          onClick={nextStep}
          disabled={currentStep === fieldGroups.length - 1}
          className="text-sm cursor-pointer font-medium underline"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default FirmDetailsStep;
