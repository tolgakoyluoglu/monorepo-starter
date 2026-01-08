import { z } from 'zod'

export const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  image: z.string().url().optional(),
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>
