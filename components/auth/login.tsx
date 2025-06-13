"use client";
import React, { useState } from "react";
import { CardWrapper } from "@/components/card-wrapper";
import { routes, countryList } from "@/constants";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { apiCall, fileUploader, formatError } from "@/utils/helper";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { BackButton } from "../back-button";
import { LoginSchema } from "@/schema";
import { FcGoogle } from "react-icons/fc";

export const LoginForm = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
  const [file, setFile] = useState<FileList | undefined>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    setError("");

    const result = await apiCall("/api/user/login", "POST", values);
    if (result.name === "AxiosError") {
      setError(formatError(result));
      setIsLoading(false);
      return;
    }

    // dispatch(setUser(result));
    router.push(routes.DASHBOARD);
    setIsLoading(false);
  };

  return (
    <CardWrapper
      headerLabel="Log in"
      backButtonLabel="New to Rafiki? Get Started"
      backButtonHref={routes.SIGNUP}
      topSlot={
        <h1 className="text-3xl text-start font-bold text-gray-900 px-7 italic">Rafiki</h1>
      }
      subTitle="Continue to Rafiki"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <div className="flex items-center border border-gray-200 rounded-md focus-visible:ring-ring focus-visible:ring-1">
                      <Input
                        {...field}
                        placeholder="Enter Password"
                        type={isHidden ? "password" : "text"}
                        className="border-0 shadow-none outline-none focus-visible:none focus-visible:ring-0"
                      />
                      <div className="cursor-pointer mr-2">
                        {isHidden ? (
                          <BsEyeSlash onClick={() => setIsHidden(false)} />
                        ) : (
                          <BsEye onClick={() => setIsHidden(true)} />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          <div className="space-y-2">
            <Button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-800 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Continue with email"}
              <ClipLoader
                color="#ffffff"
                loading={loading}
                size={20}
                className="ml-4"
              />
            </Button>

            <Button
              className="w-full bg-white hover:bg-white text-black border border-gray-900 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : (<>
              <FcGoogle />
              Log in with Google
              </>)}
              <ClipLoader
                color="#ffffff"
                loading={loading}
                size={20}
                className="ml-4"
              />
            </Button>
          </div>
        </form>
        {/* <BackButton label={"Forgot password?"} href={routes.FORGOT} /> */}
      </Form>
    </CardWrapper>
  );
};
