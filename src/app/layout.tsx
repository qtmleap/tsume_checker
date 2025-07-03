import type { Metadata } from 'next'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
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
    url: 'https://mc.qleap.jp',
    locale: 'ja_JP',
    siteName: '詰将棋同一作チェッカー',
    type: 'website',
    images: [
      {
        url: 'https://mc.qleap.jp/og_matechecker.png',
        width: 1200,
        height: 630
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '詰将棋同一作チェッカー',
    description: '詰将棋の同一作・類似作を簡単に検索できる無料Webツール',
    images: ['https://mc.qleap.jp/og_matechecker.png']
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=M+PLUS+1+Code:wght@100..700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className='bg-muted'>
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
