'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { Suspense } from 'react'
import { db } from '@/lib/db'

const _sources: Array<{ name: string; count: number }> = [
  { name: 'スマホ版 詰将棋パラダイス', count: 22767 },
  { name: '日本将棋連盟 まいにち詰将棋', count: 2896 }
]

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

export default function Page() {
  return (
    <div className='flex flex-col max-w-xl w-full mx-auto p-6 gap-4'>
      <h1 className='text-center text-2xl font-bold'>収録データソース一覧</h1>
      <div className='flex flex-col gap-2 text-xs text-muted-foreground'>
        <p>
          現在ハッシュ検索の対象となっている各データソースと収録問題数です。収録にご協力いただける詰将棋データベースをお持ちの方がいらっしゃいましたらご連絡お願いします。
        </p>
        <p>収録にご協力いただける詰将棋データベースをお持ちの方がいらっしゃいましたらご連絡お願いします。</p>
      </div>

      <table className='w-full text-sm border-collapse'>
        <thead>
          <tr className='border-b'>
            <th className='text-left py-2 px-3'>データソース</th>
            <th className='text-right py-2 px-3'>収録数</th>
          </tr>
        </thead>
        <Suspense>
          <TBody />
        </Suspense>
      </table>
    </div>
  )
}
