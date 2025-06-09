"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle, AlertCircle, Mail, Phone, MapPin, Clock, Users, DollarSign, Calendar, Briefcase } from "lucide-react";
import Link from "next/link";
import { commonAnimations } from "@/utils/animations";
import { validateField, validateForm, type ValidationRule } from "@/utils/validation";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    requirements: "",
    goals: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // プロジェクトタイプ
  const projectTypes = [
    {
      id: "web-app",
      title: "Webアプリケーション開発",
      description: "SaaS、ECサイト、企業サイトなど",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "ai-integration",
      title: "AI統合・導入",
      description: "ChatGPT活用、機械学習システムなど",
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-violet-600"
    },
    {
      id: "consulting",
      title: "技術コンサルティング",
      description: "技術選定、アーキテクチャ設計など",
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-emerald-600"
    },
    {
      id: "prototype",
      title: "プロトタイプ開発",
      description: "MVP、概念実証など",
      icon: <Users className="w-6 h-6" />,
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "other",
      title: "その他",
      description: "上記以外のご相談",
      icon: <Users className="w-6 h-6" />,
      color: "from-gray-500 to-gray-600"
    }
  ];

  // 予算オプション
  const budgetOptions = [
    "50万円未満",
    "50万円〜100万円",
    "100万円〜300万円",
    "300万円〜500万円",
    "500万円〜1000万円",
    "1000万円以上",
    "相談して決定"
  ];

  // 希望期間
  const timelineOptions = [
    "1ヶ月以内",
    "2-3ヶ月",
    "3-6ヶ月",
    "6ヶ月-1年",
    "1年以上",
    "柔軟に対応"
  ];

  // バリデーションルール
  const validationRules: Record<keyof typeof formData, ValidationRule> = {
    companyName: {
      maxLength: 100
    },
    name: {
      required: true,
      minLength: 2,
      maxLength: 50
    },
    email: {
      required: true,
      email: true,
      maxLength: 100
    },
    phone: {
      maxLength: 20
    },
    projectType: {
      required: true
    },
    budget: {
      required: true
    },
    timeline: {
      required: true
    },
    description: {
      required: true,
      minLength: 20,
      maxLength: 2000
    },
    requirements: {
      maxLength: 1000
    },
    goals: {
      maxLength: 1000
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 全フィールドをtouchedに設定
    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true,
    }), {});
    setTouched(allTouched);

    // バリデーション実行
    const validationErrors = validateForm(formData, validationRules);
    
    if (validationErrors.length > 0) {
      const errorMap = validationErrors.reduce((acc, error) => ({
        ...acc,
        [error.field]: error.message,
      }), {});
      setErrors(errorMap);
      return;
    }

    // 実際の送信処理はここに実装
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        companyName: "",
        name: "",
        email: "",
        phone: "",
        projectType: "",
        budget: "",
        timeline: "",
        description: "",
        requirements: "",
        goals: ""
      });
      setErrors({});
      setTouched({});
    }, 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // リアルタイムバリデーション（touchedの場合のみ）
    if (touched[name]) {
      const error = validateField(value, validationRules[name as keyof typeof formData]);
      setErrors({
        ...errors,
        [name]: error || "",
      });
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched({ ...touched, [fieldName]: true });
    const error = validateField(
      formData[fieldName as keyof typeof formData],
      validationRules[fieldName as keyof typeof formData]
    );
    setErrors({
      ...errors,
      [fieldName]: error || "",
    });
  };

  const selectedProjectType = projectTypes.find(pt => pt.id === formData.projectType);

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
              お<span className="gradient-text">問い合わせ</span>
            </motion.h1>
            
            <motion.p 
              variants={commonAnimations.itemVariants} 
              className="text-xl text-text-secondary max-w-3xl"
            >
              プロジェクトのご相談・お見積もりは無料です。
              まずはお気軽にお問い合わせください。24時間以内にご返信いたします。
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* メインフォーム */}
            <div className="lg:col-span-2">
              <motion.div
                variants={commonAnimations.itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 p-8"
              >
                <h2 className="text-2xl font-bold mb-8">プロジェクト詳細フォーム</h2>

                {isSubmitted ? (
                  <div className="text-center py-16">
                    <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500" />
                    <h3 className="text-2xl font-bold mb-4">お問い合わせありがとうございます！</h3>
                    <p className="text-text-secondary mb-6">
                      内容を確認次第、24時間以内にご返信いたします。<br />
                      お急ぎの場合は、お電話でもお気軽にお問い合わせください。
                    </p>
                    <div className="text-vampire-accent font-bold">
                      📞 03-1234-5678（平日 9:00-18:00）
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 基本情報 */}
                    <div>
                      <h3 className="text-lg font-bold mb-6 text-vampire-accent">基本情報</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                            会社名・組織名
                          </label>
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur("companyName")}
                            className={`w-full px-4 py-3 bg-vampire-night/50 border rounded-lg text-white placeholder-text-secondary focus:outline-none transition-colors ${
                              errors.companyName && touched.companyName
                                ? "border-red-500 focus:border-red-500"
                                : "border-vampire-accent/20 focus:border-vampire-accent"
                            }`}
                            placeholder="株式会社◯◯"
                          />
                          {errors.companyName && touched.companyName && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.companyName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            お名前 <span className="text-vampire-accent">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur("name")}
                            required
                            className={`w-full px-4 py-3 bg-vampire-night/50 border rounded-lg text-white placeholder-text-secondary focus:outline-none transition-colors ${
                              errors.name && touched.name
                                ? "border-red-500 focus:border-red-500"
                                : "border-vampire-accent/20 focus:border-vampire-accent"
                            }`}
                            placeholder="山田 太郎"
                          />
                          {errors.name && touched.name && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            メールアドレス <span className="text-vampire-accent">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur("email")}
                            required
                            className={`w-full px-4 py-3 bg-vampire-night/50 border rounded-lg text-white placeholder-text-secondary focus:outline-none transition-colors ${
                              errors.email && touched.email
                                ? "border-red-500 focus:border-red-500"
                                : "border-vampire-accent/20 focus:border-vampire-accent"
                            }`}
                            placeholder="taro@example.com"
                          />
                          {errors.email && touched.email && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            電話番号
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur("phone")}
                            className={`w-full px-4 py-3 bg-vampire-night/50 border rounded-lg text-white placeholder-text-secondary focus:outline-none transition-colors ${
                              errors.phone && touched.phone
                                ? "border-red-500 focus:border-red-500"
                                : "border-vampire-accent/20 focus:border-vampire-accent"
                            }`}
                            placeholder="090-1234-5678"
                          />
                          {errors.phone && touched.phone && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* プロジェクト種別 */}
                    <div>
                      <h3 className="text-lg font-bold mb-6 text-vampire-accent">プロジェクト種別</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {projectTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, projectType: type.id });
                            }}
                            className={`relative overflow-hidden rounded-xl border p-6 text-left transition-all duration-300 ${
                              formData.projectType === type.id
                                ? "border-vampire-accent bg-vampire-accent/10"
                                : "border-vampire-accent/10 bg-vampire-shadow/30 hover:border-vampire-accent/30"
                            }`}
                          >
                            <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 ${
                              formData.projectType === type.id ? "opacity-10" : "group-hover:opacity-5"
                            } transition-opacity duration-300`}></div>
                            
                            <div className="relative z-10">
                              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${type.color} text-white mb-4`}>
                                {type.icon}
                              </div>
                              <h4 className="font-semibold mb-2">{type.title}</h4>
                              <p className="text-sm text-text-secondary">{type.description}</p>
                            </div>

                            {formData.projectType === type.id && (
                              <div className="absolute top-4 right-4">
                                <CheckCircle className="w-5 h-5 text-vampire-accent" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      {errors.projectType && touched.projectType && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.projectType}
                        </p>
                      )}
                    </div>

                    {/* 予算・期間 */}
                    <div>
                      <h3 className="text-lg font-bold mb-6 text-vampire-accent">予算・期間</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="budget" className="block text-sm font-medium mb-2">
                            ご予算 <span className="text-vampire-accent">*</span>
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur("budget")}
                            required
                            className={`w-full px-4 py-3 bg-vampire-night/50 border rounded-lg text-white focus:outline-none transition-colors ${
                              errors.budget && touched.budget
                                ? "border-red-500 focus:border-red-500"
                                : "border-vampire-accent/20 focus:border-vampire-accent"
                            }`}
                          >
                            <option value="">選択してください</option>
                            {budgetOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          {errors.budget && touched.budget && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.budget}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                            希望期間 <span className="text-vampire-accent">*</span>
                          </label>
                          <select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur("timeline")}
                            required
                            className={`w-full px-4 py-3 bg-vampire-night/50 border rounded-lg text-white focus:outline-none transition-colors ${
                              errors.timeline && touched.timeline
                                ? "border-red-500 focus:border-red-500"
                                : "border-vampire-accent/20 focus:border-vampire-accent"
                            }`}
                          >
                            <option value="">選択してください</option>
                            {timelineOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          {errors.timeline && touched.timeline && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.timeline}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* プロジェクト詳細 */}
                    <div>
                      <h3 className="text-lg font-bold mb-6 text-vampire-accent">プロジェクト詳細</h3>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium mb-2">
                            プロジェクト概要 <span className="text-vampire-accent">*</span>
                            <span className="text-xs text-text-secondary ml-2">
                              ({formData.description.length}/2000文字)
                            </span>
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur("description")}
                            required
                            rows={6}
                            className={`w-full px-4 py-3 bg-vampire-night/50 border rounded-lg text-white placeholder-text-secondary focus:outline-none transition-colors resize-none ${
                              errors.description && touched.description
                                ? "border-red-500 focus:border-red-500"
                                : "border-vampire-accent/20 focus:border-vampire-accent"
                            }`}
                            placeholder="実現したいサービスや解決したい課題について詳しくお聞かせください..."
                          />
                          {errors.description && touched.description && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.description}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="requirements" className="block text-sm font-medium mb-2">
                            技術要件・制約事項
                            <span className="text-xs text-text-secondary ml-2">
                              ({formData.requirements.length}/1000文字)
                            </span>
                          </label>
                          <textarea
                            id="requirements"
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur("requirements")}
                            rows={4}
                            className={`w-full px-4 py-3 bg-vampire-night/50 border rounded-lg text-white placeholder-text-secondary focus:outline-none transition-colors resize-none ${
                              errors.requirements && touched.requirements
                                ? "border-red-500 focus:border-red-500"
                                : "border-vampire-accent/20 focus:border-vampire-accent"
                            }`}
                            placeholder="特定の技術スタック、セキュリティ要件、既存システムとの連携などがあればお聞かせください..."
                          />
                          {errors.requirements && touched.requirements && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.requirements}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="goals" className="block text-sm font-medium mb-2">
                            プロジェクトの目標・期待する成果
                            <span className="text-xs text-text-secondary ml-2">
                              ({formData.goals.length}/1000文字)
                            </span>
                          </label>
                          <textarea
                            id="goals"
                            name="goals"
                            value={formData.goals}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur("goals")}
                            rows={4}
                            className={`w-full px-4 py-3 bg-vampire-night/50 border rounded-lg text-white placeholder-text-secondary focus:outline-none transition-colors resize-none ${
                              errors.goals && touched.goals
                                ? "border-red-500 focus:border-red-500"
                                : "border-vampire-accent/20 focus:border-vampire-accent"
                            }`}
                            placeholder="プロジェクト完了後に期待する成果や効果についてお聞かせください..."
                          />
                          {errors.goals && touched.goals && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.goals}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full glow-button px-8 py-4 rounded-full text-white font-medium inline-flex items-center justify-center gap-2 text-lg"
                    >
                      <Send className="w-5 h-5" />
                      無料相談を申し込む
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1 space-y-8">
              {/* 連絡先情報 */}
              <motion.div
                variants={commonAnimations.itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 p-6"
              >
                <h3 className="text-xl font-bold mb-6">お問い合わせ先</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-vampire-accent" />
                    <div>
                      <p className="text-sm text-text-secondary">メール</p>
                      <p className="font-medium">contact@kabuki-studio.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-vampire-accent" />
                    <div>
                      <p className="text-sm text-text-secondary">電話</p>
                      <p className="font-medium">03-1234-5678</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-vampire-accent" />
                    <div>
                      <p className="text-sm text-text-secondary">営業時間</p>
                      <p className="font-medium">平日 9:00-18:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-vampire-accent mt-1" />
                    <div>
                      <p className="text-sm text-text-secondary">所在地</p>
                      <p className="font-medium">東京都渋谷区◯◯</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 対応フロー */}
              <motion.div
                variants={commonAnimations.itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 p-6"
              >
                <h3 className="text-xl font-bold mb-6">お問い合わせ後の流れ</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-vampire-accent rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">お問い合わせ受付</h4>
                      <p className="text-sm text-text-secondary">24時間以内にご返信</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-vampire-accent rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">詳細ヒアリング</h4>
                      <p className="text-sm text-text-secondary">オンライン面談（30-60分）</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-vampire-accent rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">提案書作成</h4>
                      <p className="text-sm text-text-secondary">技術選定・見積もり</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-vampire-accent rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium">契約・開発開始</h4>
                      <p className="text-sm text-text-secondary">プロジェクト着手</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* よくある質問 */}
              <motion.div
                variants={commonAnimations.itemVariants}
                className="bg-gradient-to-br from-vampire-accent/20 to-purple-600/20 rounded-2xl border border-vampire-accent/20 p-6"
              >
                <h3 className="text-xl font-bold mb-6">よくある質問</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">相談は無料ですか？</h4>
                    <p className="text-sm text-text-secondary">はい、初回相談は完全無料です。</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">小規模でも対応可能ですか？</h4>
                    <p className="text-sm text-text-secondary">規模に関わらずご相談いただけます。</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">リモート対応は可能ですか？</h4>
                    <p className="text-sm text-text-secondary">全国どこからでもリモートで対応可能です。</p>
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

export default ContactPage; 