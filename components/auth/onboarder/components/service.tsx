import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GlobeAltIcon,
  BuildingOffice2Icon,
  UsersIcon,
  CursorArrowRaysIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

interface ServiceChannelsStepProps {
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const ServiceChannelsStep: FC<ServiceChannelsStepProps> = ({ selectedOptions, setSelectedOptions}) => {
  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const options = [
    {
      label: "A professional online presence",
      description: "Build a custom website with your services and booking.",
      icon: GlobeAltIcon,
    },
    {
      label: "In person at your office",
      description: "Handle walk-ins and scheduled consultations.",
      icon: BuildingOffice2Icon,
    },
    {
      label: "At legal clinics or community events",
      description: "Serve clients at pop-ups and outreach events.",
      icon: UsersIcon,
    },
    {
      label: "On an existing website or blog",
      description: "Add a booking button to your site.",
      icon: CursorArrowRaysIcon,
    },
    {
      label: "On social media",
      description: "Let clients book through social platforms.",
      icon: ChatBubbleBottomCenterTextIcon,
    },
    {
      label: "Through directories or referral platforms",
      description: "Connect to bar directories and legal networks.",
      icon: UserGroupIcon,
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Where would you like to offer your legal services?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map(({ label, description, icon: Icon }) => {
          const isSelected = selectedOptions.includes(label);
          return (
            <label
              key={label}
              className={`relative flex items-start space-x-3 p-4 border rounded-md cursor-pointer transition-all duration-200 hover:shadow-sm ${
                isSelected
                  ? "border-gray-500 bg-gray-50"
                  : "border-gray-300 bg-white"
              }`}
              onClick={() => toggleOption(label)}
            >
              {/* Icon */}
              <Icon className="h-6 w-6 mt-1 text-gray-600 flex-shrink-0" />

              {/* Label and Description */}
              <div className="flex flex-col">
                <div className="font-medium text-gray-900">{label}</div>
                <div className="text-sm text-gray-600">{description}</div>
              </div>

              {/* Animated Checkmark */}
              <div className="absolute top-2 right-2">
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="h-5 w-5 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs">
                        ✓
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hidden checkbox for a11y */}
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleOption(label)}
                className="hidden"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceChannelsStep;
