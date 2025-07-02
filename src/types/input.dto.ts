import { z } from 'zod'

export const InputStringTestSchema = z.object({
  string: z.string(),
  string_optional: z.string().optional(),
  string_nullable: z.string().nullable(),
  string_nullish: z.string().nullish(),
  string_nonempty: z.string().nonempty(),
  string_nonempty_optional: z.string().nonempty().optional(),
  string_nonempty_nullable: z.string().nonempty().nullable(),
  string_nonempty_nullish: z.string().nonempty().nullish()
})
export type InputStringTest = z.infer<typeof InputStringTestSchema>

export const InputNumberTestSchema = z.object({
  number: z.number(),
  number_optional: z.number().optional(),
  number_nullable: z.number().nullable(),
  number_nullish: z.number().nullish(),
  number_positive: z.number().positive(),
  number_negative: z.number().negative(),
  number_int: z.number().int(),
  number_finite: z.number().finite()
})
export type InputNumberTest = z.infer<typeof InputNumberTestSchema>

export const FrameworkEnum = z.enum(['react', 'vue', 'svelte', 'angular'])
export type FrameworkEnum = z.infer<typeof FrameworkEnum>

export const InputArrayTestSchema = z.object({
  array: z.array(FrameworkEnum, { required_error: 'Array must contain at least 1 element(s)' }).nonempty(),
  array_optional: z.array(FrameworkEnum).optional(),
  array_nullable: z.array(FrameworkEnum).nullable(),
  array_nullish: z.array(FrameworkEnum).nullish(),
  array_nonempty: z.array(FrameworkEnum).nonempty(),
  array_nonempty_optional: z.array(FrameworkEnum).nonempty().optional(),
  array_nonempty_nullable: z.array(FrameworkEnum).nonempty().nullable(),
  array_nonempty_nullish: z.array(FrameworkEnum).nonempty().nullish()
})
export type InputArrayTest = z.infer<typeof InputArrayTestSchema>

export const InputBooleanTestSchema = z.object({
  boolean: z.boolean(),
  boolean_optional: z.boolean().optional(),
  boolean_nullable: z.boolean().nullable(),
  boolean_nullish: z.boolean().nullish()
})
export type InputBooleanTest = z.infer<typeof InputBooleanTestSchema>

export const InputDatetimeTestSchema = z.object({
  datetime: z.date(),
  datetime_optional: z.date().optional(),
  datetime_nullable: z.date().nullable(),
  datetime_nullish: z.date().nullish()
})

export const InputTestSchema = z.object({
  string: InputStringTestSchema,
  number: InputNumberTestSchema,
  array: InputArrayTestSchema,
  checkbox: InputArrayTestSchema,
  select: InputStringTestSchema,
  boolean: InputBooleanTestSchema,
  datetime: InputDatetimeTestSchema
})
export type InputTest = z.infer<typeof InputTestSchema>
