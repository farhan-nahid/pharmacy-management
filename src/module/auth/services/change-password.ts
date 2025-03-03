import type { AppRouteHandler } from "@/lib/types";

import backendRequest from "@/configs/axios";
import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/hash-password";

import type { AuthRoutes } from "../auth.routes";

const changePassword: AppRouteHandler<AuthRoutes["changePassword"]> = async (ctx) => {
  const payload = ctx.req.valid("json");
  const userId = ctx.get("user")?.id as string;

  const { password } = payload;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new ApiError(400, "User with this email does not exist");
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  await backendRequest.post("/api/email/send", {
    recipient: user.email,
    subject: "Password changed successful",
    body: "Your password has been changed successfully",
    source: "CHANGE_PASSWORD",
  });

  return ctx.json({ message: "Your password has been changed successfully" }, 200);
};

export default changePassword;
