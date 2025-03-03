import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().min(2).max(255).optional(),
});

const updateCategorySchema = z.object({
  name: z.string().min(2).max(255).optional(),
  description: z.string().min(2).max(255).optional(),
});

const getCategorySchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(2).max(255),
  description: z.string().min(2).max(255),
});

export { createCategorySchema, getCategorySchema, updateCategorySchema };
