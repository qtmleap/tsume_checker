import { z } from 'zod'

export const ResultSchema = z.object({
  author: z.string().nonempty(),
  opus_no: z.coerce.number().int(),
  published_at: z.string(),
  published_by: z.string().nonempty(),
  title: z.string().nonempty()
})
export type ResultSchema = z.infer<typeof ResultSchema>
