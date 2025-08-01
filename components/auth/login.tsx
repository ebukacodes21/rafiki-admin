"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CardWrapper } from "@/components/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants";
import { apiCall, formatError } from "@/utils/helper";
import { ClipLoader } from "react-spinners";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks/useSelectorHook";
import { setUser } from "@/redux/features/auth";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [accountExists, setAccountExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const router = useRouter();

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_CALLBACK_SIGNIN!;
    const NONCE = uuidv4();

    const googleOAuthURL =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      `response_type=id_token&` +
      `scope=openid%20email%20profile&` +
      `nonce=${NONCE}`;

    window.location.href = googleOAuthURL;
  };

  const handleContinue = useCallback(async () => {
    if (!email || email.trim() === "") {
      toast.error("Email address is required");
      return;
    }

    setLoading(true);
    try {
      const res = await apiCall("/api/find-account", "POST", {
        email: email.trim(),
      });

      if (res && res.data) {
        setAccountExists(true);
        toast.success(res.message);
      } else {
        toast.error(formatError(res));
      }
    } catch (err) {
      toast.error(formatError(err));
    } finally {
      setLoading(false);
    }
  }, [email, setLoading, setAccountExists]);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const result = await apiCall("/api/login", "POST", {
        email,
        password,
      });

      if (result.name === "AxiosError") {
        toast.error(formatError(result));
        return;
      }
      dispatch(setUser(result.admin));
      router.push(routes.DASHBOARD);
    } catch (err) {
      toast.error(formatError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const trimmedEmail = initialEmail.trim();
    if (!trimmedEmail) return;

    const debounce = setTimeout(() => {
      handleContinue();
    }, 500);

    return () => clearTimeout(debounce);
  }, [initialEmail, handleContinue]);

  return (
    <CardWrapper
      headerLabel="Log in"
      backButtonLabel="New to Rafiki? Get Started"
      backButtonHref={routes.SIGNUP}
      topSlot={
        <Link
          href={routes.HOME}
          className="text-3xl text-start font-bold px-7 italic"
        >
          Rafiki
        </Link>
      }
      subTitle="Continue to Rafiki Account"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <Input
              type="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
              disabled={loading || accountExists}
            />
          </div>

          {accountExists && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Password:
              </label>
              <div className="relative">
                <Input
                  type={isHidden ? "password" : "text"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setIsHidden(!isHidden)}
                  aria-label="toggle password visibility"
                >
                  {isHidden ? <BsEyeSlash /> : <BsEye />}
                </div>
              </div>

              <Link
                href={routes.FORGOT}
                className="text-sm hover:underline cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Button
            type="button"
            className="w-full cursor-pointer"
            onClick={accountExists ? handleLogin : handleContinue}
            disabled={loading || googleLoading}
          >
            {loading
              ? accountExists
                ? "Logging in..."
                : "Checking..."
              : accountExists
              ? "Log in"
              : "Continue with email"}
            <ClipLoader
              color="#ffffff"
              loading={loading}
              size={20}
              className="ml-4"
            />
          </Button>

          <Button
            type="button"
            className="w-full border border-gray-900 cursor-pointer"
            disabled={loading || googleLoading}
            onClick={handleGoogleLogin}
          >
            <FcGoogle />
            Log in with Google
          </Button>
        </div>
      </div>
    </CardWrapper>
  );
};
