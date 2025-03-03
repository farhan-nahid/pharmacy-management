import { createRoute, z } from "@hono/zod-openapi";

import { CreateCreateProductBulkSchema, CreateProductSchema, GetProductSchema, UpdateProductBulkSchema, UpdateProductSchema } from "./product.schema";

const tags = ["Product"];

export const createProduct = createRoute({
  tags,
  summary: "Create a product",
  description: "Create a new product.",
  method: "post",
  path: "/product",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateProductSchema,
          example: {
            name: "Product 1",
            sku: "SKU-1",
            barcode: "BARCODE-1",
            quantity: 10,
            buyPrice: 10.00,
            sellPrice: 12.00,
            brandId: "brand-id",
            categoryId: "category-id",
            expiryDate: "2022-12-31",
          },
        },
      },
      description: "Product details",
    },
  },
  responses: {
    200: {
      description: "Product created successfully",
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

export const createProductBulk = createRoute({
  tags,
  summary: "Create multiple products",
  description: "Create multiple products.",
  method: "post",
  path: "/product/bulk",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateCreateProductBulkSchema,
          example: {
            data: [
              {
                name: "Product 1",
                sku: "SKU-1",
                barcode: "BARCODE-1",
                quantity: 10,
                buyPrice: 10.00,
                sellPrice: 12.00,
                brandId: "brand-id",
                categoryId: "category-id",
                expiryDate: "2022-12-31",
              },
              {
                name: "Product 2",
                sku: "SKU-2",
                barcode: "BARCODE-2",
                quantity: 20,
                buyPrice: 20.00,
                sellPrice: 24.00,
                brandId: "brand-id",
                categoryId: "category-id",
                expiryDate: "2022-12-31",
              },
            ],
          },
        },
      },
      description: "Product details",
    },
  },
  responses: {
    200: {
      description: "Products created successfully",
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

export const deleteProduct = createRoute({
  tags,
  summary: "Delete a product",
  description: "Delete a product by ID.",
  method: "delete",
  path: "/product/{id}",
  request: {
    params: z.object({
      id: z.string().cuid(),
    }),
  },
  responses: {
    200: {
      description: "Product deleted successfully",
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

export const deleteProductBulk = createRoute({
  tags,
  summary: "Delete multiple products",
  description: "Delete multiple products by ID.",
  method: "delete",
  path: "/product/bulk",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(z.string().cuid()),
          }),
          example: {
            data: ["id-1", "id-2"],
          },
        },
      },
      description: "Product IDs",
    },
  },
  responses: {
    200: {
      description: "Products deleted successfully",
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

export const getProducts = createRoute({
  tags,
  summary: "Get all products",
  description: "Get all products.",
  method: "get",
  path: "/product",
  responses: {
    200: {
      description: "Products fetched successfully",
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
          data: z.array(GetProductSchema),
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

export const getSingleProduct = createRoute({
  tags,
  summary: "Get a product",
  description: "Get a product by ID.",
  method: "get",
  path: "/product/{id}",
  request: {
    params: z.object({
      id: z.string().cuid(),
    }),
  },
  responses: {
    200: {
      description: "Product fetched successfully",
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
          data: GetProductSchema,
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

export const updateProduct = createRoute({
  tags,
  summary: "Update a product",
  description: "Update a product by ID.",
  method: "patch",
  path: "/product/{id}",
  request: {
    params: z.object({
      id: z.string().cuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: UpdateProductSchema,
          example: {
            name: "Product 1",
            sku: "SKU-1",
            barcode: "BARCODE-1",
            quantity: 10,
            buyPrice: 10.00,
            sellPrice: 12.00,
            brandId: "brand-id",
            categoryId: "category-id",
            expiryDate: "2022-12-31",
          },
        },
      },
      description: "Product details",
    },
  },
  responses: {
    200: {
      description: "Product updated successfully",
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

export const updateProductBulk = createRoute({
  tags,
  summary: "Update multiple products",
  description: "Update multiple products.",
  method: "patch",
  path: "/product/bulk",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdateProductBulkSchema,
          example: {
            data: [
              {
                id: "id-1",
                name: "Product 1",
                sku: "SKU-1",
                barcode: "BARCODE-1",
                quantity: 10,
                buyPrice: 10.00,
                sellPrice: 12.00,
                brandId: "brand-id",
                categoryId: "category-id",
                expiryDate: "2022-12-31",
              },
              {
                id: "id-2",
                name: "Product 2",
                sku: "SKU-2",
                barcode: "BARCODE-2",
                quantity: 20,
                buyPrice: 20.00,
                sellPrice: 24.00,
                brandId: "brand-id",
                categoryId: "category-id",
                expiryDate: "2022-12-31",
              },
            ],
          },
        },
      },
      description: "Product details",
    },
  },
  responses: {
    200: {
      description: "Products updated successfully",
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

export interface ProductRoutes {
  createProduct: typeof createProduct;
  createProductBulk: typeof createProductBulk;
  deleteProduct: typeof deleteProduct;
  deleteProductBulk: typeof deleteProductBulk;
  getProducts: typeof getProducts;
  getSingleProduct: typeof getSingleProduct;
  updateProduct: typeof updateProduct;
  updateProductBulk: typeof updateProductBulk;
}
