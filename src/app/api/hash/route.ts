import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from 'redis'
import { HashSchema } from '@/models/hash.dto'

const redis = await createClient({ url: process.env.REDIS_URL }).connect()

export async function POST(request: NextRequest) {
  const data: HashSchema = HashSchema.parse(await request.json())
  const value = await redis.get(data.hash)

  if (!value) {
    return NextResponse.json({ message: 'Not Found' }, { status: 404 })
  }
  return NextResponse.json(JSON.parse(value), { status: 200 })
}
