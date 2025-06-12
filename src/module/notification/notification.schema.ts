import { NotificationCategory, NotificationPriority } from "@prisma/client";
import { z } from "zod";

const NotificationCategorySchema = z.nativeEnum(NotificationCategory);
const NotificationPrioritySchema = z.nativeEnum(NotificationPriority);

// Base schema for notification output
const GetNotificationSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  userId: z.string().cuid().nullable(),
  read: z.boolean().default(false),
  category: NotificationCategorySchema,
  priority: NotificationPrioritySchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

// Input schemas for API operations
const CreateNotificationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  userId: z.string().cuid().optional(),
  category: NotificationCategorySchema,
  priority: NotificationPrioritySchema,
});

const UpdateNotificationSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, "Title is required").optional(),
  message: z.string().min(1, "Message is required").optional(),
  category: NotificationCategorySchema.optional(),
  priority: NotificationPrioritySchema.optional(),
});

const GetNotificationsSchema = z.object({
  userId: z.string().cuid().optional(),
  category: NotificationCategorySchema.optional(),
  priority: NotificationPrioritySchema.optional(),
  read: z.boolean().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

const GetNotificationByIdSchema = z.object({
  id: z.string().cuid(),
});

const MarkNotificationAsReadSchema = z.object({
  id: z.string().cuid(),
});

const DeleteNotificationSchema = z.object({
  id: z.string().cuid(),
});

const MarkAllNotificationsAsReadSchema = z.object({
  userId: z.string().cuid().optional(),
});

// Output schema for paginated results
const GetNotificationsOutputSchema = z.object({
  notifications: z.array(GetNotificationSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
});

// Export all schemas
export {
  CreateNotificationSchema,
  DeleteNotificationSchema,
  GetNotificationByIdSchema,
  GetNotificationSchema,
  GetNotificationsOutputSchema,
  GetNotificationsSchema,
  MarkAllNotificationsAsReadSchema,
  MarkNotificationAsReadSchema,
  UpdateNotificationSchema
};

