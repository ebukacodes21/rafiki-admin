import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentUser } from "@/redux/features/auth";
import { routes } from "@/constants";

export function useRequireAuth() {
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (user === null || user === undefined) {
      setChecking(true); 
      return;
    }

    if (!user) {
      router.replace(routes.LOGIN);
    }

    setChecking(false);
  }, [user, router]);

  return checking;
}
