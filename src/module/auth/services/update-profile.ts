import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { AuthRoutes } from "../auth.routes";

const updateProfile: AppRouteHandler<AuthRoutes["updateProfile"]> = async (ctx) => {
  const payload = ctx.req.valid("json");
  const userId = ctx.get("user")?.id as string;

  const { email, firstName, lastName, phone } = payload;

  const user = await prisma.user.findUnique({
    where: { id: userId, deletedAt: null },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await prisma.user.update({
    where: { id: userId, deletedAt: null },
    data: { email, firstName, lastName, phone },
  });

  await prisma.notification.create({
    data: {
      userId,
      title: "Profile updated successfully",
      message: "Your profile has been updated successfully.",
      category: "USER",
      priority: "MEDIUM",
    },
  });

  return ctx.json({ message: "User updated successfully" });
};

export default updateProfile;
