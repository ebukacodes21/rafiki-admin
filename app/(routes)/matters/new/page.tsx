"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

// Modal Component
function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  practiceArea: z.string().optional(),
  documents: z.array(z.string()).optional(),
  events: z.array(z.string()).optional(),
  parties: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof schema>;

const steps = [
  { key: "overview", label: "Overview", icon: EyeIcon },
  { key: "documents", label: "Documents", icon: DocumentTextIcon },
  { key: "calendar", label: "Calendar", icon: CalendarDaysIcon },
  { key: "parties", label: "Parties", icon: UsersIcon },
];

export default function AddNewMatterPage() {
  const [step, setStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      practiceArea: "",
      documents: [],
      events: [],
      parties: [],
    },
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast.success("Matter submitted!");
  };

  const CurrentIcon = steps[step].icon;

  // Modal Handlers
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalInput("");
    setModalOpen(false);
  };
  const onModalSubmit = () => {
    if (!modalInput.trim()) return;
    const key = steps[step].key as keyof FormData;
    const currentList = getValues(key) || [];
    setValue(key, [...currentList, modalInput.trim()]);
    closeModal();
  };

  // Progress percentage for the bar
  const progressPercent = ((step + 1) / steps.length) * 100;

  return (
    <>
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded overflow-hidden mb-6 max-w-3xl mx-auto">
        <div
          className="bg-blue-600 h-2 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto mt-4 space-y-6"
      >
        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-lg font-semibold">
          <CurrentIcon className="w-5 h-5 text-blue-500" />
          Step {step + 1}: {steps[step].label}
        </div>

        {/* Step Content */}
        {steps[step].key === "overview" && (
          <>
            <Input placeholder="Matter Title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
            <Textarea placeholder="Description" {...register("description")} />
            <Input placeholder="Practice Area" {...register("practiceArea")} />
          </>
        )}

        {steps[step].key === "documents" && (
          <>
            <Button type="button" onClick={openModal}>
              + Add Document
            </Button>
            <ul className="list-disc pl-5 mt-2">
              {(getValues("documents") || []).map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </>
        )}

        {steps[step].key === "calendar" && (
          <>
            <Button type="button" onClick={openModal}>
              + Add Event
            </Button>
            <ul className="list-disc pl-5 mt-2">
              {(getValues("events") || []).map((event, i) => (
                <li key={i}>{event}</li>
              ))}
            </ul>
          </>
        )}

        {steps[step].key === "parties" && (
          <>
            <Button type="button" onClick={openModal}>
              + Add Party
            </Button>
            <ul className="list-disc pl-5 mt-2">
              {(getValues("parties") || []).map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button type="button" onClick={back} disabled={step === 0}>
            Back
          </Button>
          {step === steps.length - 1 ? (
            <Button type="submit">Submit</Button>
          ) : (
            <Button type="button" onClick={next}>
              Next
            </Button>
          )}
        </div>
      </form>

      {/* Modal */}
      <Modal open={modalOpen} onClose={closeModal} title={`Add ${steps[step].label.slice(0, -1)}`}>
        <Input
          autoFocus
          placeholder={`Enter ${steps[step].label.slice(0, -1)} name`}
          value={modalInput}
          onChange={(e) => setModalInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onModalSubmit();
            }
          }}
        />
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={onModalSubmit}>Add</Button>
        </div>
      </Modal>
    </>
  );
}
