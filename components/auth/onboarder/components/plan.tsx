import { CheckIcon } from "@heroicons/react/24/outline";

type PlanProp = {
  onComplete: () => void;
}

export default function SubscriptionPlans({ onComplete }: PlanProp) {
  const plans = [
    {
      name: "Basic",
      price: "$29",
      features: [
        "Access to dashboard",
        "Basic client tools",
        "1 Admin account",
        "Email support",
      ],
    },
    {
      name: "Professional",
      price: "$59",
      features: [
        "All Basic features",
        "5 Admin accounts",
        "Client portal access",
        "Priority support",
      ],
    },
    {
      name: "Elite",
      price: "$129",
      features: [
        "Everything in Professional",
        "Unlimited Admins",
        "White-label branding",
        "Dedicated account manager",
      ],
    },
  ];

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Choose Your Plan
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="relative bg-white rounded-xl shadow-lg border-2 border-yellow-400"
          >
            <div className="absolute inset-0 rounded-xl border-[3px] border-yellow-300 opacity-30 pointer-events-none" />
            <div className="p-6 space-y-4 z-10 relative">
              <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
              <p className="text-4xl font-bold text-yellow-600">{plan.price}<span className="text-base text-gray-600">/mo</span></p>
              <ul className="space-y-2 text-sm text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button onClick={onComplete} className="w-full cursor-pointer mt-6 py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md transition">
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
