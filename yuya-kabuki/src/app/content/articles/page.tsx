"use client";

import { motion } from "framer-motion";
import { FileText, Clock, Eye, Tag, Search, ArrowLeft, BookOpen, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// 型定義
type ArticleCategory = "ai-basics" | "implementation" | "news" | "tips" | "all";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  publishedAt: string;
  readTime: number;
  views: number;
  tags: string[];
  thumbnail: string;
  trending?: boolean;
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

const ArticlesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // モックデータ - 記事一覧
  const articles: Article[] = [
    {
      id: 1,
      title: "GPT-4 Vision API完全ガイド：画像認識の実装方法",
      excerpt: "OpenAIの最新画像認識APIを使った実装方法を、サンプルコード付きで詳しく解説します。",
      category: "implementation",
      publishedAt: "2024-01-20",
      readTime: 15,
      views: 8920,
      tags: ["GPT-4", "Vision API", "画像認識"],
      thumbnail: "/images/article-gpt4v.jpg",
      trending: true,
    },
    {
      id: 2,
      title: "初心者向け：ChatGPT APIの基本的な使い方",
      excerpt: "ChatGPT APIを初めて使う方向けに、セットアップから基本的な実装まで丁寧に解説します。",
      category: "ai-basics",
      publishedAt: "2024-01-18",
      readTime: 10,
      views: 12500,
      tags: ["ChatGPT", "API", "初心者向け"],
      thumbnail: "/images/article-chatgpt-basics.jpg",
    },
    {
      id: 3,
      title: "【速報】Google Gemini Pro APIリリース！主要機能まとめ",
      excerpt: "Googleの最新AI「Gemini Pro」のAPIがついにリリース。その機能と特徴を速報でお届けします。",
      category: "news",
      publishedAt: "2024-01-16",
      readTime: 8,
      views: 15300,
      tags: ["Google", "Gemini", "ニュース"],
      thumbnail: "/images/article-gemini.jpg",
      trending: true,
    },
    {
      id: 4,
      title: "プロンプトエンジニアリング：効果的なプロンプトの書き方",
      excerpt: "AIから最適な回答を引き出すための、プロンプト設計のテクニックとベストプラクティスを紹介。",
      category: "tips",
      publishedAt: "2024-01-14",
      readTime: 12,
      views: 9800,
      tags: ["プロンプト", "ChatGPT", "テクニック"],
      thumbnail: "/images/article-prompt.jpg",
    },
    {
      id: 5,
      title: "LangChain入門：AIアプリケーション開発の新定番",
      excerpt: "LangChainを使った効率的なAIアプリケーション開発の方法を、実例を交えて解説します。",
      category: "implementation",
      publishedAt: "2024-01-12",
      readTime: 20,
      views: 7650,
      tags: ["LangChain", "開発", "フレームワーク"],
      thumbnail: "/images/article-langchain.jpg",
    },
    {
      id: 6,
      title: "AI倫理入門：開発者が知るべき重要なポイント",
      excerpt: "AI開発において考慮すべき倫理的な課題と、その対処方法について解説します。",
      category: "ai-basics",
      publishedAt: "2024-01-10",
      readTime: 18,
      views: 5420,
      tags: ["AI倫理", "開発", "基礎知識"],
      thumbnail: "/images/article-ethics.jpg",
    },
  ];

  const categoryLabels: Record<ArticleCategory, string> = {
    "ai-basics": "AI基礎",
    "implementation": "実装ガイド",
    "news": "ニュース",
    "tips": "Tips & Tricks",
    "all": "すべて",
  };

  const categoryColors: Record<ArticleCategory, string> = {
    "ai-basics": "from-blue-500 to-indigo-600",
    "implementation": "from-green-500 to-emerald-600",
    "news": "from-vampire-blood to-red-600",
    "tips": "from-purple-500 to-pink-600",
    "all": "from-gray-600 to-gray-700",
  };

  // フィルタリングロジック
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // 人気記事（ビュー数順）
  const popularArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 3);

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
              href="/content"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-vampire-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              コンテンツに戻る
            </Link>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">AI解説記事</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-text-secondary max-w-2xl">
              最新のAI技術から基礎知識まで、わかりやすく解説。
              開発に役立つ実践的な情報をお届けします。
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* メインコンテンツ */}
            <div className="lg:col-span-2">
              {/* フィルター＆検索 */}
              <motion.div
                variants={itemVariants}
                className="mb-8 space-y-4"
              >
                {/* 検索バー */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="記事を検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-vampire-shadow/50 border border-vampire-accent/20 rounded-full text-white placeholder-text-secondary focus:outline-none focus:border-vampire-accent transition-colors"
                  />
                </div>

                {/* カテゴリーフィルター */}
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(categoryLabels) as [ArticleCategory, string][]).map(([category, label]) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? `bg-gradient-to-r ${categoryColors[category]} text-white`
                          : "bg-vampire-shadow/30 text-text-secondary hover:bg-vampire-shadow/50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* 記事リスト */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {filteredArticles.map((article) => (
                  <motion.article
                    key={article.id}
                    variants={itemVariants}
                    className="group"
                  >
                    <Link href={`/content/articles/${article.id}`}>
                      <div className="bg-vampire-shadow/30 rounded-2xl overflow-hidden border border-vampire-accent/10 transition-all duration-300 hover:border-vampire-accent/30 hover:shadow-xl hover:shadow-vampire-accent/20">
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* サムネイル */}
                          <div className="relative aspect-video md:aspect-square overflow-hidden">
                            <Image
                              src={article.thumbnail}
                              alt={article.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-vampire-night/60 to-transparent md:bg-gradient-to-r"></div>
                            
                            {/* Trending バッジ */}
                            {article.trending && (
                              <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-vampire-blood to-red-600 rounded-full text-xs font-bold text-white flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                TRENDING
                              </div>
                            )}
                          </div>

                          {/* コンテンツ */}
                          <div className="md:col-span-2 p-6">
                            {/* カテゴリーと日付 */}
                            <div className="flex items-center gap-4 mb-3 text-sm">
                              <span className={`px-3 py-1 rounded-full text-white bg-gradient-to-r ${categoryColors[article.category as ArticleCategory]}`}>
                                {categoryLabels[article.category as ArticleCategory]}
                              </span>
                              <span className="text-text-secondary">
                                {new Date(article.publishedAt).toLocaleDateString("ja-JP")}
                              </span>
                            </div>

                            {/* タイトル */}
                            <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                              {article.title}
                            </h3>

                            {/* 抜粋 */}
                            <p className="text-text-secondary mb-4 line-clamp-2">
                              {article.excerpt}
                            </p>

                            {/* メタ情報 */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-text-secondary">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {article.readTime}分で読了
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {article.views.toLocaleString()}回閲覧
                                </span>
                              </div>

                              {/* タグ */}
                              <div className="hidden md:flex gap-2">
                                {article.tags.slice(0, 2).map((tag, index) => (
                                  <span key={index} className="text-xs px-2 py-1 bg-vampire-night/50 rounded text-text-secondary">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>

              {/* 結果がない場合 */}
              {filteredArticles.length === 0 && (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-16"
                >
                  <FileText className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
                  <p className="text-xl text-text-secondary">
                    該当する記事が見つかりませんでした
                  </p>
                </motion.div>
              )}
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1 space-y-6">
              {/* 人気記事 */}
              <motion.div
                variants={itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 p-6"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-vampire-accent" />
                  人気記事
                </h3>
                <div className="space-y-4">
                  {popularArticles.map((article, index) => (
                    <Link key={article.id} href={`/content/articles/${article.id}`}>
                      <div className="group cursor-pointer">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl font-bold text-vampire-accent/50">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1 group-hover:text-vampire-accent transition-colors">
                              {article.title}
                            </h4>
                            <p className="text-xs text-text-secondary flex items-center gap-2">
                              <Eye className="w-3 h-3" />
                              {article.views.toLocaleString()}回閲覧
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* タグクラウド */}
              <motion.div
                variants={itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 p-6"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-vampire-accent" />
                  人気のタグ
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["GPT-4", "ChatGPT", "LangChain", "プロンプト", "画像認識", "API", "初心者向け", "実装ガイド"].map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1 bg-vampire-night/50 hover:bg-vampire-accent/20 rounded-full text-sm text-text-secondary hover:text-white transition-all duration-300"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-vampire-accent to-purple-600 rounded-2xl p-6 text-white"
              >
                <BookOpen className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">記事のリクエスト</h3>
                <p className="text-sm mb-4 opacity-90">
                  解説してほしいAI技術や実装方法があれば、お気軽にリクエストください！
                </p>
                <Link
                  href="/community/feedback"
                  className="inline-block px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  リクエストする
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ArticlesPage; 