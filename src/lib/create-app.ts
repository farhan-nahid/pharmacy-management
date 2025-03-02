import { OpenAPIHono } from "@hono/zod-openapi";

import { notFound, onError, pinoLogger, serveEmojiFavicon } from "@/middlewares";

import type { AppBuildings } from "./types";

import { defaultHook } from "./default-hook";

function createRouter() {
  return new OpenAPIHono<AppBuildings>({ strict: false, defaultHook });
}

function createApp() {
  const app = createRouter();
  app.use(serveEmojiFavicon("📝"));
  app.use(pinoLogger());
  // app.use(

  //   (ctx, next) => {
  //     console.log("Not Found");
  //     // next();
  //     ctx.json({ message: "Not Found" });
  //     // next();
  //     // ctx.res.status(404).json({ message: "Not Found" });
  //   },
  // );

  app.notFound(notFound);
  app.onError(onError);

  return app;
}

export { createApp, createRouter };
