"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";

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

// 型定義
type StreamType = "tech" | "dev" | "chat" | "edu" | "asmr" | "special";

type Stream = {
  time: string;
  title: string;
  description: string;
  type: StreamType;
  duration: string;
};

type WeekDay = "月" | "火" | "水" | "木" | "金" | "土" | "日";

const SchedulePage = () => {
  // モックデータ - 配信スケジュール
  const weekDays: WeekDay[] = ["月", "火", "水", "木", "金", "土", "日"];
  const scheduleData: Record<WeekDay, Stream[]> = {
    月: [],
    火: [
      {
        time: "20:00",
        title: "AI解説配信",
        description: "最新AI技術をわかりやすく解説",
        type: "tech",
        duration: "2時間",
      },
    ],
    水: [
      {
        time: "22:00",
        title: "開発実況",
        description: "便利ツール開発ライブコーディング",
        type: "dev",
        duration: "3時間",
      },
    ],
    木: [],
    金: [
      {
        time: "21:00",
        title: "雑談配信",
        description: "まったり雑談＆質問コーナー",
        type: "chat",
        duration: "1.5時間",
      },
    ],
    土: [
      {
        time: "15:00",
        title: "プログラミング講座",
        description: "初心者向けPython入門",
        type: "edu",
        duration: "2時間",
      },
      {
        time: "23:00",
        title: "ASMR配信",
        description: "作業用・睡眠用ASMR",
        type: "asmr",
        duration: "1時間",
      },
    ],
    日: [
      {
        time: "19:00",
        title: "週末特別配信",
        description: "視聴者参加型企画",
        type: "special",
        duration: "2.5時間",
      },
    ],
  };

  const typeColors: Record<StreamType, string> = {
    tech: "bg-gradient-to-br from-vampire-accent to-purple-600",
    dev: "bg-gradient-to-br from-blue-500 to-blue-700",
    chat: "bg-gradient-to-br from-green-500 to-green-700",
    edu: "bg-gradient-to-br from-yellow-500 to-orange-600",
    asmr: "bg-gradient-to-br from-purple-600 to-pink-600",
    special: "bg-gradient-to-br from-vampire-blood to-red-600",
  };

  const typeLabels: Record<StreamType, string> = {
    tech: "AI解説",
    dev: "開発",
    chat: "雑談",
    edu: "講座",
    asmr: "ASMR",
    special: "特別配信",
  };

  // 今日の曜日を取得（0が日曜日なので調整）
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

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
              href="/live"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-vampire-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              ライブ配信に戻る
            </Link>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">配信スケジュール</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-text-secondary max-w-2xl">
              毎週定期的に配信を行っています。
              通知をONにして配信を見逃さないようにしましょう！
            </motion.p>
          </motion.div>

          {/* 週間スケジュール */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-16"
          >
            {weekDays.map((day, index) => {
              const streams = scheduleData[day];
              const isToday = index === todayIndex;

              return (
                <motion.div
                  key={day}
                  variants={itemVariants}
                  className={`relative rounded-2xl p-4 transition-all duration-300 ${
                    isToday
                      ? "bg-vampire-accent/20 border-2 border-vampire-accent"
                      : "bg-vampire-shadow/30 border border-vampire-accent/10"
                  }`}
                >
                  {/* 曜日ヘッダー */}
                  <div className="text-center mb-4">
                    <h3 className={`text-lg font-bold ${isToday ? "text-vampire-accent" : ""}`}>
                      {day}曜日
                    </h3>
                    {isToday && (
                      <span className="text-xs text-vampire-accent">今日</span>
                    )}
                  </div>

                  {/* 配信情報 */}
                  {streams.length > 0 ? (
                    <div className="space-y-3">
                      {streams.map((stream, streamIndex) => (
                        <div
                          key={streamIndex}
                          className="relative group cursor-pointer"
                        >
                          <div className="bg-vampire-night/50 rounded-lg p-3 transition-all duration-300 group-hover:bg-vampire-night/70">
                            {/* 時間 */}
                            <div className="flex items-center gap-1 text-sm text-vampire-accent mb-1">
                              <Clock className="w-3 h-3" />
                              {stream.time}
                            </div>

                            {/* タイトル */}
                            <h4 className="font-semibold text-sm mb-1 line-clamp-1">
                              {stream.title}
                            </h4>

                            {/* タイプラベル */}
                            <span className={`inline-block px-2 py-0.5 rounded text-xs text-white ${typeColors[stream.type]}`}>
                              {typeLabels[stream.type]}
                            </span>

                            {/* ホバー時の詳細 */}
                            <div className="absolute left-0 right-0 top-full mt-2 p-3 bg-vampire-night rounded-lg border border-vampire-accent/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 pointer-events-none">
                              <p className="text-xs text-text-secondary mb-1">
                                {stream.description}
                              </p>
                              <p className="text-xs text-vampire-accent">
                                配信時間: {stream.duration}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-text-secondary text-sm">
                      配信予定なし
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* 通知設定 */}
          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-vampire-shadow/50 backdrop-blur-lg rounded-2xl border border-vampire-accent/20 p-8">
              <Bell className="w-12 h-12 mx-auto mb-4 text-vampire-accent" />
              <h3 className="text-2xl font-bold mb-4">配信通知を受け取る</h3>
              <p className="text-text-secondary mb-6">
                YouTubeのチャンネル登録と通知をONにして、
                配信開始をいち早くキャッチしよう！
              </p>
              <Link
                href="https://youtube.com/@yuya-kabuki"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-button px-8 py-3 rounded-full text-white font-medium inline-flex items-center justify-center gap-2"
              >
                <Bell className="w-5 h-5" />
                通知を設定する
              </Link>
            </div>
          </motion.div>

          {/* 配信タイプの説明 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-16 grid md:grid-cols-3 gap-6"
          >
            {(Object.entries(typeLabels) as [StreamType, string][]).map(([type, label]) => (
              <motion.div
                key={type}
                variants={itemVariants}
                className="bg-vampire-shadow/30 rounded-xl p-6 border border-vampire-accent/10"
              >
                <div className={`inline-block px-3 py-1.5 rounded-lg text-white mb-4 ${typeColors[type]}`}>
                  {label}
                </div>
                <p className="text-text-secondary text-sm">
                  {type === "tech" && "最新のAI技術やツールについて詳しく解説します"}
                  {type === "dev" && "実際にコードを書きながら便利ツールを開発します"}
                  {type === "chat" && "視聴者の皆さんとまったり雑談・質問回答します"}
                  {type === "edu" && "プログラミングの基礎から応用まで学べる講座です"}
                  {type === "asmr" && "作業用・睡眠用のASMR配信でリラックスタイムを"}
                  {type === "special" && "視聴者参加型の特別企画や限定コンテンツ配信"}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default SchedulePage; 