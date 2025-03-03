import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { CategoryRoutes } from "./category.routes";

const createCategory: AppRouteHandler<CategoryRoutes["createCategory"]> = async (ctx) => {
  const payload = ctx.req.valid("json");
  const userId = ctx.get("user")?.id as string;

  const existingCategory = await prisma.category.findFirst({
    where: { name: payload.name },
  });

  if (existingCategory) {
    throw new ApiError(400, "Category with this name already exists");
  }

  await prisma.category.create({ data: { ...payload, createdBy: userId } });

  return ctx.json({ message: "Category created successfully" }, 201);
};

const getCategories: AppRouteHandler<CategoryRoutes["getCategories"]> = async (ctx) => {
  const categories = await prisma.category.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
  return ctx.json({ data: categories });
};

const getCategory: AppRouteHandler<CategoryRoutes["getCategory"]> = async (ctx) => {
  const id = ctx.req.param("id");
  const category = await prisma.category.findUnique({ where: { id, deletedAt: null } });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return ctx.json({ data: category });
};

const updateCategory: AppRouteHandler<CategoryRoutes["updateCategory"]> = async (ctx) => {
  const id = ctx.req.param("id");
  const payload = ctx.req.valid("json");

  const category = await prisma.category.findUnique({ where: { id, deletedAt: null } });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  await prisma.category.update({ where: { id }, data: payload });

  return ctx.json({ message: "Category updated successfully" });
};

const deleteCategory: AppRouteHandler<CategoryRoutes["deleteCategory"]> = async (ctx) => {
  const id = ctx.req.param("id");
  const userId = ctx.get("user")?.id as string;

  const category = await prisma.category.findUnique({ where: { id, deletedAt: null } });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  await prisma.category.update({ where: { id }, data: { deletedAt: new Date(), deletedBy: userId } });

  return ctx.json({ message: "Category deleted successfully" });
};

export { createCategory, deleteCategory, getCategories, getCategory, updateCategory };
