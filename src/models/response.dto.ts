import { z } from 'zod'

export const ResponseSchema = z.object({
  author: z.string().nonempty(),
  opus_no: z.coerce.number().int(),
  published_at: z.string(),
  published_by: z.string().nonempty(),
  title: z.string().nonempty()
})
export type ResponseSchema = z.infer<typeof ResponseSchema>
