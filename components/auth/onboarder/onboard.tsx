"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardWrapper } from "../../card-wrapper";
import { Button } from "../../ui/button";
import PracticeAreaStep from "./components/area";
import { apiCall, formatError } from "@/utils/helper";
import toast from "react-hot-toast";
import FirmDetailsStep from "./components/firm-details";
import AdminDetailsStep from "./components/admin-details";
import { useForm } from "react-hook-form";
import { AdminFormSchema, FirmFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const OnboardComponent = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState<boolean>(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

  const handleNext = async () => {
    setDirection("forward");

    if (step === 0) {
      const isValid = await form.trigger();
      if (!isValid) {
        toast.error("please complete the required fields before proceeding.");
        return;
      }
    }

    if (step === 1) {
      const isValid = await admin.trigger();
      if (!isValid) {
        toast.error("please complete the required fields before proceeding.");
        return;
      }
    }

    // Only on last step, submit
    if (step === steps.length - 1) {
      setLoading(true)
      try {
        const response = await apiCall("/api/onboard", "POST", {
          firm: form.getValues(),
          admin: admin.getValues(),
          practiceAreas: selectedPracticeAreas,
        });

        if (response.name === "AxiosError") {
          toast.error(formatError(response));
          setLoading(false)
          return;
        }

        toast.success(response)
        onComplete(); 
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Try again.");
      }
    } else {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const form = useForm<z.infer<typeof FirmFormSchema>>({
    resolver: zodResolver(FirmFormSchema),
    defaultValues: {
      firmName: "",
      tagline: "",
      website: "",
      email: "",
      location: "",
      phone: "",
      instagram: "",
      x: "",
      facebook: "",
      founded: "",
    },
  });

  const admin = useForm<z.infer<typeof AdminFormSchema>>({
    resolver: zodResolver(AdminFormSchema),
    defaultValues: {
      phone: "",
      fullName: "",
      position: "",
      enrollNumber: "",
      yearsOfExperience: "",
      lawSchool: "",
      document: "",
    },
  });

  // Plan is the last step (index 2)
  const steps = [
    {
      title: "Firm Details",
      content: <FirmDetailsStep form={form} />,
    },
    {
      title: "Admin Details",
      content: <AdminDetailsStep form={admin} />,
    },
    {
      title: "Practice Areas",
      content: (
        <PracticeAreaStep
          selectedAreas={selectedPracticeAreas}
          setSelectedAreas={setSelectedPracticeAreas}
        />
      ),
    },
  ];

  const handleBack = () => {
    setDirection("backward");
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const slideVariants = {
    enter: (dir: "forward" | "backward") => ({
      x: dir === "forward" ? "100%" : "-100%",
      opacity: 0,
      position: "absolute" as const,
      width: "100%",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const,
      width: "100%",
    },
    exit: (dir: "forward" | "backward") => ({
      x: dir === "forward" ? "-100%" : "100%",
      opacity: 0,
      position: "absolute" as const,
      width: "100%",
    }),
  };

  return (
    <CardWrapper
      headerLabel={started ? steps[step].title : "Start your onboarding"}
      backButtonLabel={""}
      backButtonHref="#"
      topSlot={
        <h1 className="text-3xl text-start font-bold text-gray-900 px-7 italic">
          Rafiki
        </h1>
      }
      subTitle={
        started
          ? ""
          : "Click below to launch the Rafiki setup wizard for your firm."
      }
    >
      {!started ? (
        <Button className="cursor-pointer" onClick={() => setStarted(true)}>
          Setup Firm
        </Button>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="mb-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-500 transition-all duration-300"
              style={{
                width: `${((step + 1) / steps.length) * 100}%`,
              }}
            />
          </div>

          <div className="relative min-h-[200px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.35,
                }}
              >
                {steps[step].content}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between pt-6">
            {step > 0 ? (
              <button
                onClick={handleBack}
                className="text-sm font-semibold text-gray-600 hover:underline cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {/* Next button text changes */}
            <Button
              className="cursor-pointer"
              onClick={handleNext}
              disabled={step === steps.length - 0 || loading}
            >
              {step === steps.length - 1 ? `Complete Setup` : "Next"}
            </Button>
          </div>
        </>
      )}
    </CardWrapper>
  );
};

export default OnboardComponent;
