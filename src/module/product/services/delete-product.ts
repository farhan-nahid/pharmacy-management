import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { ProductRoutes } from "../product.routes";

const deleteGroup: AppRouteHandler<ProductRoutes["deleteProduct"]> = async (ctx) => {
  const id = ctx.req.param("id");

  const product = await prisma.product.findUnique({ where: { id, deletedAt: null } });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await prisma.group.update({ where: { id }, data: { deletedAt: new Date() } });

  return ctx.json({ message: "Group deleted successfully" });
};

export default deleteGroup;
