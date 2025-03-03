import type { AppRouteHandler } from "@/lib/types";

import type { BrandRoutes } from "./brand.routes";

const createBrand: AppRouteHandler<BrandRoutes["createBrand"]> = async (ctx) => {
  const payload = ctx.req.valid("json");
};
