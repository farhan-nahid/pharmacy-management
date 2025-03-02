import dayjs from "dayjs";

import type { AppRouteHandler } from "@/lib/types";

import backendRequest from "@/configs/axios";
import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { AuthRoutes } from "../auth.routes";

const verifyEmail: AppRouteHandler<AuthRoutes["verifyEmail"]> = async (ctx) => {
  const payload = ctx.req.valid("json");
  const { code, email } = payload;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new ApiError(400, "User with this email does not exist");
  }

  if (user.verified === true && user.status === "ACTIVE") {
    throw new ApiError(400, "Email has already been verified");
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

  await prisma.user.update({
    where: { id: user.id },
    data: { verified: true, status: "ACTIVE" },
  });

  await prisma.verificationCode.update({
    where: { id: verificationCode.id },
    data: { status: "USED", verifiedAt: dayjs().toISOString() },
  });

  await backendRequest.post("/api/email/send", {
    recipient: user.email,
    subject: "Email verified",
    body: "Your email has been verified successfully",
    source: "ACCOUNT_ACTIVATION",
  });

  return ctx.json({ message: "Email verified successfully" });
};

export default verifyEmail;
