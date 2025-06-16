"use client";

import { FC } from "react";
import {
  BuildingOfficeIcon,
  ChatBubbleBottomCenterTextIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

interface FirmForm {
  firmName: string;
  tagline: string;
  website: string;
  location: string;
  email: string;
  phone: string;
  instagram: string;
  x: string;
  facebook: string;
  founded: string;
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

  const InputField = ({
    label,
    name,
    placeholder,
    Icon,
    type = "text",
    iconColor = "text-gray-400",
  }: {
    label: string;
    name: keyof FirmForm;
    placeholder: string;
    Icon: FC<any>;
    type?: string;
    iconColor?: string;
  }) => (
    <div className="space-y-1">
      <label className="text-sm text-gray-700 font-medium">{label}</label>
      <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-black transition-all">
        <Icon className={`h-5 w-5 mr-2 ${iconColor}`} />
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full border-none outline-none text-sm text-gray-800 placeholder-gray-400"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow space-y-12">
      {/* Firm Details Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Firm Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="Firm Name"
            name="firmName"
            placeholder="Rafiki Legal Group"
            Icon={BuildingOfficeIcon}
          />
          <InputField
            label="Tagline"
            name="tagline"
            placeholder="Justice, simplified."
            Icon={ChatBubbleBottomCenterTextIcon}
          />
          <InputField
            label="Website"
            name="website"
            placeholder="https://yourfirm.com"
            Icon={GlobeAltIcon}
          />
          <InputField
            label="Location"
            name="location"
            placeholder="Nairobi, Kenya"
            Icon={MapPinIcon}
          />
          <InputField
            label="Email"
            name="email"
            placeholder="contact@rafiki.legal"
            Icon={EnvelopeIcon}
          />
          <InputField
            label="Phone"
            name="phone"
            placeholder="+254 712 345678"
            Icon={PhoneIcon}
          />
          <InputField
            label="Date Founded"
            name="founded"
            placeholder="2021-04-15"
            Icon={CalendarIcon}
            type="date"
          />
        </div>
      </div>

      {/* Social Media Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Social Media</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="Instagram"
            name="instagram"
            placeholder="https://instagram.com/yourfirm"
            Icon={FaInstagram}
            iconColor="text-pink-500"
          />
          <InputField
            label="X (formerly Twitter)"
            name="x"
            placeholder="https://x.com/yourfirm"
            Icon={FaTwitter}
            iconColor="text-blue-400"
          />
          <InputField
            label="Facebook"
            name="facebook"
            placeholder="https://facebook.com/yourfirm"
            Icon={FaFacebook}
            iconColor="text-blue-700"
          />
        </div>
      </div>
    </div>
  );
};

export default FirmDetailsStep;