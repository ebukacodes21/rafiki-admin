"use client";
import React, { useEffect, useState } from "react";
import { CardWrapper } from "../card-wrapper";
import { countryList, routes } from "@/constants";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const AccountForm = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
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

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch("https://ip-api.io/api/v1/ip");
        const data = await response.json();
        if (data.location.country) {
          setSelectedCountry(data.location.country);
        }
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };

    fetchCountry();
  }, []);

  return (
    <CardWrapper
      headerLabel="Start your free trial"
      backButtonLabel="Already have a Rafiki account? Log in"
      backButtonHref={routes.LOGIN}
      topSlot={
        <div className="w-full flex justify-start">
          <div className="px-7">
            <Select
              value={selectedCountry}
              onValueChange={(value) => setSelectedCountry(value)}
            >
              <SelectTrigger className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white cursor-pointer">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countryList.map((country) => (
                  <SelectItem key={country.id} value={country.name}>
                    <div className="flex items-center gap-2 justify-start">
                      <Image
                        src={`data:image/png;base64,${country.flag}`}
                        alt={country.name}
                        width={20}
                        height={15}
                        className="rounded-sm"
                      />
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      }
      subTitle="Get 7 days free, then 3 months for $1/month"
    >
      <div className="space-y-2">
        <Button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-800 cursor-pointer"
          disabled={loading}
          onClick={() => router.push(routes.SIGNUP)}
        >
          <FaEnvelope />
          Sign up with Email
        </Button>

        <Button
          className="w-full bg-white hover:bg-white text-black border border-gray-900 cursor-pointer"
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
