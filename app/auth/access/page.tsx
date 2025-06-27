"use client";

import { useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ScaleIcon } from "@heroicons/react/24/outline";
import { apiCall, formatError } from "@/utils/helper";
import { routes } from "@/constants";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks/useSelectorHook";
import { setUser } from "@/redux/features/auth";

export default function AccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const dispatch = useAppDispatch()

  const authenticate = useCallback(async () => {
    const result = await apiCall(`/api/access`, "GET", { token });
    if (result.name === "AxiosError") {
      toast.error(formatError(result));
      router.push(routes.LOGIN);
      return;
    }

    toast.success(result.message)
    dispatch(setUser(result.data))
    router.push(routes.DASHBOARD);
  }, [token, router, dispatch])

  useEffect(() => {
    if (!token) {
      toast.error("missing token");
      router.push(routes.LOGIN);
      return;
    }

    const debounce = setTimeout(() => {
      authenticate();
    }, 500);

    return () => clearTimeout(debounce);
  }, [token, authenticate, router]);

  return (
    <div>
      <ScaleIcon />
      <p>Authenticating...</p>
    </div>
  );
}
