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
import { apiCall, formatError } from "@/utils/helper";
import { useRouter } from "next/navigation";
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

  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [loading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    const result = await apiCall("/api/signup", "POST", values);
    console.log(result)
    if (result.name === "AxiosError") {
      toast.error(formatError(result));
      setIsLoading(false);
      return;
    }

    // dispatch(setUser(result));
    // router.push(routes.DASHBOARD);
    setIsLoading(false);
  };

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
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-800 cursor-pointer"
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
