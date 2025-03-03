import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { ProductRoutes } from "../product.routes";

const createProductBulk: AppRouteHandler<ProductRoutes["createProductBulk"]> = async (ctx) => {
  const payload = ctx.req.valid("json");

  // filter out products that already exist
  const existingProducts = await prisma.product.findMany({
    where: {
      sku: {
        in: payload.data.map(product => product.sku),
      },
    },
  });

  const existingSkus = existingProducts.map(product => product.sku);
  const productExists = payload.data.some(product => existingSkus.includes(product.sku));

  if (productExists) {
    throw new ApiError(400, "Product with this SKU already exists", existingSkus);
  }

  await prisma.product.createMany({ data: payload.data });
  return ctx.json({ message: "Products created successfully" }, 201);
};

export default createProductBulk;
