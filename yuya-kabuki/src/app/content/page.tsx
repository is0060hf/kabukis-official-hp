"use client";

import { motion } from "framer-motion";
import { Code2, FileText, GraduationCap, Download, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

const ContentPage = () => {
  // コンテンツカテゴリー
  const categories = [
    {
      title: "便利ツール",
      description: "開発効率を上げる自作ツール集",
      icon: <Code2 className="w-8 h-8" />,
      href: "/content/tools",
      color: "from-vampire-accent to-purple-600",
      stats: { label: "ツール数", value: "50+" },
      featured: [
        "GitHub Release Downloader",
        "Code Snippet Manager",
        "API Response Formatter",
      ],
    },
    {
      title: "AI解説記事",
      description: "最新AI技術をわかりやすく解説",
      icon: <FileText className="w-8 h-8" />,
      href: "/content/articles",
      color: "from-vampire-blood to-red-600",
      stats: { label: "記事数", value: "100+" },
      featured: [
        "GPT-4 Vision API完全ガイド",
        "LangChain入門",
        "プロンプトエンジニアリング",
      ],
    },
    {
      title: "開発チュートリアル",
      description: "実践的なプログラミング講座",
      icon: <GraduationCap className="w-8 h-8" />,
      href: "/content/tutorials",
      color: "from-blue-500 to-cyan-600",
      stats: { label: "講座数", value: "30+" },
      featured: [
        "Next.js 14完全入門",
        "TypeScript実践ガイド",
        "React Hooks深掘り",
      ],
    },
  ];

  // 人気コンテンツ
  const popularContent = [
    {
      title: "YouTube動画ダウンローダー",
      type: "tool",
      downloads: 15420,
      rating: 4.8,
      image: "/images/tool-1.jpg",
    },
    {
      title: "ChatGPT API活用完全ガイド",
      type: "article",
      views: 28900,
      rating: 4.9,
      image: "/images/article-1.jpg",
    },
    {
      title: "React + TypeScript実践講座",
      type: "tutorial",
      students: 5200,
      rating: 4.7,
      image: "/images/tutorial-1.jpg",
    },
  ];

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
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-vampire-blood/20 rounded-full filter blur-[100px] animate-pulse-slow animation-delay-300"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* ヘッダー */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">コンテンツ</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-text-secondary max-w-2xl mx-auto">
              開発に役立つツール、AI技術の解説記事、実践的なチュートリアルまで。
              吸血鬼VTuberが作る開発者のためのコンテンツ集。
            </motion.p>
          </motion.div>

          {/* カテゴリーカード */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {categories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link href={category.href}>
                  <div className="group relative overflow-hidden rounded-2xl bg-vampire-shadow/30 border border-vampire-accent/10 p-8 transition-all duration-300 hover:border-vampire-accent/30 hover:shadow-xl hover:shadow-vampire-accent/20 h-full">
                    {/* 背景グラデーション */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                    {/* アイコン */}
                    <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${category.color} text-white mb-4`}>
                      {category.icon}
                    </div>

                    {/* コンテンツ */}
                    <h3 className="text-2xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                      {category.title}
                    </h3>
                    <p className="text-text-secondary mb-4">{category.description}</p>

                    {/* 人気コンテンツ */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2 text-text-secondary">人気の{category.title}:</p>
                      <ul className="space-y-1">
                        {category.featured.map((item, i) => (
                          <li key={i} className="text-sm text-text-secondary flex items-center gap-2">
                            <span className="w-1 h-1 bg-vampire-accent rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 統計情報 */}
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary text-sm">{category.stats.label}</span>
                      <span className={`font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                        {category.stats.value}
                      </span>
                    </div>

                    {/* 矢印アイコン */}
                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-6 h-6 text-vampire-accent" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* 人気コンテンツセクション */}
          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="gradient-text">今週の人気コンテンツ</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {popularContent.map((content, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-vampire-shadow/30 rounded-2xl overflow-hidden border border-vampire-accent/10 hover:border-vampire-accent/30 transition-all duration-300"
                >
                  {/* サムネイル */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={content.image}
                      alt={content.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vampire-night/80 to-transparent"></div>
                    
                    {/* タイプバッジ */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                        content.type === "tool" ? "bg-gradient-to-r from-vampire-accent to-purple-600" :
                        content.type === "article" ? "bg-gradient-to-r from-vampire-blood to-red-600" :
                        "bg-gradient-to-r from-blue-500 to-cyan-600"
                      }`}>
                        {content.type === "tool" ? "ツール" :
                         content.type === "article" ? "記事" :
                         "チュートリアル"}
                      </span>
                    </div>
                  </div>

                  {/* コンテンツ情報 */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-3">{content.title}</h3>
                    
                    <div className="flex items-center justify-between text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        {content.type === "tool" && (
                          <>
                            <Download className="w-4 h-4" />
                            <span>{content.downloads?.toLocaleString()}回</span>
                          </>
                        )}
                        {content.type === "article" && (
                          <>
                            <FileText className="w-4 h-4" />
                            <span>{content.views?.toLocaleString()}回閲覧</span>
                          </>
                        )}
                        {content.type === "tutorial" && (
                          <>
                            <GraduationCap className="w-4 h-4" />
                            <span>{content.students?.toLocaleString()}人受講</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{content.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA セクション */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-vampire-shadow/50 backdrop-blur-lg rounded-2xl border border-vampire-accent/20 p-12"
          >
            <h3 className="text-2xl font-bold mb-4">開発者のためのコンテンツを毎週更新中！</h3>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              最新のAI技術解説から実践的な開発ツールまで、
              あなたの開発をサポートするコンテンツを提供しています。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/content/tools"
                className="glow-button px-8 py-3 rounded-full text-white font-medium inline-flex items-center justify-center gap-2"
              >
                <Code2 className="w-5 h-5" />
                ツールを探す
              </Link>
              <Link
                href="/content/articles"
                className="px-8 py-3 rounded-full border-2 border-vampire-accent text-vampire-accent hover:bg-vampire-accent hover:text-white font-medium transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                記事を読む
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContentPage; 