"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Users, Globe, Code2, Database, Smartphone, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { commonAnimations } from "@/utils/animations";

const WorksPage = () => {
  // 制作実績データ
  const works = [
    {
      id: "ai-chatbot-platform",
      title: "AIチャットボットプラットフォーム",
      description: "大手ECサイト向けの高機能AIカスタマーサポートシステム",
      category: "Web Application",
      technologies: ["Next.js", "TypeScript", "OpenAI API", "PostgreSQL", "Docker"],
      client: "大手ECサイト",
      duration: "6ヶ月",
      year: "2024",
      status: "運用中",
      image: "/images/work-chatbot.jpg",
      color: "from-blue-500 to-indigo-600",
      features: [
        "自然言語処理による高精度な回答生成",
        "多言語対応（日本語・英語・中国語）",
        "管理画面でのFAQ学習機能",
        "リアルタイム分析ダッシュボード"
      ],
      results: [
        "問い合わせ対応時間を70%削減",
        "顧客満足度を15%向上",
        "月間処理件数50,000件突破"
      ],
      link: "https://example.com/chatbot-demo",
      github: "https://github.com/yuya-kabuki/ai-chatbot"
    },
    {
      id: "crypto-trading-dashboard",
      title: "暗号通貨取引分析ダッシュボード",
      description: "リアルタイムデータと機械学習を活用した投資支援ツール",
      category: "FinTech",
      technologies: ["React", "Python", "FastAPI", "Redis", "WebSocket"],
      client: "投資会社",
      duration: "4ヶ月",
      year: "2024",
      status: "完了",
      image: "/images/work-crypto.jpg",
      color: "from-amber-500 to-orange-600",
      features: [
        "リアルタイム価格追跡",
        "機械学習による価格予測",
        "ポートフォリオ最適化",
        "リスク分析レポート"
      ],
      results: [
        "取引効率を40%改善",
        "リスク予測精度85%達成",
        "ユーザー数3,000名突破"
      ],
      link: "https://example.com/crypto-dashboard",
      github: null
    },
    {
      id: "elearning-platform",
      title: "プログラミング学習プラットフォーム",
      description: "インタラクティブなコード実行環境を備えた学習システム",
      category: "Education",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Docker", "AWS"],
      client: "教育機関",
      duration: "8ヶ月",
      year: "2023",
      status: "運用中",
      image: "/images/work-elearning.jpg",
      color: "from-green-500 to-emerald-600",
      features: [
        "ブラウザ内コード実行環境",
        "AIによる自動コード評価",
        "プログレス追跡システム",
        "マルチメディア教材対応"
      ],
      results: [
        "学習効率を60%向上",
        "修了率を45%改善",
        "受講者満足度95%達成"
      ],
      link: "https://example.com/elearning",
      github: "https://github.com/yuya-kabuki/elearning-platform"
    },
    {
      id: "iot-monitoring-system",
      title: "IoTデバイス監視システム",
      description: "工場設備の遠隔監視とメンテナンス予測システム",
      category: "IoT",
      technologies: ["React", "Go", "InfluxDB", "Grafana", "MQTT"],
      client: "製造業",
      duration: "5ヶ月",
      year: "2023",
      status: "完了",
      image: "/images/work-iot.jpg",
      color: "from-purple-500 to-violet-600",
      features: [
        "リアルタイムセンサーデータ収集",
        "異常検知アラートシステム",
        "メンテナンス予測AI",
        "カスタマイズ可能なダッシュボード"
      ],
      results: [
        "設備稼働率を20%向上",
        "メンテナンスコストを30%削減",
        "予知保全精度90%達成"
      ],
      link: null,
      github: null
    }
  ];

  // サービス分野
  const categories = [
    {
      name: "Web Application",
      icon: <Globe className="w-6 h-6" />,
      count: works.filter(w => w.category === "Web Application").length,
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "FinTech",
      icon: <Zap className="w-6 h-6" />,
      count: works.filter(w => w.category === "FinTech").length,
      color: "from-amber-500 to-orange-600"
    },
    {
      name: "Education",
      icon: <Users className="w-6 h-6" />,
      count: works.filter(w => w.category === "Education").length,
      color: "from-green-500 to-emerald-600"
    },
    {
      name: "IoT",
      icon: <Database className="w-6 h-6" />,
      count: works.filter(w => w.category === "IoT").length,
      color: "from-purple-500 to-violet-600"
    }
  ];

  // 技術スタック統計
  const techStats = {
    "Frontend": ["React", "Next.js", "Vue.js", "TypeScript"],
    "Backend": ["Node.js", "Python", "Go", "FastAPI"],
    "Database": ["PostgreSQL", "MongoDB", "Redis", "InfluxDB"],
    "Infrastructure": ["AWS", "Docker", "Kubernetes", "Vercel"]
  };

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
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-vampire-accent/10 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-vampire-blood/10 rounded-full filter blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* ヘッダー */}
          <motion.div
            variants={commonAnimations.containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-vampire-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Studioに戻る
            </Link>

            <motion.h1 
              variants={commonAnimations.itemVariants} 
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              制作<span className="gradient-text">実績</span>
            </motion.h1>
            
            <motion.p 
              variants={commonAnimations.itemVariants} 
              className="text-xl text-text-secondary max-w-3xl"
            >
              これまでに手がけたプロジェクトをご紹介します。
              様々な業界・規模のクライアント様との実績があります。
            </motion.p>
          </motion.div>

          {/* カテゴリ別統計 */}
          <motion.div
            variants={commonAnimations.containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={commonAnimations.itemVariants}
                className="bg-vampire-shadow/30 rounded-xl border border-vampire-accent/10 p-6 text-center"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.color} text-white mb-4`}>
                  {category.icon}
                </div>
                <h3 className="font-bold mb-2">{category.name}</h3>
                <p className="text-2xl font-bold gradient-text">{category.count}件</p>
              </motion.div>
            ))}
          </motion.div>

          {/* 制作実績一覧 */}
          <motion.div
            variants={commonAnimations.containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12 mb-16"
          >
            {works.map((work, index) => (
              <motion.div
                key={work.id}
                variants={commonAnimations.itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 overflow-hidden"
              >
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                  {/* プロジェクト画像 */}
                  <div className="relative">
                    <div className="aspect-video bg-vampire-night/50 rounded-xl border border-vampire-accent/20 flex items-center justify-center">
                      <div className="text-center">
                        <Code2 className="w-16 h-16 mx-auto mb-4 text-vampire-accent/50" />
                        <p className="text-text-secondary">プロジェクト画像</p>
                      </div>
                    </div>
                    
                    {/* ステータスバッジ */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        work.status === "運用中" 
                          ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}>
                        {work.status}
                      </span>
                    </div>
                  </div>

                  {/* プロジェクト詳細 */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-vampire-accent/20 text-vampire-accent rounded-full text-sm">
                        {work.category}
                      </span>
                      <span className="text-text-secondary text-sm">{work.year}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-4">{work.title}</h3>
                    <p className="text-text-secondary mb-6">{work.description}</p>

                    {/* プロジェクト情報 */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-vampire-accent" />
                          <span className="text-sm font-medium">クライアント</span>
                        </div>
                        <p className="text-sm text-text-secondary">{work.client}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-vampire-accent" />
                          <span className="text-sm font-medium">開発期間</span>
                        </div>
                        <p className="text-sm text-text-secondary">{work.duration}</p>
                      </div>
                    </div>

                    {/* 技術スタック */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-vampire-accent" />
                        技術スタック
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {work.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-vampire-night/50 text-text-secondary rounded-lg text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 主要機能 */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium mb-3">主要機能</h4>
                      <ul className="space-y-2">
                        {work.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                            <span className="w-1.5 h-1.5 bg-vampire-accent rounded-full"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 成果・効果 */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium mb-3">成果・効果</h4>
                      <div className="grid gap-2">
                        {work.results.map((result, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 bg-gradient-to-r from-vampire-accent to-purple-600 rounded-full"></span>
                            <span className="text-text-secondary">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* リンク */}
                    <div className="flex gap-4">
                      {work.link && (
                        <a
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-vampire-accent/20 hover:bg-vampire-accent/30 text-vampire-accent rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          デモを見る
                        </a>
                      )}
                      {work.github && (
                        <a
                          href={work.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border border-vampire-accent/20 hover:border-vampire-accent/40 text-text-secondary hover:text-white rounded-lg transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          コードを見る
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 技術スタック */}
          <motion.div
            variants={commonAnimations.itemVariants}
            className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 p-8 mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="gradient-text">技術スタック</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(techStats).map(([category, technologies]) => (
                <div key={category}>
                  <h3 className="font-bold mb-4 text-vampire-accent">{category}</h3>
                  <ul className="space-y-2">
                    {technologies.map((tech) => (
                      <li key={tech} className="text-sm text-text-secondary">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={commonAnimations.itemVariants}
            className="text-center bg-gradient-to-br from-vampire-accent/20 to-purple-600/20 rounded-2xl p-12 border border-vampire-accent/20"
          >
            <h2 className="text-3xl font-bold mb-4">あなたのプロジェクトを始めませんか？</h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              これらの実績を活かして、あなたのビジネス課題を解決します。
              まずは無料相談でご要望をお聞かせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/studio/contact"
                className="glow-button px-8 py-3 rounded-full text-white font-medium inline-flex items-center justify-center gap-2"
              >
                無料相談を予約
              </Link>
              <Link
                href="/studio/services"
                className="px-8 py-3 border border-vampire-accent/30 hover:border-vampire-accent/50 text-text-secondary hover:text-white rounded-full font-medium inline-flex items-center justify-center gap-2 transition-colors"
              >
                サービス詳細を見る
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default WorksPage; 