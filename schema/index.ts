import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const ForgotSchema = z.object({
  email: z.string().email({
    message: "Must be a valid email address",
  }),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "Minimum 8 characters required",
    }),
    confirmPassword: z.string().min(8, {
      message: "Minimum 8 characters required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const FirmFormSchema = z.object({
  firmName: z.string().min(1, "Firm name is required"),
  tagline: z.string().optional(),
  website: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Phone number is required"),
  founded: z.string().min(1, "Date founded is required"),
  instagram: z.string().optional(),
  x: z.string().optional(),
  facebook: z.string().optional(),
});

export const AdminFormSchema = z.object({
  phone: z.string().min(11, "Phone number is too short"),
  fullName: z.string().min(1, "Full name is required"),
  position: z.string().min(1, "Position is required"),
  enrollNumber: z.string().min(1, "Enrollment number is required"),
  yearsOfExperience: z.string().regex(/^\d+$/, { message: "Must be a number" }),
  lawSchool: z.string().min(1, "Law school is required"),
  country: z.string().min(1, "country is required"),
  document: z
    .string({
      required_error: "Please upload a document",
    })
    .url("Document must be a valid URL"),
});

export const UpdateFormSchema = z.object({
  phone: z.string().min(11, "Phone number is too short"),
  fullName: z.string().min(1, "Full name is required"),
  position: z.string().optional(),
  yearsOfExperience: z
    .string()
    .regex(/^\d+$/, { message: "YOE Must be a number" }),
});

export const PaystackConnectSchema = z.object({
  firmName: z.string().optional(),
  accountNumber: z
    .string()
    .min(10, "Account number must be 10 digits")
    .max(10, "Account number must be 10 digits")
    .regex(/^\d+$/, "Account number must be numeric"),
  bank: z.string().min(1, "Bank is required"),
  charge: z
    .union([
      z.string().regex(/^\d+$/, "Percentage must be a number"),
      z.number(),
    ])
    .optional(),
  accountName: z.string().optional(),
  country: z.string().optional()
});

export const UpdatePasswordSchema = z.object({
  oldPassword: z.string().min(8, {
    message: "Minimum 8 characters required",
  }),
  newPassword: z.string().min(8, {
    message: "Minimum 8 characters required",
  }),
});

export const FeeSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(1, "Amount must be at least 1"),
  unit: z.enum(["per hour", "flat rate"], {
    required_error: "Unit is required",
  }),
  currency: z.enum(["NGN", "GHS", "ZAR", "USD", "GBP", "KES", "RWF"], {
    required_error: "currency is required"
  }),
});

export const MatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  area: z.string().min(1, "Select a practice area"),
  events: z
    .array(
      z.object({
        title: z.string().min(1, "Event title is required"),
        date: z.string().min(1, "Event date is required"),
      })
    )
    .optional(),
  parties: z
    .array(
      z.object({
        name: z.string().min(1, "Name is required"),
        role: z.string().min(1, "Role is required"),
      })
    )
    .optional(),
});