"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  CurrencyDollarIcon,
  ClockIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeeSchema } from "@/schema";
import PaymentProvider from "./provider-button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm, setFirm } from "@/redux/features/firm";
import { apiCall, formatError } from "@/utils/helper";
import toast from "react-hot-toast";

type FormType = z.infer<typeof FeeSchema>;

export default function PaymentFeeForm({
  onConnectPaystack,
}: {
  onConnectPaystack: () => void;
}) {
  const firm = useAppSelector(selectCurrentFirm);
  const dispatch = useAppDispatch();
  const [enabled, setEnabled] = useState<boolean>(
    firm?.consultationFee?.enabled || false
  );

  const form = useForm<FormType>({
    resolver: zodResolver(FeeSchema),
    defaultValues: {
      amount: firm?.consultationFee.amount || 0,
      unit: "flat rate",
      currency: "NGN",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: FormType) => {
    const payload = {
      ...values,
      enabled,
      firmId: firm?.id,
    };

    const result = await apiCall("/api/update-fee", "PUT", payload);
    if (result.name === "AxiosError") {
      toast.error(formatError(result));
      return;
    }

    dispatch(setFirm(result.data));
    toast.success(result.message);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Consultation Fee Settings</CardTitle>
          <CardDescription>
            Choose whether to charge clients for consultations.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="consultation-fee-toggle">
              Charge for Consultations?
            </Label>
            <Switch
              id="consultation-fee-toggle"
              checked={enabled}
              onCheckedChange={setEnabled}
              className="cursor-pointer text-green-600"
            />
          </div>

          {enabled && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Amount */}
              <div className="space-y-1">
                <Label className="text-sm font-medium">
                  Amount <span className="text-red-500">*</span>
                </Label>
                <div
                  className={`flex items-center border rounded-md px-3 py-2 ${
                    errors.amount ? "border-red-500" : ""
                  }`}
                >
                  <BanknotesIcon className="h-5 w-5 mr-2 text-green-600" />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter amount"
                    {...register("amount", { valueAsNumber: true })}
                    className="w-full border-none outline-none text-sm"
                  />
                </div>
                {errors.amount && (
                  <p className="text-xs text-red-600">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {/* Currency */}
              <div className="space-y-1">
                <Label className="text-sm font-medium">
                  Currency <span className="text-red-500">*</span>
                </Label>
                <div
                  className={`flex items-center border rounded-md px-3 py-2 ${
                    errors.currency ? "border-red-500" : ""
                  }`}
                >
                  <CurrencyDollarIcon className="h-5 w-5 mr-2 text-yellow-500" />
                  <Controller
                    name="currency"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full border-none outline-none text-sm">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NGN">
                            Nigerian Naira (NGN)
                          </SelectItem>
                          <SelectItem value="GHS">
                            Ghanaian Cedi (GHS)
                          </SelectItem>
                          <SelectItem value="ZAR">
                            South African Rand (ZAR)
                          </SelectItem>
                          <SelectItem value="USD">US Dollar (USD)</SelectItem>
                          <SelectItem value="GBP">
                            British Pound (GBP)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                {errors.currency && (
                  <p className="text-xs text-red-600">
                    {errors.currency.message}
                  </p>
                )}
              </div>

              {/* Unit */}
              <div className="space-y-1">
                <Label className="text-sm font-medium">
                  Unit <span className="text-red-500">*</span>
                </Label>
                <div
                  className={`flex items-center border rounded-md px-3 py-2 ${
                    errors.unit ? "border-red-500" : ""
                  }`}
                >
                  <ClockIcon className="h-5 w-5 mr-2 text-blue-600" />
                  <Controller
                    name="unit"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full border-none outline-none text-sm">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="per hour">Per Hour</SelectItem>
                          <SelectItem value="flat rate">Flat Rate</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                {errors.unit && (
                  <p className="text-xs text-red-600">{errors.unit.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <PaymentProvider onConnectPaystack={onConnectPaystack} />
    </>
  );
}
