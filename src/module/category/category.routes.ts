import { createRoute, z } from "@hono/zod-openapi";

import { authMiddleware } from "@/middlewares/auth";

import { createCategorySchema, getCategorySchema } from "./category.schema";

const tags = ["Category"];

export const createCategory = createRoute({
  tags,
  summary: "Create a category",
  description: "Create a new category.",
  method: "post",
  path: "/category",
  middleware: [authMiddleware()] as const,
  request: {
    body: {
      content: {
        "application/json": {
          schema: createCategorySchema,
          example: {
            name: "Example Category",
            description: "This is an example category.",
          },
        },
      },
      description: "Category details",
    },
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    201: {
      description: "Category created successfully",
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
    400: {
      description: "Bad request",
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
    500: {
      description: "Internal server error",
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
});

export const getCategories = createRoute({
  tags,
  summary: "Get all categories",
  description: "Get all categories.",
  method: "get",
  path: "/category",
  middleware: [authMiddleware()] as const,
  request: {
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Categories fetched successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.array(getCategorySchema),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
});

export const getCategory = createRoute({
  tags,
  summary: "Get a category",
  description: "Get a category by ID.",
  method: "get",
  path: "/category/:id",
  middleware: [authMiddleware()] as const,
  request: {
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
    params: z.object({
      id: z.string().cuid(),
    }),
  },
  responses: {
    200: {
      description: "Category fetched successfully",
      content: {
        "application/json": {
          schema: getCategorySchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
});

export const updateCategory = createRoute({
  tags,
  summary: "Update a category",
  description: "Update a category by ID.",
  method: "patch",
  path: "/category/:id",
  middleware: [authMiddleware()] as const,
  request: {
    body: {
      content: {
        "application/json": {
          schema: createCategorySchema,
          example: {
            name: "Updated Category",
            description: "This is an updated category description.",
          },
        },
      },
      description: "Category details",
    },
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
    params: z.object({
      id: z.string().cuid(),
    }),
  },
  responses: {
    200: {
      description: "Category updated successfully",
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
    404: {
      description: "Category not found",
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
    500: {
      description: "Internal server error",
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
});

export const deleteCategory = createRoute({
  tags,
  summary: "Delete a category",
  description: "Delete a category by ID.",
  method: "delete",
  path: "/category/{id}",
  middleware: [authMiddleware()] as const,
  request: {
    params: z.object({
      id: z.string().cuid().describe("Category ID"),
    }),
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Category deleted successfully",
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
    404: {
      description: "Category not found",
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
    500: {
      description: "Internal server error",
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
});

export interface CategoryRoutes {
  createCategory: typeof createCategory;
  getCategories: typeof getCategories;
  getCategory: typeof getCategory;
  updateCategory: typeof updateCategory;
  deleteCategory: typeof deleteCategory;
}
