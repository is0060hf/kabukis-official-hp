"use client";

import { motion } from "framer-motion";
import { Users, MessageCircle, Heart, Github, Twitter, Youtube, ArrowRight } from "lucide-react";
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

const CommunityPage = () => {
  // コミュニティ統計
  const stats = {
    discord: "5,000+",
    youtube: "10K+",
    github: "1,000+",
    twitter: "3,000+",
  };

  // コミュニティセクション
  const sections = [
    {
      title: "Discord コミュニティ",
      description: "開発者が集まる活発なコミュニティ。質問・雑談・コラボレーション歓迎！",
      icon: <MessageCircle className="w-8 h-8" />,
      href: "/community/discord",
      color: "from-[#5865F2] to-[#4752C4]",
      features: [
        "初心者歓迎の質問チャンネル",
        "開発者同士の交流",
        "限定イベント・勉強会",
        "最新情報の共有",
      ],
    },
    {
      title: "フィードバック & リクエスト",
      description: "ツールの改善案や新しいコンテンツのリクエストをお待ちしています！",
      icon: <Heart className="w-8 h-8" />,
      href: "/community/feedback",
      color: "from-vampire-accent to-purple-600",
      features: [
        "機能リクエスト",
        "バグ報告",
        "コンテンツの提案",
        "改善アイデア",
      ],
    },
  ];

  // ソーシャルリンク
  const socialLinks = [
    {
      name: "YouTube",
      icon: <Youtube className="w-6 h-6" />,
      href: "https://youtube.com/@yuya-kabuki",
      color: "hover:text-red-500",
      followers: stats.youtube,
    },
    {
      name: "GitHub",
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com/yuya-kabuki",
      color: "hover:text-gray-400",
      followers: stats.github,
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      href: "https://twitter.com/yuya_kabuki",
      color: "hover:text-blue-400",
      followers: stats.twitter,
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
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[100px] animate-pulse-slow animation-delay-300"></div>
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
              <span className="gradient-text">コミュニティ</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-text-secondary max-w-2xl mx-auto">
              開発者コミュニティに参加して、一緒に学び、成長しよう。
              質問、アイデア共有、コラボレーションを歓迎します！
            </motion.p>
          </motion.div>

          {/* メインセクション */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            {sections.map((section, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link href={section.href}>
                  <div className="group relative overflow-hidden rounded-2xl bg-vampire-shadow/30 border border-vampire-accent/10 p-8 transition-all duration-300 hover:border-vampire-accent/30 hover:shadow-xl hover:shadow-vampire-accent/20 h-full">
                    {/* 背景グラデーション */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                    {/* アイコン */}
                    <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${section.color} text-white mb-6`}>
                      {section.icon}
                    </div>

                    {/* コンテンツ */}
                    <h3 className="text-2xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                      {section.title}
                    </h3>
                    <p className="text-text-secondary mb-6">
                      {section.description}
                    </p>

                    {/* 特徴リスト */}
                    <ul className="space-y-2 mb-6">
                      {section.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                          <span className="w-1.5 h-1.5 bg-vampire-accent rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* 矢印アイコン */}
                    <div className="flex items-center gap-2 text-vampire-accent group-hover:gap-4 transition-all duration-300">
                      <span className="font-medium">詳しく見る</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* コミュニティ統計 */}
          <motion.div
            variants={itemVariants}
            className="mb-16 bg-vampire-shadow/50 backdrop-blur-lg rounded-2xl border border-vampire-accent/20 p-8"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">
              <span className="gradient-text">コミュニティの規模</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{stats.discord}</div>
                <p className="text-sm text-text-secondary">Discord メンバー</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{stats.youtube}</div>
                <p className="text-sm text-text-secondary">YouTube 登録者</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{stats.github}</div>
                <p className="text-sm text-text-secondary">GitHub スター</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{stats.twitter}</div>
                <p className="text-sm text-text-secondary">Twitter フォロワー</p>
              </div>
            </div>
          </motion.div>

          {/* ソーシャルメディア */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-8">
              <span className="gradient-text">ソーシャルメディアでつながろう</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 px-6 py-3 bg-vampire-shadow/30 rounded-xl border border-vampire-accent/10 transition-all duration-300 hover:border-vampire-accent/30 ${social.color}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                  <div className="text-left">
                    <p className="font-medium">{social.name}</p>
                    <p className="text-xs text-text-secondary">{social.followers}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* コミュニティガイドライン */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center bg-gradient-to-br from-vampire-accent/20 to-purple-600/20 rounded-2xl p-12 border border-vampire-accent/20"
          >
            <Users className="w-16 h-16 mx-auto mb-6 text-vampire-accent" />
            <h3 className="text-3xl font-bold mb-4">みんなで作る開発者コミュニティ</h3>
            <p className="text-text-secondary max-w-2xl mx-auto mb-8">
              初心者からベテランまで、すべての開発者を歓迎します。
              お互いを尊重し、助け合いながら成長できるコミュニティを目指しています。
            </p>
            <Link
              href="/community/discord"
              className="glow-button px-8 py-3 rounded-full text-white font-medium inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Discordに参加する
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default CommunityPage; 