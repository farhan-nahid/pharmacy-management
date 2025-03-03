import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { AuthRoutes } from "../auth.routes";

// eslint-disable-next-line ts/ban-ts-comment
// @ts-ignore
const getProfile: AppRouteHandler<AuthRoutes["getProfile"]> = async (ctx) => {
  const userId = ctx.get("user")?.id as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      verified: true,
    },
  });

  if (!user) {
    throw new ApiError(401, "UnAuthorized");
  }

  return ctx.json({ message: "User profile fetched successfully", data: user }, 200);
};

export default getProfile;
