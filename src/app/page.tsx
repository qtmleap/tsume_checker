'use client'
import { FormInput } from '@/components/form/input'
import { FrameworkEnum, type InputTest, InputTestSchema } from '@/types/input.dto'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormCheckbox } from '@/components/form/checkbox'
import { FormRadioGroup } from '@/components/form/radio-group'
import { FormSelect } from '@/components/form/select'
import { FormSwitch } from '@/components/form/switch'
import { FormDatePicker } from '@/components/form/date-picker'

export default function Page() {
  const form = useForm<InputTest>({
    resolver: zodResolver(InputTestSchema),
    defaultValues: {}
  })
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors }
  } = form
  const handleClick = async () => {
    await handleSubmit((data) => {
      console.log('data', data)
    })()
    console.log('values', getValues())
    console.error('errors', errors)
  }
  return (
    <>
      <div>
        <Form {...form}>
          <FormInput label='string' name='string.string' control={control} />
          <FormInput label='string,optional' name='string.string_optional' control={control} />
          <FormInput label='string,nullable' name='string.string_nullable' control={control} />
          <FormInput label='string,nullish' name='string.string_nullish' control={control} />
          <FormInput label='string,nonempty,' name='string.string_nonempty' control={control} />
          <FormInput label='string,nonempty,optional' name='string.string_nonempty_optional' control={control} />
          <FormInput label='string,nonempty,nullable' name='string.string_nonempty_nullable' control={control} />
          <FormInput label='string,nonempty,nullish' name='string.string_nonempty_nullish' control={control} />
          <FormCheckbox label='array' name='array.array' options={FrameworkEnum.options} control={control} />
          <FormCheckbox
            label='array.optional'
            name='array.array_optional'
            options={FrameworkEnum.options}
            control={control}
          />
          <FormCheckbox
            label='array.nullable'
            name='array.array_nullable'
            options={FrameworkEnum.options}
            control={control}
          />
          <FormCheckbox
            label='array.nullish'
            name='array.array_nullish'
            options={FrameworkEnum.options}
            control={control}
          />
          <FormCheckbox
            label='array.nonempty'
            name='array.array_nonempty'
            options={FrameworkEnum.options}
            control={control}
          />
          <FormCheckbox
            label='array.nonempty_optional'
            name='array.array_nonempty_optional'
            options={FrameworkEnum.options}
            control={control}
          />
          <FormCheckbox
            label='array.nonempty_nullable'
            name='array.array_nonempty_nullable'
            options={FrameworkEnum.options}
            control={control}
          />
          <FormCheckbox
            label='array.nonempty_nullish'
            name='array.array_nonempty_nullish'
            options={FrameworkEnum.options}
            control={control}
          />
          <FormRadioGroup
            label='checkbox.array'
            name='checkbox.array'
            options={FrameworkEnum.options}
            control={control}
          />
          <FormSelect label='select.string' name='select.string' options={FrameworkEnum.options} control={control} />
          <FormSwitch label='boolean' name='boolean.boolean' control={control} />
          {/* <FormSwitch label='boolean' name='boolean.boolean_optional' control={control} />
          <FormSwitch label='boolean' name='boolean.boolean_nullable' control={control} />
          <FormSwitch label='boolean' name='boolean.boolean_nullish' control={control} /> */}
          <FormDatePicker label='datetime' name='datetime.datetime' control={control} />
        </Form>
        <Button onClick={handleClick}>検証</Button>
      </div>
    </>
  )
}
