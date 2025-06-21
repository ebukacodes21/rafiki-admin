"use client";
import React, { useEffect, useState } from "react";
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
import { apiCall, formatError } from "@/utils/helper";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginSchema } from "@/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import toast from "react-hot-toast";

export const SignupForm = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [loading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const emailFromURL = searchParams.get("email") || "";

  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: emailFromURL,
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    const result = await apiCall("/api/signup", "POST", {...values, country: selectedCountry});

    if (result.name === "AxiosError") {
      toast.error(formatError(result));
      setIsLoading(false);
      return;
    }

    toast.success(result.message, { duration: 5000 });
    router.push(routes.LOGIN);
    setIsLoading(false);
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
      subTitle="Get 7 days free, then 3 months for $1/month"
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <div className="flex items-center border border-gray-200 rounded-md">
                      <Input
                        {...field}
                        placeholder="Enter Password"
                        type={isHidden ? "password" : "text"}
                        className="border-0 shadow-none outline-none focus-visible:ring-0"
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
            />
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Rafiki account"}
            <ClipLoader
              color="#ffffff"
              loading={loading}
              size={20}
              className="ml-4"
            />
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
