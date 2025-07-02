import { HashSchema } from '@/models/hash.dto'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from 'redis'

const redis = await createClient({ url: process.env.REDIS_URL }).connect()

export async function POST(request: NextRequest) {
  const data: HashSchema = HashSchema.parse(await request.json())
  console.log('Received hash:', data.hash)

  const value = await redis.get(data.hash)

  if (!value) {
    console.log('Hash not found:', data.hash)
    return NextResponse.json({}, { status: 200 })
  }

  return NextResponse.json({}, { status: 200 })
}
