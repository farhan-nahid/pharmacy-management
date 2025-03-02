import jsonWebToken from "jsonwebtoken";

import type { AppRouteHandler } from "@/lib/types";

import env from "@/env";
import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { AuthRoutes } from "../auth.routes";

const verifyToken: AppRouteHandler<AuthRoutes["verifyToken"]> = async (ctx) => {
  const payload = ctx.req.valid("json");
  const { token } = payload;

  const decoded = jsonWebToken.verify(token, env.JWT_SECRET!) as jsonWebToken.JwtPayload;

  const user = await prisma.user.findUnique({
    where: { id: decoded?.id },
    select: { id: true, firstName: true, lastName: true, email: true, role: true },
  });

  if (!user) {
    throw new ApiError(401, "UnAuthorized");
  }

  return ctx.json({ message: "Token verified successfully", data: user });
};

export default verifyToken;
