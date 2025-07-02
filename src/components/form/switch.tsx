'use client'

import type * as SwitchPrimitive from '@radix-ui/react-switch'
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

type SwitchProps<T extends FieldValues> = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  label?: string
  description?: string
  name: Path<T>
  control: Control<T>
  error?: FieldError
}

function FormSwitch<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
  error,
  required,
  description,
  className,
  // biome-ignore lint/correctness/noUnusedFunctionParameters: ignore
  ...props
}: SwitchProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className='space-y-0.5'>
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export { FormSwitch }
