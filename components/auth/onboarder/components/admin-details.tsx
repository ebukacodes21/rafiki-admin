"use client";

import { FC } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BriefcaseIcon,
  IdentificationIcon,
  AcademicCapIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";

export interface AdminForm {
  name: string;
  email: string;
  phone: string;
  fullName: string;
  position: string;
  barNumber: string;
  yearsOfExperience: string;
  lawSchool: string;
  documents: FileList | null;
}

interface AdminDetailsStepProps {
  adminData: AdminForm;
  setAdminData: React.Dispatch<React.SetStateAction<AdminForm>>;
}

const AdminDetailsStep: FC<AdminDetailsStepProps> = ({
  adminData,
  setAdminData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "documents") {
      setAdminData((prev) => ({ ...prev, documents: files }));
    } else {
      setAdminData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const Field = ({ label, name, placeholder, Icon, type = "text" }: any) => (
    <div className="space-y-1">
      <label className="text-sm text-gray-700">{label}</label>
      <div className="flex items-center border rounded-md px-3 py-2">
        <Icon className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type={type}
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
    <div className="space-y-6 max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-900">
        Admin (Lawyer) Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field
          label="Full Name"
          name="name"
          placeholder="Jane Doe"
          Icon={UserIcon}
        />
        <Field
          label="Email"
          name="email"
          placeholder="admin@yourfirm.com"
          Icon={EnvelopeIcon}
        />
        <Field
          label="Phone Number"
          name="phone"
          placeholder="+254..."
          Icon={PhoneIcon}
        />
        <Field
          label="Position/Title"
          name="position"
          placeholder="Managing Partner"
          Icon={BriefcaseIcon}
        />
        <Field
          label="Lawyer Registration Number (e.g. Supreme Court Number, Enrolment Number)"
          name="barNumber"
          placeholder="e.g. SCN123456 or LSK123456"
          Icon={IdentificationIcon}
        />
        <Field
          label="Years of Experience"
          name="yearsOfExperience"
          placeholder="5"
          Icon={BriefcaseIcon}
          type="number"
        />
        <Field
          label="Law School Attended"
          name="lawSchool"
          placeholder="University of Nairobi"
          Icon={AcademicCapIcon}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-700 font-medium">
          Upload Credentials (PDF, JPG, PNG)
        </label>
        <div className="flex items-center border rounded-md px-3 py-2">
          <DocumentArrowUpIcon className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="file"
            name="documents"
            onChange={handleChange}
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            className="w-full text-sm text-gray-600"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Upload Bar Certificate, Law Degree, ID/Passport, and Practice License
          if available.
        </p>
      </div>
    </div>
  );
};

export default AdminDetailsStep;
