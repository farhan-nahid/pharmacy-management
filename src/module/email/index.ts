import { createRouter } from "@/lib/create-app";

import * as routes from "./email.routes";
import * as services from "./email.services";

const router = createRouter()
  .openapi(routes.sendEmail, services.sendEmail);

export default router;
