import type { AppRouteHandler } from "@/lib/types";

import prisma from "@/lib/prisma";

import type { AuthRoutes } from "../auth.routes";

const deleteAccount: AppRouteHandler<AuthRoutes["deleteAccount"]> = async (ctx) => {
  const userId = ctx.get("user")?.id as string;

  await prisma.user.update({ where: { id: userId }, data: { deletedAt: new Date() } });

  await prisma.notification.create({
    data: {
      userId,
      title: "Account deleted successfully",
      message: "Your account has been deleted successfully.",
      category: "USER",
      priority: "MEDIUM",
    },
  });

  return ctx.json({ message: "Account deleted successfully" });
};

export default deleteAccount;
