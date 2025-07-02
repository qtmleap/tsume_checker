import { HashSchema } from '@/models/hash.dto'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data: HashSchema = HashSchema.parse(await request.json())
  console.log('Received hash:', data.hash)
  return NextResponse.json({ message: 'Hash received successfully' }, { status: 200 })
}
