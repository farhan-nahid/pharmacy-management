import type { AppRouteHandler } from "@/lib/types";

import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { NotificationRoutes } from "./notification.routes";

// Create a new notification
const createNotification: AppRouteHandler<NotificationRoutes["createNotification"]> = async (ctx) => {
  const payload = ctx.req.valid("json");

  const notification = await prisma.notification.create({ data: payload });

  return ctx.json({ message: "Notification created successfully", data: notification }, 201);
};

// Get all notifications
const getNotifications: AppRouteHandler<NotificationRoutes["getNotifications"]> = async (ctx) => {
  const notifications = await prisma.notification.findMany({
    where: { deletedAt: null },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return ctx.json({ data: notifications, message: "Notifications fetched successfully" });
};

// Get a single notification by ID
const getNotification: AppRouteHandler<NotificationRoutes["getNotification"]> = async (ctx) => {
  const { id } = ctx.req.valid("param");

  const notification = await prisma.notification.findUnique({
    where: { id, deletedAt: null },
  });

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  return ctx.json({ data: notification, message: "Notification fetched successfully" });
};

// Update a notification
const updateNotification: AppRouteHandler<NotificationRoutes["updateNotification"]> = async (ctx) => {
  const { id } = ctx.req.valid("param");
  const payload = ctx.req.valid("json");

  const notification = await prisma.notification.findUnique({
    where: { id, deletedAt: null },
  });

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  const updatedNotification = await prisma.notification.update({
    where: { id },
    data: payload,
  });

  return ctx.json({ message: "Notification updated successfully", data: updatedNotification });
};

// Delete a notification (soft delete)
const deleteNotification: AppRouteHandler<NotificationRoutes["deleteNotification"]> = async (ctx) => {
  const { id } = ctx.req.valid("param");

  const notification = await prisma.notification.findUnique({
    where: { id, deletedAt: null },
  });

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  await prisma.notification.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return ctx.json({ message: "Notification deleted successfully" });
};

// Mark a single notification as read
const markNotificationAsRead: AppRouteHandler<NotificationRoutes["markNotificationAsRead"]> = async (ctx) => {
  const { id } = ctx.req.valid("param");

  const notification = await prisma.notification.findUnique({
    where: { id, deletedAt: null },
  });

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  const updatedNotification = await prisma.notification.update({
    where: { id },
    data: { read: true },
  });

  return ctx.json({ message: "Notification marked as read", data: updatedNotification });
};

// Mark all notifications as read
const markAllNotificationsAsRead: AppRouteHandler<NotificationRoutes["markAllNotificationsAsRead"]> = async (ctx) => {
  const { userId } = ctx.req.valid("json");

  await prisma.notification.updateMany({
    where: {
      deletedAt: null,
      read: false,
      userId: userId || undefined,
    },
    data: { read: true },
  });

  return ctx.json({ message: "All notifications marked as read" });
};

export {
  createNotification,
  deleteNotification,
  getNotification,
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  updateNotification
};

