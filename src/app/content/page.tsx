'use client'

// 1. ──────────────── data source list
const sources: Array<{ name: string; count: number }> = [
  { name: 'パラダイス(詰将棋パラダイス) 2024-01〜2024-06', count: 120 },
  { name: '将棋世界 2023 年度', count: 48 },
  { name: '大学選手権過去問', count: 350 },
  { name: '個人サイト「MyShogiProblems」', count: 78 }
  // …追加ソースがあればここに追記
]

// 2. ──────────────── page component
export default function Page() {
  return (
    <div className='flex flex-col max-w-xl w-full mx-auto p-6 gap-4'>
      <h1 className='text-center text-2xl font-bold'>収録データソース一覧</h1>
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-muted-foreground text-center'>
          現在ハッシュ検索の対象となっている各データソースと収録問題数です。
        </p>
      </div>

      <table className='w-full text-sm border-collapse'>
        <thead>
          <tr className='border-b'>
            <th className='text-left py-2 px-3'>データソース</th>
            <th className='text-right py-2 px-3'>収録数</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((s) => (
            <tr key={s.name} className='border-b last:border-none'>
              <td className='py-2 px-3'>{s.name}</td>
              <td className='py-2 px-3 text-right'>{s.count.toLocaleString()} 問</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
