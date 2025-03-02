import type { AppRouteHandler } from "@/lib/types";

import transporter from "@/configs/nodemailer";
import env from "@/env";
import { ApiError } from "@/lib/api-error";
import prisma from "@/lib/prisma";

import type { EmailSendRoute } from "./email.routes";

export const sendEmail: AppRouteHandler<EmailSendRoute> = async (ctx) => {
  const payload = ctx.req.valid("json");
  const { recipient, subject, body, source, sender } = payload;

  const from = sender || env.SMTP_FROM;

  const emailOption = { from, to: recipient, subject, text: body };

  // Send email
  const { rejected } = await transporter.sendMail(emailOption);

  if (rejected?.length > 0) {
    throw new ApiError(400, "Email not sent");
  }

  await prisma.email.create({
    data: { source, sender: from, recipient, subject, body },
  });

  return ctx.json({ message: "Email sent successfully" });
};
