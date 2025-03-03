import { createRoute, z } from "@hono/zod-openapi";
import { Role } from "@prisma/client";

import { adminMiddleware, authMiddleware } from "@/middlewares/auth";

import { AdminRegisterSchema, changePasswordSchema, EmailVerificationSchema, resetPasswordRequestSchema, resetPasswordSchema, UpdateProfileSchema, UserLoginSchema, UserProfileSchema } from "./auth.schema";

const tags = ["Auth"];

export const login = createRoute({
  tags,
  summary: "Login to the application",
  description: "Authenticate a user and generate a JWT token.",
  method: "post",
  path: "/auth/login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserLoginSchema,
          example: {
            email: "john.doe@example.com",
            password: "yourPassword",
          },
        },
      },
      description: "User credentials for login",
    },
  },
  responses: {
    200: {
      description: "Successful login",
      schema: {
        type: "object",
        properties: {
          token: { type: "string" },
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

export const adminRegistration = createRoute({
  tags,
  summary: "Register an admin user",
  description: "Register a new admin user.",
  method: "post",
  path: "/auth/admin-registration",
  request: {
    body: {
      content: {
        "application/json": {
          schema: AdminRegisterSchema,
          example: {
            email: "john.doe@example.com",
            password: "yourPassword",
            firstName: "John",
            lastName: "Doe",
            phone: "1234567890",
          },
        },
      },
      description: "User credentials for registration",
    },
  },
  responses: {
    201: {
      description: "Successful registration",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            // data: UserProfileSchema,
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const pharmacistRegistration = createRoute({
  tags,
  summary: "Register a pharmacist user",
  description: "Register a new pharmacist user.",
  method: "post",
  path: "/auth/pharmacist-registration",
  middleware: [authMiddleware, adminMiddleware],
  request: {
    body: {
      content: {
        "application/json": {
          schema: AdminRegisterSchema,
          example: {
            email: "john.doe@example.com",
            password: "yourPassword",
            firstName: "John",
            lastName: "Doe",
            phone: "1234567890",
          },
        },
      },
      description: "User credentials for registration",
    },
  },
  responses: {
    201: {
      description: "Successful registration",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            // data: UserProfileSchema,
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const patientRegistration = createRoute({
  tags,
  summary: "Register a patient user",
  description: "Register a new patient user.",
  method: "post",
  path: "/auth/patient-registration",
  middleware: [authMiddleware, adminMiddleware],
  request: {
    body: {
      content: {
        "application/json": {
          schema: AdminRegisterSchema,
          example: {
            email: "john.doe@example.com",
            password: "yourPassword",
            firstName: "John",
            lastName: "Doe",
            phone: "1234567890",
          },
        },
      },
      description: "User credentials for registration",
    },
  },
  responses: {
    201: {
      description: "Successful registration",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            // data: UserProfileSchema,
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const updateProfile = createRoute({
  tags,
  summary: "Update user details",
  description: "Update the details of a user.",
  method: "patch",
  path: "/auth/profile",
  middleware: [authMiddleware],
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdateProfileSchema,
          example: {
            email: "john.doe@example.com",
            firstName: "John",
            lastName: "Doe",
            phone: "1234567890",
          },
        },
      },
      description: "User details to update",
    },
  },
  responses: {
    200: {
      description: "Successful update",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            // data: UserProfileSchema,
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const getProfile = createRoute({
  tags,
  summary: "Get user details",
  description: "Get the details of a user.",
  method: "get",
  path: "/auth/profile",
  middleware: [authMiddleware],
  responses: {
    200: {
      description: "Successful retrieval",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: UserProfileSchema,
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const verifyEmail = createRoute({
  tags,
  summary: "Verify user email",
  description: "Verify the email of a user.",
  method: "post",
  path: "/auth/verify-email",
  request: {
    body: {
      content: {
        "application/json": {
          schema: EmailVerificationSchema,
          example: {
            code: "123456",
            email: "john.doe@example.com",
          },
        },
      },
      description: "Verification code and email",
    },
  },
  responses: {
    200: {
      description: "Successful verification",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const verifyToken = createRoute({
  tags,
  summary: "Verify user token",
  description: "Verify the token of a user.",
  method: "post",
  path: "/auth/verify-token",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            token: z.string(),
          }),
          example: {
            token: "yourToken",
          },
        },
      },
      description: "Token to verify",
    },
  },
  responses: {
    200: {
      description: "Successful verification",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              id: z.string(),
              firstName: z.string(),
              lastName: z.string(),
              email: z.string(),
              role: z.nativeEnum(Role),
            }),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const resetPasswordRequest = createRoute({
  tags,
  summary: "Request password reset",
  description: "Request a password reset.",
  method: "post",
  path: "/auth/reset-password-request",
  request: {
    body: {
      content: {
        "application/json": {
          schema: resetPasswordRequestSchema,
          example: {
            email: "john.doe@example.com",
          },
        },
      },
      description: "Email for password reset",
    },
  },

  responses: {
    200: {
      description: "Successful request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const resetPassword = createRoute({
  tags,
  summary: "Reset password",
  description: "Reset the password of a user.",
  method: "post",
  path: "/auth/reset-password",
  request: {
    body: {
      content: {
        "application/json": {
          schema: resetPasswordSchema,
          example: {
            code: "123456",
            email: "john.doe@example.com",
            password: "yourPassword",
            confirmPassword: "yourPassword",
          },
        },
      },
      description: "Password reset details",
    },
  },
  responses: {
    200: {
      description: "Successful reset",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const changePassword = createRoute({
  tags,
  summary: "Change password",
  description: "Change the password of a user.",
  method: "post",
  path: "/auth/change-password",
  middleware: [authMiddleware],
  request: {
    body: {
      content: {
        "application/json": {
          schema: changePasswordSchema,
          example: {
            password: "yourPassword",
            confirmPassword: "yourPassword",
          },
        },
      },
      description: "New password details",
    },
  },
  responses: {
    200: {
      description: "Successful change",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export interface AuthRoutes {
  login: typeof login;
  adminRegistration: typeof adminRegistration;
  pharmacistRegistration: typeof pharmacistRegistration;
  patientRegistration: typeof patientRegistration;
  updateProfile: typeof updateProfile;
  getProfile: typeof getProfile;
  verifyEmail: typeof verifyEmail;
  verifyToken: typeof verifyToken;
  resetPasswordRequest: typeof resetPasswordRequest;
  resetPassword: typeof resetPassword;
  changePassword: typeof changePassword;
}
