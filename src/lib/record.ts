import type { InputSchema } from '@/models/input.dto'
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

export const createRecord = (data: InputSchema): Record => {
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
