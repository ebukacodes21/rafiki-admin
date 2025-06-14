import React from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

interface PlanComponentProps {
  onSkip: () => void;
  onSelectPlan: () => void;
}

const PlanComponent: React.FC<PlanComponentProps> = ({ onSkip, onSelectPlan }) => {
  const features = [
    "Customizable client intake forms",
    "Secure document storage",
    "Automated appointment reminders",
    "Integrated payment processing",
    "24/7 client messaging portal",
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-gray-900 font-sans">
      <h2 className="text-3xl font-extrabold mb-2 text-gray-700">Pro Plan</h2>
      <p className="text-gray-600 mb-6">
        Try free for 7 days. Then just{" "}
        <span className="font-bold">$10/month</span>.
      </p>

      <ul className="mb-8 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center space-x-3">
            <CheckIcon className="h-6 w-6 text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onSelectPlan}
        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 rounded-md transition-colors duration-300"
      >
        Start 7-Day Free Trial
      </button>

      <button
        type="button"
        onClick={onSkip}
        className="w-full mt-4 bg-transparent border border-gray-500 hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-md transition-colors duration-300"
      >
        Skip for now
      </button>

      <p className="mt-4 text-sm text-gray-500 text-center">
        Cancel anytime before trial ends, no charge.
      </p>
    </div>
  );
};

export default PlanComponent;