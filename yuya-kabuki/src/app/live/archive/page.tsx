"use client";

import { motion } from "framer-motion";
import { Video, Clock, Eye, Filter, Search, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// 型定義
type StreamType = "tech" | "dev" | "chat" | "edu" | "asmr" | "special" | "all";

type ArchivedStream = {
  id: number;
  title: string;
  description: string;
  type: StreamType;
  date: string;
  duration: string;
  views: number;
  thumbnail: string;
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

const ArchivePage = () => {
  const [selectedType, setSelectedType] = useState<StreamType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // モックデータ - アーカイブ配信
  const archivedStreams: ArchivedStream[] = [
    {
      id: 1,
      title: "【AI解説】GPT-4 Vision APIの使い方と実装例",
      description: "最新のGPT-4 Vision APIを使った画像認識アプリの開発実況",
      type: "tech",
      date: "2024-01-15",
      duration: "2:35:00",
      views: 3420,
      thumbnail: "/images/archive-1.jpg",
    },
    {
      id: 2,
      title: "【ASMR】プログラミング音で眠れる作業配信",
      description: "キーボードタイピング音とコーディング実況のASMR配信",
      type: "asmr",
      date: "2024-01-14",
      duration: "1:00:00",
      views: 1850,
      thumbnail: "/images/archive-2.jpg",
    },
    {
      id: 3,
      title: "【開発実況】Discordボット開発 - 完成まで",
      description: "AIを活用したDiscordボットを0から作る開発配信",
      type: "dev",
      date: "2024-01-12",
      duration: "3:45:00",
      views: 2890,
      thumbnail: "/images/archive-3.jpg",
    },
    {
      id: 4,
      title: "【雑談】視聴者質問に全部答える配信",
      description: "プログラミングから趣味まで、視聴者の質問に答える雑談配信",
      type: "chat",
      date: "2024-01-10",
      duration: "1:30:00",
      views: 1520,
      thumbnail: "/images/archive-4.jpg",
    },
    {
      id: 5,
      title: "【講座】初心者向けPython入門 第1回",
      description: "プログラミング初心者のためのPython基礎講座",
      type: "edu",
      date: "2024-01-08",
      duration: "2:00:00",
      views: 4200,
      thumbnail: "/images/archive-5.jpg",
    },
    {
      id: 6,
      title: "【特別配信】新年企画！2024年の目標発表",
      description: "2024年の配信計画と視聴者参加型企画",
      type: "special",
      date: "2024-01-01",
      duration: "2:30:00",
      views: 5100,
      thumbnail: "/images/archive-6.jpg",
    },
  ];

  const typeColors: Record<StreamType, string> = {
    tech: "bg-gradient-to-br from-vampire-accent to-purple-600",
    dev: "bg-gradient-to-br from-blue-500 to-blue-700",
    chat: "bg-gradient-to-br from-green-500 to-green-700",
    edu: "bg-gradient-to-br from-yellow-500 to-orange-600",
    asmr: "bg-gradient-to-br from-purple-600 to-pink-600",
    special: "bg-gradient-to-br from-vampire-blood to-red-600",
    all: "bg-gradient-to-br from-gray-600 to-gray-700",
  };

  const typeLabels: Record<StreamType, string> = {
    tech: "AI解説",
    dev: "開発",
    chat: "雑談",
    edu: "講座",
    asmr: "ASMR",
    special: "特別配信",
    all: "すべて",
  };

  // フィルタリングロジック
  const filteredStreams = archivedStreams.filter((stream) => {
    const matchesType = selectedType === "all" || stream.type === selectedType;
    const matchesSearch = stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stream.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-vampire-night pt-24">
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 背景装飾 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-vampire-night/80"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-vampire-blood/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
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
              <span className="gradient-text">配信アーカイブ</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-text-secondary max-w-2xl">
              過去の配信をいつでも視聴可能。
              カテゴリーや検索で見たい配信を探してみよう！
            </motion.p>
          </motion.div>

          {/* フィルター＆検索 */}
          <motion.div
            variants={itemVariants}
            className="mb-8 space-y-4"
          >
            {/* 検索バー */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="配信を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-vampire-shadow/50 border border-vampire-accent/20 rounded-full text-white placeholder-text-secondary focus:outline-none focus:border-vampire-accent transition-colors"
              />
            </div>

            {/* カテゴリーフィルター */}
            <div className="flex flex-wrap gap-2">
              {(Object.entries(typeLabels) as [StreamType, string][]).map(([type, label]) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedType === type
                      ? `${typeColors[type]} text-white`
                      : "bg-vampire-shadow/30 text-text-secondary hover:bg-vampire-shadow/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* アーカイブグリッド */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredStreams.map((stream) => (
              <motion.div
                key={stream.id}
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <Link href={`/live/archive/${stream.id}`}>
                  <div className="bg-vampire-shadow/30 rounded-2xl overflow-hidden border border-vampire-accent/10 transition-all duration-300 hover:border-vampire-accent/30 hover:shadow-xl hover:shadow-vampire-accent/20">
                    {/* サムネイル */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={stream.thumbnail}
                        alt={stream.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-vampire-night/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* 再生時間 */}
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs font-medium">
                        {stream.duration}
                      </div>
                    </div>

                    {/* コンテンツ */}
                    <div className="p-6">
                      {/* タイプラベル */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs text-white ${typeColors[stream.type as StreamType]}`}>
                          {typeLabels[stream.type as StreamType]}
                        </span>
                        <span className="text-xs text-text-secondary flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(stream.date).toLocaleDateString("ja-JP")}
                        </span>
                      </div>

                      {/* タイトル */}
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:gradient-text transition-all duration-300">
                        {stream.title}
                      </h3>

                      {/* 説明 */}
                      <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                        {stream.description}
                      </p>

                      {/* 統計 */}
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {stream.views.toLocaleString()}回視聴
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {stream.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* 結果がない場合 */}
          {filteredStreams.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-16"
            >
              <Video className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
              <p className="text-xl text-text-secondary">
                該当する配信が見つかりませんでした
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default ArchivePage; 