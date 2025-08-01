"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiCall, formatError } from "@/utils/helper";
import { routes } from "@/constants";
import { ClipLoader } from "react-spinners";
import { useAppDispatch } from "@/redux/hooks/useSelectorHook";
import { setUser } from "@/redux/features/auth";

const CallbackSignin = () => {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState(
    "Signing you in with Google..."
  );
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get("id_token");

    if (!token) {
      setStatusMessage("Invalid or missing token. Please try again.");
      setLoading(false);
      return;
    }

    apiCall("/api/login-google", "POST", { token })
      .then((result) => {
        if (result?.name === "AxiosError") {
          setStatusMessage(formatError(result));
          setLoading(false);
          return;
        }
        dispatch(setUser(result.admin));
        window.location.href = routes.DASHBOARD;
      })
      .catch((error) => {
        setStatusMessage(formatError(error));
        setLoading(false);
      });
  }, [router, dispatch]);

  return (
    <div className="flex space-x-2 items-center">
      <p className="text-md max-w-md">{statusMessage}</p>
      <ClipLoader loading={loading} color="black" size={20} />
    </div>
  );
};

export default CallbackSignin;
