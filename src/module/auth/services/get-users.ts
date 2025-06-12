import type { Role } from "@prisma/client";

import type { AppRouteHandler } from "@/lib/types";

import prisma from "@/lib/prisma";

import type { AuthRoutes } from "../auth.routes";

// eslint-disable-next-line ts/ban-ts-comment
// @ts-ignore
const getUsers: AppRouteHandler<AuthRoutes["getUsers"]> = async (ctx) => {
  const query = ctx.req.query();

  const users = await prisma.user.findMany({
    where: { deletedAt: null, role: query.role as Role },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      verified: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return ctx.json({ message: "User profile fetched successfully", data: users }, 200);
};

export default getUsers;
