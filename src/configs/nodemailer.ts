import nodemailer from "nodemailer";

import env from "@/env";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number.parseInt(env.SMTP_PORT!),
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
  debug: true,
  logger: true,
});

export default transporter;
