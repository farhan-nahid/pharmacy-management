import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

import type { TokenUser } from "@/module/auth/auth.schema";

interface AppBuildings {
  Variables: {
    logger: PinoLogger;
    user?: TokenUser;
  };

}

type AppOpenAPI = OpenAPIHono<AppBuildings>;
type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBuildings>;

export type { AppBuildings, AppOpenAPI, AppRouteHandler };
