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
  document: z
    .string({
      required_error: "Please upload a document",
    })
    .url("Document must be a valid URL"),
});
