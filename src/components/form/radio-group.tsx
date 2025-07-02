'use client'

import type { Control, FieldError, FieldValues, Path } from 'react-hook-form'
import type * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type CheckboxProps<T extends FieldValues> = React.ComponentProps<typeof RadioGroupPrimitive.Root> & {
  label?: string
  description?: string
  name: Path<T>
  control: Control<T>
  error?: FieldError
  options: readonly string[]
}

function FormRadioGroup<T extends FieldValues>({
  className,
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
      render={({ field }) => (
        <FormItem className='space-y-3'>
          <FormLabel>Notify me about...</FormLabel>
          <FormControl>
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex flex-col'>
              <FormItem className='flex items-center gap-3'>
                <FormControl>
                  <RadioGroupItem value='all' />
                </FormControl>
                <FormLabel className='font-normal'>All new messages</FormLabel>
              </FormItem>
              <FormItem className='flex items-center gap-3'>
                <FormControl>
                  <RadioGroupItem value='mentions' />
                </FormControl>
                <FormLabel className='font-normal'>Direct messages and mentions</FormLabel>
              </FormItem>
              <FormItem className='flex items-center gap-3'>
                <FormControl>
                  <RadioGroupItem value='none' />
                </FormControl>
                <FormLabel className='font-normal'>Nothing</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { FormRadioGroup }
