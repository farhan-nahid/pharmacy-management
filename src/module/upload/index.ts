import { createRouter } from "@/lib/create-app";

import * as routes from "./upload.routes";
import * as services from "./upload.services";

const router = createRouter()
  .openapi(routes.createUpload, services.createUpload);

export default router;
