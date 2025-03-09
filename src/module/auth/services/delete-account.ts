import type { AppRouteHandler } from "@/lib/types";

import prisma from "@/lib/prisma";

import type { AuthRoutes } from "../auth.routes";

const deleteAccount: AppRouteHandler<AuthRoutes["deleteAccount"]> = async (ctx) => {
  const userId = ctx.get("user")?.id as string;

  await prisma.user.update({ where: { id: userId }, data: { deletedAt: new Date(), deletedBy: userId } });

  return ctx.json({ message: "Account deleted successfully" });
};

export default deleteAccount;
