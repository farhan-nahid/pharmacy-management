import { createRoute, z } from "@hono/zod-openapi";

import { authMiddleware } from "@/middlewares/auth";

import {
  CreateNotificationSchema,
  DeleteNotificationSchema,
  GetNotificationByIdSchema,
  GetNotificationSchema,
  GetNotificationsSchema,
  MarkAllNotificationsAsReadSchema,
  MarkNotificationAsReadSchema,
  UpdateNotificationSchema,
} from "./notification.schema";

const tags = ["Notification"];

export const createNotification = createRoute({
  tags,
  summary: "Create a notification",
  description: "Create a new notification.",
  method: "post",
  path: "/notification",
  middleware: [authMiddleware()] as const,
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateNotificationSchema,
          example: {
            title: "Order Confirmation",
            message: "Your order #1234 has been confirmed.",
            userId: "cuid123456789",
            category: "ORDER",
            priority: "HIGH",
          },
        },
      },
      description: "Notification details",
    },
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    201: {
      description: "Notification created successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: GetNotificationSchema,
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const getNotifications = createRoute({
  tags,
  summary: "Get all notifications",
  description: "Get all notifications with optional filters.",
  method: "get",
  path: "/notification",
  middleware: [authMiddleware()] as const,
  request: {
    query: GetNotificationsSchema,
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Notifications fetched successfully",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(GetNotificationSchema),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const getNotification = createRoute({
  tags,
  summary: "Get a notification",
  description: "Get a notification by ID.",
  method: "get",
  path: "/notification/{id}",
  middleware: [authMiddleware()] as const,
  request: {
    params: GetNotificationByIdSchema,
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Notification fetched successfully",
      content: {
        "application/json": {
          schema: z.object({
            data: GetNotificationSchema,
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: "Notification not found",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const updateNotification = createRoute({
  tags,
  summary: "Update a notification",
  description: "Update a notification by ID.",
  method: "patch",
  path: "/notification/{id}",
  middleware: [authMiddleware()] as const,
  request: {
    params: GetNotificationByIdSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateNotificationSchema,
          example: {
            title: "Updated Order Confirmation",
            message: "Your order #1234 has been updated.",
            category: "ORDER",
            priority: "MEDIUM",
          },
        },
      },
      description: "Notification details to update",
    },
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Notification updated successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: GetNotificationSchema,
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: "Notification not found",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const deleteNotification = createRoute({
  tags,
  summary: "Delete a notification",
  description: "Delete a notification by ID (soft delete).",
  method: "delete",
  path: "/notification/{id}",
  middleware: [authMiddleware()] as const,
  request: {
    params: DeleteNotificationSchema,
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Notification deleted successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: "Notification not found",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const markNotificationAsRead = createRoute({
  tags,
  summary: "Mark a notification as read",
  description: "Mark a single notification as read by ID.",
  method: "patch",
  path: "/notification/{id}/read",
  middleware: [authMiddleware()] as const,
  request: {
    params: MarkNotificationAsReadSchema,
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Notification marked as read",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: GetNotificationSchema,
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: "Notification not found",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const markAllNotificationsAsRead = createRoute({
  tags,
  summary: "Mark all notifications as read",
  description: "Mark all notifications as read, optionally for a specific user.",
  method: "patch",
  path: "/notification/read",
  middleware: [authMiddleware()] as const,
  request: {
    body: {
      content: {
        "application/json": {
          schema: MarkAllNotificationsAsReadSchema,
          example: {
            userId: "cuid123456789",
          },
        },
      },
      description: "Optional user ID to mark notifications for a specific user",
    },
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "All notifications marked as read",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export interface NotificationRoutes {
  createNotification: typeof createNotification;
  getNotifications: typeof getNotifications;
  getNotification: typeof getNotification;
  updateNotification: typeof updateNotification;
  deleteNotification: typeof deleteNotification;
  markNotificationAsRead: typeof markNotificationAsRead;
  markAllNotificationsAsRead: typeof markAllNotificationsAsRead;
}
