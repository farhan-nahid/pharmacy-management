import { createRoute, z } from "@hono/zod-openapi";

import { authMiddleware } from "@/middlewares/auth";

import { CreateBrandSchema, GetBrandSchema, UpdateBrandSchema } from "./brand.schema";

const tags = ["Brand"];

export const createBrand = createRoute({
  tags,
  summary: "Create a brand",
  description: "Create a new brand.",
  method: "post",
  path: "/brand",
  middleware: [authMiddleware],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateBrandSchema,
          example: {
            name: "Example Brand",
            code: "example_brand",
            logo: "https://example.com/logo.png",
            description: "This is an example brand.",
          },
        },
      },
      description: "Brand details",
    },
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    201: {
      description: "Brand created successfully",
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

export const getBrands = createRoute({
  tags,
  summary: "Get all brands",
  description: "Get all brands.",
  method: "get",
  path: "/brand",
  middleware: [authMiddleware],
  request: {
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Brands fetched successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.array(GetBrandSchema),
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

export const getBrand = createRoute({
  tags,
  summary: "Get a brand",
  description: "Get a brand by ID.",
  method: "get",
  path: "/brand/{id}",
  middleware: [authMiddleware],
  request: {
    params: z.object({
      id: z.string().cuid().describe("Brand ID"),
    }),
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Brand fetched successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: GetBrandSchema,
          }),
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
    404: {
      description: "Brand not found",
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

export const updateBrand = createRoute({
  tags,
  summary: "Update a brand",
  description: "Update a brand by ID.",
  method: "patch",
  path: "/brand/{id}",
  middleware: [authMiddleware],
  request: {
    params: z.object({
      id: z.string().cuid().describe("Brand ID"),
    }),
    body: {
      content: {
        "application/json": {
          schema: UpdateBrandSchema,
          example: {
            name: "Example Brand",
            code: "example_brand",
            logo: "https://example.com/logo.png",
            description: "This is an example brand.",
          },
        },
      },
      description: "Brand details",
    },
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Brand updated successfully",
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
    404: {
      description: "Brand not found",
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

export const deleteBrand = createRoute({
  tags,
  summary: "Delete a brand",
  description: "Delete a brand by ID.",
  method: "delete",
  path: "/brand/{id}",
  middleware: [authMiddleware],
  request: {
    params: z.object({
      id: z.string().cuid().describe("Brand ID"),
    }),
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Brand deleted successfully",
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
    404: {
      description: "Brand not found",
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

export interface BrandRoutes {
  createBrand: typeof createBrand;
  getBrands: typeof getBrands;
  getBrand: typeof getBrand;
  updateBrand: typeof updateBrand;
  deleteBrand: typeof deleteBrand;
}
