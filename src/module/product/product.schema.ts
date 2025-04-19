import { z } from "zod";

const GetProductSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  sku: z.string().min(1),
  barcode: z.string().min(1),
  quantity: z.number().int().default(0),
  buyPrice: z.number().nullable().optional(),
  sellPrice: z.number().nullable().optional(),
  brandId: z.string().cuid().nullable().optional(),
  categoryId: z.string().cuid().nullable().optional(),
  expiryDate: z.date().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable().optional(),
});

const CreateProductSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  barcode: z.string().min(1),
  quantity: z.number().int().default(0),
  buyPrice: z.number().nullable().optional(),
  sellPrice: z.number().nullable().optional(),
  brandId: z.string().cuid().nullable().optional(),
  categoryId: z.string().cuid().nullable().optional(),
  expiryDate: z.date().nullable().optional(),
});

const CreateCreateProductBulkSchema = z.object({
  data: z.array(CreateProductSchema),
});

const UpdateProductSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
  barcode: z.string().min(1).optional(),
  quantity: z.number().int().default(0).optional(),
  buyPrice: z.number().nullable().optional(),
  sellPrice: z.number().nullable().optional(),
  brandId: z.string().cuid().nullable().optional(),
  categoryId: z.string().cuid().nullable().optional(),
  expiryDate: z.date().nullable().optional(),
});

const UpdateProductBulkSchema = z.object({
  data: z.array(UpdateProductSchema),
});

const DeleteProductBulkSchema = z.object({
  data: z.array(z.string().cuid()),
});

export { CreateCreateProductBulkSchema, CreateProductSchema, DeleteProductBulkSchema, GetProductSchema, UpdateProductBulkSchema, UpdateProductSchema };
