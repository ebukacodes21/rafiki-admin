"use client";
import React, { Suspense } from "react";
import { VerifyComponent } from "@/components/auth/verify";
import Link from "next/link";
import { routes } from "@/constants";

const VerifyPage = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-white to-gray-900">
      <Link
        href={routes.HOME}
        className="absolute top-6 left-6 text-3xl font-bold text-gray-900"
      >
        Rafiki
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyComponent />
      </Suspense>
    </div>
  );
};

export default VerifyPage;
