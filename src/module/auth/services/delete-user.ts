import type { AppRouteHandler } from "@/lib/types";

import prisma from "@/lib/prisma";

import type { AuthRoutes } from "../auth.routes";

const deleteUser: AppRouteHandler<AuthRoutes["deleteUser"]> = async (ctx) => {
  const id = ctx.req.param("id");

  await prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });

  await prisma.notification.create({
    data: {
      userId: id,
      title: "User deleted successfully",
      message: "The user has been deleted successfully.",
      category: "USER",
      priority: "MEDIUM",
    },
  });

  return ctx.json({ message: "User deleted successfully" });
};

export default deleteUser;
