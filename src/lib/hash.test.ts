import { describe, expect, test } from 'bun:test'
import { Position, Record } from 'tsshogi'
import { toSHA256Hash } from '@/lib/hash'

// Standard initial position SFEN.
// Expected digest derived independently: printf %s "$SFEN" | sha256sum
const INITIAL_SFEN = 'lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1'
const INITIAL_SHA256 = '7ff40af0b0fa49d8459d68bf06204d3b4f73bc424a50c58b2e9f4bfc6505f658'

// Same position without white's rook.
const ROOK_ODDS_SFEN = 'lnsgkgsnl/7b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1'

describe('toSHA256Hash', () => {
  test('hashes the standard initial position to the known SHA-256 vector', async () => {
    const position = Position.newBySFEN(INITIAL_SFEN)
    expect(position).not.toBeNull()
    const record = new Record(position as Position)
    expect(record.initialPosition.sfen).toBe(INITIAL_SFEN)
    expect(await toSHA256Hash(record)).toBe(INITIAL_SHA256)
  })

  test('default Record equals the standard initial position hash', async () => {
    expect(await toSHA256Hash(new Record())).toBe(INITIAL_SHA256)
  })

  test('a different initial position yields a different hash', async () => {
    const position = Position.newBySFEN(ROOK_ODDS_SFEN)
    expect(position).not.toBeNull()
    const hash = await toSHA256Hash(new Record(position as Position))
    expect(hash).toMatch(/^[0-9a-f]{64}$/)
    expect(hash).not.toBe(INITIAL_SHA256)
  })

  test('playing moves does not change the initial-position hash', async () => {
    const record = Record.newByUSI('position startpos moves 7g7f 3c3d 2g2f')
    expect(record).not.toBeInstanceOf(Error)
    const played = record as Record
    expect(played.moves.length).toBeGreaterThan(1)
    expect(await toSHA256Hash(played)).toBe(INITIAL_SHA256)
  })
})
