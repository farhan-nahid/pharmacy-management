import { createRouter } from "@/lib/create-app";

import * as routes from "./notification.routes";
import * as services from "./notification.services";

const router = createRouter()
  .openapi(routes.createNotification, services.createNotification)
  .openapi(routes.getNotifications, services.getNotifications)
  .openapi(routes.getNotification, services.getNotification)
  .openapi(routes.updateNotification, services.updateNotification)
  .openapi(routes.deleteNotification, services.deleteNotification)
  .openapi(routes.markNotificationAsRead, services.markNotificationAsRead)
  .openapi(routes.markAllNotificationsAsRead, services.markAllNotificationsAsRead);

export default router;
