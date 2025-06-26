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

      try {
        const result = await apiCall("/api/signup-google", "POST", { token });
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
  }, [router]);

  return (
    <div className="flex space-x-2 items-center">
      <p className="text-md max-w-md">{statusMessage}</p>
      <ClipLoader loading={loading} color="black" size={20} />
    </div>
  );
};

export default CallbackSignup;
