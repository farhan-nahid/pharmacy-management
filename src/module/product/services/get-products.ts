import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { ProductRoutes } from "./../product.routes";

const getProducts: AppRouteHandler<ProductRoutes["getProducts"]> = async (ctx) => {
  const products = await prisma.product.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: { category: true, brand: true, group: true },
  });
  return ctx.json({ data: products });
};

const getSingleProduct: AppRouteHandler<ProductRoutes["getSingleProduct"]> = async (ctx) => {
  const id = ctx.req.param("id");
  const product = await prisma.product.findUnique(
    {
      where: { id, deletedAt: null },
      include: { category: true, brand: true, group: true },
    },
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return ctx.json({ data: product });
};

export { getProducts, getSingleProduct };
