import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";

import {
  PhoneIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { FC } from "react";
import { UpdateFormSchema } from "@/schema";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { apiCall, formatError } from "@/utils/helper";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks/useSelectorHook";
import { setUser } from "@/redux/features/auth";

type FormType = z.infer<typeof UpdateFormSchema>;

const requiredFields: (keyof FormType)[] = [
  "fullName",
  "phone",
  "position",
  "yearsOfExperience",
];

const fieldGroups: Array<
  Array<{
    label: string;
    name: keyof FormType;
    placeholder: string;
    Icon: FC<any>;
    type?: string;
    iconColor?: string;
  }>
> = [
  [
    {
      label: "Full Name",
      name: "fullName",
      placeholder: "John Doe",
      Icon: UserIcon,
      iconColor: "text-orange-600",
    },
    {
      label: "Phone Number",
      name: "phone",
      placeholder: "+254...",
      Icon: PhoneIcon,
      iconColor: "text-green-600",
    },
  ],
  [
    {
      label: "Position/Title",
      name: "position",
      placeholder: "Managing Partner",
      Icon: BriefcaseIcon,
      iconColor: "text-blue-600",
    },
    {
      label: "Years of Experience",
      name: "yearsOfExperience",
      placeholder: "5",
      type: "number",
      Icon: AcademicCapIcon,
      iconColor: "text-purple-600",
    },
  ],
];

export default function AccountSettingsCard({
  form,
}: {
  form: UseFormReturn<FormType>;
}) {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = form;
  
  const InputField = ({
    label,
    name,
    placeholder,
    Icon,
    type = "text",
    iconColor = "text-gray-400",
  }: {
    label: string;
    name: keyof FormType;
    placeholder: string;
    Icon: FC<any>;
    type?: string;
    iconColor?: string;
  }) => {
    const error = errors[name];
    const isRequired = requiredFields.includes(name);
    return (
      <div className="space-y-1">
        <Label className="text-sm font-medium">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
        <div
          className={`flex items-center border rounded-md px-3 py-2 ${
            error ? "border-red-500 focus-within:ring-red-500" : ""
          }`}
        >
          <Icon className={`h-5 w-5 mr-2 ${iconColor}`} />
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className="w-full border-none outline-none text-sm placeholder:text-gray-400"
          />
        </div>
        {error && (
          <p className="text-xs text-red-600">{error.message as string}</p>
        )}
      </div>
    );
  };

  const onSubmit = async (data: FormType) => {
    const result = await apiCall("/api/update-account", "PATCH", data);
    if (result.name === "AxiosError") {
      toast.error(formatError(result));
      return;
    }

    dispatch(setUser(result.data));
    toast.success(result.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Update Your Account Settings</CardTitle>
          <CardDescription>
            Keep your professional profile up to date.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {fieldGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {group.map((field) => (
                <InputField key={field.name} {...field} />
              ))}
            </div>
          ))}

          <div className="pt-4 flex justify-start">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded text-sm cursor-pointer"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
