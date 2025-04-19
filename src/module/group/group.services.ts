import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { GroupRoutes } from "./group.routes";

const createGroup: AppRouteHandler<GroupRoutes["createGroup"]> = async (ctx) => {
  const payload = ctx.req.valid("json");

  // check if Group already exists with the same name or code
  const existingGroup = await prisma.group.findFirst({
    where: { name: payload.name },
  });

  if (existingGroup) {
    throw new ApiError(400, "Group with this name already exists");
  }

  await prisma.group.create({ data: payload });

  return ctx.json({ message: "Group created successfully" }, 201);
};

const getGroups: AppRouteHandler<GroupRoutes["getGroups"]> = async (ctx) => {
  const groups = await prisma.group.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
  return ctx.json({ data: groups });
};

const getGroup: AppRouteHandler<GroupRoutes["getGroup"]> = async (ctx) => {
  const id = ctx.req.param("id");
  const group = await prisma.group.findUnique({ where: { id, deletedAt: null } });

  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  return ctx.json({ data: group });
};

const updateGroup: AppRouteHandler<GroupRoutes["updateGroup"]> = async (ctx) => {
  const id = ctx.req.param("id");
  const payload = ctx.req.valid("json");

  const group = await prisma.group.findUnique({ where: { id, deletedAt: null } });

  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  await prisma.group.update({ where: { id }, data: payload });

  return ctx.json({ message: "Group updated successfully" });
};

const deleteGroup: AppRouteHandler<GroupRoutes["deleteGroup"]> = async (ctx) => {
  const id = ctx.req.param("id");

  const group = await prisma.group.findUnique({ where: { id, deletedAt: null } });

  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  await prisma.group.update({ where: { id }, data: { deletedAt: new Date() } });

  return ctx.json({ message: "Group deleted successfully" });
};

export { createGroup, deleteGroup, getGroup, getGroups, updateGroup };
