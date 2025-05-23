import dayjs from "dayjs";

import type { AppRouteHandler } from "@/lib/types";

import backendRequest from "@/configs/axios";
import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";
import { generateVerificationCode } from "@/utils/generate-verification-code";

import type { AuthRoutes } from "../auth.routes";

const resetPasswordRequest: AppRouteHandler<AuthRoutes["resetPasswordRequest"]> = async (ctx) => {
  const payload = ctx.req.valid("json");
  const { email } = payload;

  const user = await prisma.user.findUnique({ where: { email, deletedAt: null } });

  if (!user) {
    throw new ApiError(400, "User with this email does not exist");
  }

  // generate verification code
  const code = generateVerificationCode();

  await prisma.verificationCode.create({
    data: { code, userId: user.id, expiresAt: dayjs().add(1, "day").toISOString() },
  });

  await backendRequest.post("/api/email/send", {
    recipient: user.email,
    subject: "Reset your password",
    body: `Your verification code is ${code}`,
    source: "PASSWORD_RESET",
  });

  await prisma.notification.create({
    data: {
      userId: user.id,
      title: "Password reset request",
      message: "A password reset request has been initiated. Please check your email.",
      category: "USER",
      priority: "MEDIUM",
    },
  });

  return ctx.json({ message: "Verification email sent successfully" }, 200);
};

export default resetPasswordRequest;
