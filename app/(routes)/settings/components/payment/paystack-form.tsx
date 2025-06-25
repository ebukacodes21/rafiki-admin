"use client";

import { FC, useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { apiCall, formatError } from "@/utils/helper";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm } from "@/redux/features/firm";

interface PaystackFormType {
  accountNumber: string;
  bankCode: string;
}

interface PaystackFormProps {
  form: UseFormReturn<PaystackFormType>;
  onClose: () => void;
}

const requiredFields: (keyof PaystackFormType)[] = [
  "accountNumber",
  "bankCode",
];

const PaystackForm: FC<PaystackFormProps> = ({ form, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = form;
  const firm = useAppSelector(selectCurrentFirm);
  const [banks, setBanks] = useState<{ name: string; code: string }[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [resolving, setResolving] = useState(false);

  const selectedBankCode = watch("bankCode");
  const accountNumber = watch("accountNumber");

  useEffect(() => {
    async function fetchBanks() {
      setLoadingBanks(true);
      const res = await apiCall("/api/get-banks?country=nigeria", "GET");
      if (res.name === "AxiosError") {
        setLoadingBanks(false);
        toast.error(formatError(res));
        return;
      }

      setBanks(res.data);
      setLoadingBanks(false);
    }
    fetchBanks();
  }, []);

  useEffect(() => {
    if (accountNumber?.length === 10 && selectedBankCode) {
      const resolveAccount = async () => {
        setResolving(true);
        try {
          const res = await apiCall(
            `/api/verify-account?account_number=${accountNumber}&bank_code=${selectedBankCode}`,
            "GET"
          );

          if (res.status === true && res.data?.account_name) {
            setAccountName(res.data.account_name);
          } else {
            setAccountName(null);
            toast.error("Unable to resolve account");
          }
        } catch (error) {
          setAccountName(null);
          toast.error("Failed to resolve account");
        } finally {
          setResolving(false);
        }
      };

      resolveAccount();
    } else {
      setAccountName(null);
    }
  }, [accountNumber, selectedBankCode]);

  const InputField = ({
    label,
    name,
    placeholder,
    type = "text",
  }: {
    label: string;
    name: keyof PaystackFormType;
    placeholder: string;
    type?: string;
  }) => {
    const error = errors[name];
    const isRequired = requiredFields.includes(name);

    return (
      <div className="space-y-1">
        <Label className="text-sm font-medium">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md px-3 py-2 text-sm`}
        />
        {error && (
          <p className="text-xs text-red-600">{error.message as string}</p>
        )}
      </div>
    );
  };

  const onSubmit = async (data: PaystackFormType) => {
    try {
      console.log("Submitting Paystack form:", data);
      // You can also send accountName if needed
      toast.success("Paystack details submitted successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to submit Paystack details");
    }
  };

  const uniqueBanks = Array.from(
    new Map(banks.map((bank) => [bank.code, bank])).values()
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1">
          <Label className="text-sm font-medium">Firm Name</Label>
          <Input
            type="text"
            value={firm?.name}
            disabled
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
          />
        </div>

        {/* Bank Select */}
        <div className="space-y-1">
          <Label className="text-sm font-medium">
            Bank <span className="text-red-500">*</span>
          </Label>
          <Select
            onValueChange={(value) =>
              setValue("bankCode", value, { shouldValidate: true })
            }
            value={selectedBankCode || ""}
            disabled={loadingBanks}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  loadingBanks ? "Loading banks..." : "Select your bank"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {uniqueBanks.map((bank) => (
                <SelectItem key={`${bank.code}-${bank.name}`} value={bank.code}>
                  {bank.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.bankCode && (
            <p className="text-xs text-red-600">
              {errors.bankCode.message as string}
            </p>
          )}
        </div>

        <InputField
          label="Account Number"
          name="accountNumber"
          placeholder="0123456789"
          type="number"
        />

        {accountName && !resolving && (
          <div className="space-y-1">
            <Label className="text-sm font-medium">Account Name</Label>
            <Input
              type="text"
              value={accountName}
              disabled
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
            />
          </div>
        )}
      </div>

      {resolving && (
        <p className="text-sm text-muted-foreground">
          Resolving account name...
        </p>
      )}

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>

        <Button
          onClick={onClose}
          disabled={isSubmitting}
          className="cursor-pointer"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PaystackForm;
