import { HashSchema } from '@/models/hash.dto'
import { makeApi, Zodios } from '@zodios/core'
import { z } from 'zod'

const endpoints = makeApi([
  {
    method: 'post',
    path: '/hash',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: HashSchema
      }
    ],
    response: z.object({})
  }
])

export const client = new Zodios('/api', endpoints)
