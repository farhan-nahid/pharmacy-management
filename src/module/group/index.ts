import { createRouter } from "@/lib/create-app";

import * as routes from "./group.routes";
import * as services from "./group.services";

const router = createRouter()
  .openapi(routes.createGroup, services.createGroup)
  .openapi(routes.getGroups, services.getGroups)
  .openapi(routes.getGroup, services.getGroup)
  .openapi(routes.updateGroup, services.updateGroup)
  .openapi(routes.deleteGroup, services.deleteGroup);

export default router;
