import { z } from "zod";

const CreateBrandSchema = z.object({
  name: z.string().min(2).max(255),
  code: z.string().min(2).max(10),
  logo: z.string().url().optional(),
  description: z.string().min(2).max(255).optional(),
});

const UpdateBrandSchema = z.object({
  name: z.string().min(2).max(255).optional(),
  code: z.string().min(2).max(255).optional(),
  logo: z.string().url().optional(),
  description: z.string().min(2).max(255).optional(),
});

const GetBrandSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(2).max(255),
  code: z.string().min(2).max(255),
  logo: z.string().url(),
  description: z.string().min(2).max(255),
});

export { CreateBrandSchema, GetBrandSchema, UpdateBrandSchema };
