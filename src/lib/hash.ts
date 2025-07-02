import type { Record } from 'tsshogi'

export const toSHA256Hash = async (record: Record): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(record.initialPosition.sfen)
  const buffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
