import dayjs from "dayjs";

import type { AppRouteHandler } from "@/lib/types";

import backendRequest from "@/configs/axios";
import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/hash-password";

import type { AuthRoutes } from "../auth.routes";

const resetPassword: AppRouteHandler<AuthRoutes["resetPassword"]> = async (ctx) => {
  const payload = ctx.req.valid("json");
  const { email, password, code } = payload;

  const user = await prisma.user.findUnique({ where: { email, deletedAt: null } });

  if (!user) {
    throw new ApiError(400, "User with this email does not exist");
  }

  const verificationCode = await prisma.verificationCode.findFirst({
    where: { code, userId: user.id },
  });

  if (!verificationCode) {
    throw new ApiError(400, "Invalid verification code");
  }

  if (verificationCode.expiresAt < dayjs().toDate()) {
    throw new ApiError(400, "Verification code has expired");
  }

  if (verificationCode.status === "USED") {
    throw new ApiError(400, "Verification code has already been used");
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  await backendRequest.post("/api/email/send", {
    recipient: user.email,
    subject: "Password reset successful",
    body: "Your password has been reset successfully",
    source: "PASSWORD_RESET",
  });

  return ctx.json({ message: "Your password has been reset successfully" }, 200);
};

export default resetPassword;
