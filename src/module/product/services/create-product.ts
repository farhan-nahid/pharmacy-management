import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { ProductRoutes } from "../product.routes";

const createProduct: AppRouteHandler<ProductRoutes["createProduct"]> = async (ctx) => {
  const payload = ctx.req.valid("json");

  // check if product already exists
  const productExists = await prisma.product.findUnique({ where: { sku: payload.sku } });

  if (productExists) {
    throw new ApiError(400, "Product with this SKU already exists");
  }

  await prisma.product.create({ data: payload });
  return ctx.json({ message: "Product created successfully" }, 201);
};

export default createProduct;
