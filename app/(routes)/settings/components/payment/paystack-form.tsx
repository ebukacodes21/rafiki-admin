"use client";

import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import {
  GlobeAltIcon,
  BanknotesIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { apiCall, formatError } from "@/utils/helper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm, setFirm } from "@/redux/features/firm";

interface FormType {
  country: string;
  bank: string;
  accountNumber: string;
}

const PaystackForm: FC<{ onClose: () => void }> = ({ onClose }) => {
  const firm = useAppSelector(selectCurrentFirm);
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormType>();

  const [countries, setCountries] = useState<
    { name: string; iso_code: string }[]
  >([]);
  const [banks, setBanks] = useState<{ name: string; code: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [accountName, setAccountName] = useState<string | null>(null);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [resolving, setResolving] = useState(false);

  const selectedCountry = watch("country");
  const selectedBankCode = watch("bank");
  const accountNumber = watch("accountNumber");

  // fetch countries on mount
  useEffect(() => {
    setLoadingCountries(true);
    apiCall("/api/get-countries", "GET")
      .then((res) => {
        if (res.name === "AxiosError") throw new Error(formatError(res));
        setCountries(res.data);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoadingCountries(false));
  }, []);

  // fetch banks when country changes
  useEffect(() => {
    if (!selectedCountry) {
      setBanks([]);
      return;
    }
    setLoadingBanks(true);
    apiCall(
      `/api/get-banks?country=${encodeURIComponent(selectedCountry)}`,
      "GET"
    )
      .then((res) => {
        if (res.name === "AxiosError") throw new Error(formatError(res));
        setBanks(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
        setBanks([]);
      })
      .finally(() => setLoadingBanks(false));
  }, [selectedCountry]);

  // resolve account name when accountNumber and bank are valid
  useEffect(() => {
    if (accountNumber?.length === 10 && selectedBankCode) {
      setResolving(true);
      apiCall(
        `/api/verify-account?account_number=${accountNumber}&bank_code=${selectedBankCode}`,
        "GET"
      )
        .then((res) => {
          if (res.status === true && res.data?.account_name) {
            setAccountName(res.data.account_name);
          } else {
            toast.error("Unable to resolve account");
            setAccountName(null);
          }
        })
        .catch(() => {
          toast.error("Failed to resolve account");
          setAccountName(null);
        })
        .finally(() => setResolving(false));
    } else {
      setAccountName(null);
    }
  }, [accountNumber, selectedBankCode]);

  // handle form submission
  const onSubmit: SubmitHandler<FormType> = async (data) => {
    if (!accountName) {
      toast.error("Please resolve the account name");
      return;
    }

    setLoading(true)
    const result = await apiCall("/api/connect-paystack", "POST", {
      firmName: firm?.name,
      bankCode: data.bank,
      accountNumber: data.accountNumber,
    });
    
    if (result.name === "AxiosError") {
      setLoading(false)
      toast.error(formatError(result))
      onClose();
      return
    }

    toast.success(result.message)
    dispatch(setFirm(result.data))
    setLoading(false)
    onClose()
  };

  const uniqueBanks = Array.from(
    new Map(banks.map((b) => [b.code, b])).values()
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto p-4"
    >
      {/* Country */}
      <div>
        <label className="block mb-1 font-medium">
          Country <span className="text-red-600">*</span>
        </label>
        <div
          className={`flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ${
            errors.country
              ? "border-red-500 ring-red-500"
              : "border-gray-300 ring-gray-300"
          }`}
        >
          <GlobeAltIcon className="h-5 w-5 mr-2 text-blue-600" />
          <Select
            value={watch("country") || ""}
            onValueChange={(value) => {
              setValue("country", value, { shouldValidate: true });
              setValue("bank", "", { shouldValidate: true }); // reset bank on country change
            }}
            disabled={loadingCountries}
          >
            <SelectTrigger className="flex-1">
              <SelectValue
                placeholder={
                  loadingCountries ? "Loading countries..." : "Select country"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c.iso_code} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {errors.country && (
          <p className="text-xs text-red-600 mt-1">{errors.country.message}</p>
        )}
      </div>

      {/* Bank */}
      <div>
        <label className="block mb-1 font-medium">
          Bank <span className="text-red-600">*</span>
        </label>
        <div
          className={`flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ${
            errors.bank
              ? "border-red-500 ring-red-500"
              : "border-gray-300 ring-gray-300"
          }`}
        >
          <BanknotesIcon className="h-5 w-5 mr-2 text-green-600" />
          <Select
            value={watch("bank") || ""}
            onValueChange={(value) =>
              setValue("bank", value, { shouldValidate: true })
            }
            disabled={loadingBanks || !selectedCountry}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select your bank" />
            </SelectTrigger>
            <SelectContent>
              {uniqueBanks.map((bank) => (
                <SelectItem key={bank.code} value={bank.code}>
                  {bank.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {errors.bank && (
          <p className="text-xs text-red-600 mt-1">{errors.bank.message}</p>
        )}
      </div>

      {/* Account Number */}
      <div>
        <Label className="block mb-1 font-medium">
          Account Number <span className="text-red-600">*</span>
        </Label>
        <div className="flex items-center border rounded-md px-3 py-2">
          <IdentificationIcon className="h-5 w-5 mr-2 text-orange-600" />
          <Input
            {...register("accountNumber", {
              required: "Account number is required",
              minLength: {
                value: 10,
                message: "Account number must be 10 digits",
              },
              maxLength: {
                value: 10,
                message: "Account number must be 10 digits",
              },
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              },
            })}
            maxLength={10}
            inputMode="numeric"
            placeholder="0123456789"
            className="flex-1 outline-none text-sm"
          />
        </div>
        {errors.accountNumber && (
          <p className="text-xs text-red-600 mt-1">
            {errors.accountNumber.message}
          </p>
        )}
      </div>

      {/* Account Name display */}
      {resolving && (
        <p className="text-sm text-gray-500">Resolving account name...</p>
      )}
      {accountName && !resolving && (
        <div>
          <Label className="block mb-1 font-medium">Account Name</Label>
          <Input
            type="text"
            value={accountName}
            disabled
            className="w-full border rounded-md bg-gray-100 px-3 py-2 text-sm"
          />
        </div>
      )}

      {/* buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <Button
          onClick={onClose}
          disabled={isSubmitting}
          className="px-4 py-2 border rounded-md text-gray-700 cursor-pointer"
          variant={"ghost"}
        >
          Cancel
        </Button>
        <Button
          disabled={isSubmitting || !accountName || resolving}
          className="px-4 py-2 rounded-md cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PaystackForm;
