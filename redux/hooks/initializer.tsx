"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks/useSelectorHook";
import { setFirm } from "@/redux/features/firm";
import type { Firm } from "@/types/types";

export default function ReduxInitializer({ firm }: { firm: Firm }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (firm) dispatch(setFirm(firm));
  }, [firm, dispatch]);

  return null; 
}
