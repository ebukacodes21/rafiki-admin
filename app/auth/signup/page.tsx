import { SignupForm } from "@/components/auth/signup";
import React, { Suspense } from "react";

const page = () => {
  return <Suspense fallback={<div>Loading...</div>}> <SignupForm /> </Suspense>;
};

export default page;
