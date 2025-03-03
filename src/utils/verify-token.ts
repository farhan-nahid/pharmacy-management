import jsonWebToken from "jsonwebtoken";

import env from "@/env";
import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

export async function verifyToken(token: string) {
  const decoded = jsonWebToken.verify(token, env.JWT_SECRET!) as jsonWebToken.JwtPayload;

  if (!decoded?.id) {
    throw new ApiError(401, "UnAuthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { id: true, firstName: true, lastName: true, email: true, role: true },
  });

  if (!user) {
    throw new ApiError(401, "UnAuthorized");
  }

  return user; // return the user object for further use
}
