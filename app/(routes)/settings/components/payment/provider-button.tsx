"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm, setFirm } from "@/redux/features/firm";
import { apiCall, formatError } from "@/utils/helper";
import toast from "react-hot-toast";
import { useEffect, useState, useCallback, useRef } from "react";
import { Modal } from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type PaymentMethodProp = {
  onConnectPaystack: () => void;
};

export default function PaymentMethod({ onConnectPaystack }: PaymentMethodProp) {
  const firm = useAppSelector(selectCurrentFirm);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [modalProvider, setModalProvider] = useState<"stripe" | "paystack" | null>(null);
  const [primaryProvider, setPrimaryProvider] = useState<string>("");

  const isPaystack = firm?.paymentProviders?.some((d) => d.name === "paystack");
  const isStripe = firm?.paymentProviders?.some((d) => d.name === "stripe");

  // Track first run to skip savePrimary on mount
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (firm?.paymentProviders?.length) {
      const primary = firm.paymentProviders.find((d) => d.isPrimary);
      setPrimaryProvider(primary?.name ?? firm.paymentProviders[0].name);
    } else {
      setPrimaryProvider("");
    }
  }, [firm?.paymentProviders]);

  const connectStripe = async () => {
    setLoading(true);
    const result = await apiCall(`/api/connect-stripe?firmId=${firm?.id}`, "POST");
    setLoading(false);

    if (result.name === "AxiosError") {
      toast.error(formatError(result));
      return;
    }

    if (result.url) {
      window.location.href = result.url;
      return;
    }

    toast.success("Stripe connected");
    dispatch(setFirm(result.data));
  };

  const disconnectProvider = async (providerName: "stripe" | "paystack") => {
    const provider = firm?.paymentProviders?.find((p) => p.name === providerName);

    if (!provider) {
      toast.error(`${providerName.charAt(0).toUpperCase() + providerName.slice(1)} provider not found`);
      return;
    }

    setLoading(true);
    const result = await apiCall(`/api/disconnect-payment?provider=${providerName}`, "GET");
    setLoading(false);

    if (result.name === "AxiosError") {
      toast.error(formatError(result));
      return;
    }

    dispatch(setFirm(result.data));
    toast.success(`${providerName.charAt(0).toUpperCase() + providerName.slice(1)} disconnected successfully`);
  };

  // Save primary provider with debounce
  const savePrimary = useCallback(async () => {
    if (!primaryProvider) return;

    setLoading(true);
    const res = await apiCall(`/api/update-primary?provider=${primaryProvider}`, "PUT");

    if (res.name === "AxiosError") {
      toast.error(formatError(res));
    } else {
      dispatch(setFirm(res.data));
      toast.success("Primary payment provider updated");
    }
    setLoading(false);
  }, [primaryProvider, dispatch]);

  useEffect(() => {
    if (!primaryProvider) return;

    if (isFirstRun.current) {
      // Skip on mount
      isFirstRun.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      savePrimary();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [primaryProvider, savePrimary]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Connect Payment Method</CardTitle>
          <CardDescription>
            Link a payment provider to enable client billing and receive consultation fees directly.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Paystack */}
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center gap-4">
              <Image src={"/paystack.jpg"} height={30} width={30} alt="Paystack" />
              <div>
                <p className="font-medium">Paystack</p>
                <p className="text-sm text-muted-foreground">Africa-focused payments</p>
              </div>
            </div>
            <Button
              disabled={loading}
              onClick={isPaystack ? () => setModalProvider("paystack") : onConnectPaystack}
              className="cursor-pointer"
            >
              {isPaystack ? "Disconnect" : "Connect"}
            </Button>
          </div>

          {/* Stripe */}
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center gap-4">
              <Image src={"/stripe.jpg"} height={30} width={30} alt="Stripe" />
              <div>
                <p className="font-medium">Stripe</p>
                <p className="text-sm text-muted-foreground">Global payments, cards, and more</p>
              </div>
            </div>
            <Button
              disabled={loading}
              onClick={isStripe ? () => setModalProvider("stripe") : connectStripe}
              className="cursor-pointer"
            >
              {isStripe ? "Disconnect" : "Connect"}
            </Button>
          </div>

          {/* Primary Provider Picker */}
          {(isPaystack || isStripe) && (
            <div className="pt-4">
              <p className="text-sm font-medium mb-2">Select Primary Payment Provider</p>
              <RadioGroup
                value={primaryProvider}
                onValueChange={setPrimaryProvider}
                className="flex gap-4"
              >
                {isPaystack && (
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="paystack" />
                    Paystack
                  </Label>
                )}
                {isStripe && (
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="stripe" />
                    Stripe
                  </Label>
                )}
              </RadioGroup>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reusable Modal for disconnect confirmation */}
      <Modal
        title={`Disconnect ${modalProvider}`}
        description={`Click the button below to disconnect ${modalProvider}.`}
        isOpen={modalProvider !== null}
        onClose={() => setModalProvider(null)}
      >
        <div className="space-x-2 flex justify-end">
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => setModalProvider(null)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            onClick={async () => {
              if (!modalProvider) return;
              await disconnectProvider(modalProvider);
              setModalProvider(null);
            }}
            disabled={loading}
          >
            Disconnect {modalProvider}
          </Button>
        </div>
      </Modal>
    </div>
  );
}