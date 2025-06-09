'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Clock, Send, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import Card from '@/components/common/Card'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('お問い合わせ送信:', formData)
    // 実際の実装では API コールなど
  }

  const projectTypes = [
    'オリジナル楽曲制作',
    'ボーカル素材提供',
    '楽曲アレンジ・リミックス',
    'ライセンス相談',
    'その他'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-melody-sky via-white to-melody-purple/20 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-melody-purple to-melody-pink bg-clip-text text-transparent"
          >
            Contact
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            音楽制作のご相談はお気軽に<br/>
            あなたの想いを音楽にするお手伝いをします
          </motion.p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* お問い合わせフォーム */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <Card>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">お問い合わせフォーム</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        お名前 *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent"
                        placeholder="山田太郎"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        メールアドレス *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      会社名・団体名（任意）
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent"
                      placeholder="株式会社〇〇"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      プロジェクトタイプ *
                    </label>
                    <select
                      required
                      value={formData.projectType}
                      onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent"
                    >
                      <option value="">選択してください</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        予算（任意）
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent"
                      >
                        <option value="">選択してください</option>
                        <option value="〜10万円">〜10万円</option>
                        <option value="10万円〜30万円">10万円〜30万円</option>
                        <option value="30万円〜50万円">30万円〜50万円</option>
                        <option value="50万円以上">50万円以上</option>
                        <option value="要相談">要相談</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        希望納期（任意）
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent"
                      >
                        <option value="">選択してください</option>
                        <option value="1週間以内">1週間以内</option>
                        <option value="2週間以内">2週間以内</option>
                        <option value="1ヶ月以内">1ヶ月以内</option>
                        <option value="2ヶ月以内">2ヶ月以内</option>
                        <option value="3ヶ月以上">3ヶ月以上</option>
                        <option value="要相談">要相談</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      プロジェクト詳細・ご要望 *
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent"
                      placeholder="プロジェクトの詳細、楽曲のイメージ、参考楽曲、その他ご要望などをお聞かせください"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-melody-purple hover:bg-melody-purple/80 text-white px-6 py-4 rounded-lg transition-colors flex items-center justify-center text-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    お問い合わせを送信
                  </button>
                </form>
              </Card>
            </motion.div>
          </motion.div>

          {/* 連絡先情報・FAQ */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* 基本情報 */}
            <motion.div variants={fadeInUp}>
              <Card>
                <h3 className="text-xl font-bold mb-4 text-gray-800">基本情報</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-melody-purple mr-3" />
                    <div>
                      <div className="font-medium text-gray-800">メール</div>
                      <div className="text-gray-600">studio@aoba-nekosora.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-melody-pink mr-3" />
                    <div>
                      <div className="font-medium text-gray-800">返信時間</div>
                      <div className="text-gray-600">通常24時間以内</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* よくある質問 */}
            <motion.div variants={fadeInUp}>
              <Card>
                <h3 className="text-xl font-bold mb-4 text-gray-800">よくあるご質問</h3>
                
                <div className="space-y-4">
                  {[
                    {
                      q: '制作費用はどのくらいかかりますか？',
                      a: 'プロジェクトの内容により異なります。オリジナル楽曲制作は30万円〜、ボーカル素材提供は5万円〜が目安です。'
                    },
                    {
                      q: '納期はどのくらいかかりますか？',
                      a: '楽曲制作は通常4-6週間、ボーカル素材提供は1-2週間が目安です。お急ぎの場合はご相談ください。'
                    },
                    {
                      q: '修正は何回まで可能ですか？',
                      a: 'ご満足いただけるまで修正対応いたします。ただし、大幅な変更の場合は追加費用が発生する場合があります。'
                    },
                    {
                      q: '商用利用は可能ですか？',
                      a: 'はい、ライセンスに応じて商用利用も可能です。用途に合わせたライセンスをご提案いたします。'
                    },
                  ].map((faq, index) => (
                    <div key={index} className="border-l-4 border-melody-purple pl-4">
                      <div className="font-medium text-gray-800 mb-1">{faq.q}</div>
                      <div className="text-gray-600 text-sm">{faq.a}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* 制作フロー */}
            <motion.div variants={fadeInUp}>
              <Card>
                <h3 className="text-xl font-bold mb-4 text-gray-800">制作フロー</h3>
                
                <div className="space-y-3">
                  {[
                    '1. お問い合わせ・ヒアリング',
                    '2. お見積もり・企画提案',
                    '3. 契約・制作開始',
                    '4. 初回デモ提出・フィードバック',
                    '5. 修正・最終調整',
                    '6. 納品・アフターサポート'
                  ].map((step, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-gray-600">{step}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 