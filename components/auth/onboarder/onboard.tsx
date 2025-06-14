"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardWrapper } from "../../card-wrapper";
import { Button } from "../../ui/button";
import ServiceChannelsStep from "./components/service";
import PracticeAreaStep from "./components/area";
import PlanComponent from "./components/plan";
import { apiCall, formatError } from "@/utils/helper";
import toast from "react-hot-toast";

const OnboardComponent = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const [selectedServiceChannels, setSelectedServiceChannels] = useState<
    string[]
  >([]);
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState<string[]>(
    []
  );

  // Plan is the last step (index 2)
  const steps = [
    {
      title: "Service Channels",
      content: (
        <ServiceChannelsStep
          selectedOptions={selectedServiceChannels}
          setSelectedOptions={setSelectedServiceChannels}
        />
      ),
    },
    {
      title: "Practice Area",
      content: (
        <PracticeAreaStep
          selectedOptions={selectedPracticeAreas}
          setSelectedOptions={setSelectedPracticeAreas}
        />
      ),
    },
    {
      title: "Choose the best plan for you",
      content: (
        <PlanComponent
          onSkip={() => {
            onComplete();
          }}
          onSelectPlan={() => {
            onComplete();
          }}
        />
      ),
    },
  ];

  const handleNext = async () => {
    setDirection("forward");
    if (step === steps.length - 2) {
      try {
        const payload = {
          onboarded: true,
          timestamp: new Date().toISOString(),
          serviceChannels: selectedServiceChannels,
          practiceAreas: selectedPracticeAreas,
        };

        const response = await apiCall("/api/onboard", "POST", { payload });
        if (response.name === "AxiosError") {
          toast.error(formatError(response));
          return;
        }

        setStep((prev) => prev + 1);
      } catch (error) {
        console.error(error);
        alert("Error verifying onboarding. Please try again.");
      }
    } else if (step === steps.length - 1) {
      // Final step action
    } else {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

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
              disabled={step === steps.length - 1}
            >
              {step === steps.length - 2 ? "Complete Setup" : "Next"}
            </Button>
          </div>
        </>
      )}
    </CardWrapper>
  );
};

export default OnboardComponent;
