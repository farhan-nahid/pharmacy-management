import { createRouter } from "@/lib/create-app";

import * as routes from "./category.routes";
import * as services from "./category.services";

const router = createRouter()
  .openapi(routes.createCategory, services.createCategory)
  .openapi(routes.getCategories, services.getCategories)
  .openapi(routes.getCategory, services.getCategory)
  .openapi(routes.updateCategory, services.updateCategory)
  .openapi(routes.deleteCategory, services.deleteCategory);

export default router;
