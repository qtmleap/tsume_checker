'use client'

import type { Control, FieldError, FieldValues, Path } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type * as SelectPrimitive from '@radix-ui/react-select'

type SelectProps<T extends FieldValues> = React.ComponentProps<typeof SelectPrimitive.Root> & {
  label?: string
  description?: string
  name: Path<T>
  control: Control<T>
  error?: FieldError
  placeholder?: string
  options: readonly string[]
}

function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
  error,
  required,
  placeholder,
  description,
  options,
  // biome-ignore lint/correctness/noUnusedFunctionParameters: ignore
  ...props
}: SelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { FormSelect }
