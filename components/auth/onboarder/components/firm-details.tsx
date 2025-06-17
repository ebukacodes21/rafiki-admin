import { UseFormReturn } from "react-hook-form";
import { FirmFormSchema } from "@/schema";
import { z } from "zod";
import { FC } from "react";
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

const FirmDetailsStep: FC<FirmDetailsStepProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

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

    return (
      <div className="space-y-1">
        <label className="text-sm text-gray-700 font-medium">
          {label}{" "}
          {isRequired && <span className="text-red-500">*</span>}
        </label>
        <div className={`flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ${errors[name] ? "border-red-500" : "focus-within:ring-black"}`}>
          <Icon className={`h-5 w-5 mr-2 ${iconColor}`} />
          <input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className="w-full border-none outline-none text-sm text-gray-800 placeholder-gray-400"
          />
        </div>
        {errors[name] && (
          <p className="text-xs text-red-600">{errors[name]?.message as string}</p>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <InputField label="Firm Name" name="firmName" placeholder="Rafiki Legal Group" Icon={BuildingOfficeIcon} iconColor="text-indigo-500" />
      <InputField label="Tagline" name="tagline" placeholder="Justice, simplified." Icon={ChatBubbleBottomCenterTextIcon} iconColor="text-gray-500" />
      <InputField label="Website" name="website" placeholder="https://yourfirm.com" Icon={GlobeAltIcon} iconColor="text-blue-500" />
      <InputField label="Location" name="location" placeholder="Nairobi, Kenya" Icon={MapPinIcon} iconColor="text-red-500" />
      <InputField label="Email" name="email" placeholder="contact@rafiki.legal" Icon={EnvelopeIcon} iconColor="text-yellow-500" />
      <InputField label="Phone" name="phone" placeholder="+254 712 345678" Icon={PhoneIcon} iconColor="text-green-500" />
      <InputField label="Date Founded" name="founded" placeholder="2021-04-15" Icon={CalendarIcon} type="date" iconColor="text-purple-500" />
      <InputField label="Instagram" name="instagram" placeholder="https://instagram.com/yourfirm" Icon={FaInstagram} iconColor="text-pink-500" />
      <InputField label="X (Twitter)" name="x" placeholder="https://x.com/yourfirm" Icon={FaTwitter} iconColor="text-blue-400" />
      <InputField label="Facebook" name="facebook" placeholder="https://facebook.com/yourfirm" Icon={FaFacebook} iconColor="text-blue-700" />
    </div>
  );
};

export default FirmDetailsStep;