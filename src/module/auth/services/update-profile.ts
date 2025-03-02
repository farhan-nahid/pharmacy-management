import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { AuthRoutes } from "../auth.routes";

const updateProfile: AppRouteHandler<AuthRoutes["updateProfile"]> = async (ctx) => {
  try {
    const payload = ctx.req.valid("json");
    const { email, firstName, lastName, phone } = payload;
    const userId = "ctx.state.user.id";

    await prisma.user.update({
      where: { id: userId },
      data: { email, firstName, lastName, phone },
    });

    return ctx.json({ message: "User updated successfully" });
  }
  catch (error) {
    throw new ApiError(500, "Internal server error", error as Record<string, any>);
  }
};

export default updateProfile;
