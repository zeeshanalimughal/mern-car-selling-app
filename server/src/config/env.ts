import "dotenv/config";
import * as z from "zod";

const configSchema = z
  .object({
    PORT: z.preprocess(Number, z.number()).default(3001).readonly(),
    NODE_ENV: z
      .enum(["development", "production"])
      .default("development")
      .readonly(),
    JWT_SECRET: z.string().default("secret"),
    JWT_EXPIRES_IN: z.string().default("1d"),
    ALLOWED_ORIGIN: z.string().default("*"),
    MONGO_URI: z.string().default("mongodb://localhost:27017/cap-app"),
  })
  .readonly();

export type TConfig = z.infer<typeof configSchema>;

export const config = configSchema.parse(process.env);
