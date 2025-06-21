import { LoginForm } from "@/components/auth/login";
import React, { Suspense } from "react";

const page = () => {
  return (

      <Suspense fallback={<div>Loading...</div>}>
        {" "}
        <LoginForm />
      </Suspense>
  );
};

export default page;
