import { Buffer } from "node:buffer";

import type { AppRouteHandler } from "@/lib/types";

import cloudinary from "@/configs/cloudinary";
import { ApiError } from "@/lib/api-error";

import type { UploadRoutes } from "./upload.routes";

const createUpload: AppRouteHandler<UploadRoutes["createUpload"]> = async (ctx) => {
  const formData = await ctx.req.formData();
  const file = formData.get("file") as File | null;
  const path = formData.get("path") as string | null;
  const folder = path ? `pharmacy/${path}` : "pharmacy";

  if (!file) {
    throw new ApiError(400, "No file uploaded");
  }

  const arrayBuffer = await file.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  // Cloudinary does not accept raw Buffer directly – upload via "data URI"
  const base64 = buffer.toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  const { url, secure_url } = await cloudinary.uploader.upload(dataUri, { folder });

  return ctx.json({ message: "Upload file successfully", data: { url, secure_url } }, 201);
};

export { createUpload };
