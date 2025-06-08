"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Users, PlayCircle, Bell, Radio } from "lucide-react";
import Link from "next/link";

// モックデータ
const mockSchedule = [
  {
    id: 1,
    title: "AIツール開発実況 - ChatGPT Plugin作成",
    description: "ChatGPT Pluginを0から作る過程を実況配信。視聴者のアイデアも取り入れながら進めます。",
    date: "2024-01-20",
    time: "20:00",
    duration: "2時間",
    type: "開発実況",
    platform: "YouTube",
    isLive: false,
    viewers: 0,
    icon: <Radio className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "週刊AI技術ニュース解説 #42",
    description: "今週のAI関連の最新ニュースを分かりやすく解説。質問コーナーもあります。",
    date: "2024-01-22",
    time: "21:00",
    duration: "1時間",
    type: "解説配信",
    platform: "YouTube",
    isLive: false,
    viewers: 0,
    icon: <PlayCircle className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "師匠とのコラボ開発 - 音楽×AI",
    description: "猫空あおばさんと一緒に、AIを使った音楽制作ツールを開発します。",
    date: "2024-01-25",
    time: "19:00",
    duration: "3時間",
    type: "コラボ配信",
    platform: "YouTube",
    isLive: false,
    viewers: 0,
    icon: <Users className="w-5 h-5" />,
  },
];

const LiveSchedule = () => {
  const getDateInfo = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return { label: "今日", color: "text-vampire-blood" };
    if (diffDays === 1) return { label: "明日", color: "text-vampire-accent" };
    if (diffDays <= 7) return { label: `${diffDays}日後`, color: "text-text-primary" };
    return { label: date.toLocaleDateString('ja-JP'), color: "text-text-secondary" };
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockSchedule.map((stream, index) => {
        const dateInfo = getDateInfo(stream.date);
        
        return (
          <motion.div
            key={stream.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="group glass-card rounded-xl p-6 h-full flex flex-col hover:border-vampire-accent/40 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              {/* ヘッダー */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-vampire-accent/20 rounded-lg text-vampire-accent">
                    {stream.icon}
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-vampire-blood/10 text-vampire-blood text-xs rounded-full">
                      {stream.type}
                    </span>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-vampire-accent/10 transition-colors group">
                  <Bell className="w-4 h-4 text-text-secondary group-hover:text-vampire-accent" />
                </button>
              </div>

              {/* タイトル */}
              <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-vampire-accent transition-colors">
                {stream.title}
              </h3>

              {/* 説明 */}
              <p className="text-text-secondary text-sm mb-4 flex-grow line-clamp-2">
                {stream.description}
              </p>

              {/* 日時情報 */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center space-x-2 text-text-secondary">
                    <Calendar className="w-4 h-4" />
                    <span className={dateInfo.color}>{dateInfo.label}</span>
                  </span>
                  <span className="flex items-center space-x-2 text-text-secondary">
                    <Clock className="w-4 h-4" />
                    <span>{stream.time}</span>
                  </span>
                </div>
                <div className="text-xs text-text-secondary">
                  配信時間: {stream.duration}
                </div>
              </div>

              {/* アクションボタン */}
              <Link
                href={`/live/${stream.id}`}
                className="w-full py-2 px-4 bg-vampire-accent/10 hover:bg-vampire-accent/20 text-vampire-accent rounded-lg text-center transition-all duration-300 text-sm font-medium"
              >
                詳細を見る
              </Link>

              {/* ライブインジケーター（ライブ中の場合） */}
              {stream.isLive && (
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-500 font-medium">LIVE</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default LiveSchedule; 