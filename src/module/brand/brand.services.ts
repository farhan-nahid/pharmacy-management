import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { BrandRoutes } from "./brand.routes";

const createBrand: AppRouteHandler<BrandRoutes["createBrand"]> = async (ctx) => {
  const payload = ctx.req.valid("json");
  const userId = ctx.get("user")?.id as string;

  // check if brand already exists with the same name or code
  const existingBrand = await prisma.brand.findFirst({
    where: { OR: [{ name: payload.name }, { code: payload.code }] },
  });

  if (existingBrand) {
    throw new ApiError(400, "Brand with this name already exists");
  }

  await prisma.brand.create({ data: { ...payload, createdBy: userId } });

  return ctx.json({ message: "Brand created successfully" }, 201);
};

const getBrands: AppRouteHandler<BrandRoutes["getBrands"]> = async (ctx) => {
  const brands = await prisma.brand.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
  return ctx.json({ data: brands });
};

const getBrand: AppRouteHandler<BrandRoutes["getBrand"]> = async (ctx) => {
  const id = ctx.req.param("id");
  const brand = await prisma.brand.findUnique({ where: { id, deletedAt: null } });

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  return ctx.json({ data: brand });
};

const updateBrand: AppRouteHandler<BrandRoutes["updateBrand"]> = async (ctx) => {
  const id = ctx.req.param("id");
  const payload = ctx.req.valid("json");

  const brand = await prisma.brand.findUnique({ where: { id, deletedAt: null } });

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  await prisma.brand.update({ where: { id }, data: payload });

  return ctx.json({ message: "Brand updated successfully" });
};

const deleteBrand: AppRouteHandler<BrandRoutes["deleteBrand"]> = async (ctx) => {
  const id = ctx.req.param("id");
  const userId = ctx.get("user")?.id as string;

  const brand = await prisma.brand.findUnique({ where: { id, deletedAt: null } });

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  await prisma.brand.update({ where: { id }, data: { deletedAt: new Date(), deletedBy: userId } });

  return ctx.json({ message: "Brand deleted successfully" });
};

export { createBrand, deleteBrand, getBrand, getBrands, updateBrand };
