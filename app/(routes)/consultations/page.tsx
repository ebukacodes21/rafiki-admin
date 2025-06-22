import React from "react";
import ConsultationsClient from "./components/client";

const page = async ({ params }: { params: any }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ConsultationsClient data={[]} />
      </div>
    </div>
  );
};

export default page;
