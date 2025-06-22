"use client";
import { FC } from "react";
import {
  ScaleIcon,
  BriefcaseIcon,
  GlobeAmericasIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

interface PracticeAreaStepProps {
  selectedAreas: string[];
  setSelectedAreas: React.Dispatch<React.SetStateAction<string[]>>;
}

const areas = [
  { label: "Family Law", icon: UserGroupIcon },
  { label: "Criminal Defense", icon: ScaleIcon },
  { label: "Corporate Law", icon: BriefcaseIcon },
  { label: "Public Interest", icon: GlobeAmericasIcon },
  { label: "Intellectual Property", icon: DocumentTextIcon },
  { label: "Tax Law", icon: CurrencyDollarIcon },
  { label: "Real Estate Law", icon: BuildingOfficeIcon },
  { label: "Employment Law", icon: UserGroupIcon },
  { label: "Environmental Law", icon: GlobeAmericasIcon },
  { label: "Immigration Law", icon: GlobeAmericasIcon },
  { label: "Personal Injury", icon: ScaleIcon },
  { label: "Bankruptcy Law", icon: CurrencyDollarIcon },
  { label: "Civil Litigation", icon: ScaleIcon },
  { label: "Antitrust Law", icon: BriefcaseIcon },
  { label: "Health Care Law", icon: UserGroupIcon },
  { label: "Entertainment Law", icon: BriefcaseIcon },
  { label: "Construction Law", icon: BuildingOfficeIcon },
  { label: "Education Law", icon: GlobeAmericasIcon },
  { label: "International Law", icon: GlobeAmericasIcon },
  { label: "Sports Law", icon: BriefcaseIcon },
  { label: "Admiralty Law", icon: GlobeAmericasIcon },
  { label: "Military Law", icon: ScaleIcon },
  { label: "Elder Law", icon: UserGroupIcon },
  { label: "Securities Law", icon: CurrencyDollarIcon },
  { label: "Consumer Protection", icon: ScaleIcon },
  { label: "Insurance Law", icon: CurrencyDollarIcon },
  { label: "Cyber Law", icon: DocumentTextIcon },
  { label: "Product Liability", icon: ScaleIcon },
  { label: "Animal Law", icon: UserGroupIcon },
  { label: "Transportation Law", icon: BuildingOfficeIcon },
  { label: "Energy Law", icon: GlobeAmericasIcon },
  { label: "Municipal Law", icon: BuildingOfficeIcon },
  { label: "Privacy Law", icon: DocumentTextIcon },
  { label: "Patent Law", icon: DocumentTextIcon },
  { label: "Trademark Law", icon: DocumentTextIcon },
  { label: "Criminal Appeals", icon: ScaleIcon },
  { label: "Media Law", icon: GlobeAmericasIcon },
  { label: "Civil Rights Law", icon: ScaleIcon },
  { label: "Voting Rights", icon: ScaleIcon },
  { label: "Wills & Estates", icon: UserGroupIcon },
  { label: "Disability Law", icon: UserGroupIcon },
  { label: "Child Protection", icon: UserGroupIcon },
  { label: "Native American Law", icon: GlobeAmericasIcon },
  { label: "Agricultural Law", icon: GlobeAmericasIcon },
  { label: "Construction Defect", icon: BuildingOfficeIcon },
  { label: "Military Veteran Law", icon: ScaleIcon },
  { label: "Tax Appeals", icon: CurrencyDollarIcon },
  { label: "White Collar Crime", icon: ScaleIcon },
  { label: "Juvenile Law", icon: UserGroupIcon },
  { label: "Alternative Dispute Resolution", icon: ScaleIcon },
];

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