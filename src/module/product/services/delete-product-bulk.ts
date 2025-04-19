import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { ProductRoutes } from "../product.routes";

const deleteProductBulk: AppRouteHandler<ProductRoutes["deleteProductBulk"]> = async (ctx) => {
  const payload = ctx.req.valid("json");

  const products = await prisma.product.findMany({
    where: { id: { in: payload.data }, deletedAt: null },
  });

  const existingIds = products.map(product => product.id);
  const productExists = payload.data.some(product => existingIds.includes(product));

  if (!productExists) {
    throw new ApiError(404, "Product not found");
  }

  await Promise.all(payload.data.map(id =>
    prisma.product.update({ where: { id }, data: { deletedAt: new Date() } }),
  ));

  return ctx.json({ message: "Products deleted successfully" });
};

export default deleteProductBulk;
