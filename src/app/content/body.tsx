'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { db } from '@/lib/db'

const TBody: React.FC = () => {
  const { data: sources } = useSuspenseQuery({
    queryKey: ['sources'],
    queryFn: async () => {
      const sources = await db.mates.orderBy('source').uniqueKeys()

      return Promise.all(
        sources.map(async (source) => {
          const count = await db.mates
            .where('source')
            .equals(source as string)
            .count()
          return {
            source: source as string,
            count
          }
        })
      )
    }
  })
  const t = useTranslations('source')
  return (
    <tbody>
      {sources
        .toSorted((a, b) => b.count - a.count)
        .map((s) => (
          <tr key={s.source} className='border-b last:border-none'>
            <td className='py-2 px-3'>{t(s.source)}</td>
            <td className='py-2 px-3 text-right'>{s.count.toLocaleString()} 問</td>
          </tr>
        ))}
    </tbody>
  )
}

export default TBody
