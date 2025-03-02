import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode, StatusCode } from "hono/utils/http-status";

import { httpStatusCodes } from "@/constants";
import { ApiError } from "@/lib/api-error";

export const onError: ErrorHandler = (err, c) => {
  // eslint-disable-next-line node/no-process-env
  const env = c.env?.NODE_ENV || process.env?.NODE_ENV;

  if (err instanceof ApiError) {
    const statusCode = err.statusCode as StatusCode;
    return c.json({
      message: err.message,
      err: env === "production" ? undefined : err,
    }, statusCode as ContentfulStatusCode);
  }
  const currentStatus = "status" in err ? err.status : c.newResponse(null).status;
  const statusCode = currentStatus !== httpStatusCodes.OK
    ? (currentStatus as StatusCode)
    : httpStatusCodes.INTERNAL_SERVER_ERROR;

  return c.json(
    {
      message: err.message,
      err: env === "production" ? undefined : err,
    },
    statusCode as ContentfulStatusCode,
  );
};
