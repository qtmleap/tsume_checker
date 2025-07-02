import { HashSchema } from '@/models/hash.dto'
import { ResultSchema } from '@/models/result.dto'
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
    response: ResultSchema
  }
])

export const client = new Zodios('/api', endpoints)
