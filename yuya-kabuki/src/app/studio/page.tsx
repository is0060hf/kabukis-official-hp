"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Rocket, ArrowRight, Check } from "lucide-react";
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

const StudioPage = () => {
  // サービス一覧
  const services = [
    {
      title: "制作実績",
      description: "過去のプロジェクトとクライアントワーク",
      icon: <Palette className="w-8 h-8" />,
      href: "/studio/works",
      features: ["Webアプリケーション", "AIツール開発", "システム設計"],
    },
    {
      title: "サービス",
      description: "提供可能な開発・コンサルティングサービス",
      icon: <Code2 className="w-8 h-8" />,
      href: "/studio/services",
      features: ["フルスタック開発", "技術コンサルティング", "プロトタイプ制作"],
    },
    {
      title: "お問い合わせ",
      description: "プロジェクトのご相談・お見積もり",
      icon: <Rocket className="w-8 h-8" />,
      href: "/studio/contact",
      features: ["無料相談", "柔軟な対応", "迅速なレスポンス"],
    },
  ];

  // 実績統計
  const stats = [
    { label: "完了プロジェクト", value: "50+" },
    { label: "満足度", value: "98%" },
    { label: "継続率", value: "85%" },
    { label: "対応技術", value: "20+" },
  ];

  // 主要クライアント（モック）
  const clients = [
    { name: "Tech Corp", logo: "/images/client-1.png" },
    { name: "AI Solutions", logo: "/images/client-2.png" },
    { name: "StartUp X", logo: "/images/client-3.png" },
    { name: "Digital Agency", logo: "/images/client-4.png" },
  ];

  return (
    <div className="min-h-screen bg-vampire-night pt-24">
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 背景装飾 - よりプロフェッショナルな雰囲気 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-vampire-night via-vampire-shadow/50 to-vampire-night"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-vampire-accent/10 rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-vampire-blood/10 rounded-full filter blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* ヘッダー */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 bg-vampire-accent/20 text-vampire-accent rounded-full text-sm font-medium">
                PROFESSIONAL SERVICES
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6">
              Kabuki <span className="gradient-text">Studio</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-text-secondary max-w-3xl mx-auto">
              最新技術を駆使したWeb開発・AIソリューション・技術コンサルティング。
              あなたのビジネスを次のレベルへ。
            </motion.p>
          </motion.div>

          {/* 統計情報 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center bg-vampire-shadow/30 rounded-xl p-6 border border-vampire-accent/10"
              >
                <p className="text-3xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* サービスカード */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link href={service.href}>
                  <div className="group relative overflow-hidden rounded-2xl bg-vampire-shadow/30 border border-vampire-accent/10 p-8 transition-all duration-300 hover:border-vampire-accent/30 hover:shadow-xl hover:shadow-vampire-accent/20 h-full">
                    {/* アイコン */}
                    <div className="inline-flex p-4 rounded-lg bg-gradient-to-br from-vampire-accent to-purple-600 text-white mb-6">
                      {service.icon}
                    </div>

                    {/* コンテンツ */}
                    <h3 className="text-2xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary mb-6">
                      {service.description}
                    </p>

                    {/* 特徴リスト */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                          <Check className="w-4 h-4 text-vampire-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* 矢印 */}
                    <div className="flex items-center gap-2 text-vampire-accent group-hover:gap-4 transition-all duration-300">
                      <span className="font-medium">詳しく見る</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* クライアントセクション */}
          <motion.div
            variants={itemVariants}
            className="bg-vampire-shadow/50 backdrop-blur-lg rounded-2xl border border-vampire-accent/20 p-12 mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="gradient-text">信頼される実績</span>
            </h2>
            <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
              スタートアップから大手企業まで、様々なクライアントの課題を技術で解決してきました
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {clients.map((client, index) => (
                <div key={index} className="text-center opacity-60 hover:opacity-100 transition-opacity">
                  <div className="h-16 flex items-center justify-center">
                    <span className="text-text-secondary font-medium">{client.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA セクション */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-br from-vampire-accent/20 to-purple-600/20 rounded-2xl p-12 border border-vampire-accent/20"
          >
            <h2 className="text-3xl font-bold mb-4">プロジェクトを始めましょう</h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              アイデアから実装まで、あなたのビジネスの成長をサポートします。
              まずは無料相談から始めてみませんか？
            </p>
            <Link
              href="/studio/contact"
              className="glow-button px-8 py-3 rounded-full text-white font-medium inline-flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              無料相談を予約
            </Link>
          </motion.div>

          {/* エンタメモードへのリンク */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <p className="text-text-secondary mb-4">エンターテイメントコンテンツをお探しですか？</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-vampire-accent hover:text-vampire-accent/80 transition-colors"
            >
              VTuber活動・配信コンテンツはこちら
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default StudioPage; 