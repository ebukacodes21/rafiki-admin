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

export default function CalendarSettings() {
  const firm = useAppSelector(selectCurrentFirm);
  const [loading, setIsLoading] = useState<boolean>(false);
   const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (firm?.diaries?.some(d => d.provider === "google")) {
      setIsConnected(true);
    }
  }, [firm]);

  const handleGoogleCalendar = () => {
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
        <CardTitle>Connect Calender</CardTitle>
        <CardDescription>
          Choose which calendars to sync with your firm&apos;s diary.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Google Calendar */}
        <div className="flex items-center justify-between p-4 border rounded-md">
          <div className="flex items-center gap-4">
            <Image src={"/meet.png"} height={30} width={30} alt="outlook" />
            <div>
              <p className="font-medium">Google Calendar</p>
              <p className="text-sm text-muted-foreground">Gmail, G Suite</p>
            </div>
          </div>
          <Button
            disabled={loading}
            onClick={handleGoogleCalendar}
            className="cursor-pointer"
          >
            {isConnected ? "Connected" : "Disconnect"}
          </Button>
        </div>

        {/* Outlook Calendar */}
        <div className="flex items-center justify-between p-4 border rounded-md">
          <div className="flex items-center gap-4">
            <Image src={"/outlook.png"} height={30} width={30} alt="outlook" />
            <div>
              <p className="font-medium">Outlook Calendar</p>
              <p className="text-sm text-muted-foreground">
                Office 365, Outlook.com, Live.com, or Hotmail calendar
              </p>
            </div>
          </div>
          <Button
            onClick={handleGoogleCalendar}
            disabled={loading}
            className="cursor-pointer"
          >
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
