import { z } from "zod";

// Define the allowed image formats for validation
const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Zod schema for validating the file upload
const FileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(file => allowedFileTypes.includes(file.type), {
      message: "Invalid file type. Only PNG, JPG, and JPEG files are allowed.",
    })
    .refine(file => file.size <= MAX_FILE_SIZE, {
      message: "File size exceeds the 5MB limit.",
    }),
  path: z.string().optional(),
});

export { FileUploadSchema };
