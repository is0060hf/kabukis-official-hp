"use client";

import { motion } from "framer-motion";
import { MessageCircle, Users, Hash, Shield, Zap, Book, ArrowLeft, ExternalLink, Code2 } from "lucide-react";
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

const DiscordPage = () => {
  // チャンネル情報
  const channels = [
    {
      category: "はじめに",
      icon: <Book className="w-5 h-5" />,
      channels: [
        { name: "welcome", description: "サーバーへようこそ！まずはここから" },
        { name: "rules", description: "コミュニティルールを確認" },
        { name: "self-introduction", description: "自己紹介をしよう" },
      ],
    },
    {
      category: "開発",
      icon: <Code2 className="w-5 h-5" />,
      channels: [
        { name: "general-dev", description: "開発全般の話題" },
        { name: "questions", description: "質問・相談はこちら" },
        { name: "showcase", description: "作品を共有しよう" },
        { name: "code-review", description: "コードレビューをお願い" },
      ],
    },
    {
      category: "配信・コンテンツ",
      icon: <Zap className="w-5 h-5" />,
      channels: [
        { name: "stream-notification", description: "配信通知" },
        { name: "content-discussion", description: "コンテンツの感想・議論" },
        { name: "requests", description: "リクエスト・要望" },
      ],
    },
    {
      category: "雑談",
      icon: <MessageCircle className="w-5 h-5" />,
      channels: [
        { name: "general-chat", description: "なんでも雑談" },
        { name: "off-topic", description: "開発以外の話題" },
        { name: "memes", description: "ミーム・ネタ画像" },
      ],
    },
  ];

  // サーバールール
  const rules = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "相互尊重",
      description: "すべてのメンバーを尊重し、建設的なコミュニケーションを心がけましょう",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "初心者歓迎",
      description: "どんな質問も歓迎です。みんなで助け合いながら成長しましょう",
    },
    {
      icon: <Hash className="w-6 h-6" />,
      title: "適切なチャンネル利用",
      description: "話題に応じて適切なチャンネルを使い分けましょう",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "スパム禁止",
      description: "過度な宣伝や無関係なリンクの投稿は控えてください",
    },
  ];

  // 特典
  const benefits = [
    "限定の開発Tips共有",
    "先行アクセス・ベータテスト参加",
    "月例オンライン勉強会",
    "1on1コードレビュー（抽選）",
    "限定ロールと特別チャンネル",
    "コミュニティイベント参加",
  ];

  return (
    <div className="min-h-screen bg-vampire-night pt-24">
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 背景装飾 - Discord風のカラー */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#5865F2]/10 to-vampire-night/90"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5865F2]/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
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
              href="/community"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-vampire-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              コミュニティに戻る
            </Link>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Discord コミュニティ</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-text-secondary max-w-2xl">
              開発者が集まる活発なコミュニティ。
              質問、知識共有、コラボレーションを通じて一緒に成長しましょう！
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* メインコンテンツ */}
            <div className="lg:col-span-2 space-y-8">
              {/* サーバー概要 */}
              <motion.div
                variants={itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 p-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-[#5865F2]" />
                  サーバー概要
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-text-secondary mb-4">
                      傾奇ユウヤのDiscordサーバーは、開発者同士が交流し、
                      お互いに学び合える場所です。初心者から上級者まで、
                      すべてのレベルの開発者を歓迎します。
                    </p>
                    <p className="text-text-secondary">
                      プログラミングの質問、プロジェクトの共有、
                      技術トレンドの議論など、開発に関するあらゆる話題を
                      楽しむことができます。
                    </p>
                  </div>
                  <div className="bg-vampire-night/50 rounded-xl p-6">
                    <h3 className="font-semibold mb-4">サーバー統計</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">メンバー数</span>
                        <span className="font-medium">5,000+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">アクティブメンバー</span>
                        <span className="font-medium">1,200+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">チャンネル数</span>
                        <span className="font-medium">25+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">月間メッセージ</span>
                        <span className="font-medium">50,000+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* チャンネル一覧 */}
              <motion.div
                variants={itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 p-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Hash className="w-6 h-6 text-[#5865F2]" />
                  チャンネル構成
                </h2>
                <div className="space-y-6">
                  {channels.map((category, index) => (
                    <div key={index}>
                      <h3 className="font-semibold mb-3 flex items-center gap-2 text-vampire-accent">
                        {category.icon}
                        {category.category}
                      </h3>
                      <div className="space-y-2 ml-7">
                        {category.channels.map((channel, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Hash className="w-4 h-4 text-text-secondary mt-0.5" />
                            <div>
                              <span className="font-medium">{channel.name}</span>
                              <p className="text-sm text-text-secondary">{channel.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* コミュニティルール */}
              <motion.div
                variants={itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 p-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-[#5865F2]" />
                  コミュニティルール
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {rules.map((rule, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#5865F2]/20 rounded-lg flex items-center justify-center text-[#5865F2]">
                        {rule.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{rule.title}</h3>
                        <p className="text-sm text-text-secondary">{rule.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1 space-y-6">
              {/* 参加ボタン */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-[#5865F2] to-[#4752C4] rounded-2xl p-6 text-white text-center"
              >
                <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">今すぐ参加しよう！</h3>
                <p className="text-sm mb-6 opacity-90">
                  5,000人以上の開発者が待っています
                </p>
                <a
                  href="https://discord.gg/yuya-kabuki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full font-medium transition-all duration-300"
                >
                  <ExternalLink className="w-5 h-5" />
                  Discordに参加
                </a>
              </motion.div>

              {/* メンバー特典 */}
              <motion.div
                variants={itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 p-6"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-vampire-accent" />
                  メンバー特典
                </h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-vampire-accent rounded-full mt-1.5 flex-shrink-0"></span>
                      <span className="text-text-secondary">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* FAQ */}
              <motion.div
                variants={itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 p-6"
              >
                <h3 className="text-xl font-bold mb-4">よくある質問</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-1">参加は無料ですか？</p>
                    <p className="text-sm text-text-secondary">
                      はい、完全無料で参加できます。
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">初心者でも大丈夫？</p>
                    <p className="text-sm text-text-secondary">
                      もちろん！初心者専用チャンネルもあります。
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">質問はどこですれば？</p>
                    <p className="text-sm text-text-secondary">
                      #questionsチャンネルで気軽に質問してください。
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default DiscordPage; 