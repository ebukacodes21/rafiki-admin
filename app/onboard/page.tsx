"use client";
import OnboardComponent from "@/components/auth/onboarder/onboard";
import { routes } from "@/constants";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const onComplete = () => {
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

      <OnboardComponent onComplete={onComplete} />
    </div>
  );
};

export default page;
