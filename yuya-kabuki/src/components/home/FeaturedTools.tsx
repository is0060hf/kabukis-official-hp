"use client";

import { motion } from "framer-motion";
import { Download, Star, GitBranch, Terminal, Code2, Zap } from "lucide-react";
import Link from "next/link";

// モックデータ
const mockTools = [
  {
    id: 1,
    name: "AI Code Assistant",
    description: "GPT-4を活用したインテリジェントなコード補完ツール。コメントから関数を自動生成。",
    category: "AI開発",
    downloads: 5420,
    stars: 892,
    icon: <Code2 className="w-8 h-8" />,
    gradient: "from-vampire-accent to-purple-600",
  },
  {
    id: 2,
    name: "Git Branch Manager",
    description: "複雑なGitブランチを視覚的に管理。AIが最適なマージ戦略を提案します。",
    category: "Git",
    downloads: 3150,
    stars: 567,
    icon: <GitBranch className="w-8 h-8" />,
    gradient: "from-vampire-blood to-red-600",
  },
  {
    id: 3,
    name: "Terminal Enhancer",
    description: "ターミナルを高機能化。自然言語でコマンドを実行できる革新的ツール。",
    category: "CLI",
    downloads: 4230,
    stars: 724,
    icon: <Terminal className="w-8 h-8" />,
    gradient: "from-vampire-shadow to-gray-600",
  },
];

const FeaturedTools = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockTools.map((tool, index) => (
        <motion.div
          key={tool.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link href={`/content/tools/${tool.id}`}>
            <motion.div
              className="group glass-card rounded-xl p-6 h-full flex flex-col hover:border-vampire-accent/40 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              {/* アイコン */}
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${tool.gradient} p-3 mb-4 text-white`}>
                {tool.icon}
              </div>

              {/* ツール情報 */}
              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-vampire-accent transition-colors">
                {tool.name}
              </h3>
              <p className="text-text-secondary text-sm mb-4 flex-grow">
                {tool.description}
              </p>

              {/* カテゴリタグ */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-vampire-accent/10 text-vampire-accent text-xs rounded-full">
                  {tool.category}
                </span>
              </div>

              {/* 統計情報 */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1 text-text-secondary">
                    <Download className="w-4 h-4" />
                    <span>{tool.downloads.toLocaleString()}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-text-secondary">
                    <Star className="w-4 h-4" />
                    <span>{tool.stars.toLocaleString()}</span>
                  </span>
                </div>
                <motion.div
                  className="text-vampire-accent opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                >
                  <Zap className="w-5 h-5" />
                </motion.div>
              </div>

              {/* ホバー時のグロー効果 */}
              <div className="absolute inset-0 rounded-xl bg-vampire-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedTools; 