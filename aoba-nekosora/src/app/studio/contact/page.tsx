'use client'

import { motion } from 'framer-motion'
import { Send, Mail, MessageSquare, Phone, Clock, MapPin, Music, Heart, Sparkles } from 'lucide-react'
import { useState } from 'react'
import Card from '@/components/common/Card'
import MusicVisualizer from '@/components/common/MusicVisualizer'
import MusicNotes from '@/components/common/MusicNotes'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    deadline: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // フォーム送信処理
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-melody-sky/10 via-melody-light to-melody-pink/10 py-20">
        {/* 音符アニメーション */}
        <div className="absolute inset-0 overflow-hidden">
          <MusicNotes count={4} className="absolute top-10 right-20" />
          <MusicNotes count={3} className="absolute bottom-20 left-10" />
        </div>
        
        {/* ハートエフェクト */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/4 right-1/4 text-6xl text-melody-pink/10"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ♥
          </motion.div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-melody-purple/20"
            >
              <MessageSquare className="w-5 h-5 text-melody-purple" />
              <span className="text-sm font-medium bg-gradient-to-r from-melody-purple to-melody-pink bg-clip-text text-transparent">
                CONTACT
              </span>
              <Heart className="w-4 h-4 text-melody-pink animate-pulse" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-melody-purple via-melody-pink to-melody-sky bg-clip-text text-transparent">
                お問い合わせ
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-700 max-w-2xl mx-auto"
            >
              音楽制作のご相談・お見積もりはこちらから<br/>
              あなたの想いを音楽にのせてお届けします♪
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* お問い合わせフォーム */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <motion.div variants={fadeInUp}>
              <Card className="glass-card">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-melody-purple" />
                  お問い合わせフォーム
                  <MusicVisualizer className="h-5" />
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        お名前 <span className="text-melody-pink">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-melody-purple/20 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent transition-all"
                        placeholder="山田 太郎"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        メールアドレス <span className="text-melody-pink">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-melody-purple/20 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent transition-all"
                        placeholder="info@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      会社名・団体名
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-melody-purple/20 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent transition-all"
                      placeholder="株式会社○○"
                    />
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                        プロジェクトの種類 <span className="text-melody-pink">*</span>
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-melody-purple/20 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent transition-all"
                      >
                        <option value="">選択してください</option>
                        <option value="オリジナル楽曲制作">オリジナル楽曲制作</option>
                        <option value="歌唱・ボーカル提供">歌唱・ボーカル提供</option>
                        <option value="音楽ディレクション">音楽ディレクション</option>
                        <option value="ライセンス使用">ライセンス使用</option>
                        <option value="その他">その他</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        ご予算
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-melody-purple/20 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent transition-all"
                      >
                        <option value="">選択してください</option>
                        <option value="10万円未満">10万円未満</option>
                        <option value="10〜30万円">10〜30万円</option>
                        <option value="30〜50万円">30〜50万円</option>
                        <option value="50万円以上">50万円以上</option>
                        <option value="相談したい">相談したい</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                      希望納期
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-melody-purple/20 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      ご相談内容 <span className="text-melody-pink">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-melody-purple/20 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent transition-all resize-none"
                      placeholder="プロジェクトの詳細、ご要望など、お気軽にご記入ください"
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-melody-purple to-melody-pink hover:from-melody-purple/90 hover:to-melody-pink/90 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5" />
                    送信する
                    <Sparkles className="w-4 h-4 animate-sparkle" />
                  </motion.button>
                </form>
              </Card>
            </motion.div>
          </motion.div>
          
          {/* お問い合わせ情報 */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* 連絡先情報 */}
            <motion.div variants={fadeInUp}>
              <Card className="glass-card relative overflow-hidden">
                <MusicNotes count={1} className="absolute -top-2 -right-2 w-8 h-8 opacity-10" />
                
                <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-melody-purple" />
                  お問い合わせ先
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-melody-purple mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">メール</p>
                      <p className="text-gray-600">contact@aoba-nekosora.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-melody-purple mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">営業時間</p>
                      <p className="text-gray-600">平日 10:00 - 18:00</p>
                      <p className="text-sm text-gray-500">※返信は2営業日以内</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-melody-purple mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">所在地</p>
                      <p className="text-gray-600">リモート対応可能</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            {/* よくあるご質問 */}
            <motion.div variants={fadeInUp}>
              <Card className="glass-card">
                <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-melody-purple" />
                  よくあるご質問
                </h3>
                
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer list-none flex items-center justify-between p-3 rounded-lg hover:bg-melody-purple/5 transition-colors">
                      <span className="font-medium text-gray-800">初めての依頼でも大丈夫？</span>
                      <span className="text-melody-purple group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 px-3 text-gray-600">
                      もちろん大丈夫です！初めての方にも丁寧にヒアリングさせていただきます。
                    </p>
                  </details>
                  
                  <details className="group">
                    <summary className="cursor-pointer list-none flex items-center justify-between p-3 rounded-lg hover:bg-melody-purple/5 transition-colors">
                      <span className="font-medium text-gray-800">納期はどのくらい？</span>
                      <span className="text-melody-purple group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 px-3 text-gray-600">
                      プロジェクトの内容により異なりますが、通常1〜3週間程度です。
                    </p>
                  </details>
                  
                  <details className="group">
                    <summary className="cursor-pointer list-none flex items-center justify-between p-3 rounded-lg hover:bg-melody-purple/5 transition-colors">
                      <span className="font-medium text-gray-800">オンライン相談は可能？</span>
                      <span className="text-melody-purple group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 px-3 text-gray-600">
                      はい、Zoom等でのオンライン相談も承っております。
                    </p>
                  </details>
                </div>
              </Card>
            </motion.div>
            
            {/* 応援メッセージ */}
            <motion.div variants={fadeInUp}>
              <Card className="relative overflow-hidden bg-gradient-to-br from-melody-pink/10 to-melody-purple/10">
                <div className="absolute -top-10 -right-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-8xl text-melody-pink/10"
                  >
                    ♪
                  </motion.div>
                </div>
                
                <div className="relative z-10 text-center py-4">
                  <motion.div 
                    className="text-4xl mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💌
                  </motion.div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    あなたの大切なプロジェクトを<br/>
                    音楽でもっと素敵に彩ります。<br/>
                    お気軽にご相談ください♪
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 