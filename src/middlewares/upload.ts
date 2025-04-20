// middleware/upload.ts
import { createMiddleware } from "hono/factory";

import multer from "multer";

// Configure multer
const storage = multer.diskStorage({
  destination: "/tmp", // Store files temporarily
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png") {
      return cb(new Error("Only PNG files are allowed"));
    }
    cb(null, true);
  },
}).single("file");

// Hono-compatible middleware
export default function upload() {
  return createMiddleware(async (c, next) => {
    await new Promise<void>((resolve, reject) => {
      uploadMiddleware(c.req.raw, c.res, (err) => {
        if (err)
          reject(err);
        else resolve();
      });
    });
    await next();
  });
}
