"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Heart, Bug, Lightbulb, Send, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { validateField, validateForm, type ValidationRule, type ValidationError } from "@/utils/validation";

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

const FeedbackPage = () => {
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // フィードバックタイプ
  const feedbackTypes = [
    {
      id: "feature",
      title: "機能リクエスト",
      icon: <Lightbulb className="w-6 h-6" />,
      description: "新しい機能やツールのアイデア",
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "bug",
      title: "バグ報告",
      icon: <Bug className="w-6 h-6" />,
      description: "不具合や問題の報告",
      color: "from-red-500 to-pink-600",
    },
    {
      id: "content",
      title: "コンテンツリクエスト",
      icon: <MessageSquare className="w-6 h-6" />,
      description: "記事やチュートリアルの提案",
      color: "from-vampire-accent to-purple-600",
    },
    {
      id: "other",
      title: "その他",
      icon: <Heart className="w-6 h-6" />,
      description: "改善案や感想など",
      color: "from-green-500 to-emerald-600",
    },
  ];

  // 最近のフィードバック例
  const recentFeedback = [
    {
      type: "feature",
      title: "VS Code拡張機能の開発",
      status: "検討中",
      date: "2024-01-20",
    },
    {
      type: "bug",
      title: "ダークモードでの表示崩れ",
      status: "解決済み",
      date: "2024-01-18",
    },
    {
      type: "content",
      title: "Docker入門チュートリアル",
      status: "作成中",
      date: "2024-01-15",
    },
  ];

  // バリデーションルール
  const validationRules: Record<keyof typeof formData, ValidationRule> = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      email: true,
      maxLength: 100,
    },
    type: {
      required: true,
    },
    subject: {
      required: true,
      minLength: 5,
      maxLength: 100,
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
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
        name: "",
        email: "",
        type: "",
        subject: "",
        message: "",
      });
      setSelectedType("");
      setErrors({});
      setTouched({});
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-vampire-accent/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
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
              <span className="gradient-text">フィードバック</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-text-secondary max-w-2xl">
              あなたの声を聞かせてください。
              機能リクエスト、バグ報告、コンテンツの提案など、何でもお待ちしています！
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* メインコンテンツ */}
            <div className="lg:col-span-2">
              {/* フィードバックタイプ選択 */}
              <motion.div
                variants={itemVariants}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold mb-6">フィードバックの種類を選択</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedType(type.id);
                        setFormData({ ...formData, type: type.id });
                      }}
                      className={`group relative overflow-hidden rounded-xl border p-6 text-left transition-all duration-300 ${
                        selectedType === type.id
                          ? "border-vampire-accent bg-vampire-accent/10"
                          : "border-vampire-accent/10 bg-vampire-shadow/30 hover:border-vampire-accent/30"
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      
                      <div className="relative z-10">
                        <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${type.color} text-white mb-4`}>
                          {type.icon}
                        </div>
                        <h3 className="font-semibold mb-2">{type.title}</h3>
                        <p className="text-sm text-text-secondary">{type.description}</p>
                      </div>

                      {selectedType === type.id && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle className="w-5 h-5 text-vampire-accent" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* フィードバックフォーム */}
              <motion.div
                variants={itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 p-8"
              >
                <h2 className="text-2xl font-bold mb-6">フィードバックを送信</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                    <h3 className="text-xl font-bold mb-2">送信完了！</h3>
                    <p className="text-text-secondary">
                      フィードバックをありがとうございます。内容を確認次第対応いたします。
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
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
                          placeholder="傾奇 太郎"
                          aria-invalid={!!(errors.name && touched.name)}
                          aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                        />
                        {errors.name && touched.name && (
                          <p id="name-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          メールアドレス
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur("email")}
                          className={`w-full px-4 py-3 bg-vampire-night/50 border rounded-lg text-white placeholder-text-secondary focus:outline-none transition-colors ${
                            errors.email && touched.email
                              ? "border-red-500 focus:border-red-500"
                              : "border-vampire-accent/20 focus:border-vampire-accent"
                          }`}
                          placeholder="taro@example.com"
                          aria-invalid={!!(errors.email && touched.email)}
                          aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                        />
                        {errors.email && touched.email && (
                          <p id="email-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        件名 <span className="text-vampire-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("subject")}
                        required
                        className={`w-full px-4 py-3 bg-vampire-night/50 border rounded-lg text-white placeholder-text-secondary focus:outline-none transition-colors ${
                          errors.subject && touched.subject
                            ? "border-red-500 focus:border-red-500"
                            : "border-vampire-accent/20 focus:border-vampire-accent"
                        }`}
                        placeholder="フィードバックの件名"
                        aria-invalid={!!(errors.subject && touched.subject)}
                        aria-describedby={errors.subject && touched.subject ? "subject-error" : undefined}
                      />
                      {errors.subject && touched.subject && (
                        <p id="subject-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        メッセージ <span className="text-vampire-accent">*</span>
                        <span className="text-xs text-text-secondary ml-2">
                          ({formData.message.length}/1000文字)
                        </span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("message")}
                        required
                        rows={6}
                        className={`w-full px-4 py-3 bg-vampire-night/50 border rounded-lg text-white placeholder-text-secondary focus:outline-none transition-colors resize-none ${
                          errors.message && touched.message
                            ? "border-red-500 focus:border-red-500"
                            : "border-vampire-accent/20 focus:border-vampire-accent"
                        }`}
                        placeholder="詳細な内容をお書きください..."
                        aria-invalid={!!(errors.message && touched.message)}
                        aria-describedby={errors.message && touched.message ? "message-error" : undefined}
                      />
                      {errors.message && touched.message && (
                        <p id="message-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {!selectedType && (
                      <p className="text-sm text-yellow-500 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        フィードバックの種類を選択してください
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={!selectedType}
                      className="glow-button px-8 py-3 rounded-full text-white font-medium inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                      送信する
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1 space-y-6">
              {/* ガイドライン */}
              <motion.div
                variants={itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 p-6"
              >
                <h3 className="text-xl font-bold mb-4">フィードバックのガイドライン</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-vampire-accent rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>具体的で明確な内容を心がけてください</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-vampire-accent rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>バグ報告の場合は再現手順を記載してください</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-vampire-accent rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>建設的なフィードバックを歓迎します</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-vampire-accent rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>返信が必要な場合はメールアドレスを記入してください</span>
                  </li>
                </ul>
              </motion.div>

              {/* 最近のフィードバック */}
              <motion.div
                variants={itemVariants}
                className="bg-vampire-shadow/30 rounded-2xl border border-vampire-accent/10 p-6"
              >
                <h3 className="text-xl font-bold mb-4">最近のフィードバック</h3>
                <div className="space-y-4">
                  {recentFeedback.map((feedback, index) => {
                    const type = feedbackTypes.find(t => t.id === feedback.type);
                    return (
                      <div key={index} className="border-b border-vampire-accent/10 pb-3 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-1.5 rounded bg-gradient-to-br ${type?.color} text-white`}>
                            {React.createElement(
                              type?.icon.type || "div",
                              { className: "w-3 h-3" }
                            )}
                          </div>
                          <h4 className="font-medium text-sm">{feedback.title}</h4>
                        </div>
                        <div className="flex items-center justify-between text-xs text-text-secondary">
                          <span>{feedback.date}</span>
                          <span className={`px-2 py-0.5 rounded-full ${
                            feedback.status === "解決済み" ? "bg-green-500/20 text-green-400" :
                            feedback.status === "作成中" ? "bg-blue-500/20 text-blue-400" :
                            "bg-yellow-500/20 text-yellow-400"
                          }`}>
                            {feedback.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* その他の連絡方法 */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-vampire-accent/20 to-purple-600/20 rounded-2xl border border-vampire-accent/20 p-6"
              >
                <h3 className="text-xl font-bold mb-4">その他の連絡方法</h3>
                <p className="text-sm text-text-secondary mb-4">
                  フォーム以外でもフィードバックを受け付けています
                </p>
                <div className="space-y-2 text-sm">
                  <Link
                    href="/community/discord"
                    className="block text-vampire-accent hover:text-vampire-accent/80 transition-colors"
                  >
                    → Discord #feedback チャンネル
                  </Link>
                  <a
                    href="https://github.com/yuya-kabuki/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-vampire-accent hover:text-vampire-accent/80 transition-colors"
                  >
                    → GitHub Issues
                  </a>
                  <a
                    href="https://twitter.com/yuya_kabuki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-vampire-accent hover:text-vampire-accent/80 transition-colors"
                  >
                    → Twitter DM
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default FeedbackPage;
