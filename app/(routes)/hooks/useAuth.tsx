import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentUser } from "@/redux/features/auth";
import { routes } from "@/constants";

export function useRequireAuth() {
  const isAuthenticated = useAppSelector(selectCurrentUser);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(routes.LOGIN);
    }
  }, [isAuthenticated, router]);
}
