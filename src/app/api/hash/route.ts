import { HashSchema } from '@/models/hash.dto'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from 'redis'

const redis = await createClient({ url: process.env.REDIS_URL }).connect()

export async function POST(request: NextRequest) {
  const data: HashSchema = HashSchema.parse(await request.json())
  const value = await redis.get(data.hash)

  if (!value) {
    return NextResponse.json(undefined, { status: 404 })
  }
  return NextResponse.json(JSON.parse(value), { status: 200 })
}
