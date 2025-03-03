import { createMiddleware } from "hono/factory";

import { verifyToken } from "@/utils/verify-token";

const authMiddleware = createMiddleware(async (c, next) => {
  const token = c.req.header("Authorization");

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const [, tokenValue] = token.split("Bearer ");

  if (!tokenValue) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const jwtPayload = await verifyToken(tokenValue);

  c.set("user", jwtPayload);
  await next();
});

const adminMiddleware = createMiddleware(async (ctx, next) => {
  const user = ctx.get("user");

  if (!user || user.role !== "ADMIN") {
    return ctx.json({ error: "Forbidden" }, 403);
  }

  await next();
});

export { adminMiddleware, authMiddleware };
