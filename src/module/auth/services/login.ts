import bcrypt from "bcryptjs";

import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";
import generateToken from "@/utils/generate-token";

import type { AuthRoutes } from "../auth.routes";

interface Session {
  userId: string;
  userAgent: string;
  ipAddress: string;
  attempt?: "SUCCESS" | "FAILED";
}

async function loginSessions(data: Session) {
  const payload = {
    userId: data.userId,
    userAgent: data.userAgent,
    ipAddress: data.ipAddress,
    attempt: data.attempt ?? "SUCCESS",
  };
  await prisma.session.create({ data: payload });
}

const login: AppRouteHandler<AuthRoutes["login"]> = async (ctx) => {
  const { email, password } = ctx.req.valid("json");
  const userAgent = ctx.req.header("user-agent") || "Unknown";
  const ipAddress = ctx.req.header("cf-connecting-ip") || ctx.req.header("x-forwarded-for") || "Unknown";

  const user = await prisma.user.findUnique({ where: { email, deletedAt: null } });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  if (!user.verified) {
    await loginSessions({ userId: user.id, userAgent, ipAddress, attempt: "FAILED" });
    throw new ApiError(401, "User is not verified");
  }

  if (user?.status !== "ACTIVE") {
    await loginSessions({ userId: user.id, userAgent, ipAddress, attempt: "FAILED" });
    throw new ApiError(401, "User is inactive");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    await loginSessions({ userId: user.id, userAgent, ipAddress, attempt: "FAILED" });
    throw new ApiError(401, "Invalid credentials");
  }

  await loginSessions({ userId: user.id, userAgent, ipAddress });

  return ctx.json({ message: "Logged in successfully", token: generateToken(user) }, 200);
};

export default login;
