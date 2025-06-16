"use client";
import { FC } from "react";
import {
  BuildingOfficeIcon,
  ChatBubbleBottomCenterTextIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

interface FirmForm {
  firmName: string;
  tagline: string;
  website: string;
  location: string;
  email: string
}

interface FirmDetailsStepProps {
  formData: FirmForm;
  setFormData: React.Dispatch<React.SetStateAction<FirmForm>>;
}

const FirmDetailsStep: FC<FirmDetailsStepProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const InputField = ({ label, name, placeholder, Icon }: any) => (
    <div className="space-y-1">
      <label className="text-sm text-gray-700">{label}</label>
      <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-black">
        <Icon className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          name={name}
          value={(formData as any)[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full border-none outline-none text-sm"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">Firm Details</h2>
      <InputField label="Firm Name" name="firmName" placeholder="Rafiki Legal Group" Icon={BuildingOfficeIcon} />
      <InputField label="Tagline" name="tagline" placeholder="Justice, simplified." Icon={ChatBubbleBottomCenterTextIcon} />
      <InputField label="Website" name="website" placeholder="https://yourfirm.com" Icon={GlobeAltIcon} />
      <InputField label="Location" name="location" placeholder="Nairobi, Kenya" Icon={MapPinIcon} />
    </div>
  );
};

export default FirmDetailsStep;
