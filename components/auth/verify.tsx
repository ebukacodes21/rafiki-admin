"use client";
import { apiCall, formatError } from "@/utils/helper";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { routes } from "@/constants";

export const VerifyComponent = () => {
  const [verified, setVerified] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const obj = useSearchParams();
  const code = obj.get("code");

  const handleVerify = useCallback(async () => {
    setLoading(true);
    const result = await apiCall("/api/verify", "GET", { code });
    if (result.name === "AxiosError") {
      setVerified(formatError(result));
    } else {
      setVerified(result.message);
    }
    setLoading(false);
  }, [code]);

  useEffect(() => {
    if (code) {
      handleVerify();
    }
  }, [code, handleVerify]);

  if (!code) {
    return (
      <div className="py-52 text-center">
        <p className="text-lg text-gray-600">Verification code is missing from the URL.</p>
      </div>
    );
  }

  return (
    <div className="py-52 flex justify-center items-center">
      <div className="max-w-lg w-full px-6">
        <div className="bg-white border rounded-lg shadow p-6 transition-all duration-300 ease-in-out">
          {loading ? (
            <div className="text-center">
              <p className="text-gray-600 text-md animate-pulse">Verifying your email...</p>
            </div>
          ) : verified.includes("successful") ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <p className="text-lg font-semibold text-green-700 mb-2">
                ✅ Email Verified Successfully!
              </p>
              <p className="text-gray-600">
                You can now log in to your dashboard.{" "}
                <Link
                  className="text-[#099090] hover:text-[#077b7b] font-medium transition-colors"
                  href={routes.LOGIN}
                >
                  Login
                </Link>
              </p>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-5">
              <p className="text-red-600 font-medium capitalize">
                ⚠️ {verified}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};