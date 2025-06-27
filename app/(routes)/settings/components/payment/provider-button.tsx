import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm } from "@/redux/features/firm";

type PaymentMethodProp = {
  onConnectPaystack: () => void;
}

export default function PaymentMethod({ onConnectPaystack }: PaymentMethodProp) {
  const firm = useAppSelector(selectCurrentFirm);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (firm?.paymentProviders?.some((d) => d.name === "paystack")) {
      setIsConnected(true);
    }
  }, [firm]);

  const handleConnect = () => {
    setIsLoading(true);
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_CALLBACK_CONNECT!;
    const NONCE = uuidv4();

    const googleOAuthURL =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `prompt=consent&` +
      `scope=${encodeURIComponent(
        [
          "openid",
          "email",
          "profile",
          "https://www.googleapis.com/auth/calendar",
        ].join(" ")
      )}&` +
      `state=${NONCE}`;

    window.location.href = googleOAuthURL;
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
            {isConnected ? "Disconnect" : "Connect"}
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
            onClick={handleConnect}
            disabled={loading}
            className="cursor-pointer"
          >
            {isConnected ? "Disconnect" : "Connect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
