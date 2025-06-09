"use client";

import { motion } from "framer-motion";
import { Calendar, Video, Headphones, Clock, Eye, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { CurrentLive, LiveCategory } from "@/types/live";
import { Card } from "@/components/common/Card";
import { commonAnimations } from "@/utils/animations";
import { IMAGE_PATHS } from "@/constants/images";

// 共通アニメーションバリアントを使用
const { containerVariants, itemVariants } = commonAnimations;

const LivePage = () => {
  // モックデータ
  const currentLive = {
    title: "【AI解説】ChatGPT APIの活用術！便利ツール開発ライブ",
    viewers: 1234,
    startTime: "20:00",
    thumbnail: IMAGE_PATHS.LIVE.THUMBNAIL,
    description: "ChatGPT APIを使った実用的なツール開発を実況解説！初心者でもわかりやすく、実際にコードを書きながら進めていきます。",
  } satisfies CurrentLive;

  const categories = [
    {
      title: "配信スケジュール",
      description: "今週の配信予定をチェック",
      icon: <Calendar className="w-8 h-8" />,
      href: "/live/schedule",
      color: "from-vampire-accent to-purple-600",
      stats: { label: "今週の配信", value: "5本" },
    },
    {
      title: "アーカイブ",
      description: "過去の配信を視聴",
      icon: <Video className="w-8 h-8" />,
      href: "/live/archive",
      color: "from-vampire-blood to-red-600",
      stats: { label: "総配信数", value: "150本+" },
    },
    {
      title: "ASMR配信",
      description: "作業用・睡眠用ASMR",
      icon: <Headphones className="w-8 h-8" />,
      href: "/live/asmr",
      color: "from-purple-600 to-pink-600",
      stats: { label: "ASMR配信", value: "30本+" },
    },
  ] satisfies LiveCategory[];

  return (
    <div className="min-h-screen bg-vampire-night pt-24">
      {/* ヒーローセクション */}
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-vampire-night/80"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-vampire-accent/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-vampire-blood/20 rounded-full filter blur-[100px] animate-pulse-slow animation-delay-300"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">ライブ配信</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-text-secondary max-w-2xl mx-auto">
              AI解説、開発実況、ASMR配信まで。
              吸血鬼VTuberの多彩な配信コンテンツをお楽しみください。
            </motion.p>
          </motion.div>

          {/* 現在配信中・次回配信 */}
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="bg-vampire-shadow/50 backdrop-blur-lg rounded-2xl border border-vampire-accent/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  現在配信中
                </h2>
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {currentLive.viewers.toLocaleString()}人視聴中
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {currentLive.startTime}開始
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  <Image
                    src={IMAGE_PATHS.LIVE.THUMBNAIL}
                    alt="配信サムネイル"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vampire-night/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-lg font-semibold line-clamp-2">{currentLive.title}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-2">{currentLive.title}</h3>
                  <p className="text-text-secondary mb-6">
                    {currentLive.description}
                  </p>
                  <Link
                    href="https://youtube.com/@yuya-kabuki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-button px-6 py-3 rounded-full text-white font-medium inline-flex items-center justify-center gap-2"
                  >
                    <Video className="w-5 h-5" />
                    配信を見る
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* カテゴリーカード */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-6"
          >
            {categories.map((category, index) => (
              <Card
                key={index}
                title={category.title}
                description={category.description}
                icon={category.icon}
                href={category.href}
                color={category.color}
                stats={category.stats}
                variants={itemVariants}
              />
            ))}
          </motion.div>

          {/* 配信プラットフォーム */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <h3 className="text-xl font-semibold mb-4 text-text-secondary">配信プラットフォーム</h3>
            <div className="flex items-center justify-center gap-6">
              <Link
                href="https://youtube.com/@yuya-kabuki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-vampire-accent transition-colors"
              >
                YouTube
              </Link>
              <Link
                href="https://twitch.tv/yuya-kabuki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-vampire-accent transition-colors"
              >
                Twitch
              </Link>
              <Link
                href="#"
                className="text-text-secondary hover:text-vampire-accent transition-colors"
              >
                ニコニコ動画
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default LivePage; 