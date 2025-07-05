"use client";
import { areas } from "@/constants";
import { FC } from "react";

interface PracticeAreaStepProps {
  selectedAreas: string[];
  setSelectedAreas: React.Dispatch<React.SetStateAction<string[]>>;
}

const PracticeAreaStep: FC<PracticeAreaStepProps> = ({ selectedAreas, setSelectedAreas }) => {
  const toggle = (label: string) => {
    setSelectedAreas((prev) =>
      prev.includes(label)
        ? prev.filter((area) => area !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold">
        Select Your Practice Areas
      </h2>

      {/* Scrollable chip cloud */}
      <div className="max-h-72 overflow-y-auto pr-1">
        <div className="flex flex-wrap">
          {areas.map(({ label, icon: Icon }) => {
            const active = selectedAreas.includes(label);
            return (
              <button
                key={label}
                onClick={() => toggle(label)}
                type="button"
                className={`flex items-center space-x-1 rounded-full px-3 py-1.5 text-[0.7rem] font-medium m-[3px] shadow-sm transition-all
                  ${
                    active
                      ? "bg-black text-white shadow-black/20"
                      : "bg-gray-100 text-gray-800 hover:bg-black hover:text-white"
                  }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 ${
                    active ? "text-white" : "text-gray-500"
                  }`}
                />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PracticeAreaStep;