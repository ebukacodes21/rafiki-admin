import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import Account from "./account";
import PaymentFeeSetting from "./payment/payment-card";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { UpdateFormSchema, UpdatePasswordSchema } from "@/schema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PaystackForm from "./payment/paystack-form";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm, setFirm } from "@/redux/features/firm";
import SecuritySettingsCard from "./security";
import { selectCurrentUser } from "@/redux/features/auth";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { apiCall, formatError } from "@/utils/helper";
import { useRouter, useSearchParams } from "next/navigation";

const SettingsTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "settings";
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const dispatch = useAppDispatch();
  const firm = useAppSelector(selectCurrentFirm);
  const isPaystack = firm?.paymentProviders?.some((d) => d.name === "paystack");
  const admin = useAppSelector(selectCurrentUser);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const accountForm = useForm<z.infer<typeof UpdateFormSchema>>({
    resolver: zodResolver(UpdateFormSchema),
    defaultValues: {
      fullName: admin?.fullName,
      phone: admin?.phone,
      yearsOfExperience: admin?.yearsOfExperience,
      position: admin?.position,
    },
  });

  const securityForm = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const handleDisconnect = async (providerName: "paystack" | "stripe") => {
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
      setShowModal(false);
    }
  };

  return (
    <div className="flex w-full max-w-6xl flex-col gap-6 mx-auto mt-8">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="settings" className="cursor-pointer">
            Account Settings
          </TabsTrigger>

          <TabsTrigger value="security" className="cursor-pointer">
            Security
          </TabsTrigger>

          <TabsTrigger value="payment" className="cursor-pointer">
            Payment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Account form={accountForm} />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettingsCard form={securityForm} />
        </TabsContent>

        <TabsContent value="payment">
          <div className="space-y-3">
            <PaymentFeeSetting onConnectPaystack={() => setShowModal(true)} />
          </div>
        </TabsContent>
      </Tabs>

      <Modal
        title="Connect Paystack"
        description="Fill out the following details to link your Paystack account."
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <PaystackForm onClose={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default SettingsTabs;
