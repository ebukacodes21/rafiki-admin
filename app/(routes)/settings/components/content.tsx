import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import Account from "./account";
import PaymentFeeSetting from "./payment/payment-card";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import {
  PaystackConnectSchema,
  UpdateFormSchema,
  UpdatePasswordSchema,
} from "@/schema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PaystackForm from "./payment/paystack-form";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm } from "@/redux/features/firm";
import SecuritySettingsCard from "./security";
import { selectCurrentUser } from "@/redux/features/auth";

const SettingsTabs = () => {
  const firm = useAppSelector(selectCurrentFirm);
  const admin = useAppSelector(selectCurrentUser);
  const [showModal, setShowModal] = useState<boolean>(false);

  const paystackForm = useForm<z.infer<typeof PaystackConnectSchema>>({
    resolver: zodResolver(PaystackConnectSchema),
    defaultValues: {
      firmName: firm?.name,
      bankCode: "",
      accountNumber: "",
      charge: 0,
      accountName: "",
    },
  });

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

  return (
    <div className="flex w-full max-w-6xl flex-col gap-6 mx-auto mt-8">
      <Tabs defaultValue="settings">
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
            <PaymentFeeSetting
              onConnectPaystack={() => setShowModal(true)}
            />
          </div>
        </TabsContent>
      </Tabs>

      <Modal
        title="Connect Paystack"
        description="Fill out the following details to link your account"
        isOpen={showModal}
        onClose={() => {}}
      >
        <PaystackForm form={paystackForm} onClose={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default SettingsTabs;
