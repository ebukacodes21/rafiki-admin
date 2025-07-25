"use client";
import React from "react";
import { motion } from "framer-motion";
import { Header } from "./header";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BackButton } from "./back-button";

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  subTitle?: string;
  backButtonLabel: string;
  backButtonHref: string;
  topSlot?: React.ReactNode;
};

export const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  topSlot,
  subTitle,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <Card className="w-96">
        {/* Top branding / dropdown area */}
        {topSlot && (
          <div className="flex justify-start mt-6 mb-2">{topSlot}</div>
        )}

        <CardHeader>
          <Header label={headerLabel} />
          <p className="text-sm">{subTitle}</p>
        </CardHeader>

        <CardContent>{children}</CardContent>

        <CardFooter>
          <BackButton label={backButtonLabel} href={backButtonHref!} />
        </CardFooter>
      </Card>
    </motion.section>
  );
};
