"use client";

import { motion } from "framer-motion";
import { Headphones, Volume2, Heart, Clock, Moon, Sparkles, ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// 型定義
type ASMRContent = {
  id: number;
  title: string;
  description: string;
  duration: string;
  favorites: number;
  category: "typing" | "talking" | "ambient" | "roleplay";
  thumbnail: string;
  isNew?: boolean;
};

// アニメーション用のバリアント
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

const ASMRPage = () => {
  // モックデータ - ASMR配信
  const asmrContents: ASMRContent[] = [
    {
      id: 1,
      title: "【作業用ASMR】深夜のプログラミング音",
      description: "静かなキーボードタイピング音と環境音で集中力アップ",
      duration: "1:00:00",
      favorites: 2340,
      category: "typing",
      thumbnail: "/images/asmr-1.jpg",
      isNew: true,
    },
    {
      id: 2,
      title: "【睡眠導入】優しい吸血鬼の囁き声",
      description: "低音ボイスで安らかな眠りへ誘います",
      duration: "45:00",
      favorites: 3890,
      category: "talking",
      thumbnail: "/images/asmr-2.jpg",
    },
    {
      id: 3,
      title: "【環境音ASMR】雨音とコーディング",
      description: "雨音をBGMに静かにコードを書く音",
      duration: "2:00:00",
      favorites: 1560,
      category: "ambient",
      thumbnail: "/images/asmr-3.jpg",
    },
    {
      id: 4,
      title: "【ロールプレイ】プログラミング個人レッスン",
      description: "優しい先生が隣で教えてくれるASMR",
      duration: "30:00",
      favorites: 2100,
      category: "roleplay",
      thumbnail: "/images/asmr-4.jpg",
      isNew: true,
    },
    {
      id: 5,
      title: "【メカニカルキーボード】青軸タイピング音",
      description: "心地よいメカニカルキーボードの打鍵音",
      duration: "1:30:00",
      favorites: 1890,
      category: "typing",
      thumbnail: "/images/asmr-5.jpg",
    },
    {
      id: 6,
      title: "【深夜ラジオ風】まったり雑談ASMR",
      description: "深夜のラジオのような優しい語りかけ",
      duration: "50:00",
      favorites: 2670,
      category: "talking",
      thumbnail: "/images/asmr-6.jpg",
    },
  ];

  const categoryColors = {
    typing: "from-blue-500 to-indigo-600",
    talking: "from-purple-500 to-pink-600",
    ambient: "from-green-500 to-teal-600",
    roleplay: "from-vampire-accent to-purple-600",
  };

  const categoryLabels = {
    typing: "タイピング音",
    talking: "囁き声",
    ambient: "環境音",
    roleplay: "ロールプレイ",
  };

  return (
    <div className="min-h-screen bg-vampire-night pt-24">
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 背景装飾 - よりリラックスした雰囲気 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-vampire-night/90"></div>
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full filter blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-pink-600/10 rounded-full filter blur-[120px] animate-pulse-slow animation-delay-300"></div>
          
          {/* 浮遊する星 */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* ヘッダー */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <Link
              href="/live"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-vampire-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              ライブ配信に戻る
            </Link>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">ASMR配信</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-text-secondary max-w-2xl">
              作業用・睡眠用のASMR配信コレクション。
              心地よい音声で、リラックスタイムをお過ごしください。
            </motion.p>
          </motion.div>

          {/* 特集セクション */}
          <motion.div
            variants={itemVariants}
            className="mb-12 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-3xl p-8 border border-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Moon className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">今夜のおすすめ</h2>
              <Sparkles className="w-5 h-5 text-pink-400" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">深夜の集中作業に</h3>
                <p className="text-text-secondary text-sm mb-4">
                  静かなタイピング音と環境音で、深夜の作業効率をアップ。
                  プログラミングや勉強のお供に最適です。
                </p>
                <Link
                  href="#typing"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Headphones className="w-4 h-4" />
                  タイピング音ASMRを聴く
                </Link>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">心地よい眠りのために</h3>
                <p className="text-text-secondary text-sm mb-4">
                  優しい囁き声と環境音で、質の高い睡眠をサポート。
                  疲れた心と体を癒す時間をお届けします。
                </p>
                <Link
                  href="#talking"
                  className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  囁き声ASMRを聴く
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ASMRコンテンツグリッド */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {asmrContents.map((content) => (
              <motion.div
                key={content.id}
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <div className="bg-vampire-shadow/30 rounded-2xl overflow-hidden border border-purple-500/10 transition-all duration-300 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20">
                  {/* サムネイル */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={content.thumbnail}
                      alt={content.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vampire-night/80 to-transparent"></div>
                    
                    {/* 再生ボタン */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    
                    {/* 時間表示 */}
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs font-medium">
                      {content.duration}
                    </div>

                    {/* NEW バッジ */}
                    {content.isNew && (
                      <div className="absolute top-2 left-2 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-xs font-bold text-white">
                        NEW
                      </div>
                    )}
                  </div>

                  {/* コンテンツ */}
                  <div className="p-6">
                    {/* カテゴリーラベル */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs text-white bg-gradient-to-r ${categoryColors[content.category]}`}>
                        {categoryLabels[content.category]}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-pink-400">
                        <Heart className="w-3 h-3 fill-current" />
                        {content.favorites.toLocaleString()}
                      </span>
                    </div>

                    {/* タイトル */}
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                      {content.title}
                    </h3>

                    {/* 説明 */}
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                      {content.description}
                    </p>

                    {/* アクション */}
                    <div className="flex items-center justify-between">
                      <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-purple-400 transition-colors">
                        <Headphones className="w-4 h-4" />
                        今すぐ聴く
                      </button>
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <Clock className="w-3 h-3" />
                        {content.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 使い方ガイド */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-vampire-shadow/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">ASMRの楽しみ方</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-2">イヤホン推奨</h4>
                <p className="text-sm text-text-secondary">
                  より臨場感のある音声体験のため、イヤホンやヘッドホンの使用をおすすめします
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Volume2 className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-2">音量調整</h4>
                <p className="text-sm text-text-secondary">
                  心地よいと感じる音量に調整して、リラックスできる環境を整えましょう
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Moon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-2">環境づくり</h4>
                <p className="text-sm text-text-secondary">
                  部屋を暗くしたり、快適な姿勢を取ることで、より効果的なリラックスタイムに
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ASMRPage; 