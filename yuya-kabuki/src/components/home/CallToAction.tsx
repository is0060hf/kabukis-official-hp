"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Github, MessageCircle } from "lucide-react";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-gradient-to-r from-vampire-night via-vampire-shadow to-vampire-night opacity-90"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-vampire-accent/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-vampire-blood/10 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* メインCTA */}
          <div className="mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <div className="p-4 bg-vampire-accent/20 rounded-full">
                <Sparkles className="w-8 h-8 text-vampire-accent" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              一緒に開発の世界を照らそう
            </h2>
            
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              AI技術と開発ツールで、より良い開発体験を。
              <br />
              コミュニティに参加して、最新情報をいち早くゲット！
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/community/discord"
                className="glow-button px-8 py-4 rounded-full text-white font-medium flex items-center justify-center space-x-2 group"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Discordに参加</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="https://github.com/yuya-kabuki"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border-2 border-vampire-accent text-vampire-accent hover:bg-vampire-accent hover:text-white font-medium transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Github className="w-5 h-5" />
                <span>GitHubをフォロー</span>
              </Link>
            </div>
          </div>

          {/* サブCTA */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-6 text-left"
            >
              <h3 className="text-lg font-bold text-text-primary mb-2">
                最新ツールを入手
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                開発効率を劇的に向上させるAIツールを無料で配布中
              </p>
              <Link
                href="/content/tools"
                className="text-vampire-accent text-sm font-medium flex items-center space-x-1 hover:space-x-2 transition-all"
              >
                <span>ツール一覧へ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-6 text-left"
            >
              <h3 className="text-lg font-bold text-text-primary mb-2">
                AI技術を学ぶ
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                最新のAI技術を分かりやすく解説した記事を定期更新
              </p>
              <Link
                href="/content/articles"
                className="text-vampire-accent text-sm font-medium flex items-center space-x-1 hover:space-x-2 transition-all"
              >
                <span>記事を読む</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-6 text-left"
            >
              <h3 className="text-lg font-bold text-text-primary mb-2">
                ビジネス相談
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                AI開発やシステム構築のご相談を承っています
              </p>
              <Link
                href="/studio"
                className="text-vampire-accent text-sm font-medium flex items-center space-x-1 hover:space-x-2 transition-all"
              >
                <span>詳細を見る</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction; 