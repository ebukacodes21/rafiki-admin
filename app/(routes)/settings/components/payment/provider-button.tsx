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
import { useState } from "react";

type PaymentMethodProp = {
  onConnectPaystack: () => void;
};

export default function PaymentMethod({
  onConnectPaystack,
}: PaymentMethodProp) {
  const firm = useAppSelector(selectCurrentFirm);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const isPaystack = firm?.paymentProviders?.some((d) => d.name === "paystack");
  const isStripe = firm?.paymentProviders?.some((d) => d.name === "stripe");

  const connectStripe = async () => {
    setLoading(true);
    const result = await apiCall(
      `/api/connect-stripe?firmId=${firm?.id}`,
      "POST"
    );
    if (result.name === "AxiosError") {
      toast.error(formatError(result));
      setLoading(false);
      return;
    }

    if (result.url) {
      window.location.href = result.url;
      return;
    }

    toast.success("Stripe connected");
    setLoading(false);

    toast.success(result.message);
    dispatch(setFirm(result.data));
    setLoading(false);
  };

  const disconnectStripe = async (providerName: "paystack" | "stripe") => {
    const provider = firm?.paymentProviders?.find(
      (p) => p.name === providerName
    );

    if (!provider) {
      toast.error(`${providerName} provider not found`);
      return;
    }

    try {
      setLoading(true);
      const result = await apiCall(
        `/api/disconnect-payment?provider=${providerName}`,
        "GET"
      );

      if (result.name === "AxiosError") {
        toast.error(formatError(result));
        return;
      }

      dispatch(setFirm(result.data));
      toast.success(`${providerName} disconnected successfully`);
    } catch (err) {
      toast.error(`Failed to disconnect ${providerName}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Payment Method</CardTitle>
        <CardDescription>
          Link a payment provider to enable client billing and receive
          consultation fees directly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* paystack */}
        <div className="flex items-center justify-between p-4 border rounded-md">
          <div className="flex items-center gap-4">
            <Image src={"/paystack.jpg"} height={30} width={30} alt="outlook" />
            <div>
              <p className="font-medium">Paystack</p>
            </div>
          </div>
          <Button
            disabled={loading}
            onClick={onConnectPaystack}
            className="cursor-pointer"
          >
            {isPaystack ? "Disconnect" : "Connect"}
          </Button>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-md">
          <div className="flex items-center gap-4">
            <Image src={"/stripe.jpg"} height={30} width={30} alt="outlook" />
            <div>
              <p className="font-medium">Stripe</p>
            </div>
          </div>
          <Button
            disabled={loading}
            onClick={isStripe ? () => disconnectStripe("stripe") : connectStripe}
            className="cursor-pointer"
          >
            {isStripe ? "Disconnect" : "Connect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
