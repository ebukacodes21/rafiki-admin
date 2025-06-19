"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiCall, formatError } from "@/utils/helper";
import { routes } from "@/constants";
import { ClipLoader } from "react-spinners";

const CallbackSignup = () => {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState("Signing you up with Google...");
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState<string | null>(null);

  // Get country
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch("https://ip-api.io/api/v1/ip");
        const data = await response.json();
        if (data.location?.country) {
          setCountry(data.location.country);
        } else {
          setCountry("Unknown");
        }
      } catch (error) {
        console.error("Error fetching country:", error);
        setCountry("Unknown");
      }
    };

    fetchCountry();
  }, []);

  // Signup logic
  useEffect(() => {
    const trySignup = async () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("id_token");

      if (!token) {
        setStatusMessage("Invalid or missing token. Please try again.");
        setLoading(false);
        return;
      }

      if (!country) return; 

      try {
        const result = await apiCall("/api/signup-google", "POST", { token, country });

        if (result?.name === "AxiosError") {
          setStatusMessage(formatError(result));
        } else {
          window.location.href = routes.ONBOARD;
        }
      } catch (error) {
        setStatusMessage(formatError(error));
      } finally {
        setLoading(false);
      }
    };

    trySignup();
  }, [router, country]); 

  return (
    <div className="h-screen bg-gradient-to-b from-white to-gray-900 px-4">
      <div className="flex space-x-2 items-center">
        <p className="text-md text-gray-900 max-w-md">{statusMessage}</p>
        <ClipLoader loading={loading} color="black" size={20} />
      </div>
    </div>
  );
};

export default CallbackSignup;