'use client'

import FormTextarea from '@/components/form/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputSchema, InputSchemaDefaultValue } from '@/models/input.dto'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { client } from '@/lib/client'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import type { ResultSchema } from '@/models/result.dto'
import { createRecord } from '@/lib/record'
import type { Record } from 'tsshogi'
import { toSHA256Hash } from '@/lib/hash'

export default function Page() {
  const form = useForm<InputSchema>({
    resolver: zodResolver(InputSchema),
    defaultValues: InputSchemaDefaultValue
  })
  const { control } = form
  const [_result, setResult] = useState<ResultSchema | null>(null)

  const onSubmit = async (data: InputSchema) => {
    try {
      const record: Record = createRecord(data)
      const hash: string = await toSHA256Hash(record)
      setResult(await client.post('/hash', { hash }))
    } catch (error) {
      console.error('Error fetching result:', error)
      if (error instanceof AxiosError) {
        if (error.status === 404) {
          toast('同一作品は見つかりませんでした')
          return
        }
      }
      if (error instanceof Error) {
        toast.error('エラーが発生しました')
      }
    }
  }

  return (
    <div className='flex flex-col max-w-xl w-full mx-auto p-6 gap-4'>
      <h1 className='text-center text-2xl font-bold'>詰将棋同一検索ページ</h1>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>標準的な棋譜形式(KIF, KI2, CSA, SFEN/USI, JKF)に対応しています。</p>
        <p className='text-sm'>
          同一作のチェックは初期配置(盤面+持ち駒)を利用しています。受け方の持ち駒に制約がある場合、正しく判定できない可能性があります。
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormTextarea
            className='!text-xs'
            control={control}
            name='content'
            required
            placeholder='棋譜情報を入力してください'
          />
          <div className='flex justify-center mt-4'>
            <Button type='submit' className='w-full max-w-xs'>
              検索
            </Button>
          </div>
        </form>
      </Form>
      <div className='flex flex-col gap-2 text-xs text-gray-500'>
        <p>
          全ての詰将棋作品を網羅しているわけではないため、同一作品が見つからない場合でも、他のサービスやサイトで同じ作品が存在する可能性があります。
        </p>
        <p>
          このページは詰将棋の同一性を確認するためのものであり、作品の内容や解答を表示するものではありません。作品の内容を確認したい場合は、作品を別途閲覧してください。
        </p>
      </div>
    </div>
  )
}
