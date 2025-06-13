"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiCall } from "@/utils/helper";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get("id_token");

    if (token) {
      apiCall("/api/signup-google", "POST", { token })
        .then(() => {
            console.log(token)
        })
        .catch(() => router.push("/error"));
    } else {
      console.log("error")
    }
  }, []);

  return (
    <div className="h-screen bg-gradient-to-b from-white to-gray-900">
        <p>Signing you in with Google...</p>
    </div>
  );
};

export default page;
