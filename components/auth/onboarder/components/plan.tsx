import { CheckIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PlanProp = {
  onComplete: () => void;
};

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
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        Choose Your Plan
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className="border-2 shadow-lg relative"
          >
            <div className="absolute inset-0 rounded-xl opacity-30 pointer-events-none" />
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <p className="text-4xl font-bold">
                {plan.price}
                <span className="text-base font-normal">/mo</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckIcon className="w-5 h-5 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={onComplete}
                className="w-full mt-2 py-2 px-4 font-medium cursor-pointer rounded-md transition"
              >
                Select Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}