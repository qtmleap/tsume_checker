'use client'

import FormTextarea from '@/components/form/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputSchema, InputSchemaDefaultValue } from '@/models/input.dto'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  detectRecordFormat,
  importCSA,
  importJKFString,
  importKI2,
  importKIF,
  Position,
  Record,
  RecordFormatType
} from 'tsshogi'
import { client } from '@/lib/client'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import type { ResultSchema } from '@/models/result.dto'

export default function Page() {
  const form = useForm<InputSchema>({
    resolver: zodResolver(InputSchema),
    defaultValues: InputSchemaDefaultValue
  })
  const { control } = form
  const [result, setResult] = useState<ResultSchema | null>(null)
  const toSHA256Hash = async (record: Record): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(record.initialPosition.sfen)
    const buffer = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  }

  const handleRecord = (data: InputSchema): Record => {
    const type: RecordFormatType = detectRecordFormat(data.content)
    console.log('Detected record format:', type)
    switch (type) {
      case RecordFormatType.KIF: {
        const _record: Record | Error = importKIF(data.content)
        console.log('Imported KIF record:', _record)
        if (_record instanceof Error) {
          console.error('Invalid KIF format:', _record.message)
          throw _record
        }
        return _record
      }
      case RecordFormatType.KI2: {
        const _record: Record | Error = importKI2(data.content)
        if (_record instanceof Error) {
          console.error('Invalid KI2 format:', _record.message)
          throw _record
        }
        return _record
      }
      case RecordFormatType.CSA: {
        const _record: Record | Error = importCSA(data.content)
        if (_record instanceof Error) {
          console.error('Invalid CSA format:', _record.message)
          throw _record
        }
        return _record
      }
      case RecordFormatType.SFEN: {
        const _position: Position | null = Position.newBySFEN(data.content)
        if (_position === null) {
          console.error('Invalid SFEN format:', data.content)
          throw new Error('Invalid SFEN format')
        }
        const _record: Record | Error = new Record(_position)
        if (_record instanceof Error) {
          console.error('Invalid SFEN format:', _record.message)
          throw _record
        }
        return _record
      }
      case RecordFormatType.USI: {
        const _record: Record | Error = Record.newByUSI(data.content)
        if (_record instanceof Error) {
          console.error('Invalid SFEN format:', _record.message)
          throw _record
        }
        return _record
      }
      case RecordFormatType.JKF: {
        const _record: Record | Error = importJKFString(data.content)
        if (_record instanceof Error) {
          console.error('Invalid SFEN format:', _record.message)
          throw _record
        }
        return _record
      }
      case RecordFormatType.USEN: {
        const _record: Record | Error = Record.newByUSEN(data.content)
        if (_record instanceof Error) {
          console.error('Invalid SFEN format:', _record.message)
          throw _record
        }
        return _record
      }
    }
  }

  const onSubmit = async (data: InputSchema) => {
    try {
      const record: Record = handleRecord(data)
      console.log('Record:', record)
      const hash: string = await toSHA256Hash(record)
      console.log('Hash:', hash)
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
    <>
      <Dialog
        open={!!result}
        onOpenChange={(open) => {
          if (!open) setResult(null)
        }}
      >
        <DialogContent className='select-none'>
          <DialogHeader>
            <DialogTitle>同一作品が既に存在します</DialogTitle>
            <DialogDescription className='text-sm'>
              入力された詰将棋と同一の作品がデータベースに登録されています。
            </DialogDescription>
          </DialogHeader>
          {result && (
            <ul className='mt-4 text-sm leading-6'>
              <li>
                <span className='font-semibold'>タイトル:</span> {result.title}
              </li>
              <li>
                <span className='font-semibold'>作者:</span> {result.author}
              </li>
              <li>
                <span className='font-semibold'>作品番号:</span> {result.opus_no}
              </li>
              <li>
                <span className='font-semibold'>発表日:</span> {result.published_at}
              </li>
              <li>
                <span className='font-semibold'>掲載誌/サイト:</span> {result.published_by}
              </li>
            </ul>
          )}
        </DialogContent>
      </Dialog>
      <div className='flex flex-col max-w-xl w-full mx-auto p-6 gap-4'>
        <h1 className='text-center text-2xl'>詰将棋同一検索ページ</h1>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>
            標準的な棋譜形式(KIF, KI2, CSA, SFEN/USI,
            JKF)に対応しています。フォームに貼り付けることで完全一致の作品があるかどうかをチェックします。
          </p>
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
        <p className='text-sm text-gray-500'>
          全ての詰将棋作品を網羅しているわけではないため、同一作品が見つからない場合でも、他のサービスやサイトで同じ作品が存在する可能性があります。
        </p>
        <p className='text-sm text-gray-500'>
          このページは詰将棋の同一性を確認するためのものであり、作品の内容や解答を表示するものではありません。作品の内容を確認したい場合は、作品を別途閲覧してください。
        </p>
      </div>
    </>
  )
}
