import { AccountStatus, Role } from "@prisma/client";
import { z } from "zod";

const AdminRegisterSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  phone: z.string().min(10).max(15),
  password: z.string().min(6).max(255),
});

const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const UpdateProfileSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().min(2).max(255).optional(),
  lastName: z.string().min(2).max(255).optional(),
  phone: z.string().min(10).max(15).optional(),
});

const EmailVerificationSchema = z.object({
  code: z.string().length(6),
  email: z.string().email(),
});

const UserProfileSchema = z.object({
  id: z.string().cuid(),
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  email: z.string().email(),
  phone: z.string().min(10).max(15).optional(),
  role: z.nativeEnum(Role),
  status: z.nativeEnum(AccountStatus),
  verified: z.boolean(),
});

const VerifyTokenSchema = z.object({
  token: z.string(),
});

const resetPasswordRequestSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  code: z.string().length(6),
  email: z.string().email(),
  password: z.string().min(6).max(255),
  confirmPassword: z.string().min(6).max(255),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
});

const changePasswordSchema = z.object({
  password: z.string().min(6).max(255),
  confirmPassword: z.string().min(6).max(255),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export interface TokenUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
}

export { AdminRegisterSchema, changePasswordSchema, EmailVerificationSchema, resetPasswordRequestSchema, resetPasswordSchema, UpdateProfileSchema, UserLoginSchema, UserProfileSchema, VerifyTokenSchema };
