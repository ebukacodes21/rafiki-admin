"use client";
import { FC } from "react";
import { UserIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

interface AdminForm {
  name: string;
  email: string;
  phone: string;
  fullName: string;
  position: string
}

interface AdminDetailsStepProps {
  adminData: AdminForm;
  setAdminData: React.Dispatch<React.SetStateAction<AdminForm>>;
}

const AdminDetailsStep: FC<AdminDetailsStepProps> = ({ adminData, setAdminData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData(prev => ({ ...prev, [name]: value }));
  };

  const Field = ({ label, name, placeholder, Icon }: any) => (
    <div className="space-y-1">
      <label className="text-sm text-gray-700">{label}</label>
      <div className="flex items-center border rounded-md px-3 py-2">
        <Icon className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          name={name}
          value={(adminData as any)[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full border-none outline-none text-sm"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">Admin Details</h2>
      <Field label="Full Name" name="name" placeholder="Jane Doe" Icon={UserIcon} />
      <Field label="Email" name="email" placeholder="admin@yourfirm.com" Icon={EnvelopeIcon} />
      <Field label="Phone Number" name="phone" placeholder="+254..." Icon={PhoneIcon} />
    </div>
  );
};

export default AdminDetailsStep;
