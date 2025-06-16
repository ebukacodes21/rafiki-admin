"use client";
import { FC } from "react";
import { ScaleIcon, BriefcaseIcon, GlobeAmericasIcon, UserGroupIcon } from "@heroicons/react/24/outline";

interface PracticeAreaStepProps {
  selectedAreas: string[];
  setSelectedAreas: React.Dispatch<React.SetStateAction<string[]>>;
}

const areas = [
  { label: "Family Law", icon: UserGroupIcon },
  { label: "Criminal Defense", icon: ScaleIcon },
  { label: "Corporate Law", icon: BriefcaseIcon },
  { label: "Public Interest", icon: GlobeAmericasIcon },
];

const PracticeAreaStep: FC<PracticeAreaStepProps> = ({ selectedAreas, setSelectedAreas }) => {
  const toggle = (label: string) => {
    setSelectedAreas(prev =>
      prev.includes(label) ? prev.filter(area => area !== label) : [...prev, label]
    );
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-900">Select Your Practice Areas</h2>
      <div className="grid grid-cols-2 gap-4">
        {areas.map(({ label, icon: Icon }) => {
          const active = selectedAreas.includes(label);
          return (
            <button
              key={label}
              onClick={() => toggle(label)}
              className={`flex items-center space-x-3 p-3 rounded-md border transition ${
                active ? "bg-black text-white border-black" : "border-gray-300 hover:border-black"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PracticeAreaStep;
