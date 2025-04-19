import { createRouter } from "@/lib/create-app";

import * as routes from "./product.routes";
import * as services from "./services";

const router = createRouter()
  .openapi(routes.createProduct, services.createProduct)
  .openapi(routes.createProductBulk, services.createProductBulk)
  .openapi(routes.getProducts, services.getProducts)
  .openapi(routes.getSingleProduct, services.getSingleProduct)
  .openapi(routes.updateProduct, services.updateProduct)
  .openapi(routes.updateProductBulk, services.updateProductBulk)
  .openapi(routes.deleteProduct, services.deleteProduct)
  .openapi(routes.deleteProductBulk, services.deleteProductBulk);

export default router;
