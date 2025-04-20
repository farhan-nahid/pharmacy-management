import { createRoute, z } from "@hono/zod-openapi";

import { authMiddleware } from "@/middlewares/auth";
import upload from "@/middlewares/upload";

import { FileUploadSchema } from "./upload.schema";

const tags = ["Upload"];

export const createUpload = createRoute({
  tags,
  summary: "Create an Upload",
  description: "Create a new Upload.",
  method: "post",
  path: "/upload",
  middleware: [authMiddleware(), upload()] as const,
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: FileUploadSchema,
        },
      },
      description: "Upload an image file",
    },
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    201: {
      description: "Upload image successfully",
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
          data: { type: "object" },
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

// export const getUploads = createRoute({
//   tags,
//   summary: "Get all Uploads",
//   description: "Get all Uploads.",
//   method: "get",
//   path: "/Upload",
//   middleware: [authMiddleware()] as const,
//   request: {
//     headers: z.object({
//       Authorization: z.string().describe("Bearer token"),
//     }),
//   },
//   responses: {
//     200: {
//       description: "Uploads fetched successfully",
//       content: {
//         "application/json": {
//           schema: z.object({
//             message: z.string(),
//             data: z.array(GetUploadSchema),
//           }),
//         },
//       },
//     },
//     500: {
//       description: "Internal server error",
//       schema: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//         },
//       },
//     },
//   },
// });

// export const getUpload = createRoute({
//   tags,
//   summary: "Get a Upload",
//   description: "Get a Upload by ID.",
//   method: "get",
//   path: "/Upload/{id}",
//   middleware: [authMiddleware()] as const,
//   request: {
//     params: z.object({
//       id: z.string().cuid().describe("Upload ID"),
//     }),
//     headers: z.object({
//       Authorization: z.string().describe("Bearer token"),
//     }),
//   },
//   responses: {
//     200: {
//       description: "Upload fetched successfully",
//       content: {
//         "application/json": {
//           schema: z.object({
//             message: z.string(),
//             data: GetUploadSchema,
//           }),
//         },
//       },
//     },
//     400: {
//       description: "Bad request",
//       schema: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//         },
//       },
//     },
//     404: {
//       description: "Upload not found",
//       schema: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//         },
//       },
//     },
//     500: {
//       description: "Internal server error",
//       schema: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//         },
//       },
//     },
//   },
// });

// export const updateUpload = createRoute({
//   tags,
//   summary: "Update a Upload",
//   description: "Update a Upload by ID.",
//   method: "patch",
//   path: "/Upload/{id}",
//   middleware: [authMiddleware()] as const,
//   request: {
//     params: z.object({
//       id: z.string().cuid().describe("Upload ID"),
//     }),
//     body: {
//       content: {
//         "application/json": {
//           schema: UpdateUploadSchema,
//           example: {
//             name: "Example Upload",
//             description: "This is an example Upload.",
//           },
//         },
//       },
//       description: "Upload details",
//     },
//     headers: z.object({
//       Authorization: z.string().describe("Bearer token"),
//     }),
//   },
//   responses: {
//     200: {
//       description: "Upload updated successfully",
//       schema: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//         },
//       },
//     },
//     400: {
//       description: "Bad request",
//       schema: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//         },
//       },
//     },
//     404: {
//       description: "Upload not found",
//       schema: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//         },
//       },
//     },
//     500: {
//       description: "Internal server error",
//       schema: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//         },
//       },
//     },
//   },
// });

// export const deleteUpload = createRoute({
//   tags,
//   summary: "Delete a Upload",
//   description: "Delete a Upload by ID.",
//   method: "delete",
//   path: "/Upload/{id}",
//   middleware: [authMiddleware()] as const,
//   request: {
//     params: z.object({
//       id: z.string().cuid().describe("Upload ID"),
//     }),
//     headers: z.object({
//       Authorization: z.string().describe("Bearer token"),
//     }),
//   },
//   responses: {
//     200: {
//       description: "Upload deleted successfully",
//       schema: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//         },
//       },
//     },
//     400: {
//       description: "Bad request",
//       schema: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//         },
//       },
//     },
//     404: {
//       description: "Upload not found",
//       schema: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//         },
//       },
//     },
//     500: {
//       description: "Internal server error",
//       schema: {
//         type: "object",
//         properties: {
//           message: { type: "string" },
//         },
//       },
//     },
//   },
// });

export interface UploadRoutes {
  createUpload: typeof createUpload;
  // getUploads: typeof getUploads;
  // getUpload: typeof getUpload;
  // updateUpload: typeof updateUpload;
  // deleteUpload: typeof deleteUpload;
}
