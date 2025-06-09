import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kabukis CMS - 管理システム',
  description: '傾奇ユウヤ・猫空あおば 統合管理システム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body 
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans bg-cms-bg text-cms-text antialiased`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-cms-primary text-white px-4 py-2 rounded-md">
          メインコンテンツへスキップ
        </a>
        {children}
      </body>
    </html>
  )
} 