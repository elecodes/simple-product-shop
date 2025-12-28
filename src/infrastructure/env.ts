import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url().optional(),
  VITE_SENTRY_DSN: z.string().optional(),
  VITE_ENV: z.enum(['development', 'production']).default('development'),
})

export const env = envSchema.parse(import.meta.env)