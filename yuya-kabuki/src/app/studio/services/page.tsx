"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Clock, Users, Zap, Code2, Brain, Settings, Rocket, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { commonAnimations } from "@/utils/animations";

const ServicesPage = () => {
  // サービス一覧
  const services = [
    {
      id: "fullstack-development",
      title: "フルスタック開発",
      subtitle: "Web・モバイルアプリケーション開発",
      description: "最新技術を使用したスケーラブルなアプリケーション開発サービス",
      icon: <Code2 className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-600",
      price: "¥800,000～",
      duration: "2-6ヶ月",
      features: [
        "要件定義・設計から実装まで一貫対応",
        "React/Next.js、Vue.js等のモダンフレームワーク",
        "バックエンドAPI設計・開発",
        "データベース設計・最適化",
        "レスポンシブデザイン対応",
        "SEO・パフォーマンス最適化"
      ],
      process: [
        "要件ヒアリング・分析",
        "技術選定・アーキテクチャ設計",
        "UI/UXデザイン",
        "開発・実装",
        "テスト・デバッグ",
        "デプロイ・運用サポート"
      ],
      suitable: [
        "新規サービスの立ち上げ",
        "既存システムのリニューアル",
        "スタートアップのMVP開発",
        "企業の業務システム構築"
      ]
    },
    {
      id: "ai-integration",
      title: "AI統合ソリューション",
      subtitle: "ChatGPT・機械学習システム開発",
      description: "最新のAI技術をビジネスに活用するためのカスタムソリューション",
      icon: <Brain className="w-8 h-8" />,
      color: "from-purple-500 to-violet-600",
      price: "¥600,000～",
      duration: "1-4ヶ月",
      features: [
        "ChatGPT・Claude等のLLM統合",
        "カスタムAIモデルの構築",
        "自然言語処理システム",
        "画像認識・音声認識機能",
        "レコメンデーションエンジン",
        "データ分析・予測システム"
      ],
      process: [
        "ビジネス課題の分析",
        "AI技術の選定・検証",
        "データ準備・前処理",
        "モデル開発・トレーニング",
        "システム統合・実装",
        "性能評価・改善"
      ],
      suitable: [
        "カスタマーサポートの自動化",
        "業務プロセスの効率化",
        "データドリブンな意思決定",
        "新しいサービス体験の創出"
      ]
    },
    {
      id: "technical-consulting",
      title: "技術コンサルティング",
      subtitle: "システム設計・技術選定支援",
      description: "技術的な課題解決と最適なソリューション設計をサポート",
      icon: <Settings className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
      price: "¥200,000～",
      duration: "1-3ヶ月",
      features: [
        "技術スタックの選定・評価",
        "システムアーキテクチャ設計",
        "コードレビュー・品質改善",
        "開発プロセスの最適化",
        "チーム体制・スキルアップ支援",
        "セキュリティ・パフォーマンス監査"
      ],
      process: [
        "現状分析・課題抽出",
        "技術調査・選択肢の検討",
        "改善案の提案・計画策定",
        "実装支援・レビュー",
        "成果測定・評価",
        "継続的な改善提案"
      ],
      suitable: [
        "技術的負債の解決",
        "開発速度の向上",
        "システムの安定性向上",
        "チームの技術力向上"
      ]
    },
    {
      id: "rapid-prototyping",
      title: "ラピッドプロトタイピング",
      subtitle: "MVP・概念実証の高速開発",
      description: "アイデアを素早く形にして市場検証を支援",
      icon: <Zap className="w-8 h-8" />,
      color: "from-amber-500 to-orange-600",
      price: "¥300,000～",
      duration: "2-8週間",
      features: [
        "高速でのMVP開発",
        "ユーザーテスト可能なプロトタイプ",
        "市場検証のためのA/Bテスト",
        "データ収集・分析機能",
        "継続的な改善・反復開発",
        "本格開発への移行サポート"
      ],
      process: [
        "アイデア・仮説の整理",
        "最小機能の定義",
        "高速プロトタイプ開発",
        "ユーザーテスト実施",
        "フィードバック収集・分析",
        "改善・次フェーズ計画"
      ],
      suitable: [
        "新規事業のアイデア検証",
        "投資家向けデモ作成",
        "市場ニーズの確認",
        "技術的実現可能性の検証"
      ]
    }
  ];

  // プライシングプラン
  const pricingPlans = [
    {
      name: "ライト",
      price: "¥200,000",
      period: "/月",
      description: "小規模なプロジェクトや技術相談",
      features: [
        "月20時間のコンサルティング",
        "技術選定・設計支援",
        "コードレビュー",
        "メール・チャットサポート"
      ],
      popular: false
    },
    {
      name: "スタンダード",
      price: "¥500,000",
      period: "/月",
      description: "中規模開発プロジェクト",
      features: [
        "月50時間の開発・サポート",
        "フルスタック開発",
        "AI機能統合",
        "定期的な進捗報告",
        "緊急サポート対応"
      ],
      popular: true
    },
    {
      name: "エンタープライズ",
      price: "カスタム",
      period: "",
      description: "大規模・長期プロジェクト",
      features: [
        "専任チームでの対応",
        "要件に応じたカスタム開発",
        "24/7サポート",
        "セキュリティ・コンプライアンス対応",
        "運用・保守サービス"
      ],
      popular: false
    }
  ];

  // 開発プロセス
  const developmentProcess = [
    {
      step: "01",
      title: "ヒアリング",
      description: "要件や課題を詳しくお聞きし、最適なソリューションを検討します",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: "02", 
      title: "提案・見積もり",
      description: "技術選定から実装計画まで、詳細な提案書を作成します",
      icon: <Settings className="w-6 h-6" />
    },
    {
      step: "03",
      title: "開発・実装",
      description: "定期的な進捗共有を行いながら、品質を重視して開発を進めます",
      icon: <Code2 className="w-6 h-6" />
    },
    {
      step: "04",
      title: "テスト・デリバリー",
      description: "徹底的なテストを行い、安全で安定したシステムをお届けします",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  // お客様の声
  const testimonials = [
    {
      name: "田中様",
      company: "株式会社テクノソリューション",
      role: "CTO",
      comment: "技術的な深い知識と、ビジネス理解を兼ね備えた提案で、想像以上の成果を得ることができました。",
      rating: 5
    },
    {
      name: "佐藤様",
      company: "スタートアップX",
      role: "CEO",
      comment: "限られた予算と時間の中で、MVPを高品質で開発していただき、投資家からも高評価をいただけました。",
      rating: 5
    },
    {
      name: "山田様",
      company: "製造業Y社",
      role: "システム部長",
      comment: "AI技術の導入により業務効率が大幅に改善。継続的なサポートも手厚く、安心してお任せできます。",
      rating: 5
    }
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
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-vampire-accent/10 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-vampire-blood/10 rounded-full filter blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* ヘッダー */}
          <motion.div
            variants={commonAnimations.containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
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
              <span className="gradient-text">サービス</span>
            </motion.h1>
            
            <motion.p 
              variants={commonAnimations.itemVariants} 
              className="text-xl text-text-secondary max-w-3xl"
            >
              最新技術を活用した開発サービスから技術コンサルティングまで、
              あなたのビジネスの成長を技術面からサポートします。
            </motion.p>
          </motion.div>

          {/* サービス一覧 */}
          <motion.div
            variants={commonAnimations.containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16 mb-20"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={commonAnimations.itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 overflow-hidden"
              >
                <div className="p-8">
                  {/* サービスヘッダー */}
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-2">{service.title}</h3>
                      <p className="text-vampire-accent font-medium mb-2">{service.subtitle}</p>
                      <p className="text-text-secondary">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text">{service.price}</div>
                      <div className="text-sm text-text-secondary flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {service.duration}
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* 主要機能 */}
                    <div>
                      <h4 className="font-bold mb-4 text-vampire-accent">主要機能・技術</h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                            <CheckCircle className="w-4 h-4 text-vampire-accent mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 開発プロセス */}
                    <div>
                      <h4 className="font-bold mb-4 text-vampire-accent">開発プロセス</h4>
                      <ul className="space-y-3">
                        {service.process.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                            <span className="w-6 h-6 bg-vampire-accent/20 text-vampire-accent rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 適用例 */}
                    <div>
                      <h4 className="font-bold mb-4 text-vampire-accent">こんな方におすすめ</h4>
                      <ul className="space-y-3">
                        {service.suitable.map((example, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                            <Star className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 開発プロセス */}
          <motion.div
            variants={commonAnimations.containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.h2 
              variants={commonAnimations.itemVariants}
              className="text-3xl font-bold text-center mb-12"
            >
              <span className="gradient-text">開発プロセス</span>
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {developmentProcess.map((process, index) => (
                <motion.div
                  key={index}
                  variants={commonAnimations.itemVariants}
                  className="relative bg-vampire-shadow/30 rounded-xl border border-vampire-accent/10 p-6 text-center"
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-gradient-to-r from-vampire-accent to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {process.step}
                    </div>
                  </div>
                  
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br from-vampire-accent to-purple-600 text-white mb-4 mt-4`}>
                    {process.icon}
                  </div>
                  <h3 className="font-bold mb-3">{process.title}</h3>
                  <p className="text-sm text-text-secondary">{process.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* プライシング */}
          <motion.div
            variants={commonAnimations.containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.h2 
              variants={commonAnimations.itemVariants}
              className="text-3xl font-bold text-center mb-4"
            >
              <span className="gradient-text">料金プラン</span>
            </motion.h2>
            <motion.p 
              variants={commonAnimations.itemVariants}
              className="text-center text-text-secondary mb-12 max-w-2xl mx-auto"
            >
              プロジェクトの規模や要件に応じて最適なプランをご提案します
            </motion.p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  variants={commonAnimations.itemVariants}
                  className={`relative rounded-2xl border p-8 ${
                    plan.popular
                      ? "border-vampire-accent bg-vampire-accent/10 scale-105"
                      : "border-vampire-accent/20 bg-vampire-shadow/30"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-vampire-accent to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        人気プラン
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-3">
                      <span className="text-3xl font-bold gradient-text">{plan.price}</span>
                      <span className="text-text-secondary">{plan.period}</span>
                    </div>
                    <p className="text-sm text-text-secondary">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-vampire-accent flex-shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* お客様の声 */}
          <motion.div
            variants={commonAnimations.containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.h2 
              variants={commonAnimations.itemVariants}
              className="text-3xl font-bold text-center mb-12"
            >
              <span className="gradient-text">お客様の声</span>
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={commonAnimations.itemVariants}
                  className="bg-vampire-shadow/30 rounded-xl border border-vampire-accent/10 p-6"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <p className="text-text-secondary mb-6 italic">"{testimonial.comment}"</p>
                  
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-text-secondary">{testimonial.role}</div>
                    <div className="text-sm text-vampire-accent">{testimonial.company}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={commonAnimations.itemVariants}
            className="text-center bg-gradient-to-br from-vampire-accent/20 to-purple-600/20 rounded-2xl p-12 border border-vampire-accent/20"
          >
            <Rocket className="w-16 h-16 mx-auto mb-6 text-vampire-accent" />
            <h2 className="text-3xl font-bold mb-4">プロジェクトを始めましょう</h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              無料相談でお客様の課題やご要望をお聞きし、最適なソリューションをご提案します。
              まずはお気軽にご相談ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/studio/contact"
                className="glow-button px-8 py-3 rounded-full text-white font-medium inline-flex items-center justify-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                無料相談を予約
              </Link>
              <Link
                href="/studio/works"
                className="px-8 py-3 border border-vampire-accent/30 hover:border-vampire-accent/50 text-text-secondary hover:text-white rounded-full font-medium inline-flex items-center justify-center gap-2 transition-colors"
              >
                制作実績を見る
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ServicesPage; 