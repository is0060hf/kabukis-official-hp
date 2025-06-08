"use client";

import { motion } from "framer-motion";
import { GraduationCap, Clock, Users, BarChart, Search, ArrowLeft, PlayCircle, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// 型定義
type TutorialLevel = "beginner" | "intermediate" | "advanced" | "all";

type Tutorial = {
  id: number;
  title: string;
  description: string;
  level: TutorialLevel;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  tags: string[];
  thumbnail: string;
  instructor: string;
  featured?: boolean;
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

const TutorialsPage = () => {
  const [selectedLevel, setSelectedLevel] = useState<TutorialLevel>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // モックデータ - チュートリアル一覧
  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: "Next.js 14 完全入門コース",
      description: "App RouterからServer Actionsまで、Next.js 14の新機能を徹底解説",
      level: "intermediate",
      duration: "8時間",
      lessons: 45,
      students: 3200,
      rating: 4.8,
      tags: ["Next.js", "React", "TypeScript"],
      thumbnail: "/images/tutorial-nextjs.jpg",
      instructor: "傾奇ユウヤ",
      featured: true,
    },
    {
      id: 2,
      title: "初心者のためのTypeScript基礎講座",
      description: "型安全なプログラミングの基礎から実践まで、丁寧に解説します",
      level: "beginner",
      duration: "6時間",
      lessons: 32,
      students: 5100,
      rating: 4.9,
      tags: ["TypeScript", "JavaScript", "基礎"],
      thumbnail: "/images/tutorial-typescript.jpg",
      instructor: "傾奇ユウヤ",
    },
    {
      id: 3,
      title: "React Hooks 完全マスター",
      description: "useState, useEffect からカスタムHooksまで、実践的に学ぶ",
      level: "intermediate",
      duration: "5時間",
      lessons: 28,
      students: 2800,
      rating: 4.7,
      tags: ["React", "Hooks", "フロントエンド"],
      thumbnail: "/images/tutorial-hooks.jpg",
      instructor: "傾奇ユウヤ",
    },
    {
      id: 4,
      title: "マイクロサービス設計入門",
      description: "モダンなマイクロサービスアーキテクチャの設計と実装",
      level: "advanced",
      duration: "10時間",
      lessons: 52,
      students: 1200,
      rating: 4.6,
      tags: ["アーキテクチャ", "Docker", "Kubernetes"],
      thumbnail: "/images/tutorial-microservices.jpg",
      instructor: "傾奇ユウヤ",
      featured: true,
    },
    {
      id: 5,
      title: "Git & GitHub 実践ガイド",
      description: "チーム開発で必須のGit操作とGitHub活用術を習得",
      level: "beginner",
      duration: "4時間",
      lessons: 24,
      students: 6800,
      rating: 4.8,
      tags: ["Git", "GitHub", "バージョン管理"],
      thumbnail: "/images/tutorial-git.jpg",
      instructor: "傾奇ユウヤ",
    },
    {
      id: 6,
      title: "Prisma + tRPC でフルスタック開発",
      description: "型安全なAPIとデータベース操作で堅牢なアプリを構築",
      level: "advanced",
      duration: "12時間",
      lessons: 60,
      students: 980,
      rating: 4.9,
      tags: ["Prisma", "tRPC", "フルスタック"],
      thumbnail: "/images/tutorial-fullstack.jpg",
      instructor: "傾奇ユウヤ",
    },
  ];

  const levelLabels: Record<TutorialLevel, string> = {
    beginner: "初級",
    intermediate: "中級",
    advanced: "上級",
    all: "すべて",
  };

  const levelColors: Record<TutorialLevel, string> = {
    beginner: "from-green-500 to-emerald-600",
    intermediate: "from-blue-500 to-indigo-600",
    advanced: "from-vampire-blood to-red-600",
    all: "from-gray-600 to-gray-700",
  };

  // フィルタリングロジック
  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesLevel = selectedLevel === "all" || tutorial.level === selectedLevel;
    const matchesSearch = 
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  // 統計情報
  const totalStudents = tutorials.reduce((sum, tutorial) => sum + tutorial.students, 0);
  const totalLessons = tutorials.reduce((sum, tutorial) => sum + tutorial.lessons, 0);

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
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
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
              href="/content"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-vampire-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              コンテンツに戻る
            </Link>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">開発チュートリアル</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-text-secondary max-w-2xl">
              実践的なプログラミング講座で、スキルアップを目指そう。
              初心者から上級者まで、レベルに合わせたコースを用意。
            </motion.p>

            {/* 統計情報 */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 mt-8 max-w-2xl">
              <div className="text-center">
                <p className="text-3xl font-bold gradient-text">{tutorials.length}</p>
                <p className="text-sm text-text-secondary">コース</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold gradient-text">{totalStudents.toLocaleString()}</p>
                <p className="text-sm text-text-secondary">受講生</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold gradient-text">{totalLessons}</p>
                <p className="text-sm text-text-secondary">レッスン</p>
              </div>
            </motion.div>
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
                placeholder="チュートリアルを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-vampire-shadow/50 border border-vampire-accent/20 rounded-full text-white placeholder-text-secondary focus:outline-none focus:border-vampire-accent transition-colors"
              />
            </div>

            {/* レベルフィルター */}
            <div className="flex flex-wrap gap-2">
              {(Object.entries(levelLabels) as [TutorialLevel, string][]).map(([level, label]) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedLevel === level
                      ? `bg-gradient-to-r ${levelColors[level]} text-white`
                      : "bg-vampire-shadow/30 text-text-secondary hover:bg-vampire-shadow/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* チュートリアルグリッド */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTutorials.map((tutorial) => (
              <motion.div
                key={tutorial.id}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/content/tutorials/${tutorial.id}`}>
                  <div className="bg-vampire-shadow/30 rounded-2xl overflow-hidden border border-vampire-accent/10 transition-all duration-300 hover:border-vampire-accent/30 hover:shadow-xl hover:shadow-vampire-accent/20 h-full flex flex-col">
                    {/* サムネイル */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={tutorial.thumbnail}
                        alt={tutorial.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-vampire-night/80 to-transparent"></div>
                      
                      {/* Featured バッジ */}
                      {tutorial.featured && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-vampire-accent to-purple-600 rounded-full text-xs font-bold text-white flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          おすすめ
                        </div>
                      )}

                      {/* レベルバッジ */}
                      <div className="absolute bottom-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${levelColors[tutorial.level as TutorialLevel]}`}>
                          {levelLabels[tutorial.level as TutorialLevel]}
                        </span>
                      </div>

                      {/* 再生アイコン */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayCircle className="w-16 h-16 text-white/80" />
                      </div>
                    </div>

                    {/* コンテンツ */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* タイトル */}
                      <h3 className="font-bold text-lg mb-2 group-hover:gradient-text transition-all duration-300">
                        {tutorial.title}
                      </h3>

                      {/* 説明 */}
                      <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-1">
                        {tutorial.description}
                      </p>

                      {/* タグ */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tutorial.tags.map((tag, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-vampire-night/50 rounded text-text-secondary">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* メタ情報 */}
                      <div className="grid grid-cols-2 gap-4 text-sm text-text-secondary mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{tutorial.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart className="w-4 h-4" />
                          <span>{tutorial.lessons}レッスン</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{tutorial.students.toLocaleString()}人</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{tutorial.rating}</span>
                        </div>
                      </div>

                      {/* 講師情報 */}
                      <div className="pt-4 border-t border-vampire-accent/10 text-sm text-text-secondary">
                        講師: <span className="text-vampire-accent">{tutorial.instructor}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* 結果がない場合 */}
          {filteredTutorials.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-16"
            >
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
              <p className="text-xl text-text-secondary">
                該当するチュートリアルが見つかりませんでした
              </p>
            </motion.div>
          )}

          {/* 学習パス提案 */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-vampire-shadow/50 backdrop-blur-lg rounded-2xl border border-vampire-accent/20 p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              <span className="gradient-text">おすすめの学習パス</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="font-semibold mb-2">Web開発入門</h4>
                <p className="text-sm text-text-secondary">
                  HTML/CSS → JavaScript → TypeScript基礎
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="font-semibold mb-2">フロントエンド開発</h4>
                <p className="text-sm text-text-secondary">
                  React基礎 → Next.js → 状態管理
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-vampire-blood to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="font-semibold mb-2">フルスタック開発</h4>
                <p className="text-sm text-text-secondary">
                  API設計 → データベース → デプロイ
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default TutorialsPage; 