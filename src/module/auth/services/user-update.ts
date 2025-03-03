import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { AuthRoutes } from "../auth.routes";

const userUpdate: AppRouteHandler<AuthRoutes["userUpdate"]> = async (ctx) => {
  const payload = ctx.req.valid("json");
  const userId = ctx.req.param("id") as string;

  const user = await prisma.user.findUnique({
    where: { id: userId, deletedAt: null },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await prisma.user.update({ where: { id: userId, deletedAt: null }, data: payload });

  return ctx.json({ message: "User updated successfully" });
};

export default userUpdate;
