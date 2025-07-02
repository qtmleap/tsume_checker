import { HashSchema } from '@/models/hash.dto'
import { ResponseSchema } from '@/models/response.dto'
import { makeApi, Zodios } from '@zodios/core'

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
    response: ResponseSchema
  }
])

export const client = new Zodios('/api', endpoints)
