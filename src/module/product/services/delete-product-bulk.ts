import type { AppRouteHandler } from "@/lib/types";

import type { ProductRoutes } from "../product.routes";

const deleteProductBulk: AppRouteHandler<ProductRoutes["deleteProductBulk"]> = async (ctx) => {
  // get the id
  const param = ctx.req.param;
  const id = param.id;

  if (!id) {
    ctx.res.status(400).send("Product ID is required.");
  }
};
