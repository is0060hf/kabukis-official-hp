"use client";

import { motion } from "framer-motion";
import { Code2, Download, Github, Star, Filter, Search, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// 型定義
type ToolCategory = "cli" | "webapp" | "extension" | "api" | "all";

type Tool = {
  id: number;
  name: string;
  description: string;
  category: ToolCategory;
  downloads: number;
  stars: number;
  githubUrl: string;
  demoUrl?: string;
  tags: string[];
  image: string;
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

const ToolsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // モックデータ - ツール一覧
  const tools: Tool[] = [
    {
      id: 1,
      name: "GitHub Release Downloader",
      description: "GitHubのリリースから自動でアセットをダウンロードするCLIツール",
      category: "cli",
      downloads: 15420,
      stars: 342,
      githubUrl: "https://github.com/yuya-kabuki/gh-release-dl",
      tags: ["GitHub", "CLI", "自動化"],
      image: "/images/tool-gh-release.jpg",
      featured: true,
    },
    {
      id: 2,
      name: "Code Snippet Manager",
      description: "開発でよく使うコードスニペットを管理するWebアプリ",
      category: "webapp",
      downloads: 8930,
      stars: 256,
      githubUrl: "https://github.com/yuya-kabuki/snippet-manager",
      demoUrl: "https://snippet.yuya-kabuki.dev",
      tags: ["Web", "生産性", "管理ツール"],
      image: "/images/tool-snippet.jpg",
    },
    {
      id: 3,
      name: "JSON Formatter Extension",
      description: "ブラウザでJSONを見やすく整形するChrome拡張機能",
      category: "extension",
      downloads: 23100,
      stars: 512,
      githubUrl: "https://github.com/yuya-kabuki/json-formatter",
      tags: ["Chrome拡張", "JSON", "開発支援"],
      image: "/images/tool-json.jpg",
      featured: true,
    },
    {
      id: 4,
      name: "API Response Mock Server",
      description: "開発時のAPIレスポンスをモックするローカルサーバー",
      category: "api",
      downloads: 6780,
      stars: 189,
      githubUrl: "https://github.com/yuya-kabuki/mock-server",
      tags: ["API", "テスト", "開発環境"],
      image: "/images/tool-mock.jpg",
    },
    {
      id: 5,
      name: "Terminal Color Schemes",
      description: "吸血鬼テーマのターミナルカラースキーム集",
      category: "cli",
      downloads: 4560,
      stars: 98,
      githubUrl: "https://github.com/yuya-kabuki/vampire-terminal",
      tags: ["ターミナル", "テーマ", "カスタマイズ"],
      image: "/images/tool-terminal.jpg",
    },
    {
      id: 6,
      name: "Markdown to PDF Converter",
      description: "MarkdownファイルをスタイリッシュなPDFに変換",
      category: "webapp",
      downloads: 11200,
      stars: 334,
      githubUrl: "https://github.com/yuya-kabuki/md-to-pdf",
      demoUrl: "https://md2pdf.yuya-kabuki.dev",
      tags: ["Markdown", "PDF", "変換ツール"],
      image: "/images/tool-md2pdf.jpg",
    },
  ];

  const categoryLabels: Record<ToolCategory, string> = {
    cli: "CLIツール",
    webapp: "Webアプリ",
    extension: "拡張機能",
    api: "API/サーバー",
    all: "すべて",
  };

  const categoryColors: Record<ToolCategory, string> = {
    cli: "from-green-500 to-emerald-600",
    webapp: "from-blue-500 to-indigo-600",
    extension: "from-purple-500 to-pink-600",
    api: "from-orange-500 to-red-600",
    all: "from-gray-600 to-gray-700",
  };

  // フィルタリングロジック
  const filteredTools = tools.filter((tool) => {
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
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
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-vampire-accent/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
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
              <span className="gradient-text">便利ツール</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-text-secondary max-w-2xl">
              開発効率を上げる自作ツール集。
              CLIツールからWebアプリまで、オープンソースで公開中。
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
                placeholder="ツールを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-vampire-shadow/50 border border-vampire-accent/20 rounded-full text-white placeholder-text-secondary focus:outline-none focus:border-vampire-accent transition-colors"
              />
            </div>

            {/* カテゴリーフィルター */}
            <div className="flex flex-wrap gap-2">
              {(Object.entries(categoryLabels) as [ToolCategory, string][]).map(([category, label]) => (
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

          {/* ツールグリッド */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.id}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-vampire-shadow/30 rounded-2xl overflow-hidden border border-vampire-accent/10 transition-all duration-300 hover:border-vampire-accent/30 hover:shadow-xl hover:shadow-vampire-accent/20 h-full flex flex-col">
                  {/* サムネイル */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={tool.image}
                      alt={tool.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vampire-night/80 to-transparent"></div>
                    
                    {/* Featured バッジ */}
                    {tool.featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-vampire-accent to-purple-600 rounded-full text-xs font-bold text-white">
                        FEATURED
                      </div>
                    )}

                    {/* カテゴリーバッジ */}
                    <div className="absolute bottom-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColors[tool.category as ToolCategory]}`}>
                        {categoryLabels[tool.category as ToolCategory]}
                      </span>
                    </div>
                  </div>

                  {/* コンテンツ */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* タイトル */}
                    <h3 className="font-bold text-lg mb-2 group-hover:gradient-text transition-all duration-300">
                      {tool.name}
                    </h3>

                    {/* 説明 */}
                    <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-1">
                      {tool.description}
                    </p>

                    {/* タグ */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tool.tags.map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-vampire-night/50 rounded text-text-secondary">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 統計情報 */}
                    <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                      <span className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {tool.downloads.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {tool.stars.toLocaleString()}
                      </span>
                    </div>

                    {/* アクションボタン */}
                    <div className="flex gap-2">
                      <a
                        href={tool.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-vampire-accent/20 hover:bg-vampire-accent/30 rounded-lg text-center text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                      {tool.demoUrl && (
                        <a
                          href={tool.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 bg-vampire-blood/20 hover:bg-vampire-blood/30 rounded-lg text-center text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          デモ
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 結果がない場合 */}
          {filteredTools.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-16"
            >
              <Code2 className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
              <p className="text-xl text-text-secondary">
                該当するツールが見つかりませんでした
              </p>
            </motion.div>
          )}

          {/* CTA セクション */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center bg-vampire-shadow/50 backdrop-blur-lg rounded-2xl border border-vampire-accent/20 p-8"
          >
            <h3 className="text-2xl font-bold mb-4">ツールのリクエスト受付中！</h3>
            <p className="text-text-secondary mb-6">
              欲しいツールのアイデアがあれば、GitHubのIssueで教えてください。
              一緒に便利なツールを作りましょう！
            </p>
            <a
              href="https://github.com/yuya-kabuki"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-button px-8 py-3 rounded-full text-white font-medium inline-flex items-center justify-center gap-2"
            >
              <Github className="w-5 h-5" />
              GitHubでリクエスト
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ToolsPage; 