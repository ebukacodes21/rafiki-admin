"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import toast from "react-hot-toast";
import { apiCall, formatError } from "@/utils/helper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm, setFirm } from "@/redux/features/firm";

export default function CalendarSettings() {
  const firm = useAppSelector(selectCurrentFirm);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disconnectProvider, setDisconnectProvider] = useState<"google" | "outlook" | null>(null);
  const [primaryProvider, setPrimaryProvider] = useState<string>("");

  const [googleConnected, setGoogleConnected] = useState(false);
  const [outlookConnected, setOutlookConnected] = useState(false);

useEffect(() => {
  const diaries = firm?.diaries ?? [];
  setGoogleConnected(diaries.some((d) => d.provider === "google"));
  setOutlookConnected(diaries.some((d) => d.provider === "outlook"));

  if (diaries.length === 0) {
    setPrimaryProvider(""); 
    return;
  }

  const primary = diaries.find((d) => d.isPrimary)?.provider;
  if (primary) {
    setPrimaryProvider(primary);
  } else {
    const firstConnected = diaries.find(
      (d) => d.provider === "google" || d.provider === "outlook"
    );
    setPrimaryProvider(firstConnected?.provider || "");
  }
}, [firm]);

  const handleGoogleConnect = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const redirectUri = process.env.NEXT_PUBLIC_CALLBACK_CONNECT!;
    const nonce = crypto.randomUUID();
    localStorage.setItem("oauth_state", nonce);

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&access_type=offline&prompt=consent&scope=${encodeURIComponent(
      "openid email profile https://www.googleapis.com/auth/calendar"
    )}&state=${nonce}`;

    window.location.href = url;
  };

  const handleOutlookConnect = () => {
    const clientId = process.env.NEXT_PUBLIC_OUTLOOK_CLIENT_ID!;
    const redirectUri = process.env.NEXT_PUBLIC_CALLBACK_CONNECT!;
    const nonce = crypto.randomUUID();
    localStorage.setItem("oauth_state", nonce);

    const url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${encodeURIComponent(
      "offline_access https://graph.microsoft.com/Calendars.ReadWrite"
    )}&state=${nonce}`;

    window.location.href = url;
  };

  const handleDisconnectCalendar = async () => {
    if (!disconnectProvider) return;
    setLoading(true);

    const res = await apiCall(
      `/api/disconnect-calendar?provider=${disconnectProvider}`,
      "GET"
    );

    if (res.name === "AxiosError") {
      toast.error(formatError(res));
    } else {
      dispatch(setFirm(res.data));
      toast.success(`${disconnectProvider} disconnected`);
    }

    setShowModal(false);
    setDisconnectProvider(null);
    setLoading(false);
  };

  const savePrimary = useCallback(async () => {
    if (!primaryProvider) return;
    const res = await apiCall(`/api/update-primary?provider=${primaryProvider}`, "PUT");

    if (res.name === "AxiosError") {
      toast.error(formatError(res));
    } else {
      dispatch(setFirm(res.data));
      toast.success("Primary calendar updated");
    }
  }, [primaryProvider, dispatch]);

  useEffect(() => {
    const id = setTimeout(savePrimary, 1000);
    return () => clearTimeout(id);
  }, [primaryProvider, savePrimary]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Connect Calendar</CardTitle>
          <CardDescription>
            Connect and set a primary calendar for syncing events.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Google Calendar */}
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center gap-4">
              <Image src="/meet.png" alt="google" width={30} height={30} />
              <div>
                <p className="font-medium">Google Calendar</p>
                <p className="text-sm text-muted-foreground">Gmail, G Suite</p>
              </div>
            </div>
            <Button
              disabled={loading}
              className="cursor-pointer"
              onClick={() =>
                googleConnected
                  ? (setShowModal(true), setDisconnectProvider("google"))
                  : handleGoogleConnect()
              }
            >
              {googleConnected ? "Disconnect" : "Connect"}
            </Button>
          </div>

          {/* Outlook Calendar */}
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center gap-4">
              <Image src="/outlook.png" alt="outlook" width={30} height={30} />
              <div>
                <p className="font-medium">Outlook Calendar</p>
                <p className="text-sm text-muted-foreground">
                  Office 365, Live.com, Hotmail
                </p>
              </div>
            </div>
            <Button
              disabled={loading}
              className="cursor-pointer"
              onClick={() =>
                outlookConnected
                  ? (setShowModal(true), setDisconnectProvider("outlook"))
                  : handleOutlookConnect()
              }
            >
              {outlookConnected ? "Disconnect" : "Connect"}
            </Button>
          </div>

          {/* Primary Picker */}
          {(googleConnected || outlookConnected) && (
            <div className="pt-4">
              <p className="text-sm font-medium mb-2">Select Primary Calendar</p>
              <RadioGroup
                value={primaryProvider}
                onValueChange={setPrimaryProvider}
                className="flex gap-4"
              >
                {googleConnected && (
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="google" />
                    Google Calendar
                  </Label>
                )}
                {outlookConnected && (
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="outlook" />
                    Outlook Calendar
                  </Label>
                )}
              </RadioGroup>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Disconnect Calendar"
        description={`Are you sure you want to disconnect ${
          disconnectProvider === "google" ? "Google" : "Outlook"
        } Calendar?`}
      >
        <div className="flex justify-end gap-2 pt-4">
          <Button className="cursor-pointer" variant="ghost" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button className="cursor-pointer" onClick={handleDisconnectCalendar} disabled={loading}>
            Disconnect
          </Button>
        </div>
      </Modal>
    </div>
  );
}
