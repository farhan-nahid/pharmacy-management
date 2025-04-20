import { cors } from "hono/cors";

import { configureOpenApi } from "./lib/configure-open-api";
import { createApp } from "./lib/create-app";
// Route modules
import auth from "./module/auth";
import brand from "./module/brand";
import category from "./module/category";
import email from "./module/email";
import group from "./module/group";
import index from "./module/index.route";
import product from "./module/product";
import upload from "./module/upload";

const app = createApp();
configureOpenApi(app);

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS", "PATCH", "DELETE"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

const routes = [index, auth, brand, category, group, product, email, upload] as const;
routes.forEach(route => app.route("/api", route));

export type AppType = typeof routes[number];
export { app };
