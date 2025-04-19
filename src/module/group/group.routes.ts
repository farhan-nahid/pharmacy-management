import { createRoute, z } from "@hono/zod-openapi";

import { authMiddleware } from "@/middlewares/auth";

import { CreateGroupSchema, GetGroupSchema, UpdateGroupSchema } from "./group.schema";

const tags = ["Group"];

export const createGroup = createRoute({
  tags,
  summary: "Create a Group",
  description: "Create a new Group.",
  method: "post",
  path: "/group",
  middleware: [authMiddleware()] as const,
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateGroupSchema,
          example: {
            name: "Example Group",
            description: "This is an example Group.",
          },
        },
      },
      description: "Group details",
    },
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    201: {
      description: "Group created successfully",
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

export const getGroups = createRoute({
  tags,
  summary: "Get all Groups",
  description: "Get all Groups.",
  method: "get",
  path: "/group",
  middleware: [authMiddleware()] as const,
  request: {
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Groups fetched successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.array(GetGroupSchema),
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

export const getGroup = createRoute({
  tags,
  summary: "Get a Group",
  description: "Get a Group by ID.",
  method: "get",
  path: "/group/{id}",
  middleware: [authMiddleware()] as const,
  request: {
    params: z.object({
      id: z.string().cuid().describe("Group ID"),
    }),
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Group fetched successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: GetGroupSchema,
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
      description: "Group not found",
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

export const updateGroup = createRoute({
  tags,
  summary: "Update a Group",
  description: "Update a Group by ID.",
  method: "patch",
  path: "/group/{id}",
  middleware: [authMiddleware()] as const,
  request: {
    params: z.object({
      id: z.string().cuid().describe("Group ID"),
    }),
    body: {
      content: {
        "application/json": {
          schema: UpdateGroupSchema,
          example: {
            name: "Example Group",
            description: "This is an example Group.",
          },
        },
      },
      description: "Group details",
    },
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Group updated successfully",
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
      description: "Group not found",
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

export const deleteGroup = createRoute({
  tags,
  summary: "Delete a Group",
  description: "Delete a Group by ID.",
  method: "delete",
  path: "/group/{id}",
  middleware: [authMiddleware()] as const,
  request: {
    params: z.object({
      id: z.string().cuid().describe("Group ID"),
    }),
    headers: z.object({
      Authorization: z.string().describe("Bearer token"),
    }),
  },
  responses: {
    200: {
      description: "Group deleted successfully",
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
      description: "Group not found",
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

export interface GroupRoutes {
  createGroup: typeof createGroup;
  getGroups: typeof getGroups;
  getGroup: typeof getGroup;
  updateGroup: typeof updateGroup;
  deleteGroup: typeof deleteGroup;
}
