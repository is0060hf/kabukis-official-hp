import type { Metadata } from 'next'
import Navigation from '@/components/common/Navigation'
import Footer from '@/components/common/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: '猫空あおば - 歌姫VTuber',
  description: '歌とお酒を愛する歌姫VTuber、猫空あおばの公式サイト。楽曲制作、歌枠配信、歌ってみた投稿など音楽活動を中心に展開中。',
  keywords: ['VTuber', '歌姫', '猫空あおば', 'ねこそら', '楽曲制作', '歌ってみた', 'STEM配布'],
  authors: [{ name: '猫空あおば' }],
  openGraph: {
    title: '猫空あおば - 歌姫VTuber',
    description: '歌とお酒を愛する歌姫VTuber、猫空あおばの公式サイト',
    type: 'website',
    locale: 'ja_JP',
    siteName: '猫空あおば公式サイト',
  },
  twitter: {
    card: 'summary_large_image',
    title: '猫空あおば - 歌姫VTuber',
    description: '歌とお酒を愛する歌姫VTuber、猫空あおばの公式サイト',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning className="min-h-screen bg-gradient-to-br from-melody-sky/5 via-white to-melody-purple/5">
        <Navigation />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
} 