import { z } from 'zod'

export const HashSchema = z.object({
  hash: z.string().length(64)
})
export type HashSchema = z.infer<typeof HashSchema>
