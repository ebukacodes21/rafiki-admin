"use client";
import React, { Suspense } from "react";
import { ResetForm } from "@/components/auth/reset";
import Link from "next/link";
import { routes } from "@/constants";

const ResetPage = () => {
  return (
     <div className="min-h-screen relative bg-gradient-to-b from-white to-gray-900 flex items-center justify-center">
      <Link
        href={routes.HOME}
        className="absolute top-6 left-6 text-3xl font-bold text-gray-900"
      >
        Rafiki
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetForm />
      </Suspense>
    </div>
  );
};

export default ResetPage;