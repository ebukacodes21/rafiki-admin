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

import { EyeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { UpdatePasswordSchema } from "@/schema";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { apiCall, formatError } from "@/utils/helper";
import toast from "react-hot-toast";
import { EyeSlashIcon } from "@heroicons/react/24/solid";

type FormType = z.infer<typeof UpdatePasswordSchema>;

const requiredFields: (keyof FormType)[] = ["oldPassword", "newPassword"];

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
      label: "Current Password",
      name: "oldPassword",
      placeholder: "Enter your current password",
      Icon: LockClosedIcon,
      iconColor: "text-orange-600",
      type: "password"
    },
    {
      label: "New Password",
      name: "newPassword",
      placeholder: "Enter new password",
      Icon: LockClosedIcon,
      iconColor: "text-green-600",
      type: "password"
    },
  ],
];

export default function SecuritySettingsCard({
  form,
}: {
  form: UseFormReturn<FormType>;
}) {
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
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

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
            type={inputType}
            placeholder={placeholder}
            {...register(name)}
            className="w-full border-none outline-none text-sm placeholder:text-gray-400 pr-8"
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-2 focus:outline-none"
            >
              {showPassword ? (
               <EyeIcon className="h-5 w-5 text-gray-500" />
              ) : (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-600">{error.message as string}</p>
        )}
      </div>
    );
  };

  const onSubmit = async (data: FormType) => {
    const result = await apiCall("/api/update-password", "PATCH", data);
    if (result.name === "AxiosError") {
      toast.error(formatError(result));
      return;
    }

    toast.success(result.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Update Your Account Security</CardTitle>
          <CardDescription>
            Keep your firm account protected from unauthorized access.
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
