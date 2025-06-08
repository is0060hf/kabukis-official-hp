"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen, Brain, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// モックデータ
const mockArticles = [
  {
    id: 1,
    title: "GPT-4 Vision APIを使った画像解析アプリの作り方",
    excerpt: "最新のGPT-4 Vision APIを活用して、画像から情報を抽出し、自動的にタグ付けや説明文を生成するアプリケーションの実装方法を解説します。",
    category: "AI開発",
    readTime: "15分",
    publishedAt: "2024-01-15",
    thumbnail: "/images/articles/gpt4-vision.jpg",
    icon: <Brain className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Next.js 14のServer Actionsを完全理解する",
    excerpt: "Server Actionsの仕組みから実践的な使い方まで、具体的なコード例を交えながら詳しく解説。フォーム処理やデータ更新を劇的に簡単に。",
    category: "Web開発",
    readTime: "20分",
    publishedAt: "2024-01-12",
    thumbnail: "/images/articles/nextjs-server-actions.jpg",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "LangChainで作るAIエージェント入門",
    excerpt: "LangChainを使って、複数のツールを組み合わせた高度なAIエージェントを構築する方法を、実際のコード例とともに解説します。",
    category: "AI開発",
    readTime: "25分",
    publishedAt: "2024-01-10",
    thumbnail: "/images/articles/langchain-agent.jpg",
    icon: <BookOpen className="w-5 h-5" />,
  },
];

const LatestContent = () => {
  return (
    <div className="space-y-6">
      {mockArticles.map((article, index) => (
        <motion.article
          key={article.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link href={`/content/articles/${article.id}`}>
            <motion.div
              className="group glass-card rounded-xl overflow-hidden hover:border-vampire-accent/40 transition-all duration-300"
              whileHover={{ x: 5 }}
            >
              <div className="flex flex-col md:flex-row">
                {/* サムネイル */}
                <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-vampire-shadow/20">
                  <Image
                    src={article.thumbnail}
                    alt={`${article.title}のサムネイル画像`}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-vampire-night/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 bg-vampire-accent/20 backdrop-blur rounded-lg text-vampire-accent">
                    {article.icon}
                  </div>
                </div>

                {/* コンテンツ */}
                <div className="flex-1 p-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="inline-block px-3 py-1 bg-vampire-accent/10 text-vampire-accent text-xs rounded-full">
                      {article.category}
                    </span>
                    <span className="flex items-center space-x-1 text-text-secondary text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(article.publishedAt).toLocaleDateString('ja-JP')}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-text-secondary text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-vampire-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center text-vampire-accent">
                    <span className="text-sm font-medium">続きを読む</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>

              {/* ホバー時のグロー効果 */}
              <div className="absolute inset-0 bg-vampire-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </motion.div>
          </Link>
        </motion.article>
      ))}

      {/* もっと見るボタン */}
      <motion.div
        className="text-center pt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <Link
          href="/content/articles"
          className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-vampire-accent text-vampire-accent hover:bg-vampire-accent hover:text-white rounded-full transition-all duration-300"
        >
          <span>すべての記事を見る</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
};

export default LatestContent; 