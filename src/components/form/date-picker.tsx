'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { DayPicker } from 'react-day-picker'
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type DatePickerProps<T extends FieldValues> = React.ComponentProps<typeof DayPicker> & {
  label?: string
  description?: string
  name: Path<T>
  control: Control<T>
  error?: FieldError
  // options: readonly string[]
}

function FormDatePicker<T extends FieldValues>({
  className,
  mode = 'single',
  captionLayout = 'dropdown-months',
  // type,
  control,
  name,
  label,
  // disabled,
  error,
  required,
  description,
  // options,
  // biome-ignore lint/correctness/noUnusedFunctionParameters: ignore
  ...props
}: DatePickerProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                >
                  {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode={mode}
                required={required}
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                captionLayout={captionLayout}
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { FormDatePicker }
