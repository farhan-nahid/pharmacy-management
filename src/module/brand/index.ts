import { createRouter } from "@/lib/create-app";

import * as routes from "./brand.routes";
import * as services from "./brand.services";

const router = createRouter()
  .openapi(routes.createBrand, services.createBrand)
  .openapi(routes.getBrands, services.getBrands)
  .openapi(routes.getBrand, services.getBrand)
  .openapi(routes.updateBrand, services.updateBrand)
  .openapi(routes.deleteBrand, services.deleteBrand);

export default router;
