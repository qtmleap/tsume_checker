import { z } from 'zod'

export const InputSchema = z.object({
  content: z.string({ required_error: '棋譜を入力してください' }).nonempty({
    message: '棋譜を入力してください'
  })
})
export type InputSchema = z.infer<typeof InputSchema>

export const InputSchemaDefaultValue = {
  content: undefined
}
