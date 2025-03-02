import { createRoute } from "@hono/zod-openapi";

import { EmailSendSchema } from "./email.schema";

export const sendEmail = createRoute({
  tags: ["Email"],
  summary: "Send an email",
  description: "Send an email to a recipient.",
  method: "post",
  path: "/email/send",
  request: {
    body: {
      content: {
        "application/json": {
          schema: EmailSendSchema,
          example: {
            recipient: "example@example.com",
            subject: "Test Email",
            body: "This is a test email.",
            source: "USER_VERIFICATION",
          },
        },
      },
      description: "Email details",
    },
  },
  responses: {
    200: {
      description: "Email sent successfully",
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

export type EmailSendRoute = typeof sendEmail;
