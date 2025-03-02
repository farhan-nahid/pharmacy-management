import { createMiddleware } from "hono/factory";

const authMiddleware = createMiddleware(async (c, next) => {
  console.log(`[${c.req.method}] 'aaaaaaaaaaaaa=========================>' ${c.req.url}`);
  await next();
});

interface JwtPayload {
  role: string;
}

interface Context {
  get: (key: string) => JwtPayload | undefined;
  json: (body: object, status: number) => void;
}

type NextFunction = () => Promise<void>;

async function roleMiddleware(ctx: Context, next: NextFunction) {
  const user = ctx.get("jwtPayload"); // Get user from JWT payload

  if (!user || user.role !== "ADMIN") {
    return ctx.json({ error: "Forbidden" }, 403);
  }

  await next();
}

export { authMiddleware, roleMiddleware };
