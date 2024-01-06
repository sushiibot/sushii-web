import { z } from "zod";
import * as dotenv from "dotenv";
dotenv.config();

const schema = z.object({
  LOG_LEVEL: z.string().optional().default("info"),

  DATABASE_URL: z.string(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsed.error.format(), null, 4)
  );

  process.exit(1);
}

export type ConfigType = z.infer<typeof schema>;

export default parsed.data;
