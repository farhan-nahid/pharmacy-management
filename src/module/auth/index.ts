// import { authMiddleware } from "@/middlewares/auth";

import { createRouter } from "@/lib/create-app";

import * as routes from "./auth.routes";
import * as services from "./services";

const router = createRouter()
  .openapi(routes.adminRegistration, services.adminRegistration)
  .openapi(routes.pharmacistRegistration, services.pharmacistRegistration)
  .openapi(routes.patientRegistration, services.patientRegistration)
  .openapi(routes.login, services.login)
  .openapi(routes.verifyEmail, services.verifyEmail)
  .openapi(routes.verifyToken, services.verifyToken)
  .openapi(routes.getProfile, services.getProfile)
  .openapi(routes.getUsers, services.getUsers)
  .openapi(routes.resendVerificationCode, services.resendVerificationCode)
  .openapi(routes.resetPasswordRequest, services.resetPasswordRequest)
  .openapi(routes.resetPassword, services.resetPassword)
  .openapi(routes.changePassword, services.changePassword)
  .openapi(routes.updateProfile, services.updateProfile)
  .openapi(routes.userUpdate, services.userUpdate)
  .openapi(routes.deleteAccount, services.deleteAccount)
  .openapi(routes.deleteUser, services.deleteUser);

export default router;
