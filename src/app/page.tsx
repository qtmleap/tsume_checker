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

export default function Page() {
  const form = useForm<InputSchema>({
    resolver: zodResolver(InputSchema),
    defaultValues: InputSchemaDefaultValue
  })
  const { control } = form

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
    switch (type) {
      case RecordFormatType.KIF: {
        const _record: Record | Error = importKIF(data.content)
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
    const hash: string = await toSHA256Hash(handleRecord(data))
    console.log('Hash:', hash)
    try {
      const response = await client.post('/hash', { hash })
      console.log('Hash check response:', response)
    } catch (error) {
      console.error('Error checking hash:', error)
    }
  }

  return (
    <div className='flex flex-col max-w-xl w-full mx-auto p-6 gap-6'>
      <h1 className='text-center text-2xl'>詰将棋同一検索ページ</h1>
      <p className='text-sm'>
        標準的な棋譜形式(KIF, KI2, CSA, SFEN/USI,
        JKF)に対応しています。フォームに貼り付けることで完全一致の作品があるかどうかをチェックします。フォームに入力された棋譜データはブラウザ側でハッシュとして計算されるため、外部に盤面を再現することができる情報は一切送信されません。
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormTextarea control={control} name='content' required placeholder='棋譜情報を入力してください' />
          <Button type='submit' className='mt-4 w-full'>
            検索
          </Button>
        </form>
      </Form>
    </div>
  )
}
