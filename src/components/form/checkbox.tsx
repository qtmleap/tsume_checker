import type * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import type * as React from 'react'
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form'
import { Checkbox } from '../ui/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

type CheckboxProps<T extends FieldValues> = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  label?: string
  description?: string
  name: Path<T>
  control: Control<T>
  error?: FieldError
  options: readonly string[]
}

function FormCheckbox<T extends FieldValues>({
  className,
  type,
  control,
  name,
  label,
  disabled,
  error,
  required,
  description,
  options,
  // biome-ignore lint/correctness/noUnusedFunctionParameters: ignore
  ...props
}: CheckboxProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{name}</FormLabel>
          {options.map((option) => (
            <FormField
              key={option}
              control={control}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem key={option} className='flex flex-row items-center gap-2'>
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option)}
                        disabled={disabled}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || []
                          return checked
                            ? field.onChange([...currentValue, option])
                            : field.onChange(currentValue.filter((id: string) => id !== option))
                        }}
                      />
                    </FormControl>
                    <FormLabel className='text-sm font-normal'>{option}</FormLabel>
                  </FormItem>
                )
              }}
            />
          ))}
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { FormCheckbox }
