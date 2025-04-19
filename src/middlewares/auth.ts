import type { Role } from "@prisma/client";

import { createMiddleware } from "hono/factory";

function authMiddleware() {
  return createMiddleware(async (c, next) => {
    // const token = c.req.header("Authorization");

    // if (!token) {
    //   return c.json({ error: "Unauthorized" }, 401);
    // }

    // const [, tokenValue] = token.split("Bearer ");

    // if (!tokenValue) {
    //   return c.json({ error: "Unauthorized" }, 401);
    // }

    // const jwtPayload = await verifyToken(tokenValue);

    // c.set("user", jwtPayload);
    await next();
  });
}

function roleMiddleware(_roles: Role[]) {
  return createMiddleware(async (ctx, next) => {
    // const user = ctx.get("user");

    // if (!user || !roles.includes(user.role)) {
    //   return ctx.json({ error: "Forbidden" }, 403);
    // }

    await next();
  });
}

export { authMiddleware, roleMiddleware };
