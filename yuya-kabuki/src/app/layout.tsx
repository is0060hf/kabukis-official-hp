import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ModeToggle from "@/components/ModeToggle";
import { SkipToContent } from "@/components/common/SkipToContent";

export const metadata: Metadata = {
  title: "傾奇ユウヤ - AI解説VTuber",
  description: "クール系ショタ吸血鬼VTuber。AI解説・便利ツール配信を中心に活動中。開発大好き、無表情だけど内面は熱い。",
  keywords: ["VTuber", "AI解説", "便利ツール", "開発", "吸血鬼", "傾奇ユウヤ"],
  authors: [{ name: "傾奇ユウヤ" }],
  openGraph: {
    title: "傾奇ユウヤ - AI解説VTuber",
    description: "クール系ショタ吸血鬼VTuber。AI解説・便利ツール配信を中心に活動中。",
    url: "https://yuya-kabuki.com",
    siteName: "傾奇ユウヤ Official",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "傾奇ユウヤ - AI解説VTuber",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "傾奇ユウヤ - AI解説VTuber",
    description: "クール系ショタ吸血鬼VTuber。AI解説・便利ツール配信を中心に活動中。",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className="font-gothic min-h-screen bg-vampire-night text-text-primary">
        {/* スキップリンク */}
        <SkipToContent />

        {/* 背景エフェクト */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vampire-shadow/10 to-vampire-night/50"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-vampire-accent/10 rounded-full filter blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-vampire-blood/10 rounded-full filter blur-[100px] animate-pulse-slow animation-delay-300"></div>
        </div>

        {/* モード切替ボタン */}
        <ModeToggle />

        {/* ナビゲーション */}
        <Navigation />

        {/* メインコンテンツ */}
        <main id="main-content" className="relative z-10 min-h-screen">
          {children}
        </main>

        {/* フッター */}
        <Footer />

        {/* 血のドリップエフェクト（装飾） */}
        <div className="fixed top-0 left-10 w-1 h-20 opacity-20 pointer-events-none">
          <div className="blood-drip"></div>
        </div>
        <div className="fixed top-0 right-20 w-1 h-20 opacity-20 pointer-events-none animation-delay-200">
          <div className="blood-drip"></div>
        </div>
      </body>
    </html>
  );
}
