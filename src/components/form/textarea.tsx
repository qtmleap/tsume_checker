'use client'

import type { Control, FieldError, FieldValues, Path } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '../ui/textarea'

type TextareaProps<T extends FieldValues> = React.ComponentProps<'textarea'> & {
  label?: string
  description?: string
  name: Path<T>
  control: Control<T>
  error?: FieldError
  defaultValue?: string | null
}

function FormTextarea<T extends FieldValues>({
  className,
  label,
  disabled,
  required,
  placeholder,
  description,
  control,
  defaultValue = undefined,
  name,
  ...props
}: TextareaProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              {...field}
              {...props}
              className={className}
              onChange={(e) => {
                const value = e.target.value
                field.onChange(value === '' ? defaultValue : value) // Handle empty string as null
              }}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormTextarea
