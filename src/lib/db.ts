'use client'

import Dexie, { type EntityTable } from 'dexie'

interface Mate {
  opus_no: number
  hash: string
  source: string
}

const db = new Dexie('source') as Dexie & {
  mates: EntityTable<Mate, 'hash'>
}

db.version(1).stores({
  mates: '++hash, source, opus_no'
})

export type { Mate }
export { db }
