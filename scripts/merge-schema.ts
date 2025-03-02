import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prismaDir = path.join(__dirname, "../prisma");
const baseSchemaPath = path.join(prismaDir, "base.prisma");
const modelsDir = path.join(prismaDir, "models");
const outputSchemaPath = path.join(prismaDir, "schema.prisma");

function mergeSchemas() {
  try {
    const baseSchema = fs.readFileSync(baseSchemaPath, "utf8");
    const modelFiles = fs.readdirSync(modelsDir)
      .filter(file => file.endsWith(".prisma"))
      .map(file => fs.readFileSync(path.join(modelsDir, file), "utf8"));

    const finalSchema = [baseSchema, ...modelFiles].join("\n");

    fs.writeFileSync(outputSchemaPath, finalSchema);
    console.log("✅ Prisma schema merged successfully!");
  }
  catch (error) {
    console.error("❌ Error merging Prisma schema:", error);
    process.exit(1);
  }
}

// Run the merge function
mergeSchemas();
