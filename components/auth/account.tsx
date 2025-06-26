"use client";
import React, { useState } from "react";
import { CardWrapper } from "../card-wrapper";
import { routes } from "@/constants";
import { EnvelopeIcon } from "@heroicons/react/24/solid"; 
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export const AccountForm = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleGoogleLogin = () => {
    setIsLoading(true);
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_CALLBACK_SIGNUP!;
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

  return (
    <CardWrapper
      headerLabel="Start your free trial"
      backButtonLabel="Already have a Rafiki account? Log in"
      backButtonHref={routes.LOGIN}
      topSlot={
        <Link href={routes.HOME} className="text-3xl text-start font-bold px-7 italic">Rafiki</Link>
      }
      subTitle="Get 7 days free, then 3 months for $1/month"
    >
      <div className="space-y-2">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading}
          onClick={() => router.push(routes.SIGNUP)}
        >
          <EnvelopeIcon />
          Sign up with Email
        </Button>

        <Button
          className="w-full border border-gray-900 cursor-pointer"
          disabled={loading}
          onClick={handleGoogleLogin}
        >
          {loading ? (
            "Signing up..."
          ) : (
            <>
              <FcGoogle />
              Sign up with Google
            </>
          )}
          <ClipLoader
            color="#ffffff"
            loading={loading}
            size={20}
            className="ml-4"
          />
        </Button>
      </div>
    </CardWrapper>
  );
};
