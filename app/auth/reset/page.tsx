"use client";
import React, { Suspense } from "react";
import { ResetForm } from "@/components/auth/reset";
import Link from "next/link";
import { routes } from "@/constants";

const ResetPage = () => {
  return (
     <Suspense fallback={<div>Loading...</div>}>
        <ResetForm />
      </Suspense>
  );
};

export default ResetPage;