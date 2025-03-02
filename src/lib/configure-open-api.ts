import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types";

import PackageJSON from "../../package.json";

export function configureOpenApi(app: AppOpenAPI) {
  app.doc("/docs", {
    openapi: "3.0.0",
    info: {
      version: PackageJSON.version,
      title: "Pharmacy Management API",
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "purple",
      layout: "classic",
      servers: [
        {
          url: "http://localhost:8080",
          description: "Development server",
        },
        {
          url: "http://localhost:8080",
          description: "Production server",
        },
      ],
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "axios",
      },
      spec: {
        url: "/docs",
      },
    }),
  );
}
