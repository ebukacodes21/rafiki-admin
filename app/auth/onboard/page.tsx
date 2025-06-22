"use client";
import OnboardComponent from "@/components/auth/onboarder/onboard";
import { routes } from "@/constants";
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
    <div>
  {!onboarded ? (
        <OnboardComponent onComplete={handleOnboardComplete} />
      ) : (
        <SubscriptionPlans onComplete={handlePlanComplete} />
      )}
    
    </div>
  );
};

export default OnboardPage;
