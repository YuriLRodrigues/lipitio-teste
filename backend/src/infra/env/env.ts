import { z } from 'zod';

export const envSchema = z.object({
  SERVICE: z.string(),
  VERSION: z.string().default('1.0.0'),
  PORT: z.string().default('3333'),
  DATABASE_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;
