import { z } from "zod";

const CreateGroupSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().min(2).max(255).optional(),
});

const UpdateGroupSchema = z.object({
  name: z.string().min(2).max(255).optional(),
  description: z.string().min(2).max(255).optional(),
});

const GetGroupSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(2).max(255),
  description: z.string().min(2).max(255).optional(),
});

export { CreateGroupSchema, GetGroupSchema, UpdateGroupSchema };
