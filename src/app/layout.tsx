import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'
import Providers from './providers'

export const metadata: Metadata = {
  title: '詰将棋同一作チェッカー | 詰将棋作品の類似・同一作検索ツール',
  description:
    '詰将棋の同一作・類似作を簡単に検索できる無料Webツール。作品の重複や類似性をチェックし、オリジナリティの確認や投稿前の確認に最適です。',
  keywords: [
    '詰将棋',
    '同一作',
    '類似作',
    '作品検索',
    'オリジナリティ',
    '将棋',
    'パズル',
    'チェッカー',
    '詰将棋投稿',
    '詰将棋ツール'
  ],
  openGraph: {
    title: '詰将棋同一作チェッカー',
    description: '詰将棋の同一作・類似作を簡単に検索できる無料Webツール',
    url: 'https://your-app-url.example.com',
    siteName: '詰将棋同一作チェッカー',
    type: 'website',
    images: [
      {
        url: '/public/globe.svg',
        width: 1200,
        height: 630,
        alt: '詰将棋同一作チェッカー ロゴ'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '詰将棋同一作チェッカー',
    description: '詰将棋の同一作・類似作を簡単に検索できる無料Webツール',
    images: ['/public/globe.svg']
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=M+PLUS+1+Code:wght@100..700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className='bg-muted'>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
