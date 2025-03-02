import { EmailSource } from "@prisma/client";
import { z } from "zod";

const EmailSendSchema = z.object({
  sender: z.string().email().optional(),
  recipient: z.string().email(),
  subject: z.string(),
  body: z.string(),
  source: z.nativeEnum(EmailSource),
});

export { EmailSendSchema };
