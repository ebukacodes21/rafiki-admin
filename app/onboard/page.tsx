"use client";
import OnboardComponent from "@/components/auth/onboarder/onboard";
import { routes } from "@/constants";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SubscriptionPlans from "@/components/auth/onboarder/components/plan";

const OnboardPage = () => {
  const [onboarded, setOnboarded] = useState<boolean>(false);
  const router = useRouter();

  const handleOnboardComplete = () => {
    setOnboarded(true);
  };

  const handlePlanComplete = () => {
    router.push(routes.DASHBOARD);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-white to-gray-900 flex items-center justify-center">
      <Link
        href={routes.HOME}
        className="absolute top-6 left-6 text-3xl font-bold text-gray-900"
      >
        Rafiki
      </Link>

      {!onboarded ? (
        <OnboardComponent onComplete={handleOnboardComplete} />
      ) : (
        <SubscriptionPlans onComplete={handlePlanComplete} />
      )}
    </div>
  );
};

export default OnboardPage;
