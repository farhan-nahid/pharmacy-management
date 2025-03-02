import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

import { httpStatusCodes } from "@/constants";
import { createRouter } from "@/lib/create-app";

const HealthResponseSchema = z.object({
  message: z.string(),
});

const router = createRouter();

router.openapi(
  createRoute({
    tags: ["Health"],
    method: "get",
    path: "/health",
    summary: "Health check",
    description: "Check if the server is running",
    responses: {
      [httpStatusCodes.OK]: {
        description: "Server is running",
        content: {
          "application/json": {
            schema: HealthResponseSchema,
          },
        },
      },
    },
  }),
  ctx => ctx.json({ message: "Health API server is operational" }, httpStatusCodes.OK),
);

export default router;
