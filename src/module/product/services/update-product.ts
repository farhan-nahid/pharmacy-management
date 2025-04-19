import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { ProductRoutes } from "../product.routes";

const updateProduct: AppRouteHandler<ProductRoutes["updateProduct"]> = async (ctx) => {
  const id = ctx.req.param("id");
  const payload = ctx.req.valid("json");

  // check if product already exists
  const productExists = await prisma.product.findUnique({ where: { id, deletedAt: null } });

  if (!productExists) {
    throw new ApiError(404, "Product not found");
  }

  await prisma.product.update({ where: { id }, data: payload });
  return ctx.json({ message: "Product updated successfully" });
};

const updateProductBulk: AppRouteHandler<ProductRoutes["updateProductBulk"]> = async (ctx) => {
  const payload = ctx.req.valid("json");

  // check if products already exist
  const productExists = await prisma.product.findMany({
    where: { id: { in: payload.data.map(item => item.id) }, deletedAt: null },
  });

  if (productExists.length === 0) {
    throw new ApiError(404, "Products not found");
  }

  await Promise.all(
    payload.data.map(item =>
      prisma.product.update({ where: { id: item.id }, data: item }),
    ),
  );
  return ctx.json({ message: "Products updated successfully" });
};
export { updateProduct, updateProductBulk };
