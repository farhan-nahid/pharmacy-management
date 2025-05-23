import type { AppRouteHandler } from "@/lib/types";

import prisma from "@/lib/prisma";

import type { AuthRoutes } from "../auth.routes";

const deleteUser: AppRouteHandler<AuthRoutes["deleteUser"]> = async (ctx) => {
  const id = ctx.req.param("id");

  await prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });

  return ctx.json({ message: "User deleted successfully" });
};

export default deleteUser;
