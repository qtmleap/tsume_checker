'use client'

const sources: Array<{ name: string; count: number }> = [
  { name: 'スマホ版 詰将棋パラダイス', count: 22767 },
  { name: '日本将棋連盟 まいにち詰将棋', count: 2896 }
]

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
