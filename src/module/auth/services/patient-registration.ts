import dayjs from "dayjs";

import type { AppRouteHandler } from "@/lib/types";

import backendRequest from "@/configs/axios";
import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";
import { generateVerificationCode } from "@/utils/generate-verification-code";
import { hashPassword } from "@/utils/hash-password";

import type { AuthRoutes } from "../auth.routes";

const patientRegistration: AppRouteHandler<AuthRoutes["patientRegistration"]> = async (ctx) => {
  const payload = ctx.req.valid("json");

  const { email, password, firstName, lastName, phone } = payload;

  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    throw new ApiError(400, "User with this email already exists");
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, firstName, lastName, phone, role: "PATIENT" },
  });

  // generate verification code
  const code = generateVerificationCode();

  await prisma.verificationCode.create({
    data: { code, userId: user.id, expiresAt: dayjs().add(1, "day").toISOString() },
  });

  // send verification email
  await backendRequest.post("/api/email/send", {
    recipient: user.email,
    subject: "Verify your email",
    body: `Your verification code is ${code}`,
    source: "USER_VERIFICATION",
  });

  return ctx.json({ message: "User registered successfully" }, 201);
};

export default patientRegistration;
