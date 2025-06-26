"use client";
import { routes } from "@/constants";
import { ForgotSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CardWrapper } from "@/components/card-wrapper";
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
import { apiCall, formatError } from "@/utils/helper";
import toast from "react-hot-toast";
import Link from "next/link";

export const ForgotForm = () => {
  const [loading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ForgotSchema>>({
    resolver: zodResolver(ForgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ForgotSchema>) => {
    setIsLoading(true);
    const result = await apiCall("/api/forgot", "POST", data);
    if (result.name === "AxiosError") {
      setIsLoading(false);
      toast.error(formatError(result));
      return;
    }

    toast.success(result.message);
    setIsLoading(false);
    form.reset({ email: "" });
  };

  return (
    <CardWrapper
      headerLabel="Forgot Password"
      backButtonLabel="Back to Login"
      backButtonHref={routes.LOGIN}
      subTitle="Please enter the email address associated with your account. A password reset link will be sent to you."
      topSlot={
        <Link href={routes.HOME} className="text-3xl text-start font-bold px-7 italic">Rafiki</Link>
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
                      placeholder="johndoe@gmail.com"
                      type="email"
                    />
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
            {loading ? "Sending..." : "Send Password Reset Mail"}
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
